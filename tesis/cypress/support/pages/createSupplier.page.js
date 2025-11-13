// cypress/pages/PurchaseOrderPage.js
require('cypress-xpath');
import poData from '../../fixtures/po.json';


class createSuppliersPage {


    navegarProveedores() {
        cy.contains("Compras").click();
        cy.get('div[class="atk-col-apps"]').contains("Proveedores").click();

        cy.get('div[title="Tareas"]', {
                timeout: 10000
            })
            .should("be.visible")
            .find("a")
            .should("be.visible")
            .click({
                force: true
            });

        cy.contains("Crear proveedor", {
                timeout: 10000
            })
            .should("be.visible")
            .click({
                force: true
            });
        
        const nombre = poData.purchaseOrder.proveedor;

        cy.get(`input[name^="pt1:_FOr1:1:_FONSr2:0:_FOTRaT:0:dynam1:0:it1"]`, {
                timeout: 10000,
            })
            .should("be.visible")
            .type(nombre, {
                delay: 50
            });

        cy.get(`select[name^="pt1:_FOr1:1:_FONSr2:0:_FOTRaT:0:dynam1:0:soc2"]`)
            .should("be.visible")
            .select("0");

        cy.get(`select[name^="pt1:_FOr1:1:_FONSr2:0:_FOTRaT:0:dynam1:0:soc1"]`)
            .should("be.visible")
            .select("0");

        cy.xpath('//input[contains(@id, "countryNameId")]', {
                timeout: 30000
            })
            .should("be.visible")
            .clear({
                force: true
            })
            .type("Ecuador{enter}", {
                force: true
            });

        cy.wait(2000);

        const cedula = poData.purchaseOrder.cedula;

        cy.log("Escribiendo en Registro Fiscal (TaxReg)");
        cy.xpath('//input[contains(@id, "TaxReg::content")]', {
                timeout: 30000
            })
            .should("be.visible")
            .clear({
                force: true
            })
            .type(cedula, {
                force: true
            });

        cy.xpath('//input[contains(@id, "IncomeTaxId")]', {
                timeout: 30000
            })
            .should("be.visible")
            .clear({
                force: true
            })
            .type(cedula, {
                force: true
            });

        cy.xpath('//button[contains(text(), "Crear")]', {
                timeout: 30000
            })
            .should("exist")
            .should("be.visible")
            .click({
                force: true
            });

        cy.contains("Perfil", {
                timeout: 10000
            })
            .should("be.visible")
            .click({
                force: true
            });

        cy.get('select[name*="selectOneChoice4"]', {
                timeout: 30000
            })
            .should("exist")
            .should("be.visible")
            .should("not.be.disabled")
            .then(($select) => {
                if ($select.length > 0) {
                    cy.wrap($select).select("SUPPLIER", {
                        force: true
                    });
                } else {
                    cy.log("Elemento select no encontrado");
                }
            });

        ["Impuesto de transacción", "Registros fiscales"].forEach((text) => {
            cy.contains(text, {
                    timeout: 10000
                })
                .should("be.visible")
                .click({
                    force: true
                });
        });

        cy.get('img[title="Crear"]', {
                timeout: 10000
            })
            .should("be.visible")
            .click({
                force: true
            });

        cy.xpath(
                '//input[contains(@id,"taxRegimeCodeId") and contains(@id,"::content")]', {
                    timeout: 30000
                }
            )
            .should("exist")
            .should("be.visible")
            .click({
                force: true
            })
            .clear()
            .type("JBG_VAT_REGIMEN{enter}", {
                delay: 50,
                force: true
            });

        cy.get(
                `select[name^="pt1:_FOr1:1:_FONSr2:0:MAt2:0:ap1:pTxRg2:0:TaxRe1:0:mngTaxRgstAplTab:registrationTypeNameId"]`
            )
            .should("be.visible")
            .select("10");

        cy.get(
                `input[name^="pt1:_FOr1:1:_FONSr2:0:MAt2:0:ap1:pTxRg2:0:TaxRe1:0:mngTaxRgstAplTab:it1"]`
            )
            .should("be.visible")
            .type(cedula, {
                delay: 50
            });

        cy.contains("button", "Aceptar").should("be.visible").click({
            force: true
        });

        cy.contains("Pagos", {
                timeout: 10000
            })
            .should("be.visible")
            .click({
                force: true
            });

        cy.contains("EC EFT TRANS-CUE BOLIVARIANO", {
                timeout: 30000
            })
            .should("exist")
            .parents("tr")
            .find('a[title="Por defecto"]')
            .should("be.visible")
            .click({
                force: true
            });

        cy.contains("Direcciones", {
                timeout: 10000
            })
            .should("be.visible")
            .click({
                force: true
            });

        cy.get('img[title="Crear"]', {
                timeout: 10000
            })
            .should("be.visible")
            .click({
                force: true
            });

        cy.xpath('//input[contains(@id, "it25") and contains(@id, "content")]', {
                timeout: 10000,
            })
            .should("be.visible")
            .clear({
                force: true
            })
            .type("GUAYAQUIL{enter}", {
                force: true
            });

        cy.xpath('//input[contains(@id, "soc8") and contains(@id, "content")]', {
                timeout: 10000,
            })
            .should("be.visible")
            .clear({
                force: true
            })
            .type("Ecuador", {
                force: true
            });

        cy.xpath('//input[contains(@id, "it3") and contains(@id, "content")]', {
                timeout: 10000,
            })
            .should("be.visible")
            .clear({
                force: true
            })
            .type("Calle: MIGUEL H. ALCIVAR", {
                force: true
            });

        cy.xpath('//input[contains(@id, "geographyElement3Id")]', {
                timeout: 10000
            })
            .should("be.visible")
            .clear({
                force: true
            })
            .type("GUAYAQUIL{enter}", {
                force: true
            });

        cy.wait(2000);

        cy.xpath('//input[contains(@id, "it10") and contains(@id, "content")]', {
                timeout: 10000,
            })
            .should("be.visible")
            .clear({
                force: true
            })
            .type("0901", {
                force: true
            });

        cy.xpath('//input[@type="checkbox" and contains(@id, "smc11")]', {
                timeout: 10000,
            })
            .should("exist")
            .check({
                force: true
            });

        cy.xpath('//input[contains(@id, "it16") and contains(@id, "content")]', {
                timeout: 10000,
            })
            .should("exist")
            .should("be.visible")
            .then(($el) => {
                cy.wrap($el)
                    .click({
                        force: true
                    })
                    .clear({
                        force: true
                    })
                    .type("04", {
                        delay: 50
                    });
            });

        cy.xpath('//input[contains(@id, "it17") and contains(@id, "content")]', {
                timeout: 10000,
            })
            .should("exist")
            .should("be.visible")
            .then(($el) => {
                cy.wrap($el)
                    .click({
                        force: true
                    })
                    .clear({
                        force: true
                    })
                    .type("2282768", {
                        delay: 50
                    });
            });

        cy.xpath('//select[contains(@id,"Context")]', {
                timeout: 30000
            })
            .should("exist")
            .should("be.visible")
            .select("Ecuador", {
                force: true
            });

        cy.wait(1000);

        cy.get('[id*="RelatedParty_DisplayEcuador::content"]', {
                timeout: 30000
            })
            .should("be.visible")
            .click({
                force: true
            })
            .clear({
                force: true
            })
            .type("No{enter}", {
                force: true
            });

        cy.get('[id*="WhtForeignPay_DisplayEcuador::content"]', {
                timeout: 30000
            })
            .should("be.visible")
            .click({
                force: true
            })
            .clear({
                force: true
            })
            .type("No{enter}", {
                force: true
            });

        cy.get('[id*="MinorRegime_DisplayEcuador::content"]', {
                timeout: 30000
            })
            .should("be.visible")
            .click({
                force: true
            })
            .clear({
                force: true
            })
            .type("No{enter}", {
                force: true
            });

        cy.get('[id*="PayMode_DisplayEcuador::content"]', {
                timeout: 30000
            })
            .should("be.visible")
            .click({
                force: true
            })
            .clear({
                force: true
            })
            .type("20{enter}", {
                force: true
            });

        cy.get('[id*="RiseContributor_DisplayEcuador::content"]', {
                timeout: 30000
            })
            .should("be.visible")
            .click({
                force: true
            })
            .clear({
                force: true
            })
            .type("Regimiento simplificado de aumento RISE{enter}", {
                force: true
            });

        cy.get('[id*="AT3:_ATp:create::icon"]', {
                timeout: 30000
            })
            .should("be.visible")
            .click({
                force: true
            });

        cy.get('select[id*="soc8"]').select("HOSPITAL LUIS VERNAZA");

        cy.xpath('//input[contains(@id, "inputText1") and @type="text"]')
            .should("be.visible")
            .clear()
            .type("PRINCIPAL");

        cy.xpath('//input[@type="checkbox" and contains(@id, "sbc3")]')
            .should("exist")
            .check({
                force: true
            });

        cy.get('a[role="button"] span').contains("Guardar").click({
            force: true
        });

        cy.wait(1000);

        cy.get('a[role="button"] span').contains("Cancelar").click({
            force: true
        });

        cy.wait(3000);

        cy.contains("a", "Contactos").should("be.visible").click({
            force: true
        });

        cy.wait(3000);

        cy.get('[title="Crear"]').first().click();

        cy.xpath('//label[text()="Nombre"]/ancestor::tr[1]//input')
            .first()
            .type("hczrutf");

        cy.xpath('//label[text()="Apellidos"]/ancestor::tr[1]//input')
            .first()
            .type("dscozri");

        cy.xpath('//label[text()="Correo electrónico"]/ancestor::tr[1]//input')
            .first()
            .type("sendmail-test-discard+300000021257644@oracle.com");

        cy.contains("Acciones").click();

        cy.contains("Seleccionar y agregar").click({
            force: true
        });

        cy.wait(3000);
        cy.contains("GUAYAQUIL").closest("tr").click();

        cy.wait(3000);

        cy.contains("Aplicar").click();

        cy.wait(3000);
        cy.contains("Aceptar").click();

        cy.contains("Guardar y Cerrar").click();
    }


    // === Flujo completo ===
    createSuppliers() {
        this.navegarProveedores();
    }
}

export default new createSuppliersPage();