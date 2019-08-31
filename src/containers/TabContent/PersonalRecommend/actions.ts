import { createAction } from "redux-actions";
import { UPDATE_RECOMMEND_PLAYLIST, UPDATE_PRIVATE_CONTENT, UPDATE_LASTEST_MUSIC, UPDATE_RECOMMEND_MV, UPDATE_DJ_PROGRAM } from "./constants";

export const updateRecommendPlaylist = createAction<any>(UPDATE_RECOMMEND_PLAYLIST);
export const updatePrivateContent = createAction<any>(UPDATE_PRIVATE_CONTENT);
export const updateLastestMusic = createAction<any>(UPDATE_LASTEST_MUSIC);
export const updateRecommendMv = createAction<any>(UPDATE_RECOMMEND_MV);
export const updateDjProgram = createAction<any>(UPDATE_DJ_PROGRAM);