import {
  entityTableSelector,
  entityDetailsButtonSelector,
  entityDetailsBackButtonSelector,
  entityCreateButtonSelector,
  entityCreateSaveButtonSelector,
  entityEditButtonSelector,
  entityDeleteButtonSelector,
  entityConfirmDeleteButtonSelector,
} from '../../support/entity';

describe('Customer e2e test', () => {
  let startingEntitiesCount = 0;

  before(() => {
    cy.window().then(win => {
      win.sessionStorage.clear();
    });

    cy.clearCookies();
    cy.intercept('GET', '/api/customers*').as('entitiesRequest');
    cy.visit('');
    cy.login('admin', 'admin');
    cy.clickOnEntityMenuItem('customer');
    cy.wait('@entitiesRequest').then(({ request, response }) => (startingEntitiesCount = response.body.length));
    cy.visit('/');
  });

  it('should load Customers', () => {
    cy.intercept('GET', '/api/customers*').as('entitiesRequest');
    cy.visit('/');
    cy.clickOnEntityMenuItem('customer');
    cy.wait('@entitiesRequest');
    cy.getEntityHeading('Customer').should('exist');
    if (startingEntitiesCount === 0) {
      cy.get(entityTableSelector).should('not.exist');
    } else {
      cy.get(entityTableSelector).should('have.lengthOf', startingEntitiesCount);
    }
    cy.visit('/');
  });

  it('should load details Customer page', () => {
    cy.intercept('GET', '/api/customers*').as('entitiesRequest');
    cy.visit('/');
    cy.clickOnEntityMenuItem('customer');
    cy.wait('@entitiesRequest');
    if (startingEntitiesCount > 0) {
      cy.get(entityDetailsButtonSelector).first().click({ force: true });
      cy.getEntityDetailsHeading('customer');
      cy.get(entityDetailsBackButtonSelector).should('exist');
    }
    cy.visit('/');
  });

  it('should load create Customer page', () => {
    cy.intercept('GET', '/api/customers*').as('entitiesRequest');
    cy.visit('/');
    cy.clickOnEntityMenuItem('customer');
    cy.wait('@entitiesRequest');
    cy.get(entityCreateButtonSelector).click({ force: true });
    cy.getEntityCreateUpdateHeading('Customer');
    cy.get(entityCreateSaveButtonSelector).should('exist');
    cy.visit('/');
  });

  it('should load edit Customer page', () => {
    cy.intercept('GET', '/api/customers*').as('entitiesRequest');
    cy.visit('/');
    cy.clickOnEntityMenuItem('customer');
    cy.wait('@entitiesRequest');
    if (startingEntitiesCount > 0) {
      cy.get(entityEditButtonSelector).first().click({ force: true });
      cy.getEntityCreateUpdateHeading('Customer');
      cy.get(entityCreateSaveButtonSelector).should('exist');
    }
    cy.visit('/');
  });

  it('should create an instance of Customer', () => {
    cy.intercept('GET', '/api/customers*').as('entitiesRequest');
    cy.visit('/');
    cy.clickOnEntityMenuItem('customer');
    cy.wait('@entitiesRequest').then(({ request, response }) => (startingEntitiesCount = response.body.length));
    cy.get(entityCreateButtonSelector).click({ force: true });
    cy.getEntityCreateUpdateHeading('Customer');

    cy.get(`[data-cy="firstName"]`).type('Melba', { force: true }).invoke('val').should('match', new RegExp('Melba'));

    cy.get(`[data-cy="lastName"]`).type('Sanford', { force: true }).invoke('val').should('match', new RegExp('Sanford'));

    cy.get(`[data-cy="gender"]`).select('OTHER');

    cy.get(`[data-cy="email"]`).type('0Uu@6.:S2Q', { force: true }).invoke('val').should('match', new RegExp('0Uu@6.:S2Q'));

    cy.get(`[data-cy="phone"]`).type('1-311-800-4895', { force: true }).invoke('val').should('match', new RegExp('1-311-800-4895'));

    cy.get(`[data-cy="addressLine1"]`)
      .type('Analyst Seychelles best-of-breed', { force: true })
      .invoke('val')
      .should('match', new RegExp('Analyst Seychelles best-of-breed'));

    cy.get(`[data-cy="addressLine2"]`)
      .type('PNG improvement Incredible', { force: true })
      .invoke('val')
      .should('match', new RegExp('PNG improvement Incredible'));

    cy.get(`[data-cy="city"]`).type('Willmsberg', { force: true }).invoke('val').should('match', new RegExp('Willmsberg'));

    cy.get(`[data-cy="country"]`).type('Slovenia', { force: true }).invoke('val').should('match', new RegExp('Slovenia'));

    cy.setFieldSelectToLastOfEntity('user');

    cy.get(entityCreateSaveButtonSelector).click({ force: true });
    cy.scrollTo('top', { ensureScrollable: false });
    cy.get(entityCreateSaveButtonSelector).should('not.exist');
    cy.intercept('GET', '/api/customers*').as('entitiesRequestAfterCreate');
    cy.visit('/');
    cy.clickOnEntityMenuItem('customer');
    cy.wait('@entitiesRequestAfterCreate');
    cy.get(entityTableSelector).should('have.lengthOf', startingEntitiesCount + 1);
    cy.visit('/');
  });

  it('should delete last instance of Customer', () => {
    cy.intercept('GET', '/api/customers*').as('entitiesRequest');
    cy.intercept('DELETE', '/api/customers/*').as('deleteEntityRequest');
    cy.visit('/');
    cy.clickOnEntityMenuItem('customer');
    cy.wait('@entitiesRequest').then(({ request, response }) => {
      startingEntitiesCount = response.body.length;
      if (startingEntitiesCount > 0) {
        cy.get(entityTableSelector).should('have.lengthOf', startingEntitiesCount);
        cy.get(entityDeleteButtonSelector).last().click({ force: true });
        cy.getEntityDeleteDialogHeading('customer').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click({ force: true });
        cy.wait('@deleteEntityRequest');
        cy.intercept('GET', '/api/customers*').as('entitiesRequestAfterDelete');
        cy.visit('/');
        cy.clickOnEntityMenuItem('customer');
        cy.wait('@entitiesRequestAfterDelete');
        cy.get(entityTableSelector).should('have.lengthOf', startingEntitiesCount - 1);
      }
      cy.visit('/');
    });
  });
});
