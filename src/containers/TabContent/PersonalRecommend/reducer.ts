import { handleActions, Action } from "redux-actions";
import { UPDATE_RECOMMEND_PLAYLIST, UPDATE_PRIVATE_CONTENT, UPDATE_LASTEST_MUSIC, UPDATE_RECOMMEND_MV, UPDATE_DJ_PROGRAM } from "./constants";
const staticData = require("@mock/playlist.json");
const privateContent = require("@mock/privatecontent.json");
const lastestMusic = require("@mock/newsong.json");
const recommendMv = require("@mock/rm_mv.json");
const djProgram = require("@mock/djprogram.json");

const initialState: any = {
    playList: staticData.result.slice(0, 9),
    privateContent: privateContent.result.slice(0, 3),
    lastestMusic: lastestMusic.result.slice(0, 10),
    recommendMv: recommendMv.result.slice(0, 3),
    djProgram: djProgram.result.slice(0, 5)
};

const recommendReducer = handleActions({
    [UPDATE_RECOMMEND_PLAYLIST]: (state, action: Action<any>) => {
        if (action.payload && action.payload.result) {
            return Object.assign({}, state, {
                playList: action.payload.result.slice(0, 9)
            });
        } else {
            return state;
        }
    },
    [UPDATE_PRIVATE_CONTENT]: (state, action: Action<any>) => {
        if (action.payload && action.payload.result) {
            return Object.assign({}, state, {
                privateContent: action.payload.result.slice(0, 3)
            });
        } else {
            return state;
        }
    },
    [UPDATE_LASTEST_MUSIC]: (state, action: Action<any>) => {
        if (action.payload && action.payload.result) {
            return Object.assign({}, state, {
                lastestMusic: action.payload.result.slice(0, 10)
            });
        } else {
            return state;
        }
    },
    [UPDATE_RECOMMEND_MV]: (state, action: Action<any>) => {
        if (action.payload && action.payload.result) {
            return Object.assign({}, state, {
                recommendMv: action.payload.result.slice(0, 3)
            });
        } else {
            return state;
        }
    },
    [UPDATE_DJ_PROGRAM]: (state, action: Action<any>) => {
        if (action.payload && action.payload.result) {
            return Object.assign({}, state, {
                djProgram: action.payload.result.slice(0, 5)
            });
        } else {
            return state;
        }
    }
}, initialState);

export default recommendReducer;