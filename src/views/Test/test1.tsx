import React from "react";
import ErrorBoundary from "@/hooks/ErrorBoundary";

class Test1 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            test: undefined
        };
    }

    render() {
        return (
            <div>{this.state.test.toUpperCase()}</div>

        );
    }
}

const errTest = () => {
    return (
        <ErrorBoundary>
            <Test1 />
        </ErrorBoundary>
    )
}


export default errTest;