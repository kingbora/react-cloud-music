import { combineReducers } from "redux";
import recommendReducer from "@containers/TabContent/PersonalRecommend/reducer";

const allReducer: any = {
    recommendReducer: recommendReducer
};

const rootReducer = combineReducers(allReducer);
export default rootReducer;