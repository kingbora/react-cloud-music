import * as React from "react";
import style from "./style.scss";
const cover1 = require("@images/tmp/cover1.jpg");
const cover2 = require("@images/tmp/cover2.jpg");
const cover3 = require("@images/tmp/cover3.jpg");
const headset = require("@images/icon_headset.svg");
const play = require("@images/icon_pause.svg");

const PersonalRecommend = () => {
    return (
        <div className={style.ncPersonalRecommend}>
            <div className={style.slider}></div>
            <div className={style.panel}>
                <div className={style.title}>
                    <h3>推荐歌单</h3>
                    <a href="#">更多&gt;</a>
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
                    <div className={style.gridBlock}>
                        <div className={style.thumbnail}>
                            <div className={style.hoverTips}>
                                <span>编辑推荐：每周VIP专享歌曲，编辑精选推荐</span>
                            </div>
                            <div className={style.coverClicks}>
                                <img src={headset} />
                                <span>16635万</span>
                            </div>
                            <img src={cover1} />
                            <div className={style.playFlag}>
                                <img src={play} />
                            </div>
                        </div>
                        <p>[VIP专享]一周新歌推荐</p>
                    </div>
                    <div className={style.gridBlock}>
                        <div className={style.thumbnail}>
                            <div className={style.hoverTips}>
                                <span>编辑推荐：我再也不想被大量了，我想你也是一样吧！</span>
                            </div>
                            <div className={style.coverClicks}>
                                <img src={headset} />
                                <span>24562</span>
                            </div>
                            <img src={cover2} />
                            <div className={style.playFlag}>
                                <img src={play} />
                            </div>
                        </div>
                        <p>拒绝被打量，你独特的完美有世界包容</p>
                    </div>
                    <div className={style.gridBlock}>
                        <div className={style.thumbnail}>
                            <div className={style.hoverTips}>
                                <span>根据你喜欢的单曲《等你下课(with杨瑞代)合唱》而生成的歌单</span>
                            </div>
                            <div className={style.coverClicks}>
                                <img src={headset} />
                                <span>2357万</span>
                            </div>
                            <img src={cover3} />
                            <div className={style.playFlag}>
                                <img src={play} />
                            </div>
                        </div>
                        <p>神仙翻唱 | 超好听的翻唱cover集鸭</p>
                    </div>
                    <div className={style.gridBlock}>
                        <div className={style.thumbnail}>
                        <div className={style.playFlag}>
                                <img src={play} />
                            </div>
                        </div>
                    </div>

                    <div className={style.gridBlock}>
                        <div className={style.thumbnail}>
                        <div className={style.playFlag}>
                                <img src={play} />
                            </div>
                        </div>
                    </div>
                    <div className={style.gridBlock}>
                        <div className={style.thumbnail}>
                        <div className={style.playFlag}>
                                <img src={play} />
                            </div>
                        </div>
                    </div>
                    <div className={style.gridBlock}>
                        <div className={style.thumbnail}>
                        <div className={style.playFlag}>
                                <img src={play} />
                            </div>
                        </div>
                    </div>
                    <div className={style.gridBlock}>
                        <div className={style.thumbnail}>
                        <div className={style.playFlag}>
                                <img src={play} />
                            </div>
                        </div>
                    </div>
                    <div className={style.gridBlock}>
                        <div className={style.thumbnail}>
                        <div className={style.playFlag}>
                                <img src={play} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default PersonalRecommend;