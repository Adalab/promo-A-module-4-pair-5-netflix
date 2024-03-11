// login

//function getMoviesFromApi() {
//   console.log('Se están pidiendo las películas de la app');
//   // CAMBIA ESTE FETCH PARA QUE APUNTE A UN ENDPOINT DE TU SERVIDOR, PIENSA SI DEBE SER GET O POST, PIENSA QUÉ DATOS DEBES ENVIAR, ETC
//   return fetch('//beta.adalab.es/curso-intensivo-fullstack-recursos/apis/netflix-v1/empty.json')
//     .then(response => response.json())
//     .then(() => {

//       // CAMBIA EL CONTENIDO DE ESTE THEN PARA GESTIONAR LA RESPUESTA DEL SERVIDOR Y RETORNAR AL COMPONENTE APP LO QUE NECESITA
//       return {
//         success: true,
//         movies: [
//           {
//             id: '1',
//             title: 'Gambita de dama',
//             genre: 'Drama',
//             image:
//               '//beta.adalab.es/curso-intensivo-fullstack-recursos/apis/netflix-v1/images/gambito-de-dama.jpg'
//           },
//           {
//             id: '2',
//             title: 'Friends',
//             genre: 'Comedia',
//             image:
//               '//beta.adalab.es/curso-intensivo-fullstack-recursos/apis/netflix-v1/images/friends.jpg'
//           }
//         ]
//       };
//     });
// };

//Filtrar por género

//En el frontend, modificamos api-movies.js para enviar el parámetro de género como parte de la solicitud

function getMoviesFromApi(genre) {
  console.log("Parámetro recibido:", genre); // Mostramos en consola el género que escribe la usuaria
  let url = "http://localhost:4000/api/movies"; //creamos url con la dirección

  // Si la usuaria proporciona un género, agregamos el parámetro a la URL
  if (genre) {
    url += `?genre=${genre}`;
  }

  return fetch(url)
    .then((response) => response.json())
    .then((data) => {
      return data; // Retorna los datos obtenidos del servidor
    });
}

const objToExport = {
  getMoviesFromApi: getMoviesFromApi,
};

export default objToExport;
