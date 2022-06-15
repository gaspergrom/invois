// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const { isObject, some } = require('lodash');
const utilsOriginal = require('eslint-plugin-vue/lib/utils');
const casing = require('eslint-plugin-vue/lib/utils/casing');
const cloneDeep = require('lodash/cloneDeep');

const utils = cloneDeep(utilsOriginal);
const originalIsVueComponentFile = utils.isVueComponentFile;
utils.isVueComponentFile = (node, path) => (
  originalIsVueComponentFile.call(utils, node, path)
    || node.declaration.type === 'ClassDeclaration'
);

utils.executeOnVueComponent = (context, cb) => ({
  /** @param {ObjectExpression} node */
  'ObjectExpression:exit': function (node) {
    if (isVueComponentExpression(node)) {
      cb(node, 'export');
      return;
    }

    const type = utils.getVueObjectType(context, node);
    if (!type || (type !== 'mark' && type !== 'export' && type !== 'definition')) {
      return;
    }

    cb(node, 'export');
  },
});

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'disallow registering components that are not used inside templates',
      category: 'essential',
    },
    fixable: null,
    schema: [
      {
        type: 'object',
        properties: {
          ignoreWhenBindingPresent: {
            type: 'boolean',
          },
        },
        additionalProperties: false,
      },
    ],
  },

  create(context) {
    const options = context.options[0] || {};
    const ignoreWhenBindingPresent = options.ignoreWhenBindingPresent !== undefined ? options.ignoreWhenBindingPresent : true;
    const usedComponents = new Set();
    /** @type { { node: Property, name: string }[] } */
    let registeredComponents = [];
    let ignoreReporting = false;
    /** @type {Position} */
    let templateLocation;

    return utils.defineTemplateBodyVisitor(
      context,
      {
        /** @param {VElement} node */
        VElement(node) {
          if (
            (!utils.isHtmlElementNode(node) && !utils.isSvgElementNode(node))
            || utils.isHtmlWellKnownElementName(node.rawName)
            || utils.isSvgWellKnownElementName(node.rawName)
          ) {
            return;
          }

          usedComponents.add(node.rawName);
        },
        /** @param {VDirective} node */
        "VAttribute[directive=true][key.name.name='bind'][key.argument.name='is'], VAttribute[directive=true][key.name.name='is']": function (
          node,
        ) {
          if (
            !node.value // `<component :is>`
            || node.value.type !== 'VExpressionContainer'
            || !node.value.expression // `<component :is="">`
          ) {
            return;
          }

          if (node.value.expression.type === 'Literal') {
            usedComponents.add(node.value.expression.value);
          } else if (ignoreWhenBindingPresent) {
            ignoreReporting = true;
          }
        },
        /** @param {VAttribute} node */
        "VAttribute[directive=false][key.name='is']": function (node) {
          if (!node.value) {
            return;
          }
          const value = node.value.value.startsWith('vue:') // Usage on native elements 3.1+
            ? node.value.value.slice(4)
            : node.value.value;
          usedComponents.add(value);
        },
        /** @param {VElement} node */
        "VElement[name='template']": function (node) {
          templateLocation = templateLocation || node.loc.start;
        },
        "VElement[name='template']:exit": function (node) {
          if (
            node.loc.start !== templateLocation
            || ignoreReporting
            || utils.hasAttribute(node, 'src')
          ) {
            return;
          }

          registeredComponents
            .filter(({ name }) => {
              // If the component name is PascalCase or camelCase
              // it can be used in various of ways inside template,
              // like "theComponent", "The-component" etc.
              // but except snake_case
              if (casing.isPascalCase(name) || casing.isCamelCase(name)) {
                return ![...usedComponents].some((n) => (
                  !n.includes('_')
                    && (name === casing.pascalCase(n) || casing.camelCase(n) === name)
                ));
              }
              // In any other case the used component name must exactly match
              // the registered name
              return !usedComponents.has(name);
            })
            .forEach(({ node: filteredNode, name }) => context.report({
              node: filteredNode,
              message: 'The "{{name}}" component has been registered but not used.',
              data: {
                name,
              },
            }));
        },
      },

      utils.executeOnVue(context, (obj) => {
        if (isVueComponentExpression(obj)) {
          registeredComponents = obj.properties
            .filter(utils.isProperty)
            .map((node) => {
              const name = utils.getStaticPropertyName(node);
              return name ? { node, name } : null;
            })
            .filter(utils.isDef);
        } else if (obj.type === 'ClassDeclaration') {
          registeredComponents = getRegisteredComponentsFromClassDeclaration(obj);
        } else {
          registeredComponents = utils.getRegisteredComponents(obj);
        }
      }),
    );
  },
};

const getRegisteredComponentsFromClassDeclaration = (obj) => {
  const { decorators } = obj;
  if (!decorators) {
    return [];
  }
  const { expression } = decorators[0];
  const hasArguments = expression && expression.arguments && expression.arguments.length >= 1;
  return hasArguments ? utils.getRegisteredComponents(expression.arguments[0]) : [];
};

function matches(value, mask) {
  if (isObject(mask)) {
    return isObject(value) && !some(mask, (maskValue, key) => !matches(value[key], maskValue));
  }

  return value === mask;
}

function isVueComponentExpression(node) {
  return matches(node, {
    type: 'ObjectExpression',
    parent: {
      type: 'Property',
      key: {
        type: 'Identifier',
        name: 'components',
      },
      parent: {
        parent: {
          type: 'CallExpression',
          callee: {
            type: 'Identifier',
            name: 'Component',
          },
        },
      },
    },
  });
}
