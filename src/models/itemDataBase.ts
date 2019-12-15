import faker from 'faker';

import { Item, ItemRarity, ItemType } from './Item';

export function generateDummyItemList(): Item[] {
  const itemList: Item[] = [];

  Object.values(ItemType).map((type) => type as ItemType).forEach((type) => {
    Object.values(ItemRarity).map((rarity) => rarity as ItemRarity).forEach((rarity) => {
      if (typeof type === 'number' && typeof rarity === 'number') {
        itemList.push({ name: faker.commerce.productName(), rarity, type } as Item);
        itemList.push({ name: faker.commerce.productName(), rarity, type } as Item);
      }
    });
  });

  return itemList;
}

export const itemDataBase = generateDummyItemList();
