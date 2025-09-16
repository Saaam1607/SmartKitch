import React, { useEffect, useState } from 'react';

// Components
import DrinkCard from '../../components/drinks/DrinkCard';
import DrinkCreationModal from '../../components/drinks/DrinkCreationModal';
import Registry from '../generic/registries/Registry'
import DrinksFilters from './DrinksFilters';

// Types
import { Drink } from '@models/Drink';
// Utils
import { useLoading } from '../../loadingProvider/LoadingProvider';
import drinksService from '../../services/drinksService';
import useStore from '../../state/useStore'

import { toast } from 'sonner';

export default function IngredientsRegistry() {

  const { drinks, setDrinks } = useStore();
  const [filteredItems, setFilteredItems] = useState<Drink[]>([]);

  const [filterByOutOfStock, setFilterByOutOfStock] = useState(false);
  const [filterByDisabled, setFilterByDisabled] = useState(false);

  const { setLoading } = useLoading();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await refreshData();
      setLoading(false)
    };

    fetchData();
  }, []);


  useEffect(() => {
    let results = drinks;

    if (filterByOutOfStock) results = results.filter(item => item.outOfStock);
    if (filterByDisabled) results = results.filter(item => item.disabled);

    setFilteredItems(results);
  }, [drinks, filterByOutOfStock, filterByDisabled]);

  async function refreshData() {
    const freshData = await drinksService.fetchItems();
    setDrinks(freshData);
  }

  return (
    <Registry
      filteredItems={filteredItems}
      keyField={"name"}
      cardComponent={DrinkCard}
      refreshData={refreshData}
      service={drinksService}
      showNavbar={true}
      filtersComponent={
        <DrinksFilters
          filterByOutOfStock={filterByOutOfStock}
          setFilterByOutOfStock={setFilterByOutOfStock}
          filterByDisabled={filterByDisabled}
          setFilterByDisabled={setFilterByDisabled}
        />
      }
      renderCreationModal={(visible: boolean, close: () => void) => (
        <DrinkCreationModal
          visible={visible}
          close={close}
          addItem={drinksService.addItem}
          refreshData={refreshData}
        />
      )}
    />
  );
}
