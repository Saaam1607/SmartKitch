import React, { useState, useEffect } from 'react';

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavLink from 'react-bootstrap/NavLink';
import NavbarBrand from 'react-bootstrap/NavbarBrand';
import Container from 'react-bootstrap/Container';

import { Card, Form, Button, Image as BootstrapImage } from 'react-bootstrap';

import { Search, SlidersHorizontal, Plus, Pencil, Trash, Save, RotateCcw } from "lucide-react";

import { toast } from 'sonner';

import { motion } from "motion/react"

import IngredientCard from '../../components/IngredientCard';
import IngredientCreationModal from '../../components/IngredientCreationModal';

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


export default function Ingredients() {

  const [searchTerm, setSearchTerm] = useState('');
  const [allIngredients] = useState(originalIngredients);
  const [filteredIngredients, setFilteredIngredients] = useState<IngredientProp[]>(originalIngredients);

  const [selectedIngredient, setSelectedIngredient] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  
  const [showCreationModal, setShowCreationModal] = useState(false);

  const [itemBeforeEdit, setItemBeforeEdit] = useState<IngredientProp | null>(null);

  useEffect(() => {
    const results = allIngredients.filter((ingredient) =>
      ingredient.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredIngredients(results);
  }, [searchTerm, allIngredients]);

  function handleSearchChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchTerm(event.target.value);
  }

  function handleSelection(ingredientName: string) {
    if (isEditing) {
      if (selectedIngredient != ingredientName) {
        toast.warning("Finish editing before selecting another ingredient");
      }
      return;
    }

    if (selectedIngredient === ingredientName) {
      setSelectedIngredient(null);
      return;
    }
    setSelectedIngredient(ingredientName);
  }

  function startEditing() {
    if (selectedIngredient) {
      setItemBeforeEdit(filteredIngredients.find(item => item.name === selectedIngredient) || null);
      setIsEditing(true);
    }
  }

  function endEditing() {
    setIsEditing(false);
  }

  function editItem(ingredient: IngredientProp) {
    if (isEditing && selectedIngredient) {
      setFilteredIngredients(filteredIngredients.map(item =>
        item.name === selectedIngredient ? ingredient : item
      ));
      setSelectedIngredient(ingredient.name);
    }
  }

  function undoItemChanges() {
    if (isEditing) {
      setFilteredIngredients(filteredIngredients.map(item =>
        item.name === selectedIngredient ? itemBeforeEdit || item : item
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

  return (
    <section
      id="ingredients"
      style={{
        height: '100%',
        backgroundColor: "softbeige"
      }}
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

      <Navbar bg="transparent" data-bs-theme="light" className="d-flex justify-content-center p-0" > 
        <Container fluid className="d-flex align-items-center justify-content-between" style={{ width: '100%' }}>
          <div className="d-flex align-items-center">
            <Button variant="secondary rounded-circle" className="d-flex align-items-center p-2">
              <SlidersHorizontal size={18} />
            </Button>
            <Form className="d-flex p-1" style={{ width: '100%', maxWidth: '400px' }}>
              <div
                className="d-flex align-items-center bg-white border rounded-pill px-3 shadow-sm"
                style={{ width: "100%" }}
              >
                <Search size={20} className="text-muted me-1" />
                <Form.Control
                  type="search"
                  placeholder="Search..."
                  className="border-0 shadow-none flex-grow-1"
                  aria-label="Search"
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
              </div>
            </Form>
          </div>
          
          <motion.div
            className="d-flex align-items-center gap-1"
            layout
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            <motion.div layout="position">
              <Button
                variant="primary rounded-circle"
                className="d-flex align-items-center p-2"
              >
                <Plus size={18} onClick={() => setShowCreationModal(true)} />
              </Button>
            </motion.div>

            {selectedIngredient && (
              <>
                { !isEditing ? (
                  <Button variant="warning rounded-circle" className="d-flex align-items-center p-2">
                    <Pencil size={18} onClick={startEditing} />
                  </Button>
                ) : (
                  <>
                    <Button variant="success rounded-circle" className="d-flex align-items-center p-2">
                      <Save size={18} onClick={saveItemChanges} />
                    </Button>
                    <Button variant="secondary rounded-circle" className="d-flex align-items-center p-2">
                      <RotateCcw size={18} onClick={undoItemChanges} />
                    </Button>
                  </>
                )}


                <Button variant="danger rounded-circle" className="d-flex align-items-center p-2">
                  <Trash size={18} />
                </Button>
              </>
            )}
          </motion.div>

        </Container>
      </Navbar>
      
      <div
        className="customScrollbar d-flex flex-column gap-2 m-3 p-2 rounded"
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
            isSelected={ingredient.name === selectedIngredient}
            setIsSelected={() => handleSelection(ingredient.name)}
            isEditing={isEditing && ingredient.name === selectedIngredient}
            editItem={editItem}
          />
        ))}
      </div>
    </section>
  );
}
