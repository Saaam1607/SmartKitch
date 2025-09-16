import React, { useEffect, useState } from 'react';

// Components
import DishCard from '../../components/dishes/DishCard';
import DishCreationModal from '../../components/dishes/DishCreationModal';
import Registry from '../generic/registries/Registry'
import DishesFilters from './DishesFilters';


// Types
import type { Dish } from '@models/Dish';

// Utils
import { useLoading } from '../../loadingProvider/LoadingProvider';
import dishesService from '../../services/dishesService';
import ingredientsService from '../../services/ingredientsService';
import useStore from '../../state/useStore'



export default function DishesRegistry() {

  const { dishes, setDishes } = useStore();
  const { setIngredients } = useStore();

  const [filteredItems, setFilteredItems] = useState<Dish[]>([]);
  const [filterByOutOfStock, setFilterByOutOfStock] = useState(false);
  const [filterByDisabled, setFilterByDisabled] = useState(false);

  const { setLoading } = useLoading();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await refreshData();
      setIngredients(await ingredientsService.fetchItems());
      setLoading(false);
    }
    fetchData();
  }, []);

  useEffect(() => {
    let results = dishes;

    if (filterByOutOfStock) results = results.filter(item => item.outOfStock);
    if (filterByDisabled) results = results.filter(item => item.disabled);

    setFilteredItems(results);
  }, [dishes, filterByOutOfStock, filterByDisabled]);


  async function refreshData() {
    const freshData = await dishesService.fetchItems();
    setDishes(freshData);
  }

  return (
    <Registry
      filteredItems={filteredItems}
      keyField={"name"}
      cardComponent={DishCard}
      refreshData={refreshData}
      service={dishesService}
      showNavbar={true}
      filtersComponent={
        <DishesFilters
          filterByOutOfStock={filterByOutOfStock}
          setFilterByOutOfStock={setFilterByOutOfStock}
          filterByDisabled={filterByDisabled}
          setFilterByDisabled={setFilterByDisabled}
        />
      }
      renderCreationModal={(visible: boolean, close: () => void) => (
        <DishCreationModal
          visible={visible}
          close={close}
          addItem={dishesService.addItem}
          refreshData={refreshData}
        />
      )}
    />
  );
}
