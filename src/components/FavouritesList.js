import React from 'react';
import './FavouritesList.css';

const FavouritesList = ({ favourites, onRemove, onClear }) => {
  return (
    <div className="favourites-list">
      <h2> Favourites </h2>

      {/* Map over the favourites array and display each favourite property */}
      {favourites.map(property => (
        <div key={property.id} className="favorite-item">
          {/* Display the location of the property */}
          <span>{property.location}</span>
          <button onClick={() => onRemove(property.id)}> Remove </button>
        </div>
      ))}
      <button onClick={onClear}> Clear All </button>
    </div>
  );
};

export default FavouritesList;