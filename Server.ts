import express from 'express';
import { check, validationResult } from 'express-validator';

const app = express();
app.use(express.json());

// Lista de compras (simulada como um array)
const shoppingList: { id: number; item: string; completed: boolean }[] = [];

// Rota para obter a lista de compras
app.get('/shopping-list', (req, res) => {
  res.json(shoppingList);
});

// Rota para adicionar um item à lista de compras
app.post(
  '/shopping-list',
  [check('item').notEmpty()],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { item } = req.body;
    const newItem = {
      id: shoppingList.length + 1,
      item,
      completed: false,
    };
    shoppingList.push(newItem);
    res.status(201).json(newItem);
  }
);

// Rota para marcar um item como concluído
app.put('/shopping-list/:id', (req, res) => {
  const { id } = req.params;
  const item = shoppingList.find((it) => it.id === parseInt(id));
  if (!item) {
    return res.status(404).json({ message: 'Item not found' });
  }
  item.completed = true;
  res.json(item);
});

// Rota para remover um item da lista de compras
app.delete('/shopping-list/:id', (req, res) => {
  const { id } = req.params;
  const index = shoppingList.findIndex((it) => it.id === parseInt(id));
  if (index === -1) {
    return res.status(404).json({ message: 'Item not found' });
  }
  shoppingList.splice(index, 1);
  res.json({ message: 'Item removed' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
