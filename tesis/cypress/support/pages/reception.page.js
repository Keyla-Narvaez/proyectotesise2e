import purchaseOrderPage from "./purchaseOrder.page";
require("cypress-xpath");
const articulos = require("../../fixtures/po.json");

class receptionPage {
  navigateInventory() {
    // cy.xpath(`//*[@id="_FOpt1:_UIShome"]`).click();
    cy.xpath(`//*[@id="pt1:_UISfavIconu"]`).click();
    cy.xpath(`//*[@id="pt1:_UISfpr1:0:itr1_RI:1:cl3_RI"]`).click({
      timeout: 30000,
    });
  }

  OcReception(codigoOC) {
    cy.then(() => {
      cy.log("Código recibido desde JSON:", codigoOC);

      cy.xpath(
        `//*[@id="_FOpt1:_FOr1:0:_FONSr2:0:MAnt2:0:pt1:ap1:rcvQry:value00::lovIconId"]`
      )
        .should("be.visible", { timeout: 30000 })
        .click();

      cy.xpath(
        `//*[@id="_FOpt1:_FOr1:0:_FONSr2:0:MAnt2:0:pt1:ap1:rcvQry:value00::dropdownPopup::popupsearch"]`
      ).click();

      cy.xpath(
        `//*[@id="_FOpt1:_FOr1:0:_FONSr2:0:MAnt2:0:pt1:ap1:rcvQry:value00::_afrLovInternalQueryId:value00::content"]`
      ).type(`${codigoOC}{enter}`, { force: true });

      cy.xpath(
        `//*[@id="_FOpt1:_FOr1:0:_FONSr2:0:MAnt2:0:pt1:ap1:rcvQry:value00::_afrLovInternalQueryId::search"]`
      ).click();

      cy.wait(4000);

      cy.xpath(
        `//*[@id="_FOpt1:_FOr1:0:_FONSr2:0:MAnt2:0:pt1:ap1:rcvQry:value00_afrLovInternalTableId::db"]/table/tbody/tr/td[2]/div/table/tbody/tr/td[1]`
      )
        .should("be.visible", { timeout: 40000 })
        .click({ force: true });

      cy.wait(3000);

      cy.xpath(
        `//*[@id="_FOpt1:_FOr1:0:_FONSr2:0:MAnt2:0:pt1:ap1:rcvQry:value00::lovDialogId::ok"]`
      ).click();

      cy.wait(3000);

      cy.xpath(
        `//*[@id="_FOpt1:_FOr1:0:_FONSr2:0:MAnt2:0:pt1:ap1:rcvQry::search"]`
      ).click({ force: true });

      cy.wait(3000);

      cy.xpath(
        `//*[@id="_FOpt1:_FOr1:0:_FONSr2:0:MAnt2:0:pt1:ap1:AT1:_ATp:rcv:c36"]`
      )
        .should("be.visible", { timeout: 30000 })
        .click();

      cy.xpath(
        `//*[@id="_FOpt1:_FOr1:0:_FONSr2:0:MAnt2:0:pt1:ap1:AT1:_ATp:receive"]`
      ).click();

      cy.wait(3000);

      cy.xpath(
        `//*[@id="_FOpt1:_FOr1:0:_FONSr2:0:MAnt2:1:appPanelid:AT1:_ATp:DefaultReceiptQuantityId"]`
      )
        .should("be.visible", { timeout: 30000 })
        .click();

      cy.wait(3000);

      cy.wrap(articulos.purchaseOrder.articulos).each((item, index) => {
        cy.log(`Agregando artículo ${index + 1}: ${item.codigoArticulo}`);

        cy.xpath(
          `//*[@id="_FOpt1:_FOr1:0:_FONSr2:0:MAnt2:1:appPanelid:AT1:_ATp:table1:${index}:subinventoryId::content"]`
        )
          .click({ force: true })
          .type(`PROPIO_SCS{enter}`, { force: true });
        cy.wait(2000)
        /*cy.get(
          `#_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAnt2\\:1\\:appPanelid\\:AT1\\:_ATp\\:table1\\:${index}\\:kf1CS\\:\\:content`
        ).type("L1.01.01.01");*/
        // Busca un <input> cuyo ID termine con "kf1CS::content"
        cy.get('input[id$="kf1CS::content"]').type("L1.01.01.01");

        const codigoFormateado = `3-${item.codigoArticulo.slice(-3)}`;
        cy.get(
          `#_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAnt2\\:1\\:appPanelid\\:AT1\\:_ATp\\:table1\\:${index}\\:it3\\:\\:content`,
          { timeout: 30000 }
        )
          .click({ force: true })
          .type(`${codigoFormateado}`, { force: true });

        cy.xpath(
          `//*[@id="_FOpt1:_FOr1:0:_FONSr2:0:MAnt2:1:appPanelid:AT1:_ATp:table1:${index}:Quantityid::content"]`
        ).click({ force: true });

        cy.wait(2000);

        /*cy.xpath(`//*[@id="_FOpt1:_FOr1:0:_FONSr2:0:MAnt2:1:appPanelid:AT1:_ATp:table1:${index}:LotExpid::content"]`)
          .click({ force: true })
          .type(`10/26/30`, { force: true });*/
        cy.get(`input[id$="table1:${index}:LotExpid::content"]`)
          .click({ force: true })
          .type("10/26/30", { force: true });
      });

      cy.get(
        "#_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAnt2\\:1\\:appPanelid\\:cb3"
      ).click();
      cy.get(
        "#_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAnt2\\:2\\:ap1\\:SPsb2 > .xrg > .xrk"
      ).click({ timeout: 30000 });
      cy.get("#_FOpt1\\:_FOr1\\:0\\:_FONSr2\\:0\\:MAnt2\\:2\\:ap1\\:cb1").click(
        { timeout: 30000 }
      );
    });
  }

  receptionPageOrder(codigoOC) {
    this.navigateInventory();
    this.OcReception(codigoOC);
  }
}

export default new receptionPage();
