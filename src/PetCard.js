import React from 'react';
import { Link } from 'react-router-dom';

const PetCard = ({ pet }) => {
    return (
        <div className="card" style={{ width: 300 }}>
            <h4 className="card-header">{pet.name}</h4>
            <div className="card-contents">
                <ul>
                    <li><Link to={`/${pet.id}/survey`}>Evaluate Current Mood</Link></li>
                    <li><Link to={`/${pet.id}/view`}>View Pet</Link></li>
                    <li><Link to={`/${pet.id}/compare`}>Compare</Link></li>
                </ul>
            </div>
        </div>
    )
}

export default PetCard;
