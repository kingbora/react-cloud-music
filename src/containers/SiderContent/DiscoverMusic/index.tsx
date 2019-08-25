import * as React from "react";
import style from "./style.scss";
import { NavLink, withRouter, RouteComponentProps } from "react-router-dom";
import LazyComponent from "@src/utils/asyncComponent";

interface DiscoverMusicProps extends RouteComponentProps {
    childRoutes?: Array<any>;
    routeData?: Array<any>;
}

const DiscoverMusic = (props: DiscoverMusicProps) => {

    const linkTo = (e: any) => {
        e.preventDefault();
        if (e.currentTarget.pathname !== props.location.pathname) {
            props.history.push(e.currentTarget.pathname);
        }
    };

    const isActive = (path: any, match: any, location: any) => !!(match || path === location.pathname);

    return (
        <div className={style.ncDiscoverMusic}>
            <div className={style.tabList}>
                {
                    props.routeData && props.routeData.map((tab: any) => {
                        return <NavLink
                            key={"tab_" + tab.path}
                            to={tab.path}
                            onClick={linkTo}
                            isActive={(match: any, location: any) => isActive(tab.path, match, location)}
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

export default React.memo(withRouter(DiscoverMusic));