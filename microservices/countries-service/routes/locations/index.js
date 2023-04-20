// Importamos la biblioteca Express
const express = require("express");

// Importamos el archivo data-library.js que contiene la información sobre los países.
const data = require("../../data/data-library");

// Creamos un router de Express
const router = express.Router();

// Creamos una función de registro que imprime mensajes de registro en la consola
const logger = (message) => console.log(`Countries Service: ${message}`);

// Creamos una ruta GET en la raíz del router que devuelve todos los países
router.get("/", (req, res) => {
  // Creamos un objeto de respuesta con información sobre el servicio y los datos de los países
  const response = {
    service: "countries",
    architecture: "microservices",
    length: data.dataLibrary.countries.length,
    data: data.dataLibrary.countries,
  };
  // Registramos un mensaje en la consola
  logger("Get countries data");
  // Enviamos la respuesta al cliente
  return res.send(response);
});

/*---------------------------------------------------------------------*/ 
router.get("/capital/:capital", (req, res) =>{

  const capital = req.params.capital;
  const pais = Object.values(data.dataLibrary.countries).find((pais)=>{
    return pais.capital === capital;
  })

  const response={
    service: "Busqueda del pais con la capital: "+capital,
    data: pais
  };
   return res.send(response);
});

/*---------------------------------------------------------------------*/ 
router.get("/pais/:capital", async (req, res) =>{
  const url = "http://authors:3000/api/v2/authors/pais/";
  const capital = req.params.capital;
  const pais = Object.values(data.dataLibrary.countries).find((pais)=>{
    return pais.capital === capital;
  });

  const author = await fetch(url+pais.name).then(response => response.json());

  const response={
    service: "Busqueda de authores nacidos en: "+pais.name,
    data: author
  };
   return res.send(response);
});

/*---------------------------------------------------------------------*/ 
router.get("/books/:capital", async (req, res) =>{
  const url = "http://books:4000/api/v2/books/pais/";
  const capital = req.params.capital;
  const pais = Object.values(data.dataLibrary.countries).find((pais)=>{
    return pais.capital === capital;
  });

  const books = await fetch(url+pais.name).then(response => response.json());

  const response={
    service: "Libros distribuidos en el pais: "+pais.name,
    data: books
  };
   return res.send(response);
});

// Exportamos el router
module.exports = router;
