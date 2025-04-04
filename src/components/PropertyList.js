import React from 'react';
import './PropertyList.css';

const PropertyList = ({ properties, onPropertySelect, onAddToFavourites, onDragStart }) => {
  return (
    <div className="property-list">
      {/* Iterate over the properties array and create a card for each property */}
      {properties.map(property => (
        <div 
          key={property.id} // Unique key for each property card
          className="property-card"
          draggable // Enables drag-and-drop functionality
          onDragStart={(e) => onDragStart(e, property)} // Handle drag start event for the property
        >
          {/* Property image with click event to view property details */}
          <img 
            src={property.picture} 
            alt={property.description} 
            onClick={() => onPropertySelect(property)}
          />
          <div className="property-info">
            <h3>{property.location}</h3>
            <p>{property.description} </p>
            <p>£{property.price.toLocaleString()}</p>
            <p>{property.bedrooms} bedrooms </p>
            <button onClick={() => onAddToFavourites(property)}>
              Add to Favourites
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PropertyList;