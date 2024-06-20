// actions.js
import { hikingPlaces } from "../utils/hikingData.js";

export const GET_HIKINGPLACE_BY_NAME = "GET_HIKINGPLACE_BY_NAME";
export const GET_HIKINGPLACES = "GET_HIKINGPLACES";

export function getHikingPlaces() {
  return function (dispatch) {
    dispatch({
      type: GET_HIKINGPLACES,
      payload: hikingPlaces,
    });
  };
}

export function getHikingPlaceByName(searchTerm) {
  return function (dispatch) {
    const filteredHikingPlaces = hikingPlaces.filter(place =>
      place.Sendero.toLowerCase().includes(searchTerm.toLowerCase())
    );

    dispatch({
      type: GET_HIKINGPLACE_BY_NAME,
      payload: filteredHikingPlaces
    });
  };
}

// export function getActivities(){
//     return async function (dispatch){
//         // const response = await axios.get(
//         //     `${URL}/activities`
//         // );
//         return dispatch({
//             type: "GET_ACTIVITIES",
//             payload: activities
//         });
//     };
// }

// export function postActivity(data){
//     return async function (dispatch){
//             const response = await axios.post(`${URL}/activities/`, data)
//             return dispatch({
//                 type: "POST_ACTIVITIY",
//                 payload: response.data
//             })
//         }
//     }    

// export function filterCountriesByActivity(activities) {
//     return{
//         type: "FILTER_BY_ACTIVITY",
//         payload: activities,
//     };
// };

// export function orderCountriesByName(order) {
//     return {
//       type: "ORDER_BY_NAME",
//       payload: order
//     };
//   };
  
//   export function filterCountries(continents) {
//       return {
//         type: "FILTER",
//         payload: continents,
//       };
//     };