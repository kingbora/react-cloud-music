import * as React from "react";
import Header from "@components/Header";
import Sider from "@components/Sider";
import Footer from "@components/Footer";
import style from "./style.scss";
import LazyComponent from "@src/utils/asyncComponent";

interface HomePageProps {
    childRoutes: Array<any>;
}

const HomePage = (props: HomePageProps) => {
    return (
        <div className={style.ncHomePage}>
            <Header />
            <div className={style.wrapper}>
                <Sider />
                <div className={style.centerContent}>
                    <LazyComponent>
                        {props.childRoutes}
                    </LazyComponent>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default HomePage;