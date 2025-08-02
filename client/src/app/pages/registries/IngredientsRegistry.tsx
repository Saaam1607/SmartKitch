import React, { useState, useEffect } from 'react';

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
import IngredientCard from '../../components/ingredients/IngredientCard';
import IngredientCreationModal from '../../components/ingredients/IngredientCreationModal';
import Check from '../../components/generic/form/Check';
import RegistryNavBar from '../../components/generic/registry/RegistryNavBar';
import FiltersContainer from '../../components/generic/filters/FiltersContainer';

import Ingredients from './Ingredients';

import IngredientProp from '../../types/IngredientProp';

let originalIngredients: IngredientProp[] = [
  {
    name: 'Apple',
    description: 'A sweet red fruit aaaaaa aaaaaa aaaaaa aaaaaa aaaaaa aaaaaa aaaaaa aaaaaa aaaaaa aaaaaa aaaaaa aaaaaa aaaaaa aaaaaa aaaaaa aaaaaa aaaaaa aaaaaa aaaaaa aaaaaa aaaaaa aaaaaa aaaaaa aaaaaa aaaaaa aaaaaa aaaaaa aaaaaa aaaaaa aaaaaa',
    image: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAEsAZADASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD1OiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKgu7y10+1e6vbmG2t0xvlmcIi5OBkngckD8aLS8tdQtUurK5hubd87JYXDo2Dg4I4PII/CgCeiisvSvEOm6zdXdrZSzG4s9n2iKa2khePeCVyHUHkAmgDUooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAMXxdpuo6x4U1HTdKnhgu7qPyg833NpIDg8Hqm4dO/brXlOueCNUg1TTdJ+xQ3ytJqCQXAs2EVvBOuIPMeOHaGWRpHwBhSeqqQR7hRQB45o3hDUG+Ik/lLNCllc2c7arNayxPdeVEUnCErhvNdssS/P3vn5ra1Dwd4n1KbxU2/TbP+3o4F3w3krtD5SY2n90u5X+6emAx4bofSaKAOe8HaFP4e0eazn433LzIguRKiBsEhcRRhF3bjtC4GSe+B0NFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQB/9k=',
    outOfStock: false,
    disabled: true,
  },
  {
    name: 'Banana',
    description: 'A long yellow fruit',
    image: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAEsAZADASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD1OiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKgu7y10+1e6vbmG2t0xvlmcIi5OBkngckD8aLS8tdQtUurK5hubd87JYXDo2Dg4I4PII/CgCeiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAOe8caFdeJvB1/pFlJDHcXHl7GmJCDbIrHJAJ6Ke1cVqfw31680NLGObTTvvby7kSSZzsMqlYxvZG85hkkyOu/oFZeterUUAeYWXw71611W1vvt1mHivbG6Z1lfedkJS7Odv3pW2k/wB/HzVlr8LvE5TUJDeabFczxh4njuZTsuRciUS7jHv3BDIodmd/mI3YOB7HRQB5Tqvw316702XTrabTRZf2le3NvC8zqkMUqbYkVNjINpZ2I25H8DKSTXo2gwX9poNhbam6SX0MCxTSJK0gkZRjduYAknGTkdSevU6FFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQB/9k=',
    outOfStock: true,
    disabled: false,
  },
  {
    name: 'Carrot',
    description: 'An orange root vegetable',
    image: 'https://source.unsplash.com/400x300/?carrot,vegetable',
    outOfStock: false,
    disabled: false,
  },
  {
    name: 'Doughnut',
    description: 'A sweet fried dough pastry',
    image: '',
    outOfStock: false,
    disabled: true,
  },
  {
    name: 'Eggplant',
    description: 'A purple vegetable',
    image: '',
    outOfStock: true,
    disabled: false,
  },
];


function Filters({ showFilters, filterByOutOfStock, setFilterByOutOfStock, filterByDisabled, setFilterByDisabled }) {
  return (
    <FiltersContainer showFilters={showFilters}>
      <Check
        item={{ name: 'Out of Stock Filter' }}
        value={filterByOutOfStock}
        fieldName="Out of Stock"
        isEditing={true}
        handleChange={() => setFilterByOutOfStock(!filterByOutOfStock)}
      />
      <Check
        item={{ name: 'Disabled Filter' }}
        value={filterByDisabled}
        fieldName="Disabled"
        isEditing={true}
        handleChange={() => setFilterByDisabled(!filterByDisabled)}
      />
    </FiltersContainer>
  );
}

