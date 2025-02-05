import React, { useState } from 'react';
import axios from 'axios';

const AddItem = ({ fetchItems }) => {
  const [name, setName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/add', { name });
      fetchItems(); // Refresh the item list
      setName('');
    } catch (err) {
      console.error('Failed to add item', err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter item name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <button type="submit">Add Item</button>
    </form>
  );
};

export default AddItem;
