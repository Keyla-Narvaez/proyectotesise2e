// cypress/pages/PurchaseOrderPage.js
require('cypress-xpath');
import poData from '../../fixtures/po.json';


class CreateItemsPage {


    navegarProductos() {
        cy.contains("Gestión de productos", {
                timeout: 10000
            })
            .scrollIntoView()
            .should("exist")
            .click({
                force: true
            });

        cy.contains("Gestión de información de producto", {
                timeout: 2000
            })
            .scrollIntoView()
            .should("be.visible")
            .click({
                force: true
            });

        cy.wait(4000);

        cy.get("body", {
            timeout: 2000
        }).then(($body) => {
            if ($body.find('a[title="Tareas"]').length) {
                cy.get('a[title="Tareas"]').scrollIntoView().click({
                    force: true
                });
            } else if ($body.find('div[title="Tareas"] a').length) {
                cy.get('div[title="Tareas"] a').scrollIntoView().click({
                    force: true
                });
            } else if ($body.find('span[title="Tareas"]').length) {
                cy.get('span[title="Tareas"]').scrollIntoView().click({
                    force: true
                });
            } else {
                cy.screenshot("no_se_encontro_tareas");
                throw new Error(
                    "No se encontró el botón 'Tareas' después de cargar la página."
                );
            }
        });

        cy.contains("Crear artículo", {
                timeout: 20000
            })
            .should("be.visible")
            .click({
                force: true
            });

        cy.get("body").then(($body) => {
            if ($body.find(".oj-dialog").length) {
                cy.get(".oj-dialog").should("be.visible");
            }
        });

        cy.contains("label", "JBG_ART_INV", {
                timeout: 20000
            })
            .scrollIntoView()
            .should("exist")
            .click({
                force: true
            });

        cy.get('a[role="button"][id*="::move"]').first().click({
            force: true
        });

        cy.contains("button", "Aceptar", {
                timeout: 20000
            })
            .should("be.enabled")
            .click({
                force: true
            });

        cy.wait(2000);

        const articulos = poData.purchaseOrder.articuloMela;
        
        cy.get('input[name*="inputText1"]', {
                timeout: 15000
            })
            .should("be.visible")
            .type(articulos, {
                    force: true
                });
            
        
        cy.get('textarea[id*="inputText2"]', {
                timeout: 15000
            })
            .should("be.visible")
            .then(($desc) => {
                cy.wrap($desc)
                    .clear({
                        force: true
                    })
                    .type("JERINGUILLA DE 5CC", {
                        force: true
                    });
            });

        cy.xpath('//select[contains(@id,"isst")]')
            .should("be.visible")
            .select("Activo", {
                force: true
            });

        cy.get('select[id*="selectOneChoice2"]').select("Producción", {
            force: true,
        });

        cy.xpath('//select[contains(@id,"selectOneChoice6")]')
            .should("be.visible")
            .select("MATERIAL_HOSPITALARIO", {
                force: true
            });

        cy.get('input[role="combobox"]', {
                timeout: 10000
            })
            .filter(":visible")
            .first()
            .should("be.enabled")
            .click({
                force: true
            })
            .type("{selectall}Unidad{enter}");

        cy.contains("Especificaciones", {
            timeout: 10000
        }).click({
            force: true
        });
        cy.wait(1000);
        cy.contains("Servicio", {
            timeout: 10000
        }).click({
            force: true
        });
        cy.wait(1000);

        cy.xpath('//select[contains(@id,"serviceableProductFlagId")]')
            .should("exist")
            .select("Sí", {
                force: true
            });

        cy.contains("Inventario", {
                timeout: 10000
            })
            .should("be.visible")
            .click({
                force: true
            });

        cy.xpath('//select[contains(@id,"lotControlCodeId")]')
            .should("be.visible")
            .select("Control total de lote", {
                force: true
            });

        cy.get('select[id*="shelfLifeCodeId::content"]', {
                timeout: 20000
            })
            .should("exist")
            .and("not.be.disabled")
            .select("1", {
                force: true
            });

        cy.contains("Gestión de órdenes y ventas")
            .should("be.visible")
            .click({
                force: true
            });

        cy.xpath('//input[contains(@id,"taxCodeDispId")]')
            .should("be.visible")
            .then(($input) => {
                cy.wrap($input).clear({
                    force: true
                }).type("IVAV", {
                    force: true
                });
            });

        cy.xpath('//input[contains(@id,"kf1CS::content")]')
            .should("be.visible")
            .then(($input) => {
                cy.wrap($input)
                    .clear({
                        force: true
                    })
                    .type("001-10333-0000000000-1103010101-00000-0000-0000", {
                        force: true,
                    });
            });

        cy.contains("Compras", {
            timeout: 10000
        }).click({
            force: true
        });

        cy.xpath('//input[contains(@id,"purchasingTaxCodeDispId::content")]', {
                timeout: 20000,
            })
            .should("be.visible")
            .then(($input) => {
                cy.wrap($input)
                    .clear({
                        force: true
                    })
                    .type("IVA_CT_CLB", {
                        force: true
                    });
            });

        cy.xpath('//input[contains(@id,"inputText12::content")]')
            .should("be.visible")
            .then(($input) => {
                cy.wrap($input).clear({
                    force: true
                }).type("21", {
                    force: true
                });
            });

        cy.get('input[id*="ItemPur:0:inputText1::content"]')
            .should("be.visible")
            .then(($input) => {
                cy.wrap($input).clear({
                    force: true
                }).type("0", {
                    force: true
                });
            });

        cy.contains("Asociaciones").should("be.visible").click();

        cy.get('div[title="Seleccionar y agregar"]').should("be.visible").click();

        cy.get('input[id*="AT1:qryId1:criterionValue0::content"]', {
                timeout: 10000
            })
            .should("be.visible")
            .clear()
            .type("ORG_1100LV{enter}");

        cy.contains("ORG_1100LV", {
                timeout: 20000
            })
            .should("exist")
            .closest("td")
            .click({
                force: true
            });

        cy.wait(1500);

        cy.contains("button", "Aplicar", {
                timeout: 15000
            })
            .should("be.enabled")
            .click({
                force: true
            });

        cy.contains("button", "Listo", {
                timeout: 15000
            })
            .should("be.enabled")
            .click({
                force: true
            });

        cy.wait(2500);

        cy.xpath('//a[contains(@aria-describedby, "csave_afrdescBy")]')
            .should("be.visible")
            .click({
                force: true
            });

        cy.get('a[title="Página Inicial"]', {
                timeout: 30000
            })
            .should("be.visible")
            .click();
        cy.wait(1500);
    }


    // === Flujo completo ===
    createItems() {
        this.navegarProductos();
    }
}

export default new CreateItemsPage();