import config from '../index.json';
import data from '../fixtures/data.json';

describe('Login & Authentication', () => {

  before(() => {
    cy.visit(config.url.base);
  });

  beforeEach(() => {
    cy.wait(50);
    cy.url().then(url => {
      let path = url.replace(config.url.base, '');
      cy.get('form .c-input[type="email"]').as('formEmail');
      cy.get('form .c-input[type="password"]').as('formPassword');
      cy.get('form button').as('formButton');
      cy.get('form').as('form');
    });
  });

  it('Does not redirect if email & password empty', () => {
    cy.get('@formEmail').clear();
    cy.get('@formPassword').clear();
    cy.get('@formButton').should('be.disabled');
    cy.get('@form').submit();
    cy.wait(200)
    cy.url().should('not.include', '/dashboard');
  });

  it('Does not redirect if email empty', () => {
    cy.get('@formEmail').clear();
    cy.get('@formPassword').clear();
    cy.get('@formPassword').type(data.login.wrong.password);
    cy.get('@formButton').should('be.disabled');
    cy.get('@form').submit();
    cy.wait(200)
    cy.url().should('not.include', '/dashboard');
  });

  it('Does not redirect if email invalid', () => {
    cy.get('@formEmail').clear();
    cy.get('@formPassword').clear();
    cy.get('@formEmail').type(data.login.invalidEmail);
    cy.get('@formPassword').type(data.login.wrong.password);
    cy.get('@formButton').should('be.disabled');
    cy.get('@form').submit();
    cy.wait(200)
    cy.url().should('not.include', '/dashboard');
  });

  it('Does not redirect if password empty', () => {
    cy.get('@formEmail').clear();
    cy.get('@formPassword').clear();
    cy.get('@formEmail').type(data.login.wrong.email);
    cy.get('@formButton').should('be.disabled');
    cy.get('@form').submit();
    cy.wait(200)
    cy.url().should('not.include', '/dashboard');
  });

  it('Does not redirect if wrong login credentials', () => {
    cy.server();
    cy.route('POST', '/co/authenticate').as('getLogin');
    cy.get('@formEmail').clear();
    cy.get('@formPassword').clear();
    cy.get('@formEmail').type(data.login.wrong.email);
    cy.get('@formPassword').type(data.login.wrong.password);
    cy.get('@formButton').should('not.be.disabled');
    cy.get('@form').submit();
    cy.wait('@getLogin');
    cy.wait(200)
    cy.url().should('not.include', '/dashboard');
  });

  it('Redirect if correct login details', () => {
    cy.server();
    cy.route('POST', '/co/authenticate').as('getLogin');
    cy.get('@formEmail').clear();
    cy.get('@formPassword').clear();
    cy.get('@formEmail').type(data.login.correct.email);
    cy.get('@formPassword').type(data.login.correct.password);
    cy.get('@form').submit();
    cy.wait('@getLogin');
    cy.wait(500)
    cy.url().should('include', '/dashboard');
  });
});
