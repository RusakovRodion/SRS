import { useState } from "react";
import "./App.css";
import { UiDemoPageForTest } from "./ui/demo_page";

function App() {
    const [count, setCount] = useState(0);

    return (
        <>
            <h1>hic sunt dracones</h1>

            <UiDemoPageForTest />
        </>
    );
}

export default App;