export default function IngredientsRegistry() {

  const [searchTerm, setSearchTerm] = useState('');
  const [allIngredients] = useState(originalIngredients);
  
  const [showFilters, setShowFilters] = useState(false);
  
  const [filteredIngredients, setFilteredIngredients] = useState<IngredientProp[]>(originalIngredients);
  const [filterByOutOfStock, setFilterByOutOfStock] = useState(false);
  const [filterByDisabled, setFilterByDisabled] = useState(false);

  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  
  const [showCreationModal, setShowCreationModal] = useState(false);

  const [itemBeforeEdit, setItemBeforeEdit] = useState<IngredientProp | null>(null);

  useEffect(() => {
    let results = allIngredients.filter((ingredient) =>
      ingredient.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (filterByOutOfStock) {
      results = results.filter(ingredient => ingredient.outOfStock);
    }

    if (filterByDisabled) {
      results = results.filter(ingredient => ingredient.disabled);
    }

    setFilteredIngredients(results);
  }, [searchTerm, allIngredients, filterByOutOfStock, filterByDisabled]);



  function handleSelection(ingredientName: string) {
    if (isEditing) {
      if (selectedItem != ingredientName) {
        toast.warning("Finish editing before selecting another ingredient");
      }
      return;
    }

    if (selectedItem === ingredientName) {
      setSelectedItem(null);
      return;
    }
    setSelectedItem(ingredientName);
  }

  function startEditing() {
    if (selectedItem) {
      setItemBeforeEdit(filteredIngredients.find(item => item.name === selectedItem) || null);
      setIsEditing(true);
    }
  }

  function endEditing() {
    setIsEditing(false);
  }

  function editItem(ingredient: IngredientProp) {
    if (isEditing && selectedItem) {
      setFilteredIngredients(filteredIngredients.map(item =>
        item.name === selectedItem ? ingredient : item
      ));
      setSelectedItem(ingredient.name);
    }
  }

  function undoItemChanges() {
    if (isEditing) {
      setFilteredIngredients(filteredIngredients.map(item =>
        item.name === selectedItem ? itemBeforeEdit || item : item
      ));
      setIsEditing(false);
      toast.info("Changes reverted");
    }
  }

  function saveItemChanges() {
    if (isEditing) {
      setIsEditing(false);
      toast.success("Ingredient updated successfully");
    }
  }

  function handleFiltersClick() {
    setShowFilters(!showFilters)
  }

  function handleCreationModalClick() {
    setShowCreationModal(true);
  }

  return (
    <div
      style={{ height: '100%', backgroundColor: "beige" }}
      className="d-flex flex-column"
    >
      <IngredientCreationModal
        show={showCreationModal}
        close={() => setShowCreationModal(false)}
        createNewIngredient={(ingredient: IngredientProp) => {
          originalIngredients.push(ingredient);
          setFilteredIngredients([...originalIngredients]);
          setShowCreationModal(false);
        }}
      />

      <RegistryNavBar
        handleFiltersClick={handleFiltersClick}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        startEditing={startEditing}
        saveItemChanges={saveItemChanges}
        undoItemChanges={undoItemChanges}
        handleCreationModalClick={handleCreationModalClick}
        selectedItem={selectedItem}
        isEditing={isEditing}
        filters={
          <Filters
            showFilters={showFilters}
            filterByOutOfStock={filterByOutOfStock}
            setFilterByOutOfStock={setFilterByOutOfStock}
            filterByDisabled={filterByDisabled}
            setFilterByDisabled={setFilterByDisabled}
          />
        }
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
        {filteredIngredients.map((ingredient) => (
          <IngredientCard
            key={ingredient.name}
            item={ingredient}
            isSelected={ingredient.name === selectedItem}
            setIsSelected={() => handleSelection(ingredient.name)}
            isEditing={isEditing && ingredient.name === selectedItem}
            editItem={editItem}
          />
        ))}
      </div>
    </div>
  );
}