# Универсальная лутбокс-система

Проект реализует [это тестовое задание](https://drive.google.com/file/d/13VxR410LdtphyVVxx3pJdG3cNSuX_6Y_/view)

## Запуск

Для запуска пробного открытия 4х редких бустеров выполните ```npm run dev```

## Документация src/models/BoosterPack.ts

## `function openInconsistentBoosterpack(boosterRarity: ItemRarity, itemList: Item[]): Item[]`

Функция симулирует открытие inconsistent бустерпака, гарантирующего получение двух предметов редкости boosterRarity и трех предметов редкости boosterRarity - 1

* **Parameters:**
  * `boosterRarity` — `ItemRarity` — редкость бустерпака
  * `itemList` — `Item[]` — список предметов в игре (дополнении к игре), из которого падают предметы
* **Returns:** `Item[]` — предметы, полученные из бустерпака

## `function openConsistentBoosterpack(boosterRarity: ItemRarity, itemList: Item[]): Item[]`

Функция симулирует открытие consistent бустерпака, гарантирующего получение не более двух предметов одного типа

* **Parameters:**
  * `boosterRarity` — `ItemRarity` — редкость бустерпака
  * `itemList` — `Item[]` — список предметов в игре (дополнении к игре), из которого падают предметы
* **Returns:** `Item[]` — предметы, полученные из бустерпака

## `function openFairBoosterpack(boosterRarity: ItemRarity, itemList: Item[], inventory: Inventory): Item[]`

Функция симулирует открытие fair бустерпака, гарантирующего получение всех предметов редкости boosterRarity из itemList при открытии нескольких бустерпаков

* **Parameters:**
  * `boosterRarity` — `ItemRarity` — редкость бустерпака
  * `itemList` — `Item[]` — список предметов в игре (дополнении к игре), из которого падают предметы
  * `inventory` — `Inventory` — инвентарь игрока
* **Returns:** `Item[]` — предметы, полученные из бустерпака

## `function openMultipleFairBoosterpacks(boosterAmout: number, boosterRarity: ItemRarity, itemList: Item[], inventory: Inventory): Item[]`

Функция симулирует открытие нескольких fair бустерпаков

* **Parameters:**
  * `boosterAmout` — `number` — количество открываемых бустерпаков
  * `boosterRarity` — `ItemRarity` — редкость бустерпака
  * `itemList` — `Item[]` — список предметов в игре (дополнении к игре), из которого падают предметы
  * `inventory` — `Inventory` — инвентарь игрока
* **Returns:** `Item[]` — предметы, полученные из бустерпаков

## Документация src/models/Item.ts

## `function boostRarity(itemRarity: ItemRarity): ItemRarity`

Функция увеличивает редкость предмета на +1,+2 или +3 с вероятностями (0.1, 0.01, 0.001) соответственно

* **Parameters:** `itemRarity` — `ItemRarity` — базовая редкость предмета
* **Returns:** `ItemRarity` — улучшенная редкость

## `function getFairRandomItemType(previousItems: Item[]): ItemType`

Функция возвращает один из типов предметов, встретившихся среди предметов previousItems менее двух раз=

* **Parameters:** `previousItems` — `Item[]` — предметы, полученные до вызова функции
* **Returns:** `ItemType` — честный тип предмета

## `function getRandomItemOfConsistentRarity(boosterRarity: ItemRarity, itemList: Item[]): Item`

Функция возвращает случайный предмет из itemList с редкостью boosterRarity

* **Parameters:**
  * `boosterRarity` — `ItemRarity` — редкость предмета
  * `itemList` — `Item[]` — список предметов в игре (дополнении к игре), из которого падают предметы
* **Returns:** `Item` — случайный предмет

## `function getRandomItemOfFairRarity(boosterRarity: ItemRarity, itemList: Item[]): Item`

Функция возвращает случайный предмет из itemList с редкостью boostedRarity

* **Parameters:**
  * `boosterRarity` — `ItemRarity` — базовая редкость предмета
  * `itemList` — `Item[]` — список предметов в игре (дополнении к игре), из которого падают предметы
* **Returns:** `Item` — случайный предмет

## `function getRandomItemOfFairRarityAndFixedType(boosterRarity: ItemRarity, itemList: Item[], itemType: ItemType): Item`

Функция возвращает случайный предмет из itemList с редкостью boostedRarity и фиксированным типом

* **Parameters:**
  * `boosterRarity` — `ItemRarity` — базовая редкость предмета
  * `itemList` — `Item[]` — список предметов в игре (дополнении к игре), из которого падают предметы
  * `itemType` — `ItemType` — тип предмета
* **Returns:** `Item` — случайный предмет
