import React, { useState } from 'react';
import './SearchForm.css';

const SearchForm = ({ onSearch }) => {
  // To manage search criteria, initialized with default values
  const [criteria, setCriteria] = useState({
    type: '',
    minPrice: '',
    maxPrice: '',
    minBedrooms: '',
    maxBedrooms: '',
    dateAfter: '',
    postcode: ''
  });

  // Handler for form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(criteria); // Call the onSearch function with the current search criteria
  };

  return (
    <form onSubmit={handleSubmit} className="search-form">
      {/* Dropdown for selecting property type */}
      <div className="form-group">
        <label> Property Type </label>
        <select 
          value={criteria.type} // Controlled component for property type
          onChange={e => setCriteria({...criteria, type: e.target.value})} // Update state on change
        >
          <option value=""> Any </option>
          <option value="House"> House </option>
          <option value="Flat"> Flat </option>
        </select>
      </div>

      {/* Inputs for specifying a price range */}
      <div className="form-group">
        <label> Price Range </label>
        <input
          type="number"
          placeholder="Min Price"
          value={criteria.minPrice}
          onChange={e => setCriteria({...criteria, minPrice: e.target.value})} // Update state on change
        />
        <input
          type="number"
          placeholder="Max Price"
          value={criteria.maxPrice}
          onChange={e => setCriteria({...criteria, maxPrice: e.target.value})}
        />
      </div>

      {/* Inputs for specifying the number of bedrooms */}
      <div className="form-group">
        <label> Bedrooms </label>
        <input
          type="number"
          placeholder="Min Bedrooms"
          value={criteria.minBedrooms}
          onChange={e => setCriteria({...criteria, minBedrooms: e.target.value})}
        />
        <input
          type="number"
          placeholder="Max Bedrooms"
          value={criteria.maxBedrooms}
          onChange={e => setCriteria({...criteria, maxBedrooms: e.target.value})}
        />
      </div>

      {/* Input for specifying the date filter */}
      <div className="form-group">
        <label> Date After </label>
        <input
          type="date"
          value={criteria.dateAfter}
          onChange={e => setCriteria({...criteria, dateAfter: e.target.value})}
        />
      </div>

      {/* Input for specifying the postcode area */}
      <div className="form-group">
        <label>Postcode Area</label>
        <input
          type="text"
          placeholder="e.g. BR1"
          value={criteria.postcode}
          onChange={e => setCriteria({...criteria, postcode: e.target.value})}
        />
      </div>

      <button type="submit"> Search Properties </button>
    </form>
  );
};

export default SearchForm;