// reducer.js
import { hikingPlaces } from "../utils/hikingData";
import { GET_HIKINGPLACE_BY_NAME, GET_HIKINGPLACES, GET_HIKINGPLACE_BY_CONTINENTE } from "./actions";

const initialState = {
  hikingPlaces: []
};

export default function hikingReducer(state = initialState, action) {
  switch (action.type) {
    case GET_HIKINGPLACES:
      return {
        ...state,
        hikingPlaces: action.payload
      };
    case GET_HIKINGPLACE_BY_NAME:
      return {
        ...state,
        hikingPlaces: action.payload
      };
    case GET_HIKINGPLACE_BY_CONTINENTE:
        return {
            ...state,
            hikingPlaces: action.payload
        }
    default:
      return state;
  }
}