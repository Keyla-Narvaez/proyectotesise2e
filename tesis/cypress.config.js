const { defineConfig } = require("cypress");
const fs = require('fs');
const path = require('path');

module.exports = defineConfig({
  e2e: {
    chromeWebSecurity: false,
    experimentalSessionAndOrigin: true,

    setupNodeEvents(on, config) {

      // Task para escribir JSON de Orden de Compra
      on('task', {
        writeFile({ filename, data }) {
          const filePath = path.join(__dirname, 'cypress', 'fixtures', filename);
          fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
          return null;
        },

        // Task para Mochawesome: agregar contexto al reporte
        "mochawesome:addContext"({ test, value }) {
          try {
            const contextDir = path.join(__dirname, ".cypress-context");
            if (!fs.existsSync(contextDir)) {
              fs.mkdirSync(contextDir);
            }

            fs.writeFileSync(
              path.join(contextDir, `${test}.json`),
              JSON.stringify({ value }, null, 2)
            );

            return null;
          } catch (err) {
            console.error(" Error agregando contexto Mochawesome:", err);
            return null;
          }
        }
      });

      return config;
    },

    // Ubicación de pruebas y soporte
    specPattern: "cypress/e2e/**/*.spec.js",
    supportFile: "cypress/support/e2e.js",

    // Configuración de video y screenshots
    video: true,
    screenshotOnRunFailure: true,

    viewportWidth: 1366,
    viewportHeight: 900,

    retries: {
      runMode: 1,
      openMode: 0
    },

    env: {
      USER: "knarvaez@jbgye.org.ec",
      PASS: "JBG2025$$",
      USER2: "mvillavice@jbgye.org.ec",
      PASS2: "MELANI1997102*",
      USER3: "msanchezmo@jbgye.org.ec",
      PASS3: "Angelin@QA2025."
    },

    // Config reporter Mochawesome (solo JSON)
    reporter: "mochawesome",
    reporterOptions: {
      reportDir: "cypress/results",
      overwrite: false,
      html: true,       //  no generar HTML directo
      json: true,        //  generar JSON para merge posterior
      charts: true,
      embeddedScreenshots: true,
      inlineAssets: true
    }
  }
});
