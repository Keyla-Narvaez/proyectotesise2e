import loginPage from '../support/pages/login.page';
import poPage from '../support/pages/purchaseOrder.page';
import receptionPage from '../support/pages/reception.page';
import createItemsPage from '../support/pages/createItems.page';
import createSuppliersPage from '../support/pages/createSupplier.page';

describe('E2E - Crear y Recepcionar Orden de Compra', () => {

    before(() => {
        cy.clearCookies();
        cy.clearLocalStorage();
    });

    it('📋 Creación de artículos', () => {
        loginPage.login(Cypress.env('USER2'), Cypress.env('PASS2'));
        createItemsPage.createItems();
        
        // Limpiar sesión después de este test específico
        cy.clearCookies();
        cy.wait(2000);
    });

    it('👨‍💻 Creación de proveedores', () => {
        loginPage.login(Cypress.env('USER3'), Cypress.env('PASS3'));
        createSuppliersPage.createSuppliers();
        
        // Limpiar sesión después de este test específico
        cy.clearCookies();
        cy.wait(2000);
    });
  
    it('✅ Crear Orden de Compra', () => {
        loginPage.login(Cypress.env('USER'), Cypress.env('PASS'));
        poPage.purchaseOrder();
        
        // NO limpiar aquí, porque el siguiente test usa el mismo usuario
        cy.wait(2000);
    });
    
    it('📦 Recepcionar Orden de Compra', () => {
        cy.wait(60000);

        cy.readFile('cypress/fixtures/datos-guardados.json').then((data) => {
            const codigoOC = data.codigoOC;
            cy.log(`📄 Código: ${codigoOC}`);

            loginPage.login(Cypress.env('USER'), Cypress.env('PASS'));
            receptionPage.receptionPageOrder(codigoOC);
        });
    });

    after(() => {
        cy.clearCookies();
        cy.clearLocalStorage();
    });
});