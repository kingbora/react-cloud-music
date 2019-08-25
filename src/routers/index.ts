import * as React from "react";
import HomePage from "@containers/HomePage";
import DiscoverMusic from "@containers/SiderContent/DiscoverMusic";
import NotFound from "@containers/NotFound";
// import asyncComponent from "@utils/asyncComponent";
import PersonalRecommend from "@containers/TabContent/PersonalRecommend";

export default function createRoutes() {
    return [
        {
            path: "/",
            component: HomePage,
            redirect: "/discover/recommend",
            children: [
                {
                    path: "/discover",
                    component: DiscoverMusic,
                    redirect: "/discover/recommend",
                    children: [
                        {
                            title: "个性推荐",
                            path: "/discover/recommend",
                            component: PersonalRecommend
                        },
                        {
                            title: "歌单",
                            path: "/discover/playList",
                            component: React.lazy(() => import(/* webpackChunkName:'playlist' */"@containers/TabContent/PlayList"))
                        },
                        {
                            title: "主播电台",
                            path: "/discover/djRadio",
                            component: React.lazy(() => import(/* webpackChunkName:'djRadio' */"@containers/TabContent/DjRadio"))
                        },
                        {
                            title: "排行榜",
                            path: "/discover/topList",
                            component: React.lazy(() => import(/* webpackChunkName:'topList' */"@containers/TabContent/TopList"))
                        },
                        {
                            title: "歌手",
                            path: "/discover/artist",
                            component: React.lazy(() => import(/* webpackChunkName:'artist' */"@containers/TabContent/Artist"))
                        },
                        {
                            title: "最新音乐",
                            path: "/discover/latestMusic",
                            component: React.lazy(() => import(/* webpackChunkName:'latestMusic' */"@containers/TabContent/LatestMusic"))
                        }
                    ]
                },
                {
                    path: "/personalFm",
                    component: React.lazy(() => import(/* webpackChunkName:'personalFm' */"@containers/SiderContent/PersonalFM"))
                },
                {
                    path: '/liveShow',
                    component: React.lazy(() => import(/* webpackChunkName:'liveShow' */"@containers/SiderContent/LiveShow"))
                },
                {
                    path: '/video',
                    component: React.lazy(() => import(/* webpackChunkName:'onlineVideo' */"@containers/SiderContent/OnlineVideo"))
                },
                {
                    path: '/friends',
                    component: React.lazy(() => import(/* webpackChunkName:'friendShare' */"@containers/SiderContent/FriendShare"))
                },
                {
                    path: '/local',
                    component: React.lazy(() => import(/* webpackChunkName:'localMusic' */"@containers/SiderContent/LocalMusic"))
                },
                {
                    path: '/download',
                    component: React.lazy(() => import(/* webpackChunkName:'downloadManager' */"@containers/SiderContent/DownloadManager"))
                }
            ]
        },
        {
           path: "*",
           component: NotFound
        }
    ];
}