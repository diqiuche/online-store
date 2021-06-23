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

describe('OrderItem e2e test', () => {
  let startingEntitiesCount = 0;

  before(() => {
    cy.window().then(win => {
      win.sessionStorage.clear();
    });

    cy.clearCookies();
    cy.intercept('GET', '/api/order-items*').as('entitiesRequest');
    cy.visit('');
    cy.login('admin', 'admin');
    cy.clickOnEntityMenuItem('order-item');
    cy.wait('@entitiesRequest').then(({ request, response }) => (startingEntitiesCount = response.body.length));
    cy.visit('/');
  });

  it('should load OrderItems', () => {
    cy.intercept('GET', '/api/order-items*').as('entitiesRequest');
    cy.visit('/');
    cy.clickOnEntityMenuItem('order-item');
    cy.wait('@entitiesRequest');
    cy.getEntityHeading('OrderItem').should('exist');
    if (startingEntitiesCount === 0) {
      cy.get(entityTableSelector).should('not.exist');
    } else {
      cy.get(entityTableSelector).should('have.lengthOf', startingEntitiesCount);
    }
    cy.visit('/');
  });

  it('should load details OrderItem page', () => {
    cy.intercept('GET', '/api/order-items*').as('entitiesRequest');
    cy.visit('/');
    cy.clickOnEntityMenuItem('order-item');
    cy.wait('@entitiesRequest');
    if (startingEntitiesCount > 0) {
      cy.get(entityDetailsButtonSelector).first().click({ force: true });
      cy.getEntityDetailsHeading('orderItem');
      cy.get(entityDetailsBackButtonSelector).should('exist');
    }
    cy.visit('/');
  });

  it('should load create OrderItem page', () => {
    cy.intercept('GET', '/api/order-items*').as('entitiesRequest');
    cy.visit('/');
    cy.clickOnEntityMenuItem('order-item');
    cy.wait('@entitiesRequest');
    cy.get(entityCreateButtonSelector).click({ force: true });
    cy.getEntityCreateUpdateHeading('OrderItem');
    cy.get(entityCreateSaveButtonSelector).should('exist');
    cy.visit('/');
  });

  it('should load edit OrderItem page', () => {
    cy.intercept('GET', '/api/order-items*').as('entitiesRequest');
    cy.visit('/');
    cy.clickOnEntityMenuItem('order-item');
    cy.wait('@entitiesRequest');
    if (startingEntitiesCount > 0) {
      cy.get(entityEditButtonSelector).first().click({ force: true });
      cy.getEntityCreateUpdateHeading('OrderItem');
      cy.get(entityCreateSaveButtonSelector).should('exist');
    }
    cy.visit('/');
  });

  /* this test is commented because it contains required relationships
  it('should create an instance of OrderItem', () => {
    cy.intercept('GET', '/api/order-items*').as('entitiesRequest');
    cy.visit('/');
    cy.clickOnEntityMenuItem('order-item');
    cy.wait('@entitiesRequest')
      .then(({ request, response }) => startingEntitiesCount = response.body.length);
    cy.get(entityCreateButtonSelector).click({force: true});
    cy.getEntityCreateUpdateHeading('OrderItem');

    cy.get(`[data-cy="quantity"]`).type('72110').should('have.value', '72110');


    cy.get(`[data-cy="totalPrice"]`).type('24236').should('have.value', '24236');


    cy.get(`[data-cy="status"]`).select('BACK_ORDER');

    cy.setFieldSelectToLastOfEntity('product');

    cy.setFieldSelectToLastOfEntity('order');

    cy.get(entityCreateSaveButtonSelector).click({force: true});
    cy.scrollTo('top', {ensureScrollable: false});
    cy.get(entityCreateSaveButtonSelector).should('not.exist');
    cy.intercept('GET', '/api/order-items*').as('entitiesRequestAfterCreate');
    cy.visit('/');
    cy.clickOnEntityMenuItem('order-item');
    cy.wait('@entitiesRequestAfterCreate');
    cy.get(entityTableSelector).should('have.lengthOf', startingEntitiesCount + 1);
    cy.visit('/');
  });
  */

  /* this test is commented because it contains required relationships
  it('should delete last instance of OrderItem', () => {
    cy.intercept('GET', '/api/order-items*').as('entitiesRequest');
    cy.intercept('DELETE', '/api/order-items/*').as('deleteEntityRequest');
    cy.visit('/');
    cy.clickOnEntityMenuItem('order-item');
    cy.wait('@entitiesRequest').then(({ request, response }) => {
      startingEntitiesCount = response.body.length;
      if (startingEntitiesCount > 0) {
        cy.get(entityTableSelector).should('have.lengthOf', startingEntitiesCount);
        cy.get(entityDeleteButtonSelector).last().click({force: true});
        cy.getEntityDeleteDialogHeading('orderItem').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click({force: true});
        cy.wait('@deleteEntityRequest');
        cy.intercept('GET', '/api/order-items*').as('entitiesRequestAfterDelete');
        cy.visit('/');
        cy.clickOnEntityMenuItem('order-item');
        cy.wait('@entitiesRequestAfterDelete');
        cy.get(entityTableSelector).should('have.lengthOf', startingEntitiesCount - 1);
      }
      cy.visit('/');
    });
  });
  */
});
