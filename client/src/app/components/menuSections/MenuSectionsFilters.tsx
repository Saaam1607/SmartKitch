import React from 'react';

import Switch from '../../components/generic/form/Switch';

interface MenuSectionsFiltersProps {
  filterByDisabled: boolean;
  setFilterByDisabled: (value: boolean) => void;
}

export default function MenuSectionsFilters({ filterByDisabled, setFilterByDisabled } : MenuSectionsFiltersProps ) {
  return (
    <div className="d-flex flex-column">
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