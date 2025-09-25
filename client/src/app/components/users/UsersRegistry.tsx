import React, { useEffect, useState } from 'react';

// Components
import UserCard from './UserCard';
import DrinkCreationModal from '../../components/drinks/DrinkCreationModal';
import Registry from '../generic/registries/Registry'
// import DrinksFilters from './DrinksFilters';

// Types
import { User } from '@models/User';
// Utils
import { useLoading } from '../../loadingProvider/LoadingProvider';
import { usersService } from '../../services/usersService';
import useStore from '../../state/useStore'

import { toast } from 'sonner';

export default function UsersRegistry() {

  const { users, setUsers } = useStore();
  const [filteredItems, setFilteredItems] = useState<User[]>([]);

  const [filterByOutOfStock, setFilterByOutOfStock] = useState(false);
  const [filterByDisabled, setFilterByDisabled] = useState(false);

  const { setLoading } = useLoading();

  useEffect(() => {
    console.log("START")
    const fetchData = async () => {
      setLoading(true);
      await refreshData();
      setLoading(false)
    };

    fetchData();
  }, []);


  useEffect(() => {
    // let results = users;

    // if (filterByOutOfStock) results = results.filter(item => item.outOfStock);
    // if (filterByDisabled) results = results.filter(item => item.disabled);

    setFilteredItems(users);
  }, [users, filterByOutOfStock, filterByDisabled]);

  async function refreshData() {
    const freshData = await usersService.fetchItems();
    setUsers(freshData);
  }

  return (
    <Registry
      filteredItems={filteredItems}
      keyField={"name"}
      cardComponent={UserCard}
      refreshData={refreshData}
      service={usersService}
      showNavbar={true}
      filtersComponent={
        <></>
        // <DrinksFilters
        //   filterByOutOfStock={filterByOutOfStock}
        //   setFilterByOutOfStock={setFilterByOutOfStock}
        //   filterByDisabled={filterByDisabled}
        //   setFilterByDisabled={setFilterByDisabled}
        // />
      }
      renderCreationModal={(visible: boolean, close: () => void) => (
        <></>
        // <DrinkCreationModal
        //   visible={visible}
        //   close={close}
        //   addItem={usersService.addItem}
        //   refreshData={refreshData}
        // />
      )}
    />
  );
}
