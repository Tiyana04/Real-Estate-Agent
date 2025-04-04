import React, { useState } from 'react';
import { Tabs, TabList, Tab, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import './PropertyDetails.css';

const PropertyDetails = ({ property, onBack, onAddToFavourites }) => {
  const [currentImage, setCurrentImage] = useState(0);

  // If property data is not available, display a loading message
  if (!property) return <div>Loading...</div>;

  // Remove duplicate images and limit the gallery to 6 unique images
  const uniqueImages = [...new Set(property.pictures)].slice(0, 6);

  return (
    <div className="property-details">
      <button onClick={onBack}>Back to Search</button>

      {/* Image Gallery */}
      <div className="image-gallery">
        {/* Display the main image */}
        <img
          src={uniqueImages[currentImage]}
          alt={`${currentImage + 1} of the property`}
          className="main-image"
        />
        
        {/* Thumbnails */}
        <div className="thumbnails">
          {uniqueImages.map((pic, index) => (
            <img
              key={index}
              src={pic}
              alt={`Thumbnail ${index + 1}`}
              className={`thumbnail ${currentImage === index ? 'active' : ''}`}
              onClick={() => setCurrentImage(index)} // Change the main image when a thumbnail is clicked
            />
          ))}
        </div>
      </div>

      {/* Tabs for Long Description, Floor Plan, and Map */}
      <Tabs>
        <TabList>
          <Tab>Description</Tab>
          <Tab>Floor Plan</Tab>
          <Tab>Location</Tab>
        </TabList>

        {/* Tab Panel for Description */}
        <TabPanel>
          <p>{property.longDescription}</p>
        </TabPanel>

        {/* Tab Panel for Floor Plan */}
        <TabPanel>
          <img
            src={property.floorPlan}
            alt="Floor plan of the property"
            className="floor-plan"
          />
        </TabPanel>

        {/* Tab Panel for Location */}
        <TabPanel>
          <iframe
            src={property.map}
            title="Google Map Location"
            width="100%"
            height="400px"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </TabPanel>
      </Tabs>

      {/* Short Details and Favourite Button */}
      <div className="details-section">
        <h2>{property.location}</h2>
        <p>Type: {property.type}</p>
        <p>Price: £{property.price.toLocaleString()}</p>
        <p>Bedrooms: {property.bedrooms}</p>
        <button onClick={() => onAddToFavourites(property)}>
          Add to Favourites
        </button>
      </div>
    </div>
  );
};

export default PropertyDetails;