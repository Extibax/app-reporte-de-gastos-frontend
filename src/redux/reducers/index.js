/* Modules */
import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";

/* Reducers */
import mainReducers from "./mainReducers";

export default combineReducers({
  main_reducers: mainReducers,
  form: formReducer,
});
