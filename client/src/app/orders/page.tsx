"use client";

import React, { useState, useEffect } from "react";

import Navbar from 'react-bootstrap/Navbar';

import { useLoading } from '../loadingProvider/LoadingProvider';

import useStore from '../state/useStore'

import menuSectionsService from "../services/menuSectionsService";
import dishesService from "../services/dishesService";
import drinksService from "../services/drinksService";

import type { Dish } from '@models/Dish';
import type { MenuSection } from '@models/MenuSection';

import CardImage from "../components/generic/card/CardImage";

export default function LoginPage() {
  
  const {
    dishes, setDishes,
    menuSections, setMenuSections,
    drinks, setDrinks,
  } = useStore();

  const [menuSectionSelected, setMenuSectionSelected] = useState<string | null>(null);

  const [itemsToShow, setItemsToShow] = useState<Dish[]>([]);

  useEffect(() => {
    if (menuSectionSelected) {
      
      const selectedSection = menuSections.find(section => section.name === menuSectionSelected);
      if (selectedSection) {
        const dishesNames = selectedSection.dishes;

        const filteredDishes = dishes.filter(dish => dishesNames.includes(dish.name));
        console.log(menuSectionSelected)
        console.log(filteredDishes)
      
        setItemsToShow(filteredDishes);
      }
      
      

    }
  }, [menuSectionSelected, dishes, menuSections]); 

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

  
  return (
    <div>

      <Navbar
        data-bs-theme="light"
        className="d-flex align-items-center justify-content-center gap-4 px-3 py-2"
        style={{
          backgroundColor: 'transparent',
        }}
      > 
        {menuSections.map((section) => (
          <button
            className="btn btn-secondary p-2 px-3"
            style={{
              borderRadius: '15px',
              backgroundColor: section.name === menuSectionSelected ? 'rgba(237, 159, 25, 1)' : 'rgba(240, 240, 240, 1)',
              color: 'black',
              border: 'none',
              boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 5px',
            }}
            key={section.name}
          >
            <h2
              className="p-0 m-0"
              style={{
                fontSize: '1.5rem',
                color: 'rgb(50, 50, 50)',
              }}
              onClick={() => setMenuSectionSelected(section.name === menuSectionSelected ? null : section.name)}
            >
              {section.name}
            </h2>
          </button>
        ))}

      </Navbar>

      <div
        className="d-flex  justify-content-center gap-4 p-4">
        {itemsToShow.map((item) => (
          <div
            key={item.name}
            className="d-flex flex-column justify-content-center align-items-center gap-2"
            style={{
              padding: '10px',
              borderBottom: '1px solid #ccc',
              borderRadius: '20px',
              boxShadow: 'rgba(0, 0, 0, 0.2) 0px 2px 4px',
            }}
          >
            <div style={{ width: '150px', height: '150px' }}>
              <CardImage imageUrl={item.imageUrl} />
            </div>
            <h3 className="m-0 p-0">{item.name}</h3>
            <p className="m-0">{item.description}</p>

            <p className="m-0">€ {item.price}</p>
          </div>
        ))}
      </div>




      {/* {menuSections.map((section) => (
        <div key={section.name}>
          <h2>{section.name}</h2>
          <ul>
            {dishes
              .filter((dish) => dish.sectionId === section.id)
              .map((dish) => (
                <li key={dish.id}>{dish.name}</li>
              ))}
          </ul>
        </div>
      ))} */}
    </div>
  );
}