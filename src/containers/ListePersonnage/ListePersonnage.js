import React, { Component } from 'react';
import axios from "axios";
import Titre from "../../components/Titres/TitreH1";
import Personnage from "./Personnage/Personnage";

class ListePersonnage extends Component {
    state = {
        personnages : null,
        loading:false,
    }

    loadData = () => {
        this.setState({loading:true});
        axios.get("https://creaperso-9a79c-default-rtdb.europe-west1.firebasedatabase.app///persos.json")
            .then(reponse => {
                const personnages = Object.values(reponse.data);
                this.setState({
                    personnages,
                    loading:false
                });
            })
            .catch(error => {
                console.log(error);
                this.setState({loading:false});
            })
    }

    componentDidMount = () => {
       this.loadData();
    }

    componentDidUpdate = (oldProps, oldState) => {
        if(oldProps.refresh !== this.props.refresh){
            this.loadData();
        }
        
    }

    render() {
        return (
            <>
                {this.state.loading && <div>Chargement ...</div>}
                {!this.state.loading && this.state.personnages && 
                    <div className="flex flew-row mt-7">
                        {this.state.personnages.map((perso,indice) => {
                            {/* console.log(perso); */}
                            return (
                                <div className="items-center justify-center" key={indice}>
                                    <Titre>{perso.nom}</Titre>
                                    <Personnage {...perso.perso}/>
                                </div>
                            );
                        })}
                    </div>
                }
            </>
        );
    }
}

export default ListePersonnage;