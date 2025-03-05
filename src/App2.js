import React, { useState, useEffect } from "react";
import axios from "axios";

const ToggleList = () => {
  const [items, setItems] = useState([]); // Store API data
  const [selectedItem, setSelectedItem] = useState(null); // Track selected item

  // API URL
  const apiUrl = "https://mrcartonline.com/kitty/index.php/User/getAllBrandList";

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(apiUrl);
        setItems(response.data?.data || []); // Assuming data is inside response.data.data
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  // Toggle function to show/hide details
  const toggleDetails = (id) => {
    setSelectedItem(selectedItem === id ? null : id);
  };

  return (
    <div className="container mt-4">
      <h3>Brand List</h3>
      <ul className="list-group">
        {items.map((item) => (
          <li
            key={item.id}
            className="list-group-item"
            onClick={() => toggleDetails(item.id)}
            style={{ cursor: "pointer" }}
          >
            <strong>{item.brand_name}</strong>
            {selectedItem === item.id && (
              <div className="mt-2">
                <p><b>Description:</b> {item.description}</p>
                <img
                  src={`https://moneyrain.in/kitty/assets/images/brand/${item.brand_image}`}
                  alt={item.brand_name}
                  width="100"
                />
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ToggleList;
