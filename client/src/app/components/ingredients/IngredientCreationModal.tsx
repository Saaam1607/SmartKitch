import React, { useState, useEffect } from 'react';

import Modal from '../generic/modal/Modal';
import ImageUploader from '../generic/image/ImageUploader';
import Control from '../generic/form/Control';
import Check from '../generic/form/Check';

import IngredientProp from '../../types/IngredientProp';

import getCroppedImg from '../../utils/getCroppedImg';

import '../../styles/creationModal.css';

interface IngredientCreationModalProps {
  visible: boolean;
  close: () => void;
  create: (ingredient: IngredientProp) => void;
}

export default function IngredientCreationModal({ visible, close, create }: IngredientCreationModalProps) {

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const [outOfStock, setOutOfStock] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const [uploadedImage, setUploadedImage] = useState(null);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  useEffect(() => {
    setName("");
    setDescription("");
    setOutOfStock(false);
    setDisabled(false);
    setUploadedImage(null);
  }, [visible])

  async function createItem() {
    let newIngredient: IngredientProp = {
      name: name,
      description: description,
      image: '',
      outOfStock: outOfStock,
      disabled: disabled,
    }

    if (uploadedImage && croppedAreaPixels) {
      const croppedBlob = await getCroppedImg(uploadedImage, croppedAreaPixels);
      newIngredient = {
        ...newIngredient,
        image: URL.createObjectURL(croppedBlob),
      };
    } else {
      newIngredient = { ...newIngredient };
    }

    create(newIngredient);
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
        item={{ name: name }}
        value={name}
        fieldName="Name"
        isEditing={true}
        handleChange={(e) => setName(e.target.value)}
      />

      <Control
        type="textarea"
        item={{ name: name }}
        value={description}
        fieldName="Description"
        isEditing={true}
        handleChange={(e) => setDescription(e.target.value)}
      />

      <ImageUploader
        uploadedImage={uploadedImage}
        setUploadedImage={setUploadedImage}
        croppedAreaPixels={croppedAreaPixels}
        setCroppedAreaPixels={setCroppedAreaPixels}
      />

      <div className="d-flex gap-5">
        <Check
          item={{ name: name }}
          value={outOfStock}
          fieldName="Out Of Stock"
          isEditing={true}
          handleChange={() => setOutOfStock(!outOfStock)}
        />
        <Check
          item={{ name: name }}
          value={disabled}
          fieldName="Disabled"
          isEditing={true}
          handleChange={() => setDisabled(!disabled)}
        />
      </div> 

    </Modal>
  );
}