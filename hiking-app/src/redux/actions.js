import { hikingPlaces } from "../utils/hikingData.js";
import axios from "axios";

export const GET_HIKINGPLACE_BY_NAME = "GET_HIKINGPLACE_BY_NAME";
export const GET_HIKINGPLACES = "GET_HIKINGPLACES";
export const GET_HIKINGPLACE_BY_CONTINENTE = "GET_HIKINGPLACE_BY_CONTINENTE";
export const GET_HIKINGPLACE_BY_PAIS = "GET_HIKINGPLACE_BY_PAIS";
export const GET_FAV = "GET_FAV";
export const ADD_FAV = "ADD_FAV";
export const LOGIN_USER = "LOGIN_USER";

// const URL = process.env.URL || 'https://awa-gazebos.vercel.app';
const URL = process.env.URL || 'http://localhost:3001/api';

// export function getHikingPlaces() {
//   return async function(dispatch){
//     const response = await axios.get(`${URL}/hikingplaces`);
//      dispatch ({
//         type: "GET_HIKINGPLACES",
//         payload: response.data
//     });
// };
  // return function (dispatch) {
  //   dispatch({
  //     type: GET_HIKINGPLACES,
  //     payload: hikingPlaces,
  //   });
  // };
// }


// export function getHikingPlaceByName(searchTerm) {
//   return function (dispatch) {
//     const filteredHikingPlaces = hikingPlaces.filter(place =>
//       place.Sendero.toLowerCase().includes(searchTerm.toLowerCase())
//     );

//     dispatch({
//       type: GET_HIKINGPLACE_BY_NAME,
//       payload: filteredHikingPlaces
//     });
//   };
// }

// export function getHikingPlaceByName(searchTerm) {
//     return async function (dispatch) {
//         const response = await axios.get(`${URL}/hikingplaces/${searchTerm}`);
//         dispatch({
//             type: GET_HIKINGPLACE_BY_NAME,
//             payload: response.data
//         });
//         return response.data; 
//     };
// }



// export function getHikingPlaceByContinente(searchTerm) {
//   return function (dispatch) {
//     const filteredHikingPlaces = hikingPlaces.filter(place =>
//       place.Continente.toLowerCase().includes(searchTerm.toLowerCase())
//     );

//     dispatch({
//       type: GET_HIKINGPLACE_BY_CONTINENTE,
//       payload: filteredHikingPlaces
//     });
//   };
// }

// export function getHikingPlaceByPais(searchTerm) {
//   return function (dispatch) {
//     const filteredHikingPlaces = hikingPlaces.filter(place =>
//       place.País.toLowerCase().includes(searchTerm.toLowerCase())
//     );

//     dispatch({
//       type: GET_HIKINGPLACE_BY_PAIS,
//       payload: filteredHikingPlaces
//     });
//   };
// }

export const addFav = (payload) => {
  return async (dispatch) => {
    try {
      // Si necesitas hacer una petición HTTP, descomenta y ajusta la siguiente línea
      // const { data } = await axios.post(`${URL}/fav`, payload);

      // Aquí simplemente estamos usando el payload directamente en lugar de hikingPlaces
      return dispatch({
        type: ADD_FAV,
        payload, // Utiliza el payload recibido directamente
      });
    } catch (error) {
      console.error(error);
    }
  };
};

// export const removeFav = (id) => {
//   return async function (dispatch) {
//     try {
//       const { data } = await axios.delete(`${URL}/fav/${id}`);

//       console.log(data);
//       return dispatch({
//         type: REMOVE_FAV,
//         payload: data,
//       });
//     } catch (error) {
//       console.log(error);
//     }
//   };
// };


// export function getFav() {
//   return function (dispatch) {
//     dispatch({
//       type: GET_FAV,
//       payload: hikingPlaces,
//     });
//   };
// }
export const getFav = (payload) => {
    return async (dispatch) => {
       try {
        // const { data } = await axios(`${URL}/fav`);
        // console.log(data);
        return dispatch({
            type: GET_FAV,
            payload,
        })
        
       } catch (error) {
        
       }
    }
}

export const LoginUser = (LoginUser) => {
  return {
    type: "LOGIN_USER",
    payload: LoginUser,
  };
};