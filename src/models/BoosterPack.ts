import {
  Item,
  ItemRarity,
  getRandomItemOfFairRarity,
  getRandomItemOfFairRarityAndFixedType,
  getFairRandomItemType,
} from './Item';

import { Inventory } from './Inventory';

export function openInconsistentBoosterpack(boosterRarity: ItemRarity, itemList: Item[]): Item[] {
  const boosterpackItems: Item[] = [];

  boosterpackItems.push(getRandomItemOfFairRarity(boosterRarity, itemList));
  boosterpackItems.push(getRandomItemOfFairRarity(boosterRarity, itemList));

  boosterpackItems.push(getRandomItemOfFairRarity(boosterRarity - 1, itemList));
  boosterpackItems.push(getRandomItemOfFairRarity(boosterRarity - 1, itemList));
  boosterpackItems.push(getRandomItemOfFairRarity(boosterRarity - 1, itemList));

  return boosterpackItems;
}

export function openConsistentBoosterpack(boosterRarity: ItemRarity, itemList: Item[]): Item[] {
  const boosterpackItems: Item[] = [];

  boosterpackItems.push(getRandomItemOfFairRarityAndFixedType(boosterRarity, itemList, getFairRandomItemType(boosterpackItems)));
  boosterpackItems.push(getRandomItemOfFairRarityAndFixedType(boosterRarity, itemList, getFairRandomItemType(boosterpackItems)));

  boosterpackItems.push(getRandomItemOfFairRarityAndFixedType(boosterRarity - 1, itemList, getFairRandomItemType(boosterpackItems)));
  boosterpackItems.push(getRandomItemOfFairRarityAndFixedType(boosterRarity - 1, itemList, getFairRandomItemType(boosterpackItems)));
  boosterpackItems.push(getRandomItemOfFairRarityAndFixedType(boosterRarity - 1, itemList, getFairRandomItemType(boosterpackItems)));

  return boosterpackItems;
}

export function openFairBoosterpack(boosterRarity: ItemRarity, itemList: Item[], inventory: Inventory): Item[] {
  const boosterpackItems: Item[] = [];
  inventory.items.push();
  boosterpackItems.push(getRandomItemOfFairRarityAndFixedType(boosterRarity, itemList, getFairRandomItemType(boosterpackItems)));
  boosterpackItems.push(getRandomItemOfFairRarityAndFixedType(boosterRarity, itemList, getFairRandomItemType(boosterpackItems)));

  boosterpackItems.push(getRandomItemOfFairRarityAndFixedType(boosterRarity - 1, itemList, getFairRandomItemType(boosterpackItems)));
  boosterpackItems.push(getRandomItemOfFairRarityAndFixedType(boosterRarity - 1, itemList, getFairRandomItemType(boosterpackItems)));
  boosterpackItems.push(getRandomItemOfFairRarityAndFixedType(boosterRarity - 1, itemList, getFairRandomItemType(boosterpackItems)));

  return boosterpackItems;
}
