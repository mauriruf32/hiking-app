import { hikingPlaces } from "../utils/hikingData.js";

export const GET_HIKINGPLACE_BY_NAME = "GET_HIKINGPLACE_BY_NAME";
export const GET_HIKINGPLACES = "GET_HIKINGPLACES";
export const GET_HIKINGPLACE_BY_CONTINENTE = "GET_HIKINGPLACE_BY_CONTINENTE";
export const GET_HIKINGPLACE_BY_PAIS = "GET_HIKINGPLACE_BY_PAIS";

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

export function getHikingPlaceByContinente(searchTerm) {
  return function (dispatch) {
    const filteredHikingPlaces = hikingPlaces.filter(place =>
      place.Continente.toLowerCase().includes(searchTerm.toLowerCase())
    );

    dispatch({
      type: GET_HIKINGPLACE_BY_CONTINENTE,
      payload: filteredHikingPlaces
    });
  };
}

export function getHikingPlaceByPais(searchTerm) {
  return function (dispatch) {
    const filteredHikingPlaces = hikingPlaces.filter(place =>
      place.País.toLowerCase().includes(searchTerm.toLowerCase())
    );

    dispatch({
      type: GET_HIKINGPLACE_BY_PAIS,
      payload: filteredHikingPlaces
    });
  };
}

