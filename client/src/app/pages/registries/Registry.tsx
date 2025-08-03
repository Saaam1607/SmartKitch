import React, { useState, useEffect } from 'react';

import useStore from '../../state/useStore'

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavLink from 'react-bootstrap/NavLink';
import NavbarBrand from 'react-bootstrap/NavbarBrand';
import Container from 'react-bootstrap/Container';

import { Form } from 'react-bootstrap';

import { Search } from "lucide-react";

import { toast } from 'sonner';

import { motion } from "motion/react"

import IconButton from '../../components/generic/button/IconButton';
import Check from '../../components/generic/form/Check';
import RegistryNavBar from '../../components/generic/registry/RegistryNavBar';

import Ingredients from './Ingredients';

import IngredientProp from '../../types/IngredientProp';

export default function Registry({
  items,
  setItems,
  keyField,
  cardComponent,
  handleSearch,
  createItem,
  editItem,
  filtersComponent,
  renderCreationModal,
}) {

  const { componentKey, setComponentKey } = useStore();
  const { isEditing, setIsEditing } = useStore();

  const [itemBeforeEdit, setItemBeforeEdit] = useState<IngredientProp | null>(null);

  const Card = cardComponent;

  function handleSelection(item: string) {
    if (isEditing) {
      if (componentKey != item) {
        toast.warning("Finish editing before selecting another item");
      }
      return;
    }

    if (componentKey === item) {
      setComponentKey("");
      return;
    }

    setComponentKey(item);
    
  }

  function startEditing() {
    if (componentKey) {
      setItemBeforeEdit(items.find(item => item[keyField] === componentKey) || null);
      setIsEditing(true);
    }
  }

  function endEditing() {
    setIsEditing(false);
  }

  function undoItemChanges() {
    if (isEditing) {
      setItems(items.map(item =>
        item[keyField] === componentKey ? itemBeforeEdit || item : item
      ));
      setIsEditing(false);
      toast.info("Changes reverted");
    }
  }

  function saveItemChanges() {
    if (isEditing) {
      setIsEditing(false);
      toast.success("Item updated successfully");
    }
  }

  return (
    <div
      style={{ height: '100%', backgroundColor: "beige" }}
      className="d-flex flex-column"
    >
      <RegistryNavBar
        handleSearch={handleSearch}
        startEditing={startEditing}
        saveItemChanges={saveItemChanges}
        undoItemChanges={undoItemChanges}
        selectedItem={componentKey}
        isEditing={isEditing}
        filters={filtersComponent}
        renderCreationModal={renderCreationModal}
      />

      <div
        className="customScrollbar d-flex flex-column gap-2 mx-3 my-2 p-2 rounded"
        style={{
          flexGrow: 1,
          overflowX: 'hidden',
          overflowY: 'auto',
          backgroundColor: 'white'
        }}
      >
        {items.map((item) => (
          <Card
            key={item[keyField]}
            item={item}
            isSelected={item[keyField] === componentKey}
            setIsSelected={() => handleSelection(item[keyField])}
            isEditing={isEditing && item[keyField] === componentKey}
            editItem={editItem}
          />
        ))}
      </div>
    </div>
  );
}