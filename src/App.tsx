import React, { Suspense } from "react";
import "./styles/reset.css";
import "./styles/home.scss";
import { BasketProvider } from "./components/Basket/index.jsx";

const HomeLazy = React.lazy(() => import("./containers/Home"));

const App = () => {
    return (
        <BasketProvider><Suspense fallback={<div>Loading...</div>}>
            <HomeLazy />
        </Suspense></BasketProvider>
    );
};

export default App;
