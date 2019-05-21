import React, { Component } from 'react';
import firebase from './firebase';

class Survey extends Component {
    constructor() {
        super();
        this.state = {
            name: '',
            energy: '',
            affection: '',
            aggression: '',
            playfulness: '',
            curiousity: ''
        };
    }
    componentDidMount() {
        const petRef = firebase.database().ref(`/pets/${this.props.match.params.id}`);
        petRef.on("value", (snapshot) => {
            let pet = snapshot.val();
            this.setState({name: pet.name});
        });
    }
    handleChange = (evt) => {
        this.setState({
            [evt.target.name]: evt.target.value
        });
    }
    handleSubmit = (evt) => {
        evt.preventDefault();
        const behaviorRef = firebase.database().ref(`/pets/${this.props.match.params.id}/behavior`);
        console.log(behaviorRef);

        behaviorRef.push({
            ...this.state,
            date: firebase.database.ServerValue.TIMESTAMP
        });
        this.setState({
            energy: '',
            affection: '',
            aggression: '',
            playfulness: '',
            curiousity: ''
        });
        this.props.history.push('/')
    }
    render() {

        const categories = ['energy', 'affection', 'aggression', 'playfulness', 'curiousity'];
        return (
            <div>
                <form className="form-group" onSubmit={this.handleSubmit}>
                    <div>Please rate {this.state.name}'s' current mood in each category, 1 being the lowest, and 5 being the maximum</div>
                    {categories.map(cat => (<div key={cat}>
                        <label htmlFor={cat}>{cat}</label>
                        <select className="form-control" name={cat} value={this.state.cat} onChange={this.handleChange}>
                            <option value="">--Please Select a Value--</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                    </div>))}
                    <button type="submit">Submit</button>
                </form>
            </div>
        )
    }
}



export default Survey;