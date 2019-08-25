import { createAction } from "redux-actions";
import { UPDATE_RECOMMEND_PLAYLIST } from "./constants";

export const updateRecommendPlaylist = createAction<any>(UPDATE_RECOMMEND_PLAYLIST);