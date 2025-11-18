import loginPage from '../support/pages/login.page';
import poPage from '../support/pages/purchaseOrder.page';
import receptionPage from '../support/pages/reception.page';
import createItemsPage from '../support/pages/createItems.page';
import createSuppliersPage from '../support/pages/createSupplier.page';

describe('E2E - Crear y Recepcionar Orden de Compra', () => {

    // Limpiar estado antes de cada test
    beforeEach(() => {
        cy.clearCookies();
        cy.clearLocalStorage();
        cy.window().then((win) => {
            win.sessionStorage.clear();
        });
    });

    it('📋 Creación de artículos', () => {
        // Login & flujo de creación
        loginPage.login(Cypress.env('USER2'), Cypress.env('PASS2'));
        createItemsPage.createItems();
        
        // Esperar a que la operación se complete
        cy.wait(2000);
        
    });

    it('👨‍💻 Creación de proveedores', () => {
        // Login & flujo de creación
        loginPage.login(Cypress.env('USER3'), Cypress.env('PASS3'));
        createSuppliersPage.createSuppliers();
        
        // Esperar a que la operación se complete
        cy.wait(2000);
        
    });
  
    it('✅ Crear Orden de Compra', () => {
        // Login & flujo de creación
        loginPage.login(Cypress.env('USER'), Cypress.env('PASS'));
        poPage.purchaseOrder();
        
        // Verificar que el archivo se guardó correctamente
        cy.readFile('cypress/fixtures/datos-guardados.json').then((data) => {
            expect(data).to.have.property('codigoOC');
            cy.log(`✅ Orden de Compra creada: ${data.codigoOC}`);
        });
        
        // Esperar a que la operación se complete
        cy.wait(2000);
    });
    
    it('📦 Recepcionar Orden de Compra', () => {
        // Esperar 1 minuto (reducido de 2 minutos, ajusta según necesites)
        cy.wait(60000);

        // Verificar que el archivo existe antes de leerlo
        cy.readFile('cypress/fixtures/datos-guardados.json').should('exist').then((data) => {
            const codigoOC = data.codigoOC;
            
            // Validar que el código existe
            expect(codigoOC).to.exist;
            cy.log(`📄 Código cargado desde JSON: ${codigoOC}`);

            // Login
            loginPage.login(Cypress.env('USER'), Cypress.env('PASS'));

            // Llamar la recepción pasándole el código
            receptionPage.receptionPageOrder(codigoOC);
        });
    });

    // Limpiar después de todos los tests
    after(() => {
        cy.clearCookies();
        cy.clearLocalStorage();
    });
});