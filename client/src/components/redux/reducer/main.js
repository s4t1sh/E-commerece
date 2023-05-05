import { getProductsreducer } from "./productsReducers";
import {combineReducers} from "redux";

const rootreducers = combineReducers({
    getproudctsdata : getProductsreducer
});

export default rootreducers;