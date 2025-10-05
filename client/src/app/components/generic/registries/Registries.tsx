'use client';

import React, { useState } from 'react';


import { useThemeStyles } from '../../../hooks/useThemeStyles';

import UsersRegistry from '../../users/UsersRegistry'
import IngredientsRegistry from '../../ingredients/IngredientsRegistry'
import DrinksRegistry from '../../drinks/DrinksRegistry'
import DishesRegistry from '../../dishes/DishesRegistry'
import MenuSectionsRegistry from '../../menuSections/MenuSectionsRegistry'
import OrdersRegistry from '../../orders/OrdersRegistry'

import { AnimatePresence, motion } from "framer-motion";

import RegistryContainer from './RegistryContainer';


interface RegistriesProps {
  selectedRegistry: string;
}

export default function Registries({
  selectedRegistry,
} : RegistriesProps) {

  const { cardsContainerBg, toolbarBg, toolbarTextColor } = useThemeStyles();

  const isActive = (path: string) => {
    return selectedRegistry === path ? 'active' : '';
  };

  return (
    <div
      style={{
        height: '100%',
        width: '100%',
      }}
      className="d-flex flex-column"
    >
      <div
        className="p-3"
        style={{
          flexGrow: 1,
          overflow: 'hidden',
        }}
      >
        <AnimatePresence mode="wait">
          <RegistryContainer
            key='roles'
            showRegistry={selectedRegistry === 'roles'}
            registryComponent={<UsersRegistry />}
          />
          <RegistryContainer
            key='ingredients'
            showRegistry={selectedRegistry === 'ingredients'}
            registryComponent={<IngredientsRegistry />}
          />
          <RegistryContainer
            key='dishes'
            showRegistry={selectedRegistry === 'dishes'}
            registryComponent={<DishesRegistry />}
          />
          <RegistryContainer
            key='drinks'
            showRegistry={selectedRegistry === 'drinks'}
            registryComponent={<DrinksRegistry />}
          />
          <RegistryContainer
            key='menu'
            showRegistry={selectedRegistry === 'menu'}
            registryComponent={<MenuSectionsRegistry />}
          />
          <RegistryContainer
            key='orders'
            showRegistry={selectedRegistry === 'orders'}
            registryComponent={<OrdersRegistry />}
          />
        </AnimatePresence>
      </div>
    </div>
  );
}
