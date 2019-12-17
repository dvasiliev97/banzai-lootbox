import _ from 'lodash';

export enum ItemRarity {
  COMMON = 0,
  UNCOMMON = 1,
  RARE = 2,
  LEGENDARY = 3
}

export enum ItemType {
  WEAPON = 0,
  HELMET = 1,
  ARMOR = 2,
  SHIELD = 3
}

export interface Item{
  name: string;
  rarity: ItemRarity;
  type: ItemType;
}

/**
 * Функция увеличивает редкость предмета на +1,+2 или +3
 * с вероятностями (0.1, 0.01, 0.001) соответственно
 * @param {ItemRarity} itemRarity базовая редкость предмета
 * @returns {ItemRarity} улучшенная редкость
 */
export function boostRarity(itemRarity: ItemRarity): ItemRarity {
  const highestRarity = Object.keys(ItemRarity).length - 1;

  const boostProbability = Math.random();

  if (boostProbability < 0.001) return itemRarity + 3 <= highestRarity ? itemRarity + 3 : highestRarity;
  if (boostProbability < 0.01) return itemRarity + 2 <= highestRarity ? itemRarity + 2 : highestRarity;
  if (boostProbability < 0.1) return itemRarity + 1 <= highestRarity ? itemRarity + 1 : highestRarity;

  return itemRarity;
}

/**
 * Функция возвращает один из типов предметов, встретившихся среди
 * предметов previousItems менее двух раз=
 * @param {Item[]} previousItems предметы, полученные до вызова функции
 * @returns {ItemType} честный тип предмета
 */
export function getFairRandomItemType(previousItems: Item[]): ItemType {
  const fairTypes = _(Object.values(ItemType))
    .map(Number)
    .without(NaN)
    .difference(_(previousItems)
      .groupBy('type')
      .filter((items: Item[]) => items.length >= 2)
      .compact()
      .map((items: Item[]) => items[0].type as ItemType)
      .value())
    .value();

  const fairType: ItemType = fairTypes[Math.floor(Math.random() * fairTypes.length)];

  return fairType;
}

/**
 * Функция возвращает случайный предмет из itemList с редкостью boosterRarity
 * @param {ItemRarity} boosterRarity редкость предмета
 * @param {Item[]} itemList список предметов в игре (дополнении к игре), из которого падают предметы
 * @returns {Item} случайный предмет
 */
export function getRandomItemOfConsistentRarity(boosterRarity: ItemRarity, itemList: Item[]): Item {
  const matchingItems = itemList.filter((item) => item.rarity === boosterRarity);

  const randomItem = matchingItems[Math.floor(Math.random() * matchingItems.length)];

  return randomItem;
}

/**
 * Функция возвращает случайный предмет из itemList с редкостью boostedRarity
 * @param {ItemRarity} boosterRarity базовая редкость предмета
 * @param {Item[]} itemList список предметов в игре (дополнении к игре), из которого падают предметы
 * @returns {Item} случайный предмет
 */
export function getRandomItemOfFairRarity(boosterRarity: ItemRarity, itemList: Item[]): Item {
  const boostedRarity = boostRarity(boosterRarity);

  const matchingItems = itemList.filter((item) => item.rarity === boostedRarity);

  const randomItem = matchingItems[Math.floor(Math.random() * matchingItems.length)];

  return randomItem;
}

/**
 * Функция возвращает случайный предмет из itemList с редкостью boostedRarity и фиксированным типом
 * @param {ItemRarity} boosterRarity базовая редкость предмета
 * @param {Item[]} itemList список предметов в игре (дополнении к игре), из которого падают предметы
 * @param {ItemType} itemType тип предмета
 * @returns {Item} случайный предмет
 */
export function getRandomItemOfFairRarityAndFixedType(boosterRarity: ItemRarity, itemList: Item[], itemType: ItemType): Item {
  const boostedRarity = boostRarity(boosterRarity);

  const matchingItems = itemList.filter((item) => item.rarity === boostedRarity && item.type === itemType);

  const randomItem = matchingItems[Math.floor(Math.random() * matchingItems.length)];

  return randomItem;
}
