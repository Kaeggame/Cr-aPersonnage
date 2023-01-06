import React, { Component } from 'react';
import TitreH1 from "../../components/Titres/TitreH1";
import Bouton from "../../components/Bouton/Bouton";
import Personnage from "./Personnage/Personnage";
import Armes from "./Armes/Armes";
import axios from "axios";

class CreateurPersonnage extends Component {
    state = {
        personnage : {
            image : 1,
            force : 0,
            agilite : 0,
            intelligence : 0,
            arme:null
        },
        nbPointsDisponibles : 7,
        armes : null,
        loading:false,
        nom : "",
    }

    componentDidMount = () => {
        this.setState({loading:true});
        axios.get("https://creaperso-9a79c-default-rtdb.europe-west1.firebasedatabase.app///armes.json")
            .then(reponse => {
                const armesArray = Object.values(reponse.data);
                this.setState({
                    armes:armesArray,
                    loading:false,
                });
            })
            .catch(error => {
                console.log(error);
                this.setState({
                    loading:false,
                });
            })
    }
    handleImagePrecedente = () => {
        this.setState(oldState => {
            const newPersonnage = {...oldState.personnage};
            if(oldState.personnage.image <= 1) newPersonnage.image = 3;
            else newPersonnage.image --;
            return {personnage:newPersonnage};
        })
    }
    handleImageSuivante = () => {
        this.setState(oldState => {
            const newPersonnage = {...oldState.personnage};
            if(oldState.personnage.image >= 3) newPersonnage.image = 1;
            else newPersonnage.image ++;
            return {personnage:newPersonnage};
        })
    }
    handleEnleverPoint = (carac) => {
        this.setState((oldState,props) => {
            if(oldState.personnage[carac] <= 0 || oldState.nbPointsDisponibles >= 7) return null;
            const newPointCarac = oldState.personnage[carac] - 1;
            const newPerso = {...oldState.personnage};
            const newNbPointsDisponible = oldState.nbPointsDisponibles + 1;
            newPerso[carac] = newPointCarac;
            return {
                personnage:newPerso,
                nbPointsDisponibles : newNbPointsDisponible
            }
        })
    }
    handleAjouterPoint = (carac) => {
        this.setState((oldState,props) => {
            if(oldState.personnage[carac] >= 5 || oldState.nbPointsDisponibles <= 0) return null;
            const newPointCarac = oldState.personnage[carac] + 1;
            const newPerso = {...oldState.personnage};
            const newNbPointsDisponible = oldState.nbPointsDisponibles - 1;
            newPerso[carac] = newPointCarac;
            return {
                personnage:newPerso,
                nbPointsDisponibles : newNbPointsDisponible
            }
        })
    }

    handleChangeArmePersonnage = (arme) => {
        const newPerso = {...this.state.personnage};
        newPerso.arme = arme;
        this.setState({personnage:newPerso});
    }

    handleReinitialisation = () => {
        this.setState({
            personnage : {
                image : 1,
                force : 0,
                agilite : 0,
                intelligence : 0,
                arme:null
            },
            nbPointsDisponibles : 7,
            armes : ["epee","fleau","arc","hache"]
        })
    }
    handleValidation = () => {
        this.setState({loading:true});
        const player = {
            perso: {...this.state.personnage},
            nom: this.state.nom
        }
        axios.post("https://creaperso-9a79c-default-rtdb.europe-west1.firebasedatabase.app//persos.json",player)
            .then(reponse => {
                console.log(reponse)
                this.setState({loading:false});
                this.handleReinitialisation();
                this.props.refresh();
            })
            .catch(error => {
                console.log(error)
                this.setState({loading:false});
                this.handleReinitialisation();
            })

    }

    render() {
        return (
            <div className="container mx-auto">
                <TitreH1>Créateur de personnage</TitreH1>
                {
                    this.state.loading && <div>Chargement...</div>
                }
                <div className="form-group flex flex-row items-center justify-center">
                    <label htmlFor="inputName">Nom : </label>
                    <input type="text" className="ml-1 form-control border shadow" id="inputName" value={this.state.nom} onChange={event => this.setState({nom:event.target.value})} />
                </div>
                <Personnage 
                    {...this.state.personnage}
                    precedente={this.handleImagePrecedente}
                    suivante={this.handleImageSuivante}
                    nbPointsDisponibles= {this.state.nbPointsDisponibles}
                    enleverPoint = {this.handleEnleverPoint}
                    ajouterPoint = {this.handleAjouterPoint}x
                />
                {
                    this.state.armes &&
                    <Armes 
                        listeArmes = {this.state.armes}
                        changeArme = {this.handleChangeArmePersonnage}
                        currentArme = {this.state.personnage.arme}
                    />
                }
                <div className="flex flex-row items-center justify-center mt-6">
                    <Bouton typeBtn="btn-danger" css="bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:border-red-500 rounded mr-2 shadow-red-500/50 shadow-lg" clic={this.handleReinitialisation}>Réinitialiser</Bouton>
                    <Bouton typeBtn="btn-success" css="bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 border-b-4 border-green-700 hover:border-green-500 rounded ml-2 shadow-green-500/50 shadow-lg" clic={this.handleValidation}>Créer</Bouton>
                </div>
            </div>
        );
    }
}

export default CreateurPersonnage;