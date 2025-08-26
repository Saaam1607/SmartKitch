import React, { useEffect, useState } from 'react';

// Components
import DrinkCard from '../../components/drinks/DrinkCard';
import IngredientCreationModal from '../../components/ingredients/IngredientCreationModal';
import Switch from '../../components/generic/form/Switch';
import Registry from './Registry'

// Types
import { Drink } from '@models/Drink';
// Utils
import { useLoading } from '../../loadingProvider/LoadingProvider';
import drinksService from '../../services/drinksService';
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

  const { drinks, updateDrink, setDrinks } = useStore();
  const [filteredItems, setFilteredItems] = useState<Drink[]>([]);

  const [filterByOutOfStock, setFilterByOutOfStock] = useState(false);
  const [filterByDisabled, setFilterByDisabled] = useState(false);

  const { setLoading } = useLoading();

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const data = await drinksService.fetchItems();
        setDrinks(data)
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);


  useEffect(() => {
    let results = drinks;

    if (filterByOutOfStock)
      results = results.filter(item => item.outOfStock);

    if (filterByDisabled)
      results = results.filter(item => item.disabled);

    setFilteredItems(results);
  }, [drinks, filterByOutOfStock, filterByDisabled]);


  async function createItem(newItem: Drink) {
    try {
      await drinksService.addItem(newItem); 
      const freshData = await drinksService.fetchItems();
      setDrinks(freshData);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Registry
      filteredItems={filteredItems}
      keyField={"name"}
      cardComponent={DrinkCard}
      updateItem={updateDrink}
      service={drinksService}
      showNavbar={true}
      filtersComponent={
        <Filters
          filterByOutOfStock={filterByOutOfStock}
          setFilterByOutOfStock={setFilterByOutOfStock}
          filterByDisabled={filterByDisabled}
          setFilterByDisabled={setFilterByDisabled}
        />
      }
      renderCreationModal={(visible: boolean, close: () => void) => (
        <></>
        // <IngredientCreationModal
        //   visible={visible}
        //   close={close}
        //   create={createItem}
        // />
      )}
    />
  );
}
