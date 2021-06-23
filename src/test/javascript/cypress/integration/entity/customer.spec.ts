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

  /* this test is commented because it contains required relationships
  it('should create an instance of Customer', () => {
    cy.intercept('GET', '/api/customers*').as('entitiesRequest');
    cy.visit('/');
    cy.clickOnEntityMenuItem('customer');
    cy.wait('@entitiesRequest')
      .then(({ request, response }) => startingEntitiesCount = response.body.length);
    cy.get(entityCreateButtonSelector).click({force: true});
    cy.getEntityCreateUpdateHeading('Customer');

    cy.get(`[data-cy="firstName"]`).type('Dalton', { force: true }).invoke('val').should('match', new RegExp('Dalton'));


    cy.get(`[data-cy="lastName"]`).type('Dickinson', { force: true }).invoke('val').should('match', new RegExp('Dickinson'));


    cy.get(`[data-cy="gender"]`).select('FEMALE');


    cy.get(`[data-cy="email"]`).type('P5z*@7.=&gt;hG&lt;Z', { force: true }).invoke('val').should('match', new RegExp('P5z*@7.=&gt;hG&lt;Z'));


    cy.get(`[data-cy="phone"]`).type('214-991-5975 x53760', { force: true }).invoke('val').should('match', new RegExp('214-991-5975 x53760'));


    cy.get(`[data-cy="addressLine1"]`).type('Tennessee Chile Extended', { force: true }).invoke('val').should('match', new RegExp('Tennessee Chile Extended'));


    cy.get(`[data-cy="addressLine2"]`).type('Pa&#39;anga azure online', { force: true }).invoke('val').should('match', new RegExp('Pa&#39;anga azure online'));


    cy.get(`[data-cy="city"]`).type('Lake Werner', { force: true }).invoke('val').should('match', new RegExp('Lake Werner'));


    cy.get(`[data-cy="country"]`).type('Israel', { force: true }).invoke('val').should('match', new RegExp('Israel'));

    cy.setFieldSelectToLastOfEntity('user');

    cy.get(entityCreateSaveButtonSelector).click({force: true});
    cy.scrollTo('top', {ensureScrollable: false});
    cy.get(entityCreateSaveButtonSelector).should('not.exist');
    cy.intercept('GET', '/api/customers*').as('entitiesRequestAfterCreate');
    cy.visit('/');
    cy.clickOnEntityMenuItem('customer');
    cy.wait('@entitiesRequestAfterCreate');
    cy.get(entityTableSelector).should('have.lengthOf', startingEntitiesCount + 1);
    cy.visit('/');
  });
  */

  /* this test is commented because it contains required relationships
  it('should delete last instance of Customer', () => {
    cy.intercept('GET', '/api/customers*').as('entitiesRequest');
    cy.intercept('DELETE', '/api/customers/*').as('deleteEntityRequest');
    cy.visit('/');
    cy.clickOnEntityMenuItem('customer');
    cy.wait('@entitiesRequest').then(({ request, response }) => {
      startingEntitiesCount = response.body.length;
      if (startingEntitiesCount > 0) {
        cy.get(entityTableSelector).should('have.lengthOf', startingEntitiesCount);
        cy.get(entityDeleteButtonSelector).last().click({force: true});
        cy.getEntityDeleteDialogHeading('customer').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click({force: true});
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
  */
});
