"use client"

import { useState } from "react";
import LeftPane from "./components/LeftPane";
import RightPane from "./components/RightPane";
import BoardContext from "./contexts/BoardContext";
import { readStore, saveStore } from "./contexts/BoardContext";

const Bici = () => {

    const localProject = readStore()

    const [project, setProject] = useState(localProject)

    return (
        <BoardContext.Provider value={{project, setProject}} >
            <div className="flex">
                <LeftPane />
                <RightPane />
            </div>
        </BoardContext.Provider >
    );
}

export default Bici;