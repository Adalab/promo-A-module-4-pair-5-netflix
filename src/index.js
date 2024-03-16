//Importar bibliotecas
const express = require("express");
const cors = require("cors");
const mysql = require("mysql2/promise");

require("dotenv").config();

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
    host: process.env.MYSQL_HOST,

    user: process.env.MYSQL_USER,

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

// ENDPOINT para obtener películas o las peliculas filtradas por género
server.get("/api/movies/", async (req, res) => {
  // Obtenemos el valor del parámetro de consulta de género
  const genreFilterParam = req.query.genre;
  const optionOrder = req.query.sort;
  console.log(req.query.genre);

  // Conectamos a la base de datos
  const conn = await getConnection();

  // Consultamos las películas

  let queryGetMovies = ` 
  SELECT * FROM neflix.movies
  `;
  if (genreFilterParam) {
    queryGetMovies += `
     WHERE genre = ?
    `;
  }
  if (optionOrder === 'asc') { queryGetMovies += `ORDER BY title ASC` }
  else (optionORder === `desc`)
  {
    queryGetMovies += ` ORDER BY title DESC`
  }


  const [results] = await conn.query(queryGetMovies, [genreFilterParam], [allMoviesOptionSort]);

  // Cerrar la conexión a la base de datos
  conn.close();

  // Retornamos el resultado en formato JSON
  res.json({
  success: true,
  info: "listado películas filtradas",
  movies: results,
});
});
