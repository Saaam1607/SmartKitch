import React, { useState, useEffect } from 'react';

import type { Dish } from '@models/Dish';
import type { Drink } from '@models/Drink';
import type { MenuSection } from '@models/MenuSection';

import OrderNavbar from "../components/OrderNavbar";
import MenuCard from "../components/MenuCard";

import useStore from '../../state/useStore'

import { useLoading } from '../../loadingProvider/LoadingProvider';

import menuSectionsService from "../../services/menuSectionsService";
import dishesService from "../../services/dishesService";
import drinksService from "../../services/drinksService";

interface NewOrderProps {
  getDishQty: (currentDish: Dish, section: string) => number;
  addItem: (index: number, item: Dish, section: string) => void;
  removeDishFromOrder: (dishToRemove: Dish, section: string) => void;
  flyingRefs: React.MutableRefObject<(HTMLDivElement | null)[]>;
}

export default function NewOrder({
  getDishQty,
  addItem,
  removeDishFromOrder,
  flyingRefs,
}: NewOrderProps) {

  const {
    dishes, setDishes,
    menuSections, setMenuSections,
    drinks, setDrinks,
  } = useStore();

  const [menuSectionSelected, setMenuSectionSelected] = useState<string>("All");
  const [itemsToShow, setItemsToShow] = useState<Dish | Drink[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const { setLoading } = useLoading();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        setMenuSections(await menuSectionsService.fetchItems());
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
    if (menuSectionSelected) {

      if (menuSectionSelected == "All") {
          const itemsNames: string[] = menuSections.flatMap(section => section.dishes);
          const filteredDishes = dishes.filter(dish => itemsNames.includes(dish.name));
          const filteredDrinks = drinks.filter(dish => itemsNames.includes(dish.name));
          setItemsToShow([...filteredDrinks, ...filteredDishes]);
      }

      const selectedSection = menuSections.find((section: MenuSection) => section.name === menuSectionSelected);
      if (selectedSection) {
        const dishesNames = selectedSection.dishes;

        const filteredDishes = dishes.filter(dish => dishesNames.includes(dish.name));
      
        setItemsToShow(filteredDishes);
      }
    }
  }, [menuSectionSelected, dishes, menuSections]); 

  return (
    <div
      className="d-flex flex-column w-100"
      style={{ height: '100%' }}
    >
      <div>
        <OrderNavbar
          menuSections={["All", ...menuSections.map(section => section.name)]}
          menuSectionSelected={menuSectionSelected}
          setMenuSectionSelected={setMenuSectionSelected}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
      </div>
      <div
        className="d-flex justify-content-center flex-wrap w-100 mb-6 gap-4 customScrollbar"
        style={{ overflow: 'auto', flex: 1, paddingBottom: '200px' }}
      >
        {itemsToShow.map((item, index) => (
          <MenuCard
            key={index}
            item={item}
            section={menuSectionSelected}
            index={index}
            getDishQty={getDishQty}
            addItem={addItem}
            removeDishFromOrder={removeDishFromOrder}
            flyingRefs={flyingRefs}
          />
        ))}
      </div>
    </div>
  );
}