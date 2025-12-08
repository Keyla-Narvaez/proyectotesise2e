// cypress/pages/PurchaseOrderPage.js
import poData from '../../fixtures/po.json';
require('cypress-xpath');
 
 
class PurchaseOrderPage {
 
 
    // === Navegación ===
    goPurchaseModule() {
        cy.get('#pt1\\:_UISfavIconu').click();
        cy.get('#pt1\\:_UISfpr1\\:0\\:itr1_RI\\:0\\:cl3_RI').click();
 
        cy.get('#_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:_FOTsdi__PrcPoPurchaseOrdersWorkarea_itemNode__FndTasksList\\:\\:disAcr', {
                timeout: 30000
            })
            .should('be.visible')
            .click();
 
        cy.get('#_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:_FOTRaT\\:0\\:RAtl5', {
                timeout: 30000
            })
            .should('be.visible')
            .click();
    }
 
    // === Creación de OC ===
    createPO() {
        cy.get('#_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:_FOTRaT\\:0\\:dynam1\\:0\\:ProcurementBu\\:\\:content', {
                timeout: 30000
            })
            .should('be.visible')
            .select(poData.purchaseOrder.unidadNegocio);
 
        cy.get('#_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:_FOTRaT\\:0\\:dynam1\\:0\\:Supplier\\:\\:content')
            .type(poData.purchaseOrder.proveedor);
 
        cy.get('#_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:_FOTRaT\\:0\\:dynam1\\:0\\:DefShipToLoc\\:\\:content')
            .clear()
            .type(poData.purchaseOrder.ubicacionEnvio);
 
        cy.get('#_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:_FOTRaT\\:0\\:dynam1\\:0\\:commandButton1')
            .click();
 
        // cy.get('#_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt2\\:0\\:AP1\\:inputText33\\:\\:content', {
        //         timeout: 30000
        //     })
        //     .should('be.visible')
        //     .clear()
        //     .type(poData.purchaseOrder.email);
 
        // cy.get('#_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt2\\:0\\:AP1\\:AT1\\:_ATp\\:create')
        //     .click();
 
        cy.get('#_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt2\\:0\\:AP1\\:AT1\\:_ATp\\:create\\:\\:icon', {
                timeout: 30000
            })
            .should('be.visible')    
            .click()
 
        return this.fillItems(); // permite encadenamiento si fillItems devuelve algo útil
    }
 
    // === Llenado de ítems ===
    fillItems() {
        const today = new Date();
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const dd = String(today.getDate()).padStart(2, '0');
        const yy = String(today.getFullYear()).slice(-2);
        const fechaFormateada = `${mm}/${dd}/${yy}`;
 
        const articulos = poData.purchaseOrder.articulos;
 
        // Usamos cy.wrap para iterar de forma compatible con Cypress
        return cy.wrap(articulos).each((item, index) => {
            cy.log(`Agregando artículo ${index + 1}: ${item.codigoArticulo}`);
 
            // Evita cy.wait: espera a que el campo esté listo
            cy.xpath(`//*[@id="_FOpt1:_FOr1:0:_FONSr2:0:MAt2:0:AP1:AT1:_ATp:Lines:${index}:Item::content"]`, {
                    timeout: 30000
                })
                .should('be.visible')
                .click({
                    force: true
                })
                .type(`${item.codigoArticulo}{enter}`, {
                    force: true
                });
 
            // Espera implícita o intercept si hay carga tras {enter}
            cy.wait(10000); //  temporal; idealmente reemplazar con intercept
 
            cy.xpath(`//input[contains(@name,'ATp:Lines:${index}:s5:Quantity')]`)
                .click({
                    force: true
                })
                .clear()
                .type(`${item.cantidad}`, {
                    force: true
                });
 
            cy.xpath(`//input[contains(@name,'ATp:Lines:${index}:UnitPrice')]`)
                .click({
                    force: true
                })
                .clear()
                .type(`${item.price}`, {
                    force: true
                });
 
            // Usa get en lugar de xpath si ya tienes el ID
            cy.get(`#_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt2\\:0\\:AP1\\:AT1\\:_ATp\\:Lines\\:${index}\\:NeedByDate\\:\\:content`)
                .clear()
                .type(fechaFormateada, {
                    force: true
                });
 
            cy.get(`#_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt2\\:0\\:AP1\\:AT1\\:_ATp\\:Lines\\:${index}\\:PromisedDate\\:\\:content`)
                .clear()
                .type(fechaFormateada, {
                    force: true
                });
 
            // Agregar nueva línea si no es el último ítem
            if (index < articulos.length - 1) {
                cy.get('#_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAt2\\:0\\:AP1\\:AT1\\:_ATp\\:create')
                    .click();
                cy.wait(3000); // también reemplazable
            }
        });
    }
 
 
  completePo() {
  cy.contains('Guardar', { timeout: 60000 }).click({ force: true });
  cy.xpath("//span[contains(@class,'x2e0')]", { timeout: 300000 }).should('be.visible');
  cy.contains('Enviar').click({ force: true });
  cy.contains('Continuar', { timeout: 30000 }).should('be.visible').click({ force: true });
 
  cy.contains('El documento (Orden de compra)', { timeout: 60000 })
    .invoke('text')
    .then((texto) => {
      const match = texto.match(/JBG\d{10}/);
      if (!match) throw new Error(' No se encontró el código de la orden');
 
      const codigo = match[0];
      cy.log(' Código de Orden de Compra:', codigo);
      Cypress.env('codigoOC', codigo);
 
      //  Guardar JSON correctamente encadenado
      return cy.task('writeFile', {
        filename: 'datos-guardados.json',
        data: { codigoOC: codigo }
      }).then(() => {
        //  Sólo usamos cy.then para devolverlo a la cadena
        cy.wrap(codigo, { log: false }).as('codigoOC');
      });
    });
 
  cy.contains('Aceptar', { timeout: 30000 }).click({ force: true });
}
 
 
    // === Flujo completo ===
    purchaseOrder() {
        this.goPurchaseModule();
        this.createPO();
        this.completePo();
        // this.checkPo();
    }
}
 
export default new PurchaseOrderPage();