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
      const languages = results.map(result =>{
        return {
          codigo: result.alpha2, 
          lenguaje: result.English
        }
      })
      const response = {
        service: "lenguajes",
        architecture: "microservices",
        languages
      };
      logger("Get language data");
      return res.send(response);
    });
});


router.get("/paises/:lenguaje", async (req, res) => {
  const results = [];
  const data = "./data/language-codes.csv";
  const codigoPais = req.params.lenguaje;
  const url = "http://countries:5000/api/v2/countries/lenguaje/"
  fs.createReadStream(data)
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', async () => {
      const languages = results.map(result =>{
        return {
          codigo: result.alpha2, 
          lenguaje: result.English
        }
      }).filter(result =>{
        return result.lenguaje.includes(codigoPais)
      })
      const language = languages.map(result =>{
        return result.codigo
      });
      const paises = await fetch(url + language[0]).then(response => response.json());
      const response = {
        service: "Busqueda de pais por lenguajes",
        architecture: "microservices",
        paises
      };
      logger("Get language data");
      return res.send(response);
    });
});

router.get("/authors/:lenguaje", async (req, res) => {
  const results = [];
  const data = "./data/language-codes.csv";
  const codigoPais = req.params.lenguaje;
  const urlPaises = "http://countries:5000/api/v2/countries/lenguaje/";
  const urlAuthors = "http://authors:3000/api/v2/authors/pais/";
  fs.createReadStream(data)
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', async () => {
      const languages = results.map(result =>{
        return {
          codigo: result.alpha2, 
          lenguaje: result.English
        }
      }).filter(result =>{
        return result.lenguaje.includes(codigoPais)
      })
      const language = languages.map(result =>{
        return result.codigo
      });
      const paises = await fetch(urlPaises + language[0]).then(response => response.json());
      const arregloPaises = paises.data.map(pais => pais.name).join(",");
      const authors = await fetch(urlAuthors + arregloPaises).then(response => response.json());
      const response = {
        service: "Busqueda de autores por pais",
        architecture: "microservices",
       authors
      };
      logger("Get language data");
      return res.send(response);
    });
});

router.get("/libros/:lenguaje", async (req, res) => {
  const results = [];
  const data = "./data/language-codes.csv";
  const codigoPais = req.params.lenguaje;
  const urlPaises = "http://countries:5000/api/v2/countries/lenguaje/";
  const urlLibros = "http://books:4000/api/v2/books/pais/";
  fs.createReadStream(data)
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', async () => {
      const languages = results.map(result =>{
        return {
          codigo: result.alpha2, 
          lenguaje: result.English
        }
      }).filter(result =>{
        return result.lenguaje.includes(codigoPais)
      })
      const language = languages.map(result =>{
        return result.codigo
      });
      const paises = await fetch(urlPaises + language[0]).then(response => response.json());
      const arregloPaises = paises.data.map(pais => pais.name).join(",");
      const libros = await fetch(urlLibros + arregloPaises).then(response => response.json());
      const response = {
        service: "Busqueda de autores por pais",
        architecture: "microservices",
       libros
      };
      logger("Get language data");
      return res.send(response);
    });
});



// Exportamos el router
module.exports = router;
