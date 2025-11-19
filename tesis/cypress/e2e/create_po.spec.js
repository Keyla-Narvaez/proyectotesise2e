import loginPage from '../support/pages/login.page';
import poPage from '../support/pages/purchaseOrder.page';
import receptionPage from '../support/pages/reception.page';
import createItemsPage from '../support/pages/createItems.page'
import createSuppliersPage from '../support/pages/createSupplier.page'

describe('E2E - Crear y Recepcionar Orden de Compra', () => {

    it('📋 Creación de artículos', () => {

            // Login & flujo de creación
            loginPage.login(Cypress.env('USER2'), Cypress.env('PASS2'));
            createItemsPage.createItems(); 
            cy.wait(2000);
    });

    it('👨‍💻 Creación de proveedores', () => {

            // Login & flujo de creación
            loginPage.login(Cypress.env('USER3'), Cypress.env('PASS3'));
            createSuppliersPage.createSuppliers(); 
            cy.wait(2000);
    });
  
    it('✅ Crear Orden de Compra', () => {

        
            // Login & flujo de creación
            loginPage.login(Cypress.env('USER'), Cypress.env('PASS'));
            poPage.purchaseOrder(); 
            cy.wait(2000);
        
    });

    it('📦 Recepcionar Orden de Compra', () => {
        // Esperar 2 minutos
        //cy.wait(5000);

        cy.readFile('cypress/fixtures/datos-guardados.json').then((data) => {
            const codigoOC = data.codigoOC;
            cy.log(`Código cargado desde JSON: ${codigoOC}`);

            loginPage.login(Cypress.env('USER3'), Cypress.env('PASS3'));

            // Llamar la recepción pasándole el código
            receptionPage.receptionPageOrder(codigoOC);
        });
    });
    

});