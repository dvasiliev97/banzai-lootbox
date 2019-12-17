import _ from 'lodash';

import {
  Item,
  ItemRarity,
  getRandomItemOfFairRarity,
  getRandomItemOfFairRarityAndFixedType,
  getFairRandomItemType,
} from './Item';

import { Inventory } from './Inventory';

/**
 * Функция симулирует открытие inconsistent бустерпака, гарантирующего получение
 * двух предметов редкости boosterRarity и трех предметов редкости boosterRarity - 1
 * @param {ItemRarity} boosterRarity редкость бустерпака
 * @param {Item[]} itemList список предметов в игре (дополнении к игре), из которого падают предметы
 * @returns {Item[]} предметы, полученные из бустерпака
 */
function openInconsistentBoosterpack(boosterRarity: ItemRarity, itemList: Item[]): Item[] {
  const boosterpackItems: Item[] = [];

  boosterpackItems.push(getRandomItemOfFairRarity(boosterRarity, itemList));
  boosterpackItems.push(getRandomItemOfFairRarity(boosterRarity, itemList));

  boosterpackItems.push(getRandomItemOfFairRarity(boosterRarity - 1, itemList));
  boosterpackItems.push(getRandomItemOfFairRarity(boosterRarity - 1, itemList));
  boosterpackItems.push(getRandomItemOfFairRarity(boosterRarity - 1, itemList));

  return boosterpackItems;
}

/**
 * Функция симулирует открытие consistent бустерпака, гарантирующего получение не более двух предметов одного типа
 * @param {ItemRarity} boosterRarity редкость бустерпака
 * @param {Item[]} itemList список предметов в игре (дополнении к игре), из которого падают предметы
 * @returns {Item[]} предметы, полученные из бустерпака
 */
function openConsistentBoosterpack(boosterRarity: ItemRarity, itemList: Item[]): Item[] {
  const boosterpackItems: Item[] = [];

  boosterpackItems.push(getRandomItemOfFairRarityAndFixedType(boosterRarity, itemList, getFairRandomItemType(boosterpackItems)));
  boosterpackItems.push(getRandomItemOfFairRarityAndFixedType(boosterRarity, itemList, getFairRandomItemType(boosterpackItems)));

  boosterpackItems.push(getRandomItemOfFairRarityAndFixedType(boosterRarity - 1, itemList, getFairRandomItemType(boosterpackItems)));
  boosterpackItems.push(getRandomItemOfFairRarityAndFixedType(boosterRarity - 1, itemList, getFairRandomItemType(boosterpackItems)));
  boosterpackItems.push(getRandomItemOfFairRarityAndFixedType(boosterRarity - 1, itemList, getFairRandomItemType(boosterpackItems)));

  return boosterpackItems;
}

/**
 * Функция симулирует открытие fair бустерпака, гарантирующего получение всех
 * предметов редкости boosterRarity из itemList при открытии нескольких бустерпаков
 * @param {ItemRarity} boosterRarity редкость бустерпака
 * @param {Item[]} itemList список предметов в игре (дополнении к игре), из которого падают предметы
 * @param {Inventory} inventory инвентарь игрока
 * @returns {Item[]} предметы, полученные из бустерпака
 */
function openFairBoosterpack(boosterRarity: ItemRarity, itemList: Item[], inventory: Inventory): Item[] {
  const boosterpackItems: Item[] = [];
  inventory.items.push();

  const unacquiredItems = _(itemList)
    .filter({ rarity: boosterRarity })
    .difference(_(inventory.items)
      .unionBy('name')
      .filter({ rarity: boosterRarity })
      .value())
    .value();

  const randomUniqueItem = unacquiredItems[Math.floor(Math.random() * unacquiredItems.length)];

  if (randomUniqueItem) {
    boosterpackItems.push(randomUniqueItem);
  } else boosterpackItems.push(getRandomItemOfFairRarityAndFixedType(boosterRarity, itemList, getFairRandomItemType(boosterpackItems)));

  boosterpackItems.push(getRandomItemOfFairRarityAndFixedType(boosterRarity, itemList, getFairRandomItemType(boosterpackItems)));

  boosterpackItems.push(getRandomItemOfFairRarityAndFixedType(boosterRarity - 1, itemList, getFairRandomItemType(boosterpackItems)));
  boosterpackItems.push(getRandomItemOfFairRarityAndFixedType(boosterRarity - 1, itemList, getFairRandomItemType(boosterpackItems)));
  boosterpackItems.push(getRandomItemOfFairRarityAndFixedType(boosterRarity - 1, itemList, getFairRandomItemType(boosterpackItems)));

  return boosterpackItems;
}

/**
 * Функция симулирует открытие нескольких fair бустерпаков
 * @param {number} boosterAmout количество открываемых бустерпаков
 * @param {ItemRarity} boosterRarity редкость бустерпака
 * @param {Item[]} itemList список предметов в игре (дополнении к игре), из которого падают предметы
 * @param {Inventory} inventory инвентарь игрока
 * @returns {Item[]} предметы, полученные из бустерпаков
 */
function openMultipleFairBoosterpacks(boosterAmout: number, boosterRarity: ItemRarity, itemList: Item[], inventory: Inventory): Item[] {
  let boosterpackItems: Item[] = [];

  for (let i = 0; i < boosterAmout; i += 1) {
    const booster = openFairBoosterpack(boosterRarity, itemList, inventory);
    boosterpackItems = _.concat(booster, boosterpackItems);
  }

  return boosterpackItems;
}

export {
  openInconsistentBoosterpack,
  openConsistentBoosterpack,
  openFairBoosterpack,
  openMultipleFairBoosterpacks,
};
