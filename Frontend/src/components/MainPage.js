import React, { useEffect, useState } from 'react';
import './MainPage.css'; // Make sure to have the corresponding CSS file

const App = () => {
  const [foodData, setFoodData] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [filteredFoodData, setFilteredFoodData] = useState([]);

  useEffect(() => {
    // Function to fetch data from the server
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/menu');
        const data = await response.json();
        setFoodData(data);
        setFilteredFoodData(data); // Initialize filtered data with all food items
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    // Call the fetch function
    fetchData();
  }, []); // Empty dependency array ensures the effect runs once when the component mounts

  // Update filtered data when searchInput changes
  useEffect(() => {
    const filteredData = foodData.filter(food =>
      food.name.toLowerCase().includes(searchInput.toLowerCase())
    );
    setFilteredFoodData(filteredData);
  }, [searchInput, foodData]);

  return (
    <div className="container">
      <div className="header">
        <div className="logo">
          <img src="./images/Foody.svg" alt="Logo" style={{ height: '40px' }} />
        </div>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search Food..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </div>
      </div>
      <div className="buttons">
        <button>All</button>
        <button>Breakfast</button>
        <button>Lunch</button>
        <button>Dinner</button>
      </div>

      {/* Add the image below the existing content */}
      <div className="image-container">
        {/* Update the background image path and styles */}
        <img src="./images/bg.png" alt="bgi" className="background-image" />
      </div>
     
      {/* Display fetched data or "Not Found" message */}
      <div className="food-list">
      {filteredFoodData.length === 0 && searchInput && (
        <p>Not Found</p>
      )}
      {filteredFoodData.map((food, index) => (
        <div key={index} className="food-item">
          <img src={`http://localhost:5000${food.image}`} alt={food.name} />
          <div className="food-details">
            <h3>{food.name}</h3>
            <p>{food.text}</p>
            <p>Type: {food.type}</p>
            <p className="food-price">${food.price}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);
};

export default App;
