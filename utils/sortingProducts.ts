import { InventoryItem } from "../types/InventoryItem";

export const sortingCases = [
  {
    name: "A to Z",
    option: "az",
    sortFn: sortItemsAtoZ,
  },
  {
    name: "Z to A",
    option: "za",
    sortFn: sortItemsZtoA,
  },
  {
    name: "Price Low to High",
    option: "lohi",
    sortFn: sortItemsPriceLowToHigh,
  },
  {
    name: "Price High to Low",
    option: "hilo",
    sortFn: sortItemsPriceHighToLow,
  },
];

export function sortItemsAtoZ(items: InventoryItem[]): InventoryItem[] {
  return [...items].sort((a, b) => a.itemName.localeCompare(b.itemName));
}

export function sortItemsZtoA(items: InventoryItem[]): InventoryItem[] {
  return [...items].sort((a, b) => b.itemName.localeCompare(a.itemName));
}

export function sortItemsPriceLowToHigh(
  items: InventoryItem[]
): InventoryItem[] {
  return [...items].sort((a, b) => a.itemPrice - b.itemPrice);
}

export function sortItemsPriceHighToLow(
  items: InventoryItem[]
): InventoryItem[] {
  return [...items].sort((a, b) => b.itemPrice - a.itemPrice);
}
