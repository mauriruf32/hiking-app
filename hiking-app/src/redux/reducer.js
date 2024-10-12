import { GET_HIKINGPLACE_BY_NAME, 
  GET_HIKINGPLACES, 
  GET_HIKINGPLACE_BY_CONTINENTE, 
  GET_HIKINGPLACE_BY_PAIS,
  ADD_FAV,
  GET_FAV,
  LOGIN_USER
} from "./actions";

const initialState = {
  hikingPlaces: [],
  favoritePlaces: [], 
  userData: null
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
        };
        case LOGIN_USER:
          return {
              ...state,
              userData: action.payload
          };
    case GET_HIKINGPLACE_BY_PAIS:
        return {
            ...state,
            hikingPlaces: action.payload
        };
        case GET_FAV:
          return {
              ...state,
              favoritePlaces:action.payload,
              hikingPlaces: action.payload
          };
        case ADD_FAV:
            return {
                ...state,
                favoritePlaces:action.payload,
                hikingPlaces: action.payload
            } 
    default:
      return state;
  }
}
