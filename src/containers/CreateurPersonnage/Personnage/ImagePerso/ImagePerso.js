import React from "react";
import ImagePerso1 from "../../../../assets/images/imgperso/player1.png";
import ImagePerso2 from "../../../../assets/images/imgperso/player2.png";
import ImagePerso3 from "../../../../assets/images/imgperso/player3.png";

import classes from "./ImagePerso.module.css";

const imagePerso = (props) => {
    let imageToPrint="";
    if(props.numImage === 1) imageToPrint = ImagePerso1;
    else if(props.numImage === 2) imageToPrint = ImagePerso2;
    else if(props.numImage === 3) imageToPrint = ImagePerso3;

    return (
        <div className="flex flex-row text-center items-center justify-center">
            <div className={["",classes.fleche,classes.gauche].join(' ')} onClick={props.flecheGauche}></div>
            <div className="">
                <img src={imageToPrint} alt='perso'/>
            </div>
            <div className={["",classes.fleche,classes.droite].join(' ')}  onClick={props.flecheDroite}></div> 
        </div>
    );
};

export default imagePerso;