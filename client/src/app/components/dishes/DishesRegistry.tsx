import React, { useEffect, useState } from 'react';

// Components
import DishCard from '../../components/dishes/DishCard';
import IngredientCreationModal from '../../components/ingredients/IngredientCreationModal';
import Switch from '../../components/generic/form/Switch';
import Registry from '../generic/registries/Registry'

// Types
import type { Dish } from '@models/Dish';

// Utils
import { useLoading } from '../../loadingProvider/LoadingProvider';
import dishesService from '../../services/dishesService';
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

export default function DishesRegistry() {

  const { dishes, setDishes } = useStore();
  const { setIngredients } = useStore();

  const [filteredItems, setFilteredItems] = useState<Dish[]>([]);
  const [filterByOutOfStock, setFilterByOutOfStock] = useState(false);
  const [filterByDisabled, setFilterByDisabled] = useState(false);

  const { setLoading } = useLoading();

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const data = await dishesService.fetchItems();
        setDishes(data)
        const ingredients = await ingredientsService.fetchItems();
        setIngredients(ingredients);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [setDishes, setIngredients]);


  useEffect(() => {
    let results = dishes;

    if (filterByOutOfStock)
      results = results.filter(item => item.outOfStock);

    if (filterByDisabled)
      results = results.filter(item => item.disabled);

    setFilteredItems(results);
  }, [dishes, filterByOutOfStock, filterByDisabled]);


  async function createItem(newItem: Dish) {
    try {
      await dishesService.addItem(newItem); 
      const freshData = await dishesService.fetchItems();
      setDishes(freshData);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Registry
      filteredItems={filteredItems}
      keyField={"name"}
      cardComponent={DishCard}
      service={dishesService}
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
