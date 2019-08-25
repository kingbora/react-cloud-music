import * as React from "react";
import classNames from "classnames";
import style from "./style.scss";
const { useEffect, useState } = React;

interface HeaderProps {
    className?: string;
}

const Header = (props: HeaderProps) => {
    const ipcRender = window.isElectron ? window.require("electron").ipcRenderer : null;
    const [isMax, setIsMax] = useState(false);

    useEffect(() => {
        ipcRender && ipcRender.on("isAppMax", (event: any, data: any) => {
            setIsMax(data);
        });
        return () => {
            ipcRender && ipcRender.removeAllListeners("isAppMax");
        };
    });

    const onMinimize = () => {
        ipcRender && ipcRender.send("minimizeApp");
    };

    const onMaximize = () => {
        ipcRender && ipcRender.send("maximizeApp");
    };

    const onClose = () => {
        ipcRender && ipcRender.send("exitApp");
    };

    const prevPage = () => {

    };

    const nextPage = () => {

    }
    const classes = classNames(style.ncHeader, props.className);
    return (
        <div className={classes}>
            <div className={style.left}>
                <h1 className={style.logo}>
                    <a href="#">网易云音悦</a>
                </h1>
                <div className={style.historyOperator}>
                    <button className={style.prevState} onClick={prevPage}></button>
                    <button className={style.nextState} onClick={nextPage}></button>
                </div>
                <div className={style.search}>
                    <input placeholder="搜索音乐，视频，歌词，电台" />
                    <button className={style.searchBtn}></button>
                </div>
            </div>
            <ul className={style.right}>
                <li className={style.systemOperator}>
                    <a onClick={onMinimize} title="最小化" />
                    {
                        !isMax ?
                            <a onClick={onMaximize} title="最大化" />
                            :
                            <a className={style.maxRestore} onClick={onMaximize} title="向下还原" />
                    }
                    <a onClick={onClose} title="关闭" />
                </li>
            </ul>
        </div>
    );
};

export default React.memo(Header);