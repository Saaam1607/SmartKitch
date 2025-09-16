import React, { useEffect, useState } from 'react';

// Components
import IngredientCard from '../../components/ingredients/IngredientCard';
import IngredientCreationModal from '../../components/ingredients/IngredientCreationModal';
import Registry from '../generic/registries/Registry'
import IngredientsFilters from './IngredientsFilters';

// Types
import { Ingredient } from '@models/Ingredient';

// Utils
import { useLoading } from '../../loadingProvider/LoadingProvider';
import ingredientsService from '../../services/ingredientsService';
import useStore from '../../state/useStore'

import { toast } from 'sonner';



export default function IngredientsRegistry() {

  const { ingredients, setIngredients } = useStore();
  const [filteredItems, setFilteredItems] = useState<Ingredient[]>([]);

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
    let results = ingredients;

    if (filterByOutOfStock) results = results.filter(item => item.outOfStock);
    if (filterByDisabled) results = results.filter(item => item.disabled);

    setFilteredItems(results);
  }, [ingredients, filterByOutOfStock, filterByDisabled]);

  async function refreshData() {
    const freshData = await ingredientsService.fetchItems();
    setIngredients(freshData);
  }

  async function canSave(newItem: Ingredient) {
    let errMsg: string = "";
    
    if (newItem.isAddable)
      if (newItem.additionPrice === null || newItem.additionPrice === undefined)
        errMsg =  "If the item is addable, add the additional price"

    if (errMsg) {
      toast.error(errMsg);
      return false;
    }

    return true;
  }

  return (
    <Registry
      filteredItems={filteredItems}
      keyField={"name"}
      cardComponent={IngredientCard}
      canSave={canSave}
      refreshData={refreshData}
      service={ingredientsService}
      showNavbar={true}
      filtersComponent={
        <IngredientsFilters
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
          addItem={ingredientsService.addItem}
          refreshData={refreshData}
        />
      )}
    />
  );
}
