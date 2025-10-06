"use client";

import React, { useState, useEffect, useRef } from "react";

import type { Order } from '@models/Order';
import type { Dish } from '@models/Dish';
import type { Drink } from '@models/Drink';



import OrdersMenu from "./components/OrdersMenu";
import Profile from "./pages/Profile";
import NewOrder from "./pages/NewOrder";
import Cart from "./pages/Cart";

import { flyItem } from "./flyItem";

import '../styles/glass.css';
import '../styles/scrollbar.css';

const defaultNewOrder: Order = {
  id: 0,
  table_number: 505,
  waiter: "Bomber",
  taken_at: new Date,
  notes: "",
  are_drinks_served: false,
  are_dishes_served: false,
  dishes_body: [],
  drinks_body: []
}

export default function OrdersPage() {
  
  const [orderSection, setOrderSection] = useState<string>("Cart");
  const [newOrder, setNewOrder] = useState<Order>(defaultNewOrder);
  const [numberOfShoppedItems, setNumberOfShoppedItems] = useState<number>(0); 

  const flyingRefs = useRef<(HTMLDivElement | null)[]>([]);
  const cart = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let quantity = 0;
    newOrder.dishes_body.forEach((item) => {
      item.ordered_dishes.forEach((subItem) => {
        quantity += subItem.quantity;
      });
    })
    newOrder.drinks_body.forEach((item) => {
      item.ordered_drinks.forEach((subItem) => {
        quantity += subItem.quantity;
      });
    })

    setNumberOfShoppedItems(quantity);
  }, [newOrder]);

  function addDishToOrder(dishToAdd: Dish, section: string) {
    const editedOrder = {
      ...newOrder,
      dishes_body: newOrder.dishes_body.map(d => ({
        section_name: d.section_name,
        ordered_dishes: [...d.ordered_dishes],
      })),
    };

    const existingSection = editedOrder.dishes_body.find(d => d.section_name === section);

    if (existingSection) {
      const existingDishGroup = existingSection.ordered_dishes.find(s => s.dish.name === dishToAdd.name);
      if (existingDishGroup) {
        existingDishGroup.quantity++;
      } else {
        existingSection.ordered_dishes.push({ dish: dishToAdd, quantity: 1 });
      }
    } else {
      const newSection = {
        section_name: section,
        ordered_dishes: [{ dish: dishToAdd, quantity: 1 }],
      };
      editedOrder.dishes_body.push(newSection);
    }

    setNewOrder(editedOrder);
  }

  function addDrinkToOrder(drinkToAdd: Drink, section: string) {
    const editedOrder = {
      ...newOrder,
      drinks_body: newOrder.drinks_body.map(d => ({
        section_name: d.section_name,
        ordered_drinks: [...d.ordered_drinks],
      })),
    };

    const existingSection = editedOrder.drinks_body.find(d => d.section_name === section);

    if (existingSection) {
      const existingDrinkGroup = existingSection.ordered_drinks.find(s => s.drink.name === drinkToAdd.name);
      if (existingDrinkGroup) {
        existingDrinkGroup.quantity++;
      } else {
        existingSection.ordered_drinks.push({ drink: drinkToAdd, quantity: 1 });
      }
    } else {
      const newSection = {
        section_name: section,
        ordered_drinks: [{ drink: drinkToAdd, quantity: 1 }],
      };
      editedOrder.drinks_body.push(newSection);
    }

    setNewOrder(editedOrder);
  }

  function removeItemFromOrder(item: Dish | Drink, type: string, section: string) {
    if (type == "dish") {
      return removeDishFromOrder(item as Dish, section)
    } else if (type == "drink") {
      return removeDrinkFromOrder(item as Drink, section)
    }
  }

  function removeDishFromOrder(dishToRemove: Dish, section: string) {
    const editedOrder = {
      ...newOrder,
      dishes_body: newOrder.dishes_body.map(d => ({
        section_name: d.section_name,
        ordered_dishes: [...d.ordered_dishes],
      })),
    };

    const existingSection = editedOrder.dishes_body.find(d => d.section_name === section);
    if (!existingSection) return;

    const dishIndex = existingSection.ordered_dishes.findIndex(s => s.dish.name === dishToRemove.name);
    if (dishIndex === -1) return; 

    if (existingSection.ordered_dishes[dishIndex].quantity > 1) {
      existingSection.ordered_dishes[dishIndex].quantity--;
    } else {
      existingSection.ordered_dishes.splice(dishIndex, 1);
    }

    if (existingSection.ordered_dishes.length === 0) {
      editedOrder.dishes_body = editedOrder.dishes_body.filter(d => d.section_name !== section);
    }

    setNewOrder(editedOrder);
  }

  function removeDrinkFromOrder(drinkToRemove: Drink, section: string) {
    const editedOrder = {
      ...newOrder,
      drinks_body: newOrder.drinks_body.map(d => ({
        section_name: d.section_name,
        ordered_drinks: [...d.ordered_drinks],
      })),
    };

    const existingSection = editedOrder.drinks_body.find(d => d.section_name === section);
    if (!existingSection) return;

    const drinkIndex = existingSection.ordered_drinks.findIndex(s => s.drink.name === drinkToRemove.name);
    if (drinkIndex === -1) return; 

    if (existingSection.ordered_drinks[drinkIndex].quantity > 1) {
      existingSection.ordered_drinks[drinkIndex].quantity--;
    } else {
      existingSection.ordered_drinks.splice(drinkIndex, 1);
    }

    if (existingSection.ordered_drinks.length === 0) {
      editedOrder.drinks_body = editedOrder.drinks_body.filter(d => d.section_name !== section);
    }

    setNewOrder(editedOrder);
  }

  function getItemQuantity(currentItem: Dish | Drink, section: string, type: string): number {
    if (type == "dish") {
      return getDishQty(currentItem as Dish, section)
    } else if (type == "drink") {
      return getDrinkQty(currentItem as Drink, section)
    }
    return 0;
  }

  function getDishQty(currentDish: Dish, section: string): number {
    const existingSection = newOrder.dishes_body.find(d => d.section_name === section);
    if (!existingSection) return 0; 

    const dishGroup = existingSection.ordered_dishes.find(d => d.dish.name === currentDish.name);
    if (!dishGroup) return 0; 

    return dishGroup.quantity;
  }

  function getDrinkQty(currentDrink: Drink, section: string): number {
    const existingSection = newOrder.drinks_body.find(d => d.section_name === section);
    if (!existingSection) return 0; 

    const drinkGroup = existingSection.ordered_drinks.find(d => d.drink.name === currentDrink.name);
    if (!drinkGroup) return 0; 

    return drinkGroup.quantity;
  }

  function addItem(index: number, item: Dish | Drink, itemType: string, section: string) {
    flyToCart(index, item.imageUrl);
    if (itemType == "dish") {
      addDishToOrder(item as Dish, section);
    } else if (itemType == "drink") {
      addDrinkToOrder(item as Drink, section);
    }
  }

  function flyToCart(index: number, imageUrl: string) {
    if (flyingRefs.current[index] && imageUrl) {
      flyItem(flyingRefs.current[index], imageUrl, cart);
    }
  }

  function resetOrder() {
    setNewOrder(defaultNewOrder);
  }

  return (
    <div
      className="d-flex flex-column align-items-center"
      style={{
        height: '100dvh',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
  
      {orderSection === "Profile" && (
        <Profile example={1} />
      )}

      {orderSection === "NewOrder" && (
        <NewOrder
          getItemQuantity={getItemQuantity}
          addItem={addItem}
          removeItemFromOrder={removeItemFromOrder}
          flyingRefs={flyingRefs}
        />
      )}

      {orderSection === "Cart" && (
        <Cart newOrder={newOrder} resetOrder={resetOrder} />
      )}

      <div
        className="w-100 d-flex justify-content-center mb-2"
        style={{ position: 'absolute', bottom: 0, }}
      >
        <OrdersMenu
          orderSection={orderSection}
          setOrderSection={setOrderSection}
          numberOfShoppedItems={numberOfShoppedItems}
          cartRef={cart}
        />    
      </div>
      
    </div>
  );
}