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
// Se define una ruta GET en el router que espera un parametro 'capital'
router.get("/capital/:capital", (req, res) => {

  // Se obtiene el valor del parametro 'capital' de la solicitud entrante
  const capital = req.params.capital;

  // Se utiliza el metodo 'find' para buscar en el objeto 'dataLibrary'
  // la informacion del pais que tenga la capital indicada en el parametro
  const pais = Object.values(data.dataLibrary.countries).find((pais) => {
    return pais.capital === capital;
  })
  // Se crea un objeto de respuesta
  // que contiene la informacion del servicio realizado y la informacion del pais encontrado
  const response = {
    service: "Busqueda del pais con la capital: " + capital,
    data: pais
  };
  // Se envia la respuesta al cliente
  return res.send(response);
});

/*---------------------------------------------------------------------*/
// Se define una ruta GET en el router que espera un parámetro 'capital'
router.get("/pais/:capital", async (req, res) => {
  // Se define la URL del servicio que se desea consultar 
  const url = "http://authors:3000/api/v2/authors/pais/";
  // Se obtiene el valor del parámetro 'capital' de la solicitud entrante
  const capital = req.params.capital;
  // Se utiliza el método 'find' para buscar en el objeto 'dataLibrary'
  // la información del país que tenga la capital indicada en el parámetro
  const pais = Object.values(data.dataLibrary.countries).find((pais) => {
    return pais.capital === capital;
  });
  // Se consulta un servicio externo para obtener la información de autores nacidos en el país encontrado
  const author = await fetch(url + pais.name).then(response => response.json());
  // Se crea un objeto de respuesta que contiene la información del servicio realizado
  // y la información de los autores encontrados
  const response = {
    service: "Busqueda de authores nacidos en: " + pais.name,
    data: author
  };
  // Se envia la respuesta al cliente
  return res.send(response);
});

/*---------------------------------------------------------------------*/
// Se define una ruta GET en el router que espera un parámetro 'capital'
router.get("/books/:capital", async (req, res) => {
  // Se define la URL del servicio que se desea consultar
  const url = "http://books:4000/api/v2/books/pais/";
  // Se obtiene el valor del parámetro 'capital' de la solicitud entrante
  const capital = req.params.capital;
  // Se utiliza el método 'find' para buscar en el objeto 'dataLibrary' 
  //la información del país que tenga la capital indicada en el parámetro
  const pais = Object.values(data.dataLibrary.countries).find((pais) => {
    return pais.capital === capital;
  });
 // Se consulta un servicio externo para obtener la información de libros distribuidos en el país encontrado
  const books = await fetch(url + pais.name).then(response => response.json());
 // Se crea un objeto de respuesta que contiene la información del servicio realizado 
 //y la información de los libros encontrados
  const response = {
    service: "Libros distribuidos en el pais: " + pais.name,
    data: books
  };
  // Se envía la respuesta al cliente
  return res.send(response);
});

router.get("/lenguaje/:pais", (req, res) =>{
   const lenguaje = req.params.pais;
   const paises = Object.values(data.dataLibrary.countries).filter(pais =>{
    return pais.languages.includes(lenguaje)
   });
   const response = {
    service: "Busqueda de pais por lenguajes",
    data: paises
  };
  // Se envía la respuesta al cliente
  return res.send(response);
})

// Exportamos el router
module.exports = router;
