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
  getItemQuantity: (currentItem: Dish | Drink, section: string, type: string) => number;
  addItem: (index: number, item: Dish | Drink, itemType: string, section: string) => void;
  removeItemFromOrder: (item: Dish | Drink, type: string, section: string) => void;
  flyingRefs: React.MutableRefObject<(HTMLDivElement | null)[]>;
}

export default function NewOrder({
  getItemQuantity,
  addItem,
  removeItemFromOrder,
  flyingRefs,
}: NewOrderProps) {

  const {
    dishes, setDishes,
    menuSections, setMenuSections,
    drinks, setDrinks,
  } = useStore();

  const [menuSectionSelected, setMenuSectionSelected] = useState<string>("All");
  const [itemsToShow, setItemsToShow] = useState<({ item: Dish; dataType: string } | { item: Drink; dataType: string })[]>([]);
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
        const itemsNames: string[] = [...menuSections.flatMap(section => section.drinks), ...menuSections.flatMap(section => section.dishes)];
        const filteredDishes = dishes.filter(dish => itemsNames.includes(dish.name));
        const filteredDrinks = drinks.filter(drink => itemsNames.includes(drink.name));
        const enhFilteredDishes = filteredDishes.map((item: Dish) => ({ item, dataType: "dish" }));
        const enhFilteredDrinks = filteredDrinks.map((item: Drink) => ({ item, dataType: "drink" }));

        setItemsToShow([...enhFilteredDrinks, ...enhFilteredDishes ]);
      }

      const selectedSection = menuSections.find((section: MenuSection) => section.name === menuSectionSelected);
      if (selectedSection) {
        const itemsNames = selectedSection.isDrink ? selectedSection.drinks : selectedSection.dishes;

        let filteredItems: (Dish | Drink)[] = [];

        if (selectedSection.isDrink) {
          filteredItems = drinks.filter(item => itemsNames.includes(item.name));
        } else {
          filteredItems = dishes.filter(item => itemsNames.includes(item.name));
        }

        const itemsWithType = filteredItems.map((item) => ({
          item,
          dataType: selectedSection.isDrink ? "drink" : "dish",
        }));
        
        setItemsToShow(itemsWithType);
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
            getItemQuantity={getItemQuantity}
            addItem={addItem}
            removeItemFromOrder={removeItemFromOrder}
            flyingRefs={flyingRefs}
          />
        ))}
      </div>
    </div>
  );
}