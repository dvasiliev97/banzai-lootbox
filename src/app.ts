import _ from 'lodash';

import {
  ItemRarity,
} from './models/Item';

import { itemDataBase } from './models/itemDataBase';

import { openFairBoosterpack } from './models/BoosterPack';
import { Inventory } from './models/Inventory';

const playerInventory = { items: [] } as Inventory;

for (let i = 0; i < 24; i += 1) {
  const booster = openFairBoosterpack(ItemRarity.UNCOMMON, itemDataBase, playerInventory);
  playerInventory.items = _.concat(booster, playerInventory.items);
}

const uniquedInventory = _(playerInventory.items)
  .unionBy('name')
  .groupBy('rarity')
  .value();
console.log(uniquedInventory);
