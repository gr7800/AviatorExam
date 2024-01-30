import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from 'redux-thunk';
import { authReducer } from "./Auth/auth.reducer";
import { questionReducer } from "./Questions/question.reducer";

const rootReducer = combineReducers({
    auth: authReducer,
    question: questionReducer
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export { store };
