const express = require("express"); // importa Express
const router = express.Router(); // crea un nuevo enrutador de Express
const data = require("../../data/data-library"); // importa los datos de data-library
const fetch = require("node-fetch");

const logger = (message) => console.log(`Author Services: ${message}`);

// define un controlador para la ruta raíz ("/")
router.get("/", (req, res) => {
  const response = {
    // crea una respuesta con información sobre los libros
    service: "books",
    architecture: "microservices",
    length: data.dataLibrary.books.length,
    data: data.dataLibrary.books,
  };
  logger("Get book data"); // registra un mensaje en los registros
  return res.send(response); // devuelve la respuesta al cliente
});

// define un controlador para la ruta "/title/:title"
router.get("/title/:title", (req, res) => {
  // busca los libros que contengan el título buscado
  const titles = data.dataLibrary.books.filter((title) => {
    return title.title.includes(req.params.title);
  });
  // crea una respuesta con información sobre los libros que coinciden con el título buscado
  const response = {
    service: "books",
    architecture: "microservices",
    length: titles.length,
    data: titles,
  };

  
  return res.send(response); // devuelve la respuesta al cliente
});
/*---------------------------------------------------------------------*/ 
// Se define una ruta GET en el router que espera un parámetro 'name'
router.get("/author/:name", async (req, res) => {
  // Se define la URL del servicio que se desea consultar
  const url = "http://authors:3000/api/v2/authors/author/";
  // Se obtiene el valor del parámetro 'name' de la solicitud entrante
  const name = req.params.name;
   // Se consulta un servicio externo para obtener la información del autor con el nombre indicado en el parámetro
  const json = await fetch(url+name).then(response => response.json())
  // Se utiliza el método 'filter' para buscar en el objeto 'dataLibrary' 
  //los títulos de libros que corresponden al autor encontrado en el servicio externo
  const titles = data.dataLibrary.books.filter((title) => {
    return title.authorid === json.data[0].id;
    // Se crea un objeto de respuesta que contiene la información del servicio realizado
     // y la información de los títulos de libros encontrados
  });
  const response = {
    service: "Busqueda por nombre",
    titulos: titles
  };
  return res.send(response); // devuelve la respuesta al cliente
});
/*---------------------------------------------------------------------*/ 
router.get("/fechas", async (req, res) => {
  const fechaUno = req.query.fechaUno;
  const fechaDos = req.query.fechaDos;
  const fecha = data.dataLibrary.books.filter((fecha) =>{
   return fecha.year >= fechaUno && fecha.year <= fechaDos
  })
  const response = {
    service: "Busqueda por Años",
    Libros: fecha
  };
  return res.send(response); // devuelve la respuesta al cliente
});

/*---------------------------------------------------------------------*/ 
router.get("/fechaMayorA", async (req, res) => {
  const fechaMayor = req.query.fechaMayor;
  const fecha = data.dataLibrary.books.filter((fecha) =>{
   return fecha.year >= fechaMayor
  })
  const response = {
    service: "Busqueda por fecha mayor A",
    Libros: fecha
  };
  return res.send(response); // devuelve la respuesta al cliente
});

/*---------------------------------------------------------------------*/ 
router.get("/fechaMenorA", async (req, res) => {
  const fechaMenor = req.query.fechaMenor;
  const fecha = data.dataLibrary.books.filter((fecha) =>{
   return fecha.year <= fechaMenor
  })
  const response = {
    service: "Busqueda por fecha menor A",
    Libros: fecha
  };
  return res.send(response); // devuelve la respuesta al cliente
});

/*---------------------------------------------------------------------*/ 
router.get("/fechaIgualA", async (req, res) => {
  const fechaIgual = req.query.fechaIgual;
  const fecha = data.dataLibrary.books.filter((fecha) =>{
   return fecha.year === fechaIgual
  })
  const response = {
    service: "Busqueda por fecha igual A",
    Libros: fecha
  };
  return res.send(response); // devuelve la respuesta al cliente
});

/*---------------------------------------------------------------------*/ 
router.get("/pais/:pais", (req, res) =>{

  const pais = req.params.pais;
  const books = data.dataLibrary.books.filter((book)=>{
    return book.distributedCountries.includes(pais);
  })
    const response ={
      books: books
    };
     return res.send(response);
  })
  

module.exports = router; // exporta el enrutador de Express para su uso en otras partes de la aplicación

/*
Este código es un ejemplo de cómo crear una API de servicios utilizando Express y un enrutador. El enrutador define dos rutas: una para obtener todos los libros y otra para obtener libros por título. También utiliza una función simple de registro para registrar mensajes en los registros.
*/
