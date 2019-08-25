import * as React from "react";
import style from "./style.scss";
import { NavLink } from "react-router-dom";
import LazyComponent from "@src/utils/asyncComponent";

interface DiscoverMusicProps {
    childRoutes?: Array<any>;
    routeData?: Array<any>;
}

const DiscoverMusic = (props: DiscoverMusicProps) => {

    const linkTo = (e: any) => {
        e.preventDefault();
        if (e.currentTarget.pathname !== window.location.pathname) {
            window.myHistory.push(e.currentTarget.pathname);
        }
    };

    return (
        <div className={style.ncDiscoverMusic}>
            <div className={style.tabList}>
                {
                    props.routeData && props.routeData.map((tab: any) => {
                        return <NavLink
                            key={"tab_" + tab.path}
                            to={tab.path}
                            onClick={linkTo}
                            activeClassName={style.active}
                            className={style.tabNav}
                        >{tab.title}</NavLink>;
                    })
                }
            </div>
            <div className={style.tabContentWrap}>
                <LazyComponent>
                    {props.childRoutes}
                </LazyComponent>
            </div>
        </div>
    );
}

export default DiscoverMusic;