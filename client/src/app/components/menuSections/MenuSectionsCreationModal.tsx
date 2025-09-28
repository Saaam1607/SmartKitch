import React, { useState, useEffect } from 'react';

import Modal from '../generic/modal/Modal';
import Control from '../generic/form/Control';
import Check from '../generic/form/Check';
import FoodDrinkSwitch from '../generic/form/FoodDrinkSwitch';

import { MenuSection } from '@models/MenuSection';

import { useLoading } from '../../loadingProvider/LoadingProvider';

import ComboList from '../generic/form/ComboList';

import useStore from '../../state/useStore'

import dishesService from "../../services/dishesService";
import drinksService from "../../services/drinksService";

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
  isDrink: false,
  drinks: [],
  dishes: [],
} 

export default function MenuSectionsCreationModal({ visible, close, addItem, refreshData }: MenuSectionsCreationModalProps) {

  const [newMenuSection, setNewMenuSection] = useState<MenuSection>(defaultNewMenuSections);

  const { drinks, setDrinks, dishes, setDishes, } = useStore();

  const [itemsNames, setItemsNames] = useState([...drinks.map(obj => obj.name), ...dishes.map(obj => obj.name)]);

  const { setLoading } = useLoading();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        setDishes(await dishesService.fetchItems());
        setDrinks(await drinksService.fetchItems());
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  useEffect(() => {
    setItemsNames([...drinks.map(obj => obj.name), ...dishes.map(obj => obj.name)])
  }, [drinks, dishes])

  useEffect(() => {
    setNewMenuSection(defaultNewMenuSections);
  }, [visible])

  function handleDishAddition(item: string) {
    setNewMenuSection({ ...newMenuSection, dishes: [...newMenuSection.dishes, item] });
  }

  function handleDrinkAddition(item: string) {
    setNewMenuSection({ ...newMenuSection, drinks: [...newMenuSection.drinks, item] });
  }

  function handleDishRemoval(item: string) {
    setNewMenuSection({ ...newMenuSection, dishes: newMenuSection.dishes.filter(i => i !== item) });
  }

  function handleDrinkRemoval(item: string) {
    setNewMenuSection({ ...newMenuSection, drinks: newMenuSection.drinks.filter(i => i !== item) });
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

      <FoodDrinkSwitch
        itemKey={newMenuSection.name}
        value={newMenuSection.isDrink}
        fieldName="IsDrink"
        isEditing={true}
        handleChange={(e) => 
          setNewMenuSection({ ...newMenuSection, isDrink: Boolean(e.target.checked) })
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
        valueList={newMenuSection.isDrink ? newMenuSection.drinks : newMenuSection.dishes}
        dataList={itemsNames}
        handleValueAddition={newMenuSection.isDrink ? handleDrinkAddition : handleDishAddition}
        handleValueRemoval={newMenuSection.isDrink ? handleDrinkRemoval : handleDrinkRemoval}
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