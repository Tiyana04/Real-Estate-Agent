import React, { useState, useEffect } from 'react';
import SearchForm from './components/SearchForm';
import PropertyList from './components/PropertyList';
import FavouritesList from './components/FavouritesList';
import PropertyDetails from './components/PropertyDetails';
import propertiesData from './properties.json';
import { Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';

const App = () => {
  // Manage property data, filtered results, favourites, and the currently selected property
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [favourites, setFavourites] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState(null);
  // To navigate between pages using React Router
  const navigate = useNavigate();

  // To initialize property data and load favourites from localStorage
  useEffect(() => {
    setProperties(propertiesData.properties); // Load property data from JSON
    const savedFavourites = localStorage.getItem('favourites'); // Get saved favourites
    if (savedFavourites) {
      setFavourites(JSON.parse(savedFavourites)); // Parse and set favourites if they exist
    }
  }, []);

  // Function to convert month names to numeric indexes
  const getMonthNumber = (monthName) => {
    const months = {
      'January': 0, 'February': 1, 'March': 2, 'April': 3, 'May': 4, 'June': 5,
      'July': 6, 'August': 7, 'September': 8, 'October': 9, 'November': 10, 'December': 11
    };
    return months[monthName];
  };

  // Function to handle filtering of properties based on user search criteria
  const handleSearch = (criteria) => {
    let filtered = properties;

    // Filter by property type
    if (criteria.type) {
      filtered = filtered.filter(p => p.type === criteria.type);
    }

    // Filter by price range
    if (criteria.minPrice) {
      filtered = filtered.filter(p => p.price >= parseInt(criteria.minPrice));
    }
    if (criteria.maxPrice) {
      filtered = filtered.filter(p => p.price <= parseInt(criteria.maxPrice));
    }

    // Filter by bedroom count
    if (criteria.minBedrooms) {
      filtered = filtered.filter(p => p.bedrooms >= parseInt(criteria.minBedrooms));
    }
    if (criteria.maxBedrooms) {
      filtered = filtered.filter(p => p.bedrooms <= parseInt(criteria.maxBedrooms));
    }

    // Filter by date added (after a specific date)
    if (criteria.dateAfter) {
      filtered = filtered.filter(p => {
        const propertyDate = new Date(p.added.year, getMonthNumber(p.added.month), p.added.day);
        return propertyDate >= criteria.dateAfter;
      });
    }

    // Filter by postcode
    if (criteria.postcode) {
      filtered = filtered.filter(p => 
        p.location.toUpperCase().includes(criteria.postcode.toUpperCase())
      );
    }

    setFilteredProperties(filtered); // Update filtered properties state
  };

  // Function to add a property to the favourites list
  const addToFavourites = (property) => {
    if (!favourites.find(f => f.id === property.id)) {
      const newFavourites = [...favourites, property];
      setFavourites(newFavourites); // Update favourites state
      localStorage.setItem('favourites', JSON.stringify(newFavourites)); // Save to localStorage
    }
  };

  // Function to remove a property from the favourites list
  const removeFromFavourites = (propertyId) => {
    const newFavourites = favourites.filter(f => f.id !== propertyId);
    setFavourites(newFavourites); 
    localStorage.setItem('favourites', JSON.stringify(newFavourites)); 
  };

  // Function to clear all favourites
  const clearFavourites = () => {
    setFavourites([]); // Clear favourites state
    localStorage.removeItem('favourites'); // Remove from localStorage
  };

  // Function to handle property selection and navigate to the details page
  const handlePropertySelect = (property) => {
    setSelectedProperty(property); 
    navigate(`/property/${property.id}`); // Navigate to property details route
  };

  // Drag-and-drop event handlers for adding properties to favourites
  const handleDragStart = (e, property) => {
    e.dataTransfer.setData('propertyId', property.id); // Set property ID as drag data
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const propertyId = e.dataTransfer.getData('propertyId'); // Retrieve property ID from drag data
    const property = properties.find(p => p.id === propertyId);
    if (property) {
      addToFavourites(property); // Add property to favourites
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Estate Agent Property Search</h1>
        <p id="header-desc">Find your dream property with ease. Tailor your search to fit your needs and save your favorites!</p>
      </header>

      <Routes>
        {/* Route for the main search and favourites page */}
        <Route path="/" element={
          <div className="main-content">
            <div className="search-section">
              <SearchForm onSearch={handleSearch}/> {/* Search form component */}
              <PropertyList 
                properties={filteredProperties.length ? filteredProperties : properties} // Display filtered or all properties
                onPropertySelect={handlePropertySelect} // Callback for property selection
                onDragStart={handleDragStart} // Drag start event handler
                onAddToFavourites={addToFavourites} // Callback for adding to favourites
              />
            </div>
            <div 
              className="favourites-section"
              onDragOver={(e) => e.preventDefault()} // Prevent default drag behavior
              onDrop={handleDrop}
            >
              <FavouritesList 
                favourites={favourites} // Pass favourites to the component
                onRemove={removeFromFavourites} 
                onClear={clearFavourites} 
              />
            </div>
          </div>
        } />
        
        {/* Route for property details page */}
        <Route 
          path="/property/:id" 
          element={
            <PropertyDetails 
              property={selectedProperty} // Pass selected property to the details component
              onBack={() => navigate('/')}  
              onAddToFavourites={addToFavourites} 
            />
          } 
        />
      </Routes>
    </div>
  );
};

export default App;