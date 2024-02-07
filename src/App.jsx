import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, FormControl, InputGroup, ListGroup } from 'react-bootstrap';

function App() {
  const [items, setItems] = useState([]);
  const [itemName, setItemName] = useState('');
  const [itemCount, setItemCount] = useState(0);

  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem('stockItems')) || [];
    setItems(storedItems);
  }, []);

  useEffect(() => {
    localStorage.setItem('stockItems', JSON.stringify(items));
  }, [items]);

  const addItem = () => {
    if (itemName.trim() !== '') {
      const newItem = { id: uuidv4(), name: itemName, count: parseInt(itemCount, 10) };
      setItems([...items, newItem]);
      setItemName('');
      setItemCount(0);
    }
  };

  const removeItem = (itemId) => {
    const updatedItems = items.filter((item) => item.id !== itemId);
    setItems(updatedItems);
  };

  const increaseCount = (itemId) => {
    const updatedItems = items.map((item) =>
      item.id === itemId ? { ...item, count: item.count + 1 } : item
    );
    setItems(updatedItems);
  };

  const decreaseCount = (itemId) => {
    const updatedItems = items.map((item) =>
      item.id === itemId && item.count > 0 ? { ...item, count: item.count - 1 } : item
    );
    setItems(updatedItems);
  };

  return (
    <div className="container mt-4">
      <h1>Stok Takip</h1>
      <InputGroup className="mb-3">
        <FormControl
          placeholder="Ürün Adı"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
        />
        <FormControl
          type="number"
          placeholder="Stok Adedi"
          value={itemCount}
          onChange={(e) => setItemCount(e.target.value)}
        />
        <Button variant="primary" onClick={addItem}>
          Ekle
        </Button>
      </InputGroup>
      <ListGroup>
        {items.map((item) => (
          <ListGroup.Item
            key={item.id}
            className={`d-flex justify-content-between align-items-center ${
              item.count === 0 ? 'text-danger' : ''
            }`}
          >
            <div>
              {item.name} - Stok: {item.count}
            </div>
            <div>
              <Button variant="success" className="me-2" onClick={() => increaseCount(item.id)}>
                +
              </Button>
              <Button variant="warning" className="me-2" onClick={() => decreaseCount(item.id)}>
                -
              </Button>
              <Button variant="danger" onClick={() => removeItem(item.id)}>
                Sil
              </Button>
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
}

export default App;
