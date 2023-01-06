import React from "react";
import ImagePerso from "./ImagePerso/ImagePerso";
import CaracPerso from "./CaracPerso/CaracPerso";

const personnage = (props) => (
    <div className="flex flex-row items-center justify-center mt-2">
        <div className="flex border rounded-lg p-3 shadow-lg">
            <ImagePerso 
                numImage={props.image}
                flecheGauche={props.precedente}
                flecheDroite={props.suivante}
            />
        </div>
        <div className="flex flex-row ml-5 border p-3 rounded-lg shadow-lg items-center justify-center">
            <CaracPerso 
                nbPointsDisponibles = {props.nbPointsDisponibles}
                force = {props.force}
                agilite = {props.agilite}
                intelligence = {props.intelligence}
                enleverPoint = {props.enleverPoint}
                ajouterPoint = {props.ajouterPoint}
            />
        </div>
    </div>
);

export default personnage;