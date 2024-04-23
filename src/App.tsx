import React, { Suspense } from "react";
import "./styles/reset.css";
import "./styles/home.scss";

const HomeLazy = React.lazy(() => import("./containers/Home"));

const App = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <HomeLazy />
        </Suspense>
    );
};

export default App;
