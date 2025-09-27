"use client";

import React, { useState, useEffect, useRef } from "react";

import type { Order } from '@models/Order';
import type { Dish } from '@models/Dish';


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

  function getDishQty(currentDish: Dish, section: string): number {
    const existingSection = newOrder.dishes_body.find(d => d.section_name === section);
    if (!existingSection) return 0; 

    const dishGroup = existingSection.ordered_dishes.find(d => d.dish.name === currentDish.name);
    if (!dishGroup) return 0; 

    return dishGroup.quantity;
  }

  function addItem(index: number, item: Dish, section: string) {
    flyToCart(index, item.imageUrl);
    addDishToOrder(item, section);
  }

  function flyToCart(index: number, imageUrl: string) {
    if (flyingRefs.current[index] && imageUrl) {
      flyItem(flyingRefs.current[index], imageUrl, cart);
    }
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
          getDishQty={getDishQty}
          addItem={addItem}
          removeDishFromOrder={removeDishFromOrder}
          flyingRefs={flyingRefs}
        />
      )}

      {orderSection === "Cart" && (
        <Cart newOrder={newOrder} />
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