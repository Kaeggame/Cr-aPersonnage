import React from "react";
import classes from "./TitreH1.module.css";

const titreh1 = (props) => {
    const classesCss = `bg-violet-500 p-2 m-2 rounded text-white text-center font-mono text-2xl shadow-violet-500/50 shadow-md`
    return (
        <h1 className={classesCss}>{props.children}</h1>
    );
};

export default titreh1;