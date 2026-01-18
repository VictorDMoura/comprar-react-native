import AsyncStorage from "@react-native-async-storage/async-storage";
import { FilterStatus } from "@/types/FilterStatus";

const ITEMS_STORAGE_KEY = "@comprar:items";

export type ItemStorage = {
  id: string;
  status: FilterStatus;
  description: string;
};

async function get(): Promise<ItemStorage[]> {
  try {
    const itemsStorage = await AsyncStorage.getItem(ITEMS_STORAGE_KEY);
    return itemsStorage ? JSON.parse(itemsStorage) : [];
  } catch (error) {
    throw new Error("GET_ITEMS: " + error);
  }
}

async function getByStatus(status: FilterStatus): Promise<ItemStorage[]> {
  try {
    const allItems = await get();
    return allItems.filter((item) => item.status === status);
  } catch (error) {
    throw new Error("GET_ITEMS_BY_STATUS: " + error);
  }
}

async function save(items: ItemStorage[]): Promise<void> {
  try {
    await AsyncStorage.setItem(ITEMS_STORAGE_KEY, JSON.stringify(items));
  } catch (error) {
    throw new Error("SAVE_ITEMS: " + error);
  }
}

async function add(newItem: ItemStorage): Promise<ItemStorage[]> {
  const items = await get();
  const updatedItems = items.concat(newItem);
  await save(updatedItems);
  return updatedItems;
}

async function remove(itemId: string): Promise<ItemStorage[]> {
  const items = await get();
  const updatedItems = items.filter((item) => item.id !== itemId);
  await save(updatedItems);
  return updatedItems;
}

async function update(updatedItem: ItemStorage): Promise<ItemStorage[]> {
  const items = await get();
  const updatedItems = items.map((item) =>
    item.id === updatedItem.id ? updatedItem : item,
  );
  await save(updatedItems);
  return updatedItems;
}

async function clear(): Promise<void> {
  try {
    await AsyncStorage.removeItem(ITEMS_STORAGE_KEY);
  } catch (error) {
    throw new Error("CLEAR_ITEMS: " + error);
  }
}

export const itemsStorage = {
  get,
  getByStatus,
  add,
  remove,
  update,
  clear,
};