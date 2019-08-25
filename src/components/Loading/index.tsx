import * as React from "react";
import style from "./style.scss";

const Loading = () => {
    return (
        <div className={style.ncLoading}>
            <div className={style.loadingSpinner}>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
            <span>加载中...</span>
        </div>
    )
};

export default Loading;