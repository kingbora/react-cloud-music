import * as React from "react";
import style from "./style.scss";
import axios from "@src/utils/httpInterceptors";
import { updateRecommendPlaylist } from "./actions";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
const { useEffect } = React;
const headset = require("@images/icon_headset.svg");
const play = require("@images/icon_pause.svg");

interface PersonalRecommendProps { }

interface PersonalRecommendStateProps {
    playList?: Array<any>;
}

interface PersonalRecommendDispatchProps {
    updateRecommendPlaylist?: Function;
}


const PersonalRecommend = (props: PersonalRecommendProps & PersonalRecommendStateProps & PersonalRecommendDispatchProps) => {
    useEffect(() => {
        const fetchData = async () => {
            if (props.updateRecommendPlaylist) {
                const result = await axios("/personalized");
                if (result.status === 200) {
                    props.updateRecommendPlaylist(result.data);
                } else {
                    const localData = await axios(require("@mock/playlist.json"));
                    if (localData.status === 200) {
                        props.updateRecommendPlaylist(localData.data);
                    }
                }
            }
        };

        props.playList && props.playList.length === 0 && fetchData();
    }, [props.playList && props.playList.length]);

    return (
        <div className={style.ncPersonalRecommend}>
            <div className={style.slider}></div>
            <div className={style.panel}>
                <div className={style.title}>
                    <h3>推荐歌单</h3>
                    <Link to="/discover/playList">更多&gt;</Link>
                </div>
                <div className={style.recommend}>
                    <div className={style.gridBlock}>
                        <div className={style.thumbnail}>
                            <div className={style.hoverTips}>
                                根据您的音乐口味生成每日更新
                            </div>
                            <div className={style.dailyRecommend}>
                                <span>星期六</span>
                                <h1>24</h1>
                            </div>
                        </div>
                        <p>每日歌曲推荐</p>
                    </div>
                    {
                        props.playList && props.playList.map((playlist: any) => (
                            <div key={playlist.id} className={style.gridBlock}>
                                <div className={style.thumbnail}>
                                    <div className={style.hoverTips}>
                                        <span>{playlist.copywriter}</span>
                                    </div>
                                    <div className={style.coverClicks}>
                                        <img src={headset} />
                                        <span>{playlist.playCount}</span>
                                    </div>
                                    <img src={playlist.picUrl} />
                                    <div className={style.playFlag}>
                                        <img src={play} />
                                    </div>
                                </div>
                                <p>{playlist.name}</p>
                            </div>
                        ))
                    }
                </div>
            </div>
            <div className={style.panel}>
                <div className={style.title}>
                    <h3>独家放送</h3>
                    <Link to="#">更多&gt;</Link>
                </div>
            </div>
        </div>
    )
};

const mapStateToProps = (state: any) => ({
    playList: state.recommendReducer.playList
});

const mapDispatchToProps = (dispatch: any) => ({
    updateRecommendPlaylist: (data: any) => {
        dispatch(updateRecommendPlaylist(data));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(PersonalRecommend));