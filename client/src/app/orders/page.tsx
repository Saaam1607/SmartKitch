"use client";

import React, { useState, useEffect, useRef } from "react";

import Navbar from 'react-bootstrap/Navbar';

import { useLoading } from '../loadingProvider/LoadingProvider';

import useStore from '../state/useStore'

import menuSectionsService from "../services/menuSectionsService";
import dishesService from "../services/dishesService";
import drinksService from "../services/drinksService";

import type { Dish } from '@models/Dish';
import type { MenuSection } from '@models/MenuSection';
import type { Order } from '@models/Order';

import { ShoppingCart, Hamburger, UserRound, Plus, Minus, Search, Send } from 'lucide-react';

import CardImage from "../components/generic/card/CardImage";
import { Form } from "react-bootstrap";

import './glass.css';

const defaultNewOrder: Order = {
  id: 0,
  table_number: 505,
  waiter: "Gionny",
  taken_at: new Date,
  notes: "",
  ordered_dishes: [],
  ordered_drinks: [],
};

export default function LoginPage() {
  
  const {
    dishes, setDishes,
    menuSections, setMenuSections,
    drinks, setDrinks,
  } = useStore();

  const [menuSectionSelected, setMenuSectionSelected] = useState<string | null>("Pizze");

  const [itemsToShow, setItemsToShow] = useState<Dish[]>([]);

  const [searchTerm, setSearchTerm] = useState<string>("");

  const [newOrder, setNewOrder] = useState<Order>(defaultNewOrder);

  const [numberOfShoppedItems, setNumberOfShoppedItems] = useState<number>(0); 

  const { setLoading } = useLoading();

  const flyingRefs = useRef<(HTMLDivElement | null)[]>([]);
  const cart = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (menuSectionSelected) {
      const selectedSection = menuSections.find(section => section.name === menuSectionSelected);
      if (selectedSection) {
        const dishesNames = selectedSection.dishes;

        const filteredDishes = dishes.filter(dish => dishesNames.includes(dish.name));
      
        setItemsToShow(filteredDishes);
      }
    }
  }, [menuSectionSelected, dishes, menuSections]); 


  function handleSearchChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchTerm(event.target.value);
  }

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

  function addItem(index: number, item: Dish) {
    if (flyingRefs.current[index]) {
      flyItem(flyingRefs.current[index], item.imageUrl);
      addDishToOrder(item.name);
    }
  }

  function flyItem(flyingRef: HTMLDivElement, imageUrl: string, speed = 800) {
    const imgRect = flyingRef.getBoundingClientRect();

    // crea il clone dell'immagine
    const img = document.createElement("img");
    img.src = imageUrl;
    img.style.position = "fixed";
    img.style.top = `${imgRect.top}px`;
    img.style.left = `${imgRect.left}px`;
    img.style.width = `${imgRect.width}px`;
    img.style.height = `${imgRect.height}px`;
    img.style.borderRadius = "8px";
    img.style.opacity = "1";
    img.style.transition = `all ${speed / 1000}s ease`;
    img.style.zIndex = "999";

    document.body.appendChild(img);

    if (cart.current) {
      const cartRect = cart.current.getBoundingClientRect();

      requestAnimationFrame(() => {
        img.style.top = `${cartRect.top + window.scrollY}px`;
        img.style.left = `${cartRect.left + window.scrollX}px`;
        img.style.width = "50px"; // dimensione finale più piccola
        img.style.height = "50px";
        img.style.transform = "scale(0.3)";
        img.style.opacity = "0";
      });
    }

    setTimeout(() => {
      img.remove();
    }, speed);
  }

  return (
    <div
      className="d-flex flex-column align-items-center"
      style={{ height: '100dvh' }}
    >
      <div className="d-flex flex-column gap-2 my-2 w-100">

        <div className="w-100 d-flex gap-2 justify-content-center align-items-center">
          <div
            className="d-flex align-items-center bg-white border px-2 gap-2 shadow-sm"
            style={{
              width: "100%",
              maxWidth: '600px',
              borderRadius: '10px',
              height: '50px',
            }}
            onSubmit={(e) => e.preventDefault()}
          >
            <Search size={20} className="text-muted" color="rgb(89, 92, 94)" strokeWidth={1}/>
            <Form.Control
              placeholder="Search..."
              className="p-0 py-1 m-0 shadow-none flex-grow-1 border-0"
              aria-label="Search"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
          <button
            className="d-flex justify-content-center align-items-center"
            style={{
              color: 'white',
              backgroundColor: 'rgb(220, 24, 44)',
              border: 'none',
              height: '50px',
              width: '50px',
              borderRadius: '15px',
            }}
          >
            <Send size={30} color='white' className="" />
          </button>
        </div>

        <Navbar
          data-bs-theme="light"
          className="d-flex align-items-center justify-content-center gap-3 p-0 m-0 px-3"
          style={{
            backgroundColor: 'transparent',
          }}
        > 
          {menuSections.map((section) => (
            <button
              className="btn btn-secondary p-3"
              style={{
                borderRadius: '15px',
                backgroundColor: section.name === menuSectionSelected ? 'rgb(220, 24, 44)' : 'rgba(240, 240, 240, 1)',
                color: 'black',
                border: 'none',
                boxShadow: 'rgba(76, 76, 76, 0.2) 0px 3px 5px',
              }}
              key={section.name}
            >
              <h2
                className="p-0 m-0"
                style={{
                  fontSize: '1.1rem',
                  color: section.name === menuSectionSelected ? 'white' : 'rgb(76, 76, 76)',
                }}
                onClick={() => setMenuSectionSelected(section.name === menuSectionSelected ? null : section.name)}
              >
                {section.name}
              </h2>
            </button>
          ))}
        </Navbar>
      </div>


      <div
        className=""
        style={{
          position: 'relative',
          overflow: 'hidden',
          height: '100%',
        }}
      >
        <div
          className="d-flex flex-wrap w-100 flex-grow-1 justify-content-center gap-4 p-2"
          style={{
            maxHeight: '100%',
            overflow: "auto",
          }}
        >
          {itemsToShow.map((item, index) => {

            const quantity = getDishQty(item.name);

            return (
              <div
                key={item.name}
                className="d-flex flex-column gap-2"
                style={{
                  borderRadius: '20px',
                  boxShadow: 'rgba(0, 0, 0, 0.2) 0px 2px 4px',
                  width: '15rem',
                  minWidth: '15rem',
                  height: '18rem',
                  minHeight: '18rem',
                  cursor: 'pointer',
                }}
              >
                <div
                  className="w-100 flex-grow-1 d-flex flex-column justify-content-center align-items-center p-2"
                  onClick={() => { addItem(index, item) }}
                >
                  <div
                    style={{ width: '150px', height: '150px' }}
                    ref={(el) => {
                      flyingRefs.current[index] = el;
                    }}
                  >
                    <CardImage imageUrl={item.imageUrl} />
                  </div>
                  <div className="w-100">
                    <h5 className="m-0 p-0">{item.name}</h5>
                    <p className="m-0">{item.description}</p>
                    <p className="m-0">€ {item.price}</p>
                  </div>
                </div>
                <div
                  className="d-flex justify-content-between align-items-center w-100"
                  style={{
                    borderBottomRightRadius: '20px',
                    borderBottomLeftRadius: '20px',
                    backgroundColor: quantity > 0 ? 'rgb(220, 24, 44)' : 'rgba(165, 165, 165, 1)',
                    color: 'white',
                    textAlign: 'center',
                    height: '3rem',
                  }}
                >
                  {quantity > 0 ? (
                    <>
                      <Minus
                        size={25}
                        color={"white"}
                        className="mx-3"
                        style={{
                          cursor: 'pointer',
                        }}
                        onClick={() => removeDishFromOrder(item.name)}
                      />
                      <h3 className="m-0 p-1">{quantity}</h3>
                      <Plus
                        size={25}
                        color={"white"}
                        className="mx-3"
                        style={{
                          cursor: 'pointer',
                        }}
                        onClick={() => { addItem(index, item) }}
                      />
                    </>
                  ) : (
                    <button
                      className="btn w-100"
                      style={{
                        color: 'white',
                        backgroundColor: 'transparent',
                        border: 'none',
                      }}
                      onClick={() => { addItem(index, item) }}
                    >
                      Add
                    </button>
                  )}
                  
                </div>
              </div>
            )
          })}
        </div>

        <div
          className="w-100 d-flex justify-content-center mb-2"
          style={{
            position: 'absolute',
            bottom: 0,
          }}
        >
          <div
            className="glass-card d-flex w-100 gap-3 justify-content-center mx-5"
            style={{
              backgroundColor: 'rgba(220, 24, 44, 0.8)',
              borderRadius: '20px',
              maxWidth: '600px',
            }}
          >
            <div className="p-3">
              <UserRound size={30} color={"white"} />
            </div>
            <div className="p-3">
              <Hamburger size={30} color={"white"} />
            </div>
            <div className="p-3" ref={cart}>
              <ShoppingCart size={30} color={"white"}  />
              <p
                className="m-0 p-0 position-absolute translate-middle badge rounded-pill"
                style={{
                  fontSize: '1rem',
                  opacity: numberOfShoppedItems > 0 ? 1 : 0,
                }}
              >
                {numberOfShoppedItems}
              </p>
            </div>
          </div>
        </div>

      </div>
      
    </div>
  );
}