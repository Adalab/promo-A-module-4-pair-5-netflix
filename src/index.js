//Importar bibliotecas
const express = require("express");
const cors = require("cors");
const mysql = require("mysql2/promise");

require('dotenv').config();

//CREAR VARIABLES

const server = express();

// init express aplication
const serverPort = 4000;

// create and config server
server.use(cors());
server.use(express.json());

// CONFIGURACIÓN DE MYSQL

console.log(process.env.MYSQL_USER)

async function getConnection() {
  const connection = await mysql.createConnection({
    host: process.env.MYSQL_HOST,
    //"127.0.0.1"
    user: process.env.MYSQL_USER,
    // Cada una pone sus contraseñas - En terminal MYSQL_PASS='' npm run dev, 
    // O en el archivo '.env' añadir contraseña, instalar 'npm i dotenv', y añadir archivo a ignore antes de hacer push. 
    password: process.env.MYSQL_PASS, 
    database: process.env.MYSQL_DB,
  });

  await connection.connect();

  console.log(
    `Conexión establecida con la base de datos (identificador=${connection.threadId})`
  );

  return connection;
}

// Arrancar el servidor
server.listen(serverPort, () => {
  console.log(`Server listening at http://localhost:${serverPort}`);
});

// Endpoint para obtener peliculas
server.get("/api/movies", async (req, res) => {
  const conn = await getConnection(); //conectar a la base de datos

  //consultamos para obtener las peliculas

  const queryGetMovies = `
  SELECT * FROM neflix.movies;
  `;

  const [results] = await conn.query(queryGetMovies);

  conn.close();

  //res.json({ info: "listado peliculas", results: results });

  res.json({ success: true, info: "listado peliculas", movies: results });
});
