import React, { Component } from 'react';
import firebase from './firebase';
import { Bar } from 'react-chartjs-2';

class Compare extends Component {
    constructor() {
        super();
        this.state = {
            name: '',
            category: '',
            behaviorMap: [],
        };
    }
    componentDidMount() {
        const petRef = firebase.database().ref(`pets/${this.props.match.params.id}`);
        petRef.on("value", (snapshot) => {
            let pet = snapshot.val();
            this.setState({ name: pet.name });
        });
        const behaviorMap = [];
        const petsRef = firebase.database().ref("pets");
        petsRef.on("value", (snapshot) => {
            let pets = snapshot.val();
            for (let pet in pets) {
                behaviorMap.push({
                    [pet]: pets[pet].behavior
                })
            }
            this.setState({ behaviorMap }, () => console.log(this.state));
        });

    }

    render() {
        const categories = ['energy', 'affection', 'aggression', 'playfulness', 'curiousity'];
        let currentPetArr = [];
        let avgArr = [];
        if (this.state.behaviorMap.length) {
            categories.forEach(cat => {
                const catMap = this.state.behaviorMap.reduce((accum, pet) => {
                    for (let key in pet) {
                        const behav = pet[key];
                        if (behav) {
                            Object.keys(behav).forEach(instance => {
                                console.log(this.props.match.params.id)
                                console.log(key)
                                if (this.props.match.params.id === key) {
                                    console.log('true')
                                    accum.currentPet.push(behav[instance][cat]);
                                    console.log(accum.currentPet)
                                }
                                console.log(behav[instance][cat])
                                accum.total.push(behav[instance][cat]);
                            });
                        }
                        return accum;
                    }
                }, { currentPet: [], total: [] });
                const currentPetAvg = catMap.currentPet.reduce((accum, num) => (accum + parseInt(num, 10)), 0);
                const globalAvg = catMap.total.reduce((accum, num) => (accum + parseInt(num, 10)), 0);
                currentPetArr.push(currentPetAvg / catMap.currentPet.length);
                avgArr.push(globalAvg / catMap.total.length);
            });
        }
        const data = {
            labels: categories,
            datasets: [{
                label: `${this.state.name}'s average`,
                data: currentPetArr,
                backgroundColor: 'rgb(244, 161, 66)'
            },
            {
                label: "All Pets' Average",
                data: avgArr,
                backgroundColor: 'rgb(135, 67, 204)'
            }]
        }
        return (
            <div>
                <h3>How {this.state.name} stacks up against other pets:</h3>
                <Bar data={data} />
            </div>
        )
    }
}
export default Compare;
