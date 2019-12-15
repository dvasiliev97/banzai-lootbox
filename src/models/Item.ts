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

export function boostRarity(itemRarity: ItemRarity): ItemRarity {
  const highestRarity = Object.keys(ItemRarity).length - 1;

  const boostProbability = Math.random();

  if (boostProbability < 0.001) return itemRarity + 3 <= highestRarity ? itemRarity + 3 : highestRarity;
  if (boostProbability < 0.01) return itemRarity + 2 <= highestRarity ? itemRarity + 2 : highestRarity;
  if (boostProbability < 0.1) return itemRarity + 1 <= highestRarity ? itemRarity + 1 : highestRarity;

  return itemRarity;
}

function randomEnum<T>(anEnum: T): T[keyof T] {
  const enumValues = Object.keys(anEnum)
    .map((n) => Number.parseInt(n, 10))
    .filter((n) => !Number.isNaN(n)) as unknown as T[keyof T][];
  const randomIndex = Math.floor(Math.random() * enumValues.length);
  const randomEnumValue = enumValues[randomIndex];
  return randomEnumValue;
}

export function getRandomItemType(): ItemType {
  const myRandomValue = randomEnum(ItemType);
  return myRandomValue;
}

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

export function getRandomItemOfConsistentRarity(boosterRarity: ItemRarity, itemList: Item[]): Item {
  const matchingItems = itemList.filter((item) => item.rarity === boosterRarity);
  const randomItem = matchingItems[Math.floor(Math.random() * matchingItems.length)];
  return randomItem;
}

export function getRandomItemOfFairRarity(boosterRarity: ItemRarity, itemList: Item[]): Item {
  const boostedRarity = boostRarity(boosterRarity);

  const matchingItems = itemList.filter((item) => item.rarity === boostedRarity);
  const randomItem = matchingItems[Math.floor(Math.random() * matchingItems.length)];
  return randomItem;
}

export function getRandomItemOfFairRarityAndFixedType(boosterRarity: ItemRarity, itemList: Item[], itemType: ItemType): Item {
  const boostedRarity = boostRarity(boosterRarity);

  const matchingItems = itemList.filter((item) => item.rarity === boostedRarity && item.type === itemType);
  const randomItem = matchingItems[Math.floor(Math.random() * matchingItems.length)];
  return randomItem;
}
