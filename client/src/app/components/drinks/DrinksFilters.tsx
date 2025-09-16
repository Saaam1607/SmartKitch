import React from 'react';

import Switch from '../../components/generic/form/Switch';

interface DrinksFiltersProps {
  filterByOutOfStock: boolean;
  setFilterByOutOfStock: (value: boolean) => void;
  filterByDisabled: boolean;
  setFilterByDisabled: (value: boolean) => void;
}

export default function DrinksFilters({ filterByOutOfStock, setFilterByOutOfStock, filterByDisabled, setFilterByDisabled } : DrinksFiltersProps ) {
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