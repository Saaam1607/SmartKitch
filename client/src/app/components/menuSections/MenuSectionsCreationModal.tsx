import React, { useState, useEffect } from 'react';

import Modal from '../generic/modal/Modal';
import Control from '../generic/form/Control';
import Check from '../generic/form/Check';

import { MenuSection } from '@models/MenuSection';

import { useLoading } from '../../loadingProvider/LoadingProvider';

import ComboList from '../generic/form/ComboList';

import useStore from '../../state/useStore'

import '../../styles/creationModal.css';

interface MenuSectionsCreationModalProps {
  visible: boolean;
  close: () => void;
  addItem: (newItem: MenuSection) => Promise<MenuSection>;
  refreshData: () => void;
}

const defaultNewMenuSections: MenuSection = {
  name: "",
  description: "",
  disabled: false,
  dishes: [],
} 

export default function MenuSectionsCreationModal({ visible, close, addItem, refreshData }: MenuSectionsCreationModalProps) {

  const [newMenuSection, setNewMenuSection] = useState<MenuSection>(defaultNewMenuSections);

  const dishes = useStore((state) => state.dishes);
  const [dishesNames, setDishesNames] = useState(dishes.map(obj => obj.name));

  const { setLoading } = useLoading();

  useEffect(() => {
    setDishesNames(dishes.map(obj => obj.name))
  }, [dishes])

  useEffect(() => {
    setNewMenuSection(defaultNewMenuSections);
  }, [visible])

  function handleIngredientAddition(ingredient: string) {
    setNewMenuSection({ ...newMenuSection, dishes: [...newMenuSection.dishes, ingredient] });
  }

  function handleIngredientRemoval(ingredient: string) {
    setNewMenuSection({ ...newMenuSection, dishes: newMenuSection.dishes.filter(i => i !== ingredient) });
  }

  async function createItem() {

    setLoading(true);
    await addItem(newMenuSection);
    await refreshData();

    setNewMenuSection(defaultNewMenuSections);
    close();

    setLoading(false);
  }

  return (
    <Modal
      title="New Ingredient"
      show={visible}
      close={close}
      saveItem={createItem}
    >
      <Control
        type="text"
        itemKey={newMenuSection.name}
        value={newMenuSection.name}
        fieldName="Name"
        isEditing={true}
        handleChange={(e) =>
          setNewMenuSection({ ...newMenuSection, name: e.target.value })
        }
      />

      <Control
        type="textarea"
        itemKey={newMenuSection.name}
        value={newMenuSection.description}
        fieldName="Description"
        isEditing={true}
        handleChange={(e) =>
          setNewMenuSection({ ...newMenuSection, description: e.target.value })
        }
      />

      <ComboList
        valueList={newMenuSection.dishes}
        dataList={dishesNames}
        handleValueAddition={handleIngredientAddition}
        handleValueRemoval={handleIngredientRemoval}
        fieldName="Ingredients"
        itemKey={newMenuSection.name}
        isEditing={true}
      />

      <Check
        itemKey={newMenuSection.name}
        value={newMenuSection.disabled}
        fieldName="Disabled"
        isEditing={true}
        handleChange={() =>
          setNewMenuSection({ ...newMenuSection, disabled: !newMenuSection.disabled })
        }
      />

    </Modal>
  );
}