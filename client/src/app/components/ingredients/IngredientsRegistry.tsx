import React, { useEffect, useState } from 'react';

// Components
import IngredientCard from '../../components/ingredients/IngredientCard';
import IngredientCreationModal from '../../components/ingredients/IngredientCreationModal';
import Switch from '../../components/generic/form/Switch';
import Registry from '../generic/registries/Registry'

// Types
import { Ingredient } from '@models/Ingredient';

// Utils
import { useLoading } from '../../loadingProvider/LoadingProvider';
import ingredientsService from '../../services/ingredientsService';
import useStore from '../../state/useStore'

import { toast } from 'sonner';

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

  const { ingredients, setIngredients } = useStore();
  const [filteredItems, setFilteredItems] = useState<Ingredient[]>([]);

  const [filterByOutOfStock, setFilterByOutOfStock] = useState(false);
  const [filterByDisabled, setFilterByDisabled] = useState(false);

  const { setLoading } = useLoading();

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
    let results = ingredients;

    if (filterByOutOfStock)
      results = results.filter(item => item.outOfStock);

    if (filterByDisabled)
      results = results.filter(item => item.disabled);

    setFilteredItems(results);
  }, [ingredients, filterByOutOfStock, filterByDisabled]);

  async function createItem(newItem: Ingredient) {
    setLoading(true);
    try {
      await ingredientsService.addItem(newItem);
      const freshData = await ingredientsService.fetchItems();
      setIngredients(freshData);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  }

  async function deleteItem(key: string) {
    setLoading(true);
    try {
      await ingredientsService.deleteItem(key);
      const freshData = await ingredientsService.fetchItems();
      setIngredients(freshData);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
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
      deleteItem={deleteItem}
      service={ingredientsService}
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
        <IngredientCreationModal
          visible={visible}
          close={close}
          create={createItem}
        />
      )}
    />
  );
}
