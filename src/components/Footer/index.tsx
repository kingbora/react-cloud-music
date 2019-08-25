import * as React from "react";
import classNames from "classnames";
import style from "./style.scss";

interface FooterProps {
    className?: string;
}

const Footer = (props: FooterProps) => {

    console.log(123);

    const prevSong = () => {

    };

    const controlSong = () => {

    };

    const nextSong = () => {

    };

    const classes = classNames(style.ncFooter, props.className);
    const controls = classNames(style.middleControl, style.playSong);
    return (
        <div data-border="top" className={classes}>
            <div className={style.controls}>
                <button className={style.prevSong} onClick={prevSong}></button>
                <button className={controls} onClick={controlSong}></button>
                <button className={style.nextSong} onClick={nextSong}></button>
            </div>
            <div className={style.progress}>
                <span className={style.progressTime}>00:20</span>
                <div className={style.progressBar}>
                    <div className={style.progressSlider}>
                        <button></button>
                    </div>
                </div>
                <span className={style.progressTime}>03:40</span>
            </div>
            <div className={style.volumn}>
                <i></i>
                <div className={style.volumnProgress}>
                    <div className={style.volumnProgressBar}></div>
                </div>
            </div>
            <button className={style.toggleLyric}>词</button>
        </div>
    )
};

export default React.memo(Footer);