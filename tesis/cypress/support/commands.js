// cypress/support/commands.js
Cypress.Commands.add('crearOrdenCompra', () => {
  return cy.contains('Guardar', { timeout: 60000 }).click({ force: true })
    .then(() => cy.xpath("//span[contains(@class,'x2e0')]", { timeout: 30000 }).should('be.visible'))
    .then(() => cy.contains('Enviar').click({ force: true }))
    .then(() => cy.contains('Continuar', { timeout: 30000 }).should('be.visible').click({ force: true }))
    .then(() => 
      cy.contains('El documento (Orden de compra)', { timeout: 60000 })
        .invoke('text')
        .then((texto) => {
          const match = texto.match(/JBG\d{10}/);
          if (!match) throw new Error('No se encontró el código de la orden');
          const codigo = match[0];
          cy.log('Código de Orden de Compra:', codigo);
          Cypress.env('codigoOC', codigo);
          return codigo; // 🔹 retornamos dentro de cy.then
        })
    )
    .then((codigo) => {
      cy.contains('Aceptar', { timeout: 30000 }).click({ force: true });
      return codigo; // 🔹 el valor puede usarse en otro cy.then
    });
});
