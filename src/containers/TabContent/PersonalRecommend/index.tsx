import * as React from "react";
import style from "./style.scss";
import axios from "@src/utils/httpInterceptors";
import { updateRecommendPlaylist, updatePrivateContent, updateLastestMusic, updateRecommendMv, updateDjProgram } from "./actions";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
const { useEffect } = React;
const headset = require("@images/icon_headset.svg");
const play = require("@images/icon_pause.svg");
const video = require("@images/icon_video_white.svg");

interface PersonalRecommendProps { }

interface PersonalRecommendStateProps {
    playList?: Array<any>;
    privateContent?: Array<any>;
    lastestMusic?: Array<any>;
    recommendMv?: Array<any>;
    djProgram?: Array<any>;
}

interface PersonalRecommendDispatchProps {
    updateRecommendPlaylist?: Function;
    updatePrivateContent?: Function;
    updateLastestMusic?: Function;
    updateRecommendMv?: Function;
    updateDjProgram?: Function;
}

let isInit = false;

const PersonalRecommend = (props: PersonalRecommendProps & PersonalRecommendStateProps & PersonalRecommendDispatchProps) => {

    useEffect(() => {
        const fetchData = async () => {
            isInit = true;
            if (props.updateRecommendPlaylist) {
                try {
                    const result = await axios("/personalized");
                    props.updateRecommendPlaylist(result.data);
                } catch (error) {

                }
            }
            if (props.updatePrivateContent) {
                try {
                    const result = await axios("/personalized/privatecontent");
                    props.updatePrivateContent(result.data);
                } catch (error) {

                }
            }
            if (props.updateLastestMusic) {
                try {
                    const result = await axios("/personalized/newsong");
                    props.updateLastestMusic(result.data);
                } catch (error) {

                }
            }
            if (props.updateRecommendMv) {
                try {
                    const result = await axios("/personalized/mv");
                    props.updateRecommendMv(result.data);
                } catch (error) {

                }
            }
            if (props.updateDjProgram) {
                try {
                    const result = await axios("/personalized/djprogram");
                    props.updateDjProgram(result.data);
                } catch (error) {

                }
            }
        };

        !isInit && fetchData();
    }, []);

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
                <div className={style.personalized}>
                    {
                        props.privateContent && props.privateContent.map((item) => (
                            <div className={style.gridBlock} key={item.videoId}>
                                <div className={style.thumbnail}>
                                    <div className={style.videoFlag}>
                                        <img src={video} />
                                    </div>
                                    <img src={item.picUrl} />
                                </div>
                                <p>{item.name}</p>
                            </div>
                        ))
                    }
                </div>
            </div>
            <div className={style.panel}>
                <div className={style.title}>
                    <h3>最新音乐</h3>
                    <Link to="#">更多&gt;</Link>
                </div>
                <div className={style.lastestMusic}>
                    <div className={style.leftSide}>
                        {
                            props.lastestMusic && props.lastestMusic.slice(0, 5).map((item, index) => (
                                <div key={item.id} className={style.singleLine}>
                                    <div className={style.lineNumber}>{(index + 1) >= 10 ? (index + 1) : "0" + (index + 1)}</div>
                                    <div className={style.cover}>
                                        <img src={item.song.album.picUrl} />
                                        <div className={style.playFlag}>
                                            <img src={play} />
                                        </div>
                                    </div>
                                    <div className={style.songInfo}>
                                        <div className={style.songName}>{item.name}</div>
                                        <div className={style.artists}>
                                            {
                                                item.song.artists.map((artist: any, index: any) => {
                                                    let prefix = " / ";
                                                    if (index === 0) {
                                                        prefix = "";
                                                    }
                                                    return <span key={artist.id + "" + index}>
                                                        {prefix}
                                                        <Link to="">{artist.name}</Link>
                                                    </span>;
                                                })
                                            }
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                    <div className={style.diliver}></div>
                    <div className={style.rightSide}>
                        {
                            props.lastestMusic && props.lastestMusic.slice(5, 10).map((item, index) => (
                                <div key={item.id} className={style.singleLine}>
                                    <div className={style.lineNumber}>{(index + 6) >= 10 ? (index + 6) : "0" + (index + 6)}</div>
                                    <div className={style.cover}>
                                        <img src={item.song.album.picUrl} />
                                        <div className={style.playFlag}>
                                            <img src={play} />
                                        </div>
                                    </div>
                                    <div className={style.songInfo}>
                                        <div className={style.songName}>{item.name}</div>
                                        <div className={style.artists}>
                                            {
                                                item.song.artists.map((artist: any, index: any) => {
                                                    let prefix = " / ";
                                                    if (index === 0) {
                                                        prefix = "";
                                                    }
                                                    return <span key={artist.id + "" + index}>
                                                        {prefix}
                                                        <Link to="">{artist.name}</Link>
                                                    </span>;
                                                })
                                            }
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
            <div className={style.panel}>
                <div className={style.title}>
                    <h3>推荐MV</h3>
                    <Link to="#">更多&gt;</Link>
                </div>
                <div className={style.recommendMv}>
                {
                        props.recommendMv && props.recommendMv.map((mv: any) => (
                            <div key={mv.id} className={style.gridBlock}>
                                <div className={style.thumbnail}>
                                    <div className={style.hoverTips}>
                                        <span>{mv.copywriter}</span>
                                    </div>
                                    <div className={style.coverClicks}>
                                        <img src={video} />
                                        <span>{mv.playCount}</span>
                                    </div>
                                    <img src={mv.picUrl} />
                                </div>
                                <div className={style.mvInfo}>
                                    <p className={style.mvName}>{mv.name}</p>
                                    <p className={style.artists}>{
                                        mv.artists.map((artist: any, index: any) => {
                                            let prefix = " / ";
                                            if (index === 0) {
                                                prefix = "";
                                            }
                                            return <span key={artist.id + "" + index}>
                                                {prefix}
                                                <Link to="">{artist.name}</Link>
                                            </span>;
                                        })
                                    }</p>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
            <div className={style.panel}>
                <div className={style.title}>
                    <h3>主播电台</h3>
                    <Link to="#">更多&gt;</Link>
                </div>
                <div className={style.djProgram}>
                {
                        props.djProgram && props.djProgram.map((dj: any) => (
                            <div key={dj.id} className={style.gridBlock}>
                                <div className={style.thumbnail}>
                                    <img src={dj.picUrl} />
                                </div>
                                <p>{dj.name}</p>
                            </div>
                        ))
                    }
                </div>
            </div>
            <div className={style.bottom}>
                <div className={style.diliver}></div>
                <p>现在可以根据个人喜好，自由调整首页栏目顺序啦~</p>
                <button>调整栏目顺序</button>
            </div>
        </div>
    )
};

const mapStateToProps = (state: any) => ({
    playList: state.recommendReducer.playList,
    privateContent: state.recommendReducer.privateContent,
    lastestMusic: state.recommendReducer.lastestMusic,
    recommendMv: state.recommendReducer.recommendMv,
    djProgram: state.recommendReducer.djProgram
});

const mapDispatchToProps = (dispatch: any) => ({
    updateRecommendPlaylist: (data: any) => {
        dispatch(updateRecommendPlaylist(data));
    },
    updatePrivateContent: (data: any) => {
        dispatch(updatePrivateContent(data));
    },
    updateLastestMusic: (data: any) => {
        dispatch(updateLastestMusic(data));
    },
    updateRecommendMv: (data: any) => {
        dispatch(updateRecommendMv(data));
    },
    updateDjProgram: (data: any) => {
        dispatch(updateDjProgram(data));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(PersonalRecommend));