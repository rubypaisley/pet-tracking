import React, { Component } from 'react';
import firebase from './firebase';

class AddPet extends Component {
    constructor() {
        super();
        this.state = {
            name: '',
            petType: ''
        }
    }
    handleChange = (evt) => {
        this.setState({
            [evt.target.name]: evt.target.value
        });
    }
    handleOptionChange = (evt) => {
        this.setState({
            petType: evt.target.value
        });
    }
    handleSubmit = (evt) => {
        evt.preventDefault();
        const petsRef = firebase.database().ref('pets');
        const pet = this.state;
        petsRef.push(pet);
        this.setState({
            name: '',
            petType: ''
        });

    }
    render() {
        return (
            <div className="card" style={{ width: 300 }}>
                <h4 className="card-header">Add Pet:</h4>
                <div >
                    <form onSubmit={this.handleSubmit} className="form-group">
                        <label htmlFor="name">Pet's Name:</label>
                        <input className="form-control" type="text" name="name" placeholder="Your pet's name" value={this.state.name} onChange={this.handleChange} />
                        <div>
                            <div className="form-check">
                                <label className="form-check-label">
                                    <input type="radio" value="cat" className="form-check-input"
                                        checked={this.state.petType === 'cat'}
                                        onChange={this.handleOptionChange} />
                                    Cat
                                </label>
                            </div>
                            <div className="form-check">
                                <label className="form-check-label">
                                    <input type="radio" value="dog" className="form-check-input"
                                        checked={this.state.petType === 'dog'}
                                        onChange={this.handleOptionChange} />
                                    Dog
                                </label>
                            </div>
                        </div>
                        <button className="btn btn-primary">Save Pet</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default AddPet;