// services/shoppingService.ts
import { ShoppingItem } from '../models/shoppingItem';

const shoppingList: ShoppingItem[] = [];

export default class ShoppingService {
  static getAllItems(): ShoppingItem[] {
    return shoppingList;
  }

  static addItem(item: ShoppingItem): ShoppingItem {
    shoppingList.push(item);
    return item;
  }

  static updateItem(id: number, updatedItem: ShoppingItem): ShoppingItem | null {
    const itemIndex = shoppingList.findIndex((item) => item.id === id);
    if (itemIndex === -1) {
      return null; // Item not found
    }

    shoppingList[itemIndex] = { ...shoppingList[itemIndex], ...updatedItem };
    return shoppingList[itemIndex];
  }

  static removeItem(id: number): boolean {
    const itemIndex = shoppingList.findIndex((item) => item.id === id);
    if (itemIndex === -1) {
      return false; // Item not found
    }

    shoppingList.splice(itemIndex, 1);
    return true; // Item removed
  }
}
