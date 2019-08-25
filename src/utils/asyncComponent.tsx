import * as React from "react";
import Loading from "../components/Loading";
const { Suspense } = React;

interface asyncComponentState {
    component: any;
}

function asyncComponent(importComponent: any) {
    class AsyncComponent extends React.Component<any, asyncComponentState> {
        constructor(props: any) {
            super(props);

            this.state = {
                component: null
            }
        }

        async componentDidMount() {
            const { default: component } = await importComponent();
            this.setState({
                component
            });
        }

        render() {
            const C = this.state.component;

            return C ? <C {...this.props} /> : <Loading />;
        }
    }

    return AsyncComponent;
}

export default function LazyComponent(props: any) {
    return <Suspense fallback={<Loading />}>
        {props.children}
    </Suspense>;
}