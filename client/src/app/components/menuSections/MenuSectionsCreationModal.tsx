import React, { useState, useEffect } from 'react';

import Modal from '../generic/modal/Modal';
import Control from '../generic/form/Control';
import Check from '../generic/form/Check';

import { MenuSection } from '@models/MenuSection';

import '../../styles/creationModal.css';

interface MenuSectionsCreationModalProps {
  visible: boolean;
  close: () => void;
  create: (ingredient: MenuSection) => void;
}

export default function MenuSectionsCreationModal({ visible, close, create }: MenuSectionsCreationModalProps) {

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    setName("");
    setDescription("");
    setDisabled(false);
  }, [visible])

  async function createItem() {
    const newItem: MenuSection = {
      name: name,
      description: description,
      disabled: disabled,
      dishes: [],
    }
    create(newItem);
    close();
  }

  return (
    <Modal
      title="New Ingredient"
      show={visible}
      close={close}
      saveItem={createItem}
    >
      <Control
        type="text"
        itemKey={name}
        value={name}
        fieldName="Name"
        isEditing={true}
        handleChange={(e) => setName(e.target.value)}
      />

      <Control
        type="textarea"
        itemKey={name}
        value={description}
        fieldName="Description"
        isEditing={true}
        handleChange={(e) => setDescription(e.target.value)}
      />

      <div className="d-flex gap-5">
        <Check
          itemKey={name}
          value={disabled}
          fieldName="Disabled"
          isEditing={true}
          handleChange={() => setDisabled(!disabled)}
        />
      </div> 

    </Modal>
  );
}