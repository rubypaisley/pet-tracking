import React from 'react';
import { Link } from 'react-router-dom';

const PetCard = ({ pet }) => {
    const dog = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGBzrAOgk0dFjdsLMLr-hRvo5L0bwSAyw_Wn4ei_zIT6qVPf0VYA";
    const cat = "https://i.pinimg.com/564x/96/b6/5e/96b65eaf8e35d5fee9575a7ee0eaf9e6.jpg";
    return (
        <div className="card" style={{ width: 300 }}>
            <img className="card-image-top" height="200" src={pet.petType === 'cat' ? cat : dog} />
            <div className="card-contents">
                <h4 className="card-title">{pet.name}</h4>
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
