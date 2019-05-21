import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';
import firebase from './firebase';

class View extends Component {
    constructor() {
        super();
        this.state = {
            name: '',
            category: '',
            data: []
        };
    }
    componentDidMount() {
        const petRef = firebase.database().ref(`pets/${this.props.match.params.id}`);
        petRef.on("value", (snapshot) => {
            let pet = snapshot.val();
            this.setState({ name: pet.name });
        });
        const dataRef = firebase.database().ref(`pets/${this.props.match.params.id}/behavior`);
        dataRef.on("value", (snapshot) => {
            let data = snapshot.val();
            let newState = [];
            for (let datapoint in data) {
                newState.push({
                    date: data[datapoint].date,
                    energy: data[datapoint].energy,
                    affection: data[datapoint].affection,
                    aggression: data[datapoint].aggression,
                    playfulness: data[datapoint].playfulness,
                    curiousity: data[datapoint].curiousity
                });
            }
            this.setState({ data: newState });

        })
    }
    handleChange = (evt) => {
        this.setState({
            category: evt.target.value
        });
    }
    render() {
        const name = this.state.name;
        const categories = ['energy', 'affection', 'aggression', 'playfulness', 'curiousity'];
        const myData = this.state.data.map(datapoint => ({
            x: datapoint.date,
            y: datapoint[this.state.category]
        }))
        let data;
        if (this.state.data.length) {
            data = {
                labels: this.state.data.map(datapoint => {
                    const date = new Date(datapoint.date);
                    const month = date.getMonth();
                    const day = date.getDate();
                    const hour = date.getHours();
                    const minutes = date.getMinutes();
                    return `${month}/${day} ${hour}:${minutes}`
                }),
                datasets: [{
                    label: `${this.state.name}'s ${this.state.category} Fluctuation`,
                    backgroundColor: 'rgb(255, 99, 132)',
                    borderColor: 'rgb(255, 99, 132)',
                    data: myData,
                    fill: false,

                }]
            };
        }
        return (
            <div>
                <h3>{name}'s Mood and Behavior Tracker</h3>
                <form>
                    <select name="category" value={this.state.category} onChange={this.handleChange}>
                        <option>--Please Select a Category--</option>
                        {categories.map(cat => (<option key={cat} value={cat}>
                            {cat}
                        </option>))}
                    </select>
                </form>
                {this.state.category.length ? (<Line data={data} />) : ('')}
            </div >
        )
    }
}
export default View;