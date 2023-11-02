// src/index.ts
import express from 'express';
import { ShoppingItem } from './models/shoppingItem';
import ShoppingService from './services/shoppingService';

const app = express();
app.use(express.json());

app.get('/shopping-list', (req, res) => {
  const shoppingItems = ShoppingService.getAllItems();
  res.json(shoppingItems);
});

app.post('/shopping-list', (req, res) => {
  const newItem: ShoppingItem = req.body;
  const addedItem = ShoppingService.addItem(newItem);
  res.status(201).json(addedItem);
});

app.put('/shopping-list/:id', (req, res) => {
  const { id } = req.params;
  const updatedItem: ShoppingItem = req.body;
  const updated = ShoppingService.updateItem(parseInt(id), updatedItem);

  if (!updated) {
    return res.status(404).json({ message: 'Item not found' });
  }

  res.json(updated);
});

app.delete('/shopping-list/:id', (req, res) => {
  const { id } = req.params;
  const removed = ShoppingService.removeItem(parseInt(id));

  if (!removed) {
    return res.status(404).json({ message: 'Item not found' });
  }

  res.json({ message: 'Item removed' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
