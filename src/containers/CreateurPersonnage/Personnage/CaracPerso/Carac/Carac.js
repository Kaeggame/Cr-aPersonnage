import React from "react";
import classes from "./Carac.module.css";

const carac = (props) => {
    let carre = [];
    for(let i=0; i < props.nbPoints;i++){
        carre.push(<div key={i} className={classes.points}></div>)
    }

    return (
        <div className="flex flex-row text-center items-center justify-center">
            <div className={[classes.signe, classes.moins].join(' ')} onClick={props.moins}></div>
            <div className="p-1">{props.children}</div> {carre}
            <div className={[classes.signe, classes.plus].join(' ')} onClick={props.plus}></div>
        </div>
    );
};

export default carac;