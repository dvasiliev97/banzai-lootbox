import _ from 'lodash';

import { ItemRarity } from './models/Item';
import { Inventory } from './models/Inventory';
import { openMultipleFairBoosterpacks } from './models/BoosterPack';
import { itemDataBase } from './models/itemDataBase';

const playerInventory = { items: [] } as Inventory;

playerInventory.items = _.concat(openMultipleFairBoosterpacks(4, ItemRarity.RARE, itemDataBase, playerInventory), playerInventory.items);

console.table(playerInventory.items);
