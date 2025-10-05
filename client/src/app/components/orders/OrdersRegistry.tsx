import React, { useEffect, useState } from 'react';

// Components
import OrderCard from '../../components/orders/OrderCard';
// import IngredientCreationModal from '../../components/orders/IngredientCreationModal';
import Registry from '../generic/registries/Registry'
// import IngredientsFilters from './IngredientsFilters';

// Types
import { Order } from '@models/Order';

// Utils
import { useLoading } from '../../loadingProvider/LoadingProvider';
import ordersService from '../../services/ordersService';
import useStore from '../../state/useStore'

import { toast } from 'sonner';



export default function OrderRegistry() {

  const { orders, setOrders } = useStore();
  const [filteredItems, setFilteredItems] = useState<Order[]>([]);

  // const [filterByOutOfStock, setFilterByOutOfStock] = useState(false);
  // const [filterByDisabled, setFilterByDisabled] = useState(false);

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
    // let results = orders;

    // if (filterByOutOfStock) results = results.filter(item => item.outOfStock);
    // if (filterByDisabled) results = results.filter(item => item.disabled);

    setFilteredItems(orders);
  }, [orders]);

  async function refreshData() {
    const freshData = await ordersService.fetchItems();
    setOrders(freshData);
  }

  async function canSave(newItem: Order) {
    return true;
  }

  return (
    <Registry
      filteredItems={filteredItems}
      keyField={"name"}
      cardComponent={OrderCard}
      canSave={canSave}
      refreshData={refreshData}
      service={ordersService}
      showNavbar={true}
      filtersComponent={
        <></>
        // <IngredientsFilters
        //   filterByOutOfStock={filterByOutOfStock}
        //   setFilterByOutOfStock={setFilterByOutOfStock}
        //   filterByDisabled={filterByDisabled}
        //   setFilterByDisabled={setFilterByDisabled}
        // />
      }
      renderCreationModal={(visible: boolean, close: () => void) => (
        <></>
        // <IngredientCreationModal
        //   visible={visible}
        //   close={close}
        //   addItem={ordersService.addItem}
        //   refreshData={refreshData}
        // />
      )}
    />
  );
}
