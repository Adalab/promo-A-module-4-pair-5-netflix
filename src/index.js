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

console.log(process.env.MYSQL_USER);

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

// ENDPOINT para obtener películas o las peliculas filtradas por género
server.get("/api/movies", async (req, res) => {
  // Obtenemos el valor del parámetro de consulta de género
  const genreFilterParam = req.query.genre;

  // Conectamos a la base de datos
  const conn = await getConnection();

  // Consultamos las películas
  let queryGetMovies = `
    SELECT * FROM neflix.movies;
  `;

  if (genreFilterParam) {
    queryGetMovies = `
      SELECT * FROM neflix.movies WHERE genre = ?;
    `;
  }

  //Hacemos la consulta SQL con el parámetro de género si está presente.
  //Si este parámetro está presente, significa que la usuaria ha solicitado filtrar las películas por un género

  const [results] = genreFilterParam //Este es el parámetro de filtro de género que se obtiene de req.query.genre
    ? //Si genreFilterParam es verdadero, se hará la primera expresión del ?
      //sino, se hará la segunda expresión del :
      await conn.query(queryGetMovies, [genreFilterParam]) //solo se seleccionarán las películas que coincidan con el género
    : await conn.query(queryGetMovies); //se seleccionarán todas las películas sin ningún filtro de genero

  // Retornamos el resultado en formato JSON
  res.json({
    success: true,
    info: "listado películas filtradas",
    movies: results,
  });

  // Cerrar la conexión a la base de datos
  conn.close();
});
