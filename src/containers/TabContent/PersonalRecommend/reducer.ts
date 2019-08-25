import { handleActions, Action } from "redux-actions";
import { UPDATE_RECOMMEND_PLAYLIST } from "./constants";

const TEMP_ARR: any = [];

const initialState: any = {
    playList: TEMP_ARR
};

const recommendReducer = handleActions({
    [UPDATE_RECOMMEND_PLAYLIST]: (state, action: Action<any>) => {
        return Object.assign({}, state, {
            playList: action.payload && action.payload.result ? action.payload.result.slice(0, 9) : TEMP_ARR
        });
    }
}, initialState);

export default recommendReducer;