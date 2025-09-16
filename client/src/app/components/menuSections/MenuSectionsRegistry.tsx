import React, { useEffect, useState } from 'react';

// Components
import MenuSectionCard from './MenuSectionCard';
import MenuSectionDishesCard from './MenuSectionDishesCard';
import MenuSectionsCreationModal from './MenuSectionsCreationModal';
import Registry from '../generic/registries/Registry'
import MenuSectionsFilters from './MenuSectionsFilters';


// Types
import { MenuSection } from '@models/MenuSection';
// Utils
import { useLoading } from '../../loadingProvider/LoadingProvider';
import menuSectionsService from '../../services/menuSectionsService';

import dishesService from '../../services/dishesService';
import useStore from '../../state/useStore'



export default function MenuSectionRegistry() {

  const { menuSections, setMenuSections } = useStore();
  const { setDishes } = useStore();
  const [filteredItems, setFilteredItems] = useState<MenuSection[]>([]);

  const [filterByDisabled, setFilterByDisabled] = useState(false);

  const { setLoading } = useLoading();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await refreshData();
      setDishes(await dishesService.fetchItems());
      setLoading(false);
    }
    fetchData();
  }, []);

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
    let results = menuSections;

    if (filterByDisabled) results = results.filter(item => item.disabled);

    setFilteredItems(results);
  }, [menuSections,  filterByDisabled]);


  async function refreshData() {
    const freshData = await menuSectionsService.fetchItems();
    setMenuSections(freshData);
  }

  return (
    <div  
      className="d-flex flex-row gap-3"
      style={{ height: '100%', width: '100%' }}
    >
      <div className="d-flex flex-grow-1">
        <Registry
          filteredItems={filteredItems}
          keyField={"name"}
          cardComponent={MenuSectionDishesCard}
          refreshData={refreshData}
          canDelete={true}
          service={menuSectionsService}
          showNavbar={true}
          filtersComponent={
            <MenuSectionsFilters
              filterByDisabled={filterByDisabled}
              setFilterByDisabled={setFilterByDisabled}
            />
          }
          renderCreationModal={(visible: boolean, close: () => void) => (
            <MenuSectionsCreationModal
              visible={visible}
              close={close}
              addItem={menuSectionsService.addItem}
              refreshData={refreshData}
            />
          )}
        />
      </div>
    </div>
  );
}
