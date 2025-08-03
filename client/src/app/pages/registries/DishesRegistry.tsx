import React, { useEffect, useState } from 'react';

import DishCard from '../../components/dishes/DishCard';
import IngredientCreationModal from '../../components/ingredients/IngredientCreationModal';

import Registry from './Registry'
import Check from '../../components/generic/form/Check';

let originalItems: DishProp[] = [
  {
    name: 'Margherita',
    description: 'A pizza bla bla bla aaaaaa aaaaaa aaaaaa aaaaaa aaaaaa aaaaaa aaaaaa aaaaaa aaaaaa aaaaaa aaaaaa aaaaaa aaaaaa aaaaaa aaaaaa aaaaaa aaaaaa aaaaaa aaaaaa aaaaaa aaaaaa aaaaaa aaaaaa aaaaaa aaaaaa aaaaaa aaaaaa aaaaaa aaaaaa aaaaaa',
    price: '6.00',
    image: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAEsAZADASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD1OiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKgu7y10+1e6vbmG2t0xvlmcIi5OBkngckD8aLS8tdQtUurK5hubd87JYXDo2Dg4I4PII/CgCeiisvSvEOm6zdXdrZSzG4s9n2iKa2khePeCVyHUHkAmgDUooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAMXxdpuo6x4U1HTdKnhgu7qPyg833NpIDg8Hqm4dO/brXlOueCNUg1TTdJ+xQ3ytJqCQXAs2EVvBOuIPMeOHaGWRpHwBhSeqqQR7hRQB45o3hDUG+Ik/lLNCllc2c7arNayxPdeVEUnCErhvNdssS/P3vn5ra1Dwd4n1KbxU2/TbP+3o4F3w3krtD5SY2n90u5X+6emAx4bofSaKAOe8HaFP4e0eazn433LzIguRKiBsEhcRRhF3bjtC4GSe+B0NFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQB/9k=',
    outOfStock: false,
    disabled: true,
    ingredients: [
      "Tomato",
      "Mozzarella"
    ]
  },
  {
    name: 'Capricciosa',
    description: 'A pizza bla bla bla aaaaaa aaaaaa aaaaaa aaaaaa aaaaaa aaaaaa aaaaaa aaaaaa aaaaaa aaaaaa aaaaaa aaaaaa aaaaaa aaaaaa aaaaaa aaaaaa aaaaaa aaaaaa aaaaaa aaaaaa aaaaaa aaaaaa aaaaaa aaaaaa aaaaaa aaaaaa aaaaaa aaaaaa aaaaaa aaaaaa',
    price: '7.50',
    image: '',
    outOfStock: false,
    disabled: true,
    ingredients: [
      "Tomato",
      "Mozzarella",
      "Mushrooms",
      "Ham"
    ]
  },
];

function Filters({ filterByOutOfStock, setFilterByOutOfStock, filterByDisabled, setFilterByDisabled }) {
  return (
    <>
      <Check
        item={{ name: 'Out of Stock Filter' }}
        value={filterByOutOfStock}
        fieldName="Out of Stock"
        isEditing={true}
        handleChange={() => setFilterByOutOfStock(!filterByOutOfStock)}
      />
      <Check
        item={{ name: 'Disabled Filter' }}
        value={filterByDisabled}
        fieldName="Disabled"
        isEditing={true}
        handleChange={() => setFilterByDisabled(!filterByDisabled)}
      />
    </>
  );
}

export default function DishesRegistry() {

  const [allItems, SetAllItems] = useState<DishProp[]>(originalItems);
  const [searchedItems, setSearchedItems] = useState<DishProp[]>(originalItems);
  const [filteredItems, setFilteredItems] = useState<DishProp[]>(originalItems);
    
  const [filterByOutOfStock, setFilterByOutOfStock] = useState(false);
  const [filterByDisabled, setFilterByDisabled] = useState(false);
  
  const [lastSearchTerm, setLastSearchTerm] = useState("");

  const keyField = "name"

  useEffect(() => {
    handleSearch(lastSearchTerm);
  }, [allItems]);

  useEffect(() => {
    let results = searchedItems;

    if (filterByOutOfStock)
      results = results.filter(item => item.outOfStock);

    if (filterByDisabled)
      results = results.filter(item => item.disabled);

    setFilteredItems(results);
  }, [searchedItems, filterByOutOfStock, filterByDisabled]);

  function handleSearch(searchTerm: string) {
    setLastSearchTerm(searchTerm);
    let results = allItems.filter((item) =>
      item[keyField].toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchedItems(results);
  }

  function createItem(newItem: DishProp) {
    originalItems.push(newItem);
    setFilteredItems([...originalItems]);
  }

  function editItem(newItem: DishProp) {
    SetAllItems(allItems.map(item =>
      item[keyField] === newItem[keyField] ? newItem : item
    ));
  }

  return (
    <Registry
      items={filteredItems}
      setItems={setFilteredItems}
      keyField={"name"}
      cardComponent={DishCard}
      handleSearch={handleSearch}
      createItem={createItem}
      editItem={editItem}
      filtersComponent={
        <Filters
          filterByOutOfStock={filterByOutOfStock}
          setFilterByOutOfStock={setFilterByOutOfStock}
          filterByDisabled={filterByDisabled}
          setFilterByDisabled={setFilterByDisabled}
        />
      }
      renderCreationModal={(visible, close) => (
        <IngredientCreationModal
          visible={visible}
          close={close}
          create={createItem}
        />
      )}
    />
  );
}
