import { createStore } from 'redux';
import { composeWithDevTools } from "redux-devtools-extension";

import { reducer } from "./reducers/reducer";

const initState = {
    figures: [],
    isEditing: false,
};

const store = createStore(reducer, initState, composeWithDevTools());
export default store;