import React, { useEffect, useState } from 'react';

import { Form, Button, ListGroup, InputGroup } from 'react-bootstrap';

import Modal from '../modal/Modal';

import DishMiniCard from '../../dishes/DishMiniCard';
import DishMicroCard from '../../dishes/DishMicroCard';

import { SquarePlus } from 'lucide-react';

import type { Dish } from '@models/Dish';
import type { Drink } from '@models/Drink';


interface MenuComboListProps {
  selectedDishesNames: string[];
  allItemsWithMenu: {item: Dish | Drink, menuSection: string, type: string}[];
  handleArraySet?: (newArray: string[], fieldName: string) => void;
  fieldName: string;
  itemKey: string;
  isEditing: boolean;
}

export default function MenuComboList({ selectedDishesNames, allItemsWithMenu, handleArraySet, fieldName, itemKey, isEditing }: MenuComboListProps) {

  const [isModalVisible, setIsModalVisible] = useState(false);

  const [selectedValues, setSelectedValues] = useState<string[]>(selectedDishesNames || []);

  useEffect(() => {
    setSelectedValues(selectedDishesNames || []);
  }, [selectedDishesNames]);

  function handleSelectionChange(item: string) {
    setSelectedValues(prev =>
      prev.includes(item)
        ? prev.filter(id => id !== item)
        : [...prev, item]
    );
  }

  function closeModal() {
    setIsModalVisible(false);
  }

  function saveChangesFromModal() {
    if (handleArraySet) {
      handleArraySet(
        selectedValues,
        fieldName
      );
    }
    closeModal();
  }

  return (
    <Form.Group
      className="mb-1 d-flex flex-column align-items-left"
      style={{
        width: '100%',
        outline: 'none',
        color: '#212529',
        backgroundColor: 'transparent',
      }}
    >
        <ListGroup className="d-flex flex-row flex-wrap gap-2 rounded-0">
          {selectedValues?.map((item, index) => {
            const listItem = allItemsWithMenu?.find(d => d.item.name === item)?.item;
            return (
              <ListGroup.Item
                key={index}
                className="d-flex justify-content-between align-items-center gap-1 p-0 rounded-0 border-0"
                style={{
                  width: '100%',
                  backgroundColor: 'transparent',
                  userSelect: 'none',
                  pointerEvents: 'none'
                }}
              >
                {listItem && ( <DishMiniCard item={listItem} /> )}
              </ListGroup.Item>
            )
          })}
        </ListGroup>

        {isEditing && (
          <InputGroup className="mt-1">
            <div style={{ position: "relative", width: "100%" }}>
              <Button
                className="d-flex align-items-center p-1 px-2 m-0"
                onClick={() => setIsModalVisible(true)}
                style={{
                  borderColor: "rgb(219, 123, 33)",
                  backgroundColor: "transparent",
                  color: "rgb(219, 123, 33)",
                }}
              >
                <SquarePlus size={22} className="me-2" />
                <p className="m-0 p-0">
                  Edit Items
                </p>
              </Button>

              <Modal
                title="Add or Remove Dishes"
                show={isModalVisible}
                close={closeModal}
                saveItem={saveChangesFromModal}
              >
                <div className="d-flex flex-column gap-1">
                  {allItemsWithMenu.map((item: {item: Dish | Drink, menuSection: string}, index) => (
                    <div
                      key={index}
                      onClick={() => { if (item.menuSection === "") handleSelectionChange(item.item.name) }}
                      style={{ cursor: "pointer" }}
                    >
                      <DishMicroCard
                        item={item.item}
                        isSelected={selectedValues.includes(item.item.name)}
                        menuSection={item.menuSection}
                      />
                    </div>
                  ))}
                </div>
              </Modal>
              
            </div>
          </InputGroup>
        )}
    </Form.Group>
  );
}
