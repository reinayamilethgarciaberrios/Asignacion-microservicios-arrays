// Importamos la biblioteca Express
const express = require("express");
const csv = require('csv-parser');
const fs = require('fs'); 

// Creamos un router de Express
const router = express.Router();

// Creamos una función de registro que imprime mensajes de registro en la consola
const logger = (message) => console.log(`languages Service: ${message}`);

// Creamos una ruta GET en la raíz del router que devuelve todos los países
router.get("/", (req, res) => {
  const results = [];
  const data = "./data/language-codes.csv"
  
  fs.createReadStream(data)
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', () => {
      const response = {
        service: "lenguajes",
        architecture: "microservices",
        results
      };
      logger("Get language data");
      return res.send(response);
    });
});

router.get("/paises/:pais", async (req, res) => {
  const results = [];
  const data = "./data/language-codes.csv";
  const codigoPais = req.params.pais;
  const url = "http://countries:5000/api/v2/countries/lenguaje/"
  fs.createReadStream(data)
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', async () => {
      const language = results.filter(result =>{
        return result.alpha2.includes(codigoPais)
      }).map(result =>{
        return result.alpha2
      });
      const paises = await fetch(url + language[0]).then(response => response.json());
      const response = {
        service: "lenguajes",
        architecture: "microservices",
        paises
      };
      logger("Get language data");
      return res.send(response);
    });
});





// Exportamos el router
module.exports = router;
