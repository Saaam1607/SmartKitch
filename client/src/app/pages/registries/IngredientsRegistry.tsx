import React, { useEffect, useState } from 'react';

import IngredientCard from '../../components/ingredients/IngredientCard';
import IngredientCreationModal from '../../components/ingredients/IngredientCreationModal';

import Registry from './Registry'
import Switch from '../../components/generic/form/Switch';

import IngredientProp from '../../types/IngredientProp';

import { useLoading } from '../../loadingProvider/LoadingProvider';

import ingredientsService from '../../services/ingredientsService';

import useStore from '../../state/useStore'




interface FiltersProps {
  filterByOutOfStock: boolean;
  setFilterByOutOfStock: (value: boolean) => void;
  filterByDisabled: boolean;
  setFilterByDisabled: (value: boolean) => void;
}


function Filters({ filterByOutOfStock, setFilterByOutOfStock, filterByDisabled, setFilterByDisabled } : FiltersProps ) {
  return (
    <div className="d-flex flex-column">
      <Switch
        itemKey={ 'Out of Stock Filter' }
        value={filterByOutOfStock}
        fieldName="Out of Stock"
        isEditing={true}
        handleChange={() => setFilterByOutOfStock(!filterByOutOfStock)}
      />
      <Switch
        itemKey={ 'Disabled Filter' }
        value={filterByDisabled}
        fieldName="Disabled"
        isEditing={true}
        handleChange={() => setFilterByDisabled(!filterByDisabled)}
      />
    </div>
  );
}

export default function IngredientsRegistry() {

  const { componentKey, setComponentKey, resetComponentKey } = useStore();
  const { ingredients, updateIngredient, setIngredients } = useStore();

  const { setLoading } = useLoading();

  const [allItems, setAllItems] = useState<IngredientProp[]>([]);
  const [searchedItems, setSearchedItems] = useState<IngredientProp[]>([]);
  const [filteredItems, setFilteredItems] = useState<IngredientProp[]>([]);
    
  const [filterByOutOfStock, setFilterByOutOfStock] = useState(false);
  const [filterByDisabled, setFilterByDisabled] = useState(false);
  
  const keyField = "name"

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const data = await ingredientsService.fetchItems();
        setIngredients(data)
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    setAllItems(ingredients);
    setSearchedItems(ingredients);
    setFilteredItems(ingredients);
  }, [ingredients]);

  useEffect(() => {
    let results = searchedItems;

    if (filterByOutOfStock)
      results = results.filter(item => item.outOfStock);

    if (filterByDisabled)
      results = results.filter(item => item.disabled);

    setFilteredItems(results);
  }, [searchedItems, filterByOutOfStock, filterByDisabled]);

  function handleSearch(searchTerm: string) {
    const results = allItems.filter((item) =>
      item[keyField].toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchedItems(results);
  }

  async function createItem(newItem: IngredientProp) {
    try {
      await addIngredient(newItem); 
      const freshData = await fetchIngredients();
      setIngredients(freshData);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Registry
      items={filteredItems}
      keyField={"name"}
      cardComponent={IngredientCard}
      updateItem={updateIngredient}
      service={ingredientsService}
      handleSearch={handleSearch}
      filtersComponent={
        <Filters
          filterByOutOfStock={filterByOutOfStock}
          setFilterByOutOfStock={setFilterByOutOfStock}
          filterByDisabled={filterByDisabled}
          setFilterByDisabled={setFilterByDisabled}
        />
      }
      renderCreationModal={(visible: boolean, close: () => void) => (
        <IngredientCreationModal
          visible={visible}
          close={close}
          create={createItem}
        />
      )}
    />
  );
}
