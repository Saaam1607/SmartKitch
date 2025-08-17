import React, { useEffect, useState } from 'react';

// Components
import MenuSectionCard from '../../components/menuSections/MenuSectionCard';
import MenuSectionDishesCard from '../../components/menuSections/MenuSectionDishesCard';
import MenuSectionsCreationModal from '../../components/menuSections/MenuSectionsCreationModal';
import Switch from '../../components/generic/form/Switch';
import Registry from './Registry'

// Types
import DishProp from '../../types/DishProp';

// Utils
import { useLoading } from '../../loadingProvider/LoadingProvider';
import menuSectionsService from '../../services/menuSectionsService';
import dishesService from '../../services/dishesService';
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

  const { menuSections, updateMenuSection, setMenuSections } = useStore();
  const { setDishes } = useStore();
  const [filteredItems, setFilteredItems] = useState<DishProp[]>([]);

  const { setLoading } = useLoading();

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const data = await menuSectionsService.fetchItems();
        setMenuSections(data)
        const dishes = await dishesService.fetchItems();
        setDishes(dishes);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [setDishes, setLoading, setMenuSections]);


  useEffect(() => {
    const results = menuSections;
    setFilteredItems(results);
  }, [menuSections]);


  async function createItem(newItem: DishProp) {
    try {
      await menuSectionsService.addItem(newItem); 
      const freshData = await menuSectionsService.fetchItems();
      setMenuSections(freshData);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div  
      className="d-flex flex-row gap-3"
      style={{ height: '100%', width: '100%' }}
    >
      <div className="d-flex">
        <Registry
          filteredItems={filteredItems}
          keyField={"name"}
          cardComponent={MenuSectionCard}
          updateItem={updateMenuSection}
          service={menuSectionsService}
          showNavbar={true}
          renderCreationModal={(visible: boolean, close: () => void) => (
            <MenuSectionsCreationModal
              visible={visible}
              close={close}
              create={createItem}
            />
          )}
        />
      </div>
      <div className="d-flex flex-grow-1">
        <Registry
          filteredItems={filteredItems}
          keyField={"name"}
          cardComponent={MenuSectionDishesCard}
          canDelete={false}
          updateItem={updateMenuSection}
          service={menuSectionsService}
          showNavbar={true}
          renderCreationModal={(visible: boolean, close: () => void) => (
            <MenuSectionsCreationModal
              visible={visible}
              close={close}
              create={createItem}
            />
          )}
        />
      </div>
    </div>
  );
}
