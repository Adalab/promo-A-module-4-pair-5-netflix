//Importar bibliotecas
const express = require("express");
const cors = require("cors");
const mysql = require("mysql2/promise");

//CREAR VARIABLES

const server = express();

// init express aplication
const serverPort = 4000;

// create and config server
server.use(cors());
server.use(express.json());

// CONFIGURACIÓN DE MYSQL

async function getConnection() {
  const connection = await mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: process.env.MYSQL_PASS, // Cada una pone sus contraseñas - En terminal MYSQL_PASS='' npm run dev
    database: "neflix",
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
