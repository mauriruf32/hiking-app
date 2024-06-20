// reducer.js
import { GET_HIKINGPLACE_BY_NAME, GET_HIKINGPLACES } from "./actions";

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
    default:
      return state;
  }
}
