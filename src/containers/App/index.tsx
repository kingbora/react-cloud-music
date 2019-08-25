import * as React from "react";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { createBrowserHistory } from "history";
import createRoutes from "@routers/index";

const myHistory = createBrowserHistory();

const App = () => {

    const createRoute = (routes: Array<any>) => {
        if (routes.length > 0) {
            const tempRoutes: any = [];
            routes.map((router: any) => {
                if (Array.isArray(router.children) && router.children.length > 0) {
                    tempRoutes.push(<Route key={"rn_" + router.path} exact={!!router.exact} path={router.path} render={() => {
                        const Component = router.component;
                        return <Component routeData={router.children} childRoutes={createRoute(router.children)} />;
                    }}>
                    </Route>);
                } else {
                    tempRoutes.push(<Route key={"rn_" + router.path} exact={!!router.exact} path={router.path} component={router.component} />);
                }
                if (router.redirect) {
                    tempRoutes.push(<Redirect key={"redirect_" + router.redirect} from={router.path} to={router.redirect} />);
                }
            });
            return tempRoutes;
        }
        return routes;
    }

    const routes = createRoute(createRoutes());

    return (
        <Router history={myHistory}>
            <Switch>
                {routes}
            </Switch>
        </Router>
    )
};

export default App;