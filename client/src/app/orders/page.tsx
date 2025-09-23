"use client";

import React, { useState, useEffect, useRef } from "react";

import type { Order } from '@models/Order';

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
  waiter: "Gionny",
  taken_at: new Date,
  notes: "",
  ordered_dishes: [],
  ordered_drinks: [],
};

export default function OrdersPage() {
  
  const [orderSection, setOrderSection] = useState<string>("NewOrder");
  const [newOrder, setNewOrder] = useState<Order>(defaultNewOrder);
  const [numberOfShoppedItems, setNumberOfShoppedItems] = useState<number>(0); 

  const flyingRefs = useRef<(HTMLDivElement | null)[]>([]);
  const cart = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setNumberOfShoppedItems(
      newOrder.ordered_dishes.reduce((total, dish) => total + dish.quantity, 0) +
      newOrder.ordered_drinks.reduce((total, drink) => total + drink.quantity, 0)
    );
  }, [newOrder]);

  function addDishToOrder(dishName: string) {
    const existingDish = newOrder.ordered_dishes.find(d => d.dish_name === dishName);
    if (existingDish) {
      const updatedDishes = newOrder.ordered_dishes.map(d =>
        d.dish_name === dishName ? { ...d, quantity: d.quantity + 1 } : d
      );
      setNewOrder({ ...newOrder, ordered_dishes: updatedDishes });
    } else {
      setNewOrder({
        ...newOrder,
        ordered_dishes: [...newOrder.ordered_dishes, { dish_name: dishName, quantity: 1 }],
      });
    }
  }

  function removeDishFromOrder(dishName: string) {
    const existingDish = newOrder.ordered_dishes.find(d => d.dish_name === dishName);
    if (existingDish) {
      const updatedDishes = newOrder.ordered_dishes.map(d =>
        d.dish_name === dishName && d.quantity > 0 ? { ...d, quantity: d.quantity - 1 } : d
      );
      setNewOrder({ ...newOrder, ordered_dishes: updatedDishes });
    }
  }

  function getDishQty(dishName: string): number {
    const dish = newOrder.ordered_dishes.find(d => d.dish_name === dishName);
    return dish ? dish.quantity : 0;
  }

  function addItem(index: number, itemName: string, imageUrl: string) {
    flyToCart(index, imageUrl);
    addDishToOrder(itemName);
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
        <Cart example={1} />
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