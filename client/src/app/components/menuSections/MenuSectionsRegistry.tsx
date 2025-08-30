import React, { useEffect, useState } from 'react';

// Components
import MenuSectionCard from './MenuSectionCard';
import MenuSectionDishesCard from './MenuSectionDishesCard';
import MenuSectionsCreationModal from './MenuSectionsCreationModal';
import Registry from '../generic/registries/Registry'

// Types
import { MenuSection } from '@models/MenuSection';
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

export default function MenuSectionRegistry() {

  const { menuSections, updateMenuSection, setMenuSections } = useStore();
  const { setDishes } = useStore();
  const [filteredItems, setFilteredItems] = useState<MenuSection[]>([]);

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
  }, [setDishes, setMenuSections]);


  useEffect(() => {
    const results = menuSections;
    setFilteredItems(results);
  }, [menuSections]);


  async function createItem(newItem: MenuSection) {
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
      {/* <div className="d-flex">
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
      </div> */}
      <div className="d-flex flex-grow-1">
        <Registry
          filteredItems={filteredItems}
          keyField={"name"}
          cardComponent={MenuSectionDishesCard}
          canDelete={true}
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
