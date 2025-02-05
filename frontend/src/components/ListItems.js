import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ListItems = () => {
  const [items, setItems] = useState([]);

  // Fetch items from the backend on component mount
  const fetchItems = async () => {
    try {
        console.log("sdfsdfsdhfghsgdfhsf");
      const response = await axios.get('http://localhost:5000/api//items/list');  // Make sure this URL matches your backend
      setItems(response.data);
    } catch (error) {
      console.error('Failed to fetch items:', error);
    }
  };

  // Use useEffect to call fetchItems when the component mounts
  useEffect(() => {
    fetchItems();
  }, []);  // Empty dependency array means it will run once, on initial render

  return (
    <div>
      <h2>Item List</h2>
      <ul>
        {items.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default ListItems;
