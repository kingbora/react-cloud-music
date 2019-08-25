import * as React from "react";
import classNames from "classnames";
import style from "./style.scss";
import { NavLink, withRouter, RouteComponentProps } from "react-router-dom";

interface SiderProps extends RouteComponentProps {
    className?: string;
}

const Sider = (props: SiderProps) => {
    const classes = classNames(style.ncSider, props.className);
    const disabledStyle: any = {
        cursor: "default",
        pointerEvents: "none"
    };

    const linkTo = (e: any) => {
        e.preventDefault();
        if (e.currentTarget.pathname !== props.location.pathname) {
            props.history.push(e.currentTarget.pathname);
        }
    };

    const isActive = (path: any, match: any, location: any) => !!(match || location.pathname.indexOf(path) > -1);

    return (
        <div data-border="right" className={classes}>
            <div className={style.list}>
                <h3>推荐</h3>
                <ul>
                    <NavLink isActive={(match: any, location: any) => isActive("/discover", match, location)} onClick={linkTo} activeStyle={disabledStyle} activeClassName={style.active} to="/discover/recommend">
                        <li>
                            <i className={style.foundMusic}></i>
                            <span>发现音乐</span>
                        </li>
                    </NavLink>
                    <NavLink isActive={(match: any, location: any) => isActive("/personalFm", match, location)} onClick={linkTo} activeStyle={disabledStyle} activeClassName={style.active} to="/personalFm">
                        <li>
                            <i className={style.personalFm}></i>
                            <span>私人FM</span>
                        </li>
                    </NavLink>
                    <NavLink isActive={(match: any, location: any) => isActive("/liveShow", match, location)} onClick={linkTo} activeStyle={disabledStyle} activeClassName={style.active} to="/liveShow">
                        <li>
                            <i className={style.liveShow}></i>
                            <span>LOOK直播</span>
                        </li>
                    </NavLink>
                    <NavLink isActive={(match: any, location: any) => isActive("/video", match, location)} onClick={linkTo} activeStyle={disabledStyle} activeClassName={style.active} to="/video">
                        <li>
                            <i className={style.video}></i>
                            <span>视频</span>
                        </li>
                    </NavLink>
                    <NavLink isActive={(match: any, location: any) => isActive("/friends", match, location)} onClick={linkTo} activeStyle={disabledStyle} activeClassName={style.active} to="/friends">
                        <li>
                            <i className={style.friend}></i>
                            <span>朋友</span>
                        </li>
                    </NavLink>
                </ul>
            </div>
            <div className={style.list}>
                <h3>我的音乐</h3>
                <ul>
                    <NavLink isActive={(match: any, location: any) => isActive("/local", match, location)} onClick={linkTo} activeStyle={disabledStyle} activeClassName={style.active} to="/local">
                        <li>
                            <i className={style.localMusic}></i>
                            <span>本地音乐</span>
                        </li>
                    </NavLink>

                    <NavLink isActive={(match: any, location: any) => isActive("/download", match, location)} onClick={linkTo} activeStyle={disabledStyle} activeClassName={style.active} to="/download">
                        <li>
                            <i className={style.downloadManager}></i>
                            <span>下载管理</span>
                        </li>
                    </NavLink>
                </ul>
            </div>
            <div className={style.list}>
                <h3>创建的歌单</h3>
                <ul>
                    <li>
                        <i className={style.favorite}></i>
                        <span>我喜欢的音乐</span>
                    </li>
                </ul>
            </div>
        </div>
    )
};

export default React.memo(withRouter(Sider));