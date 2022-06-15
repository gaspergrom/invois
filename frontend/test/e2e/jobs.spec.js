import config from '../index.json';
import data from '../fixtures/data.json';

describe('Jobs', () => {

  before(() => {
    cy.visit(config.url.base);
    cy.wait(50);
    cy.url().then(url => {
      cy.server();
      cy.route('POST', '/co/authenticate').as('getLogin');
      cy.get('form .c-input[type="email"]').as('formEmail');
      cy.get('form .c-input[type="password"]').as('formPassword');
      cy.get('form button').as('formButton');
      cy.get('form').as('form');
      cy.get('@formEmail').clear();
      cy.get('@formPassword').clear();
      cy.get('@formEmail').type(data.login.correct.email);
      cy.get('@formPassword').type(data.login.correct.password);
      cy.get('@form').submit();
      cy.wait('@getLogin');
      cy.wait(500)
    });
  });

  it('Jobs successfully loaded', () => {
    cy.wait(200)
    cy.url().should('include', '/dashboard/jobs').as('Loaded jobs overview page')
  });


  it('Can create company modal be opened and closed', () => {
    cy.get('.c-btn').contains('Add Company').as('addCompanyButton')
    cy.get('@addCompanyButton').click();
    cy.wait(400)
    cy.get('#companyAddModal').as('companyAddModal').should('be.visible').as('Company create side modal is visible')
    cy.get('body').click(10, 10);
    cy.wait(400)
    cy.get('@companyAddModal').should('not.be.visible').as('Company create side modal is not visible')
    cy.get('@addCompanyButton').click();
    cy.wait(400)
    cy.get('@companyAddModal').should('be.visible').as('Company create side modal is visible')
    cy.get('.c-side-modal__header .c-btn').contains('Cancel').click();
    cy.wait(400);
    cy.get('@companyAddModal').should('not.be.visible').as('Company create side modal is not visible')
    cy.get('@addCompanyButton').click();
    cy.wait(400)
  });

  it('form cannot be submited if fields are not valid', () => {

  })

});
