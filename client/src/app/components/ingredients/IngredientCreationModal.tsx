import React, { useState } from 'react';

import Modal from '../generic/modal/Modal';
import ImageUploader from '../generic/image/ImageUploader';
import Control from '../generic/form/Control';
import Check from '../generic/form/Check';

import IngredientProp from '../../types/IngredientProp';

import getCroppedImg from '../../utils/getCroppedImg';

import '../../styles/creationModal.css';

interface IngredientCreationModalProps {
  show: boolean;
  close: () => void;
  createNewIngredient: (ingredient: IngredientProp) => void;
}

// function createImage(url) {
//   return new Promise((resolve, reject) => {
//     const image = new Image();
//     image.onload = () => resolve(image);
//     image.onerror = (error) => reject(error);
//     image.src = url;
//   });
// }

// async function getCroppedImg(imageSrc, crop) {
//   const image = await createImage(imageSrc);
//   const canvas = document.createElement('canvas');
//   canvas.width = crop.width;
//   canvas.height = crop.height;
//   const ctx = canvas.getContext('2d');

//   ctx.drawImage(
//     image,
//     crop.x,
//     crop.y,
//     crop.width,
//     crop.height,
//     0,
//     0,
//     crop.width,
//     crop.height
//   );

//   return new Promise((resolve) => {
//     canvas.toBlob((blob) => {
//       resolve(blob);
//     }, 'image/jpeg');
//   });
// }

export default function IngredientCreationModal({ show, close, createNewIngredient }: IngredientCreationModalProps) {

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const [outOfStock, setOutOfStock] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const [uploadedImage, setUploadedImage] = useState(null);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

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

    createNewIngredient(newIngredient);
    close();
  }

  return (
    <Modal
      title="New Ingredient"
      show={show}
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