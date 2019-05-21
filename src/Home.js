import React, { Component } from 'react';
import AddPet from './AddPet';
import PetCard from './PetCard';
import firebase from './firebase';

class Home extends Component {
    constructor() {
        super();
        this.state = {
            pets: []
        }
    }
    componentDidMount() {
        const petsRef = firebase.database().ref('pets');
        petsRef.on("value", (snapshot) => {
            let pets = snapshot.val();
            let newState = [];
            for (let pet in pets) {
                newState.push({
                    id: pet,
                    name: pets[pet].name,
                    petType: pets[pet].petType
                });
            }
            this.setState({ pets: newState });

        })
    }
    render() {
        const pets = this.state.pets;
        return (

            <div className="d-flex flex-row flex-wrap justify-content-around">
                <AddPet />
                {pets.length ? (
                    pets.map(pet => (
                        <PetCard pet={pet} />
                    ))
                ) : ''}
            </div>

        )
    }
}

export default Home;