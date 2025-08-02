import React, { useState } from 'react';

import { Card, Form, Button, Modal, Image as BootstrapImage } from 'react-bootstrap';

import CreationModal from './CreationModal';
import ImageUploader from './ImageUploader';

import IngredientProp from '../../types/IngredientProp';

import '../styles/creationModal.css';

interface IngredientCreationModalProps {
  show: boolean;
  close: () => void;
  createNewIngredient: (ingredient: IngredientProp) => void;
}

function createImage(url) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = (error) => reject(error);
    image.src = url;
  });
}

async function getCroppedImg(imageSrc, crop) {
  const image = await createImage(imageSrc);
  const canvas = document.createElement('canvas');
  canvas.width = crop.width;
  canvas.height = crop.height;
  const ctx = canvas.getContext('2d');

  ctx.drawImage(
    image,
    crop.x,
    crop.y,
    crop.width,
    crop.height,
    0,
    0,
    crop.width,
    crop.height
  );

  return new Promise((resolve) => {
    canvas.toBlob((blob) => {
      resolve(blob);
    }, 'image/jpeg');
  });
}

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
    <CreationModal
      title="New Ingredient"
      show={show}
      close={close}
      createItem={createItem}
    >
      <Form.Group className="mb-1 d-flex flex-column align-items-left">
        <Form.Label
          className="m-0 ms-2"
          style={{fontSize: '0.8rem'}}
          htmlFor={`name-newIngredient`} 
        >
          Name
        </Form.Label>
        <Form.Control
          type="text"
          className="ps-2 rounded-pill"
          value={name}
          id={`name-newIngredient`}
          onChange={(e) => setName(e.target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-1 d-flex flex-column align-items-left">
        <Form.Label
          className="m-0 ms-2"
          style={{fontSize: '0.8rem'}}
          htmlFor={`description-newIngredient`}
        >
          Description
        </Form.Label>
        <Form.Control
          type="text"
          className="ps-2 rounded-pill"
          value={description}
          id={`description-newIngredient`}
          onChange={(e) => setDescription(e.target.value)}
        />
      </Form.Group>

      <ImageUploader
        uploadedImage={uploadedImage}
        setUploadedImage={setUploadedImage}
        croppedAreaPixels={croppedAreaPixels}
        setCroppedAreaPixels={setCroppedAreaPixels}
      />

      <Form.Group className="mb-1">
        <Form.Check
          type="checkbox"
          label="Out Of Stock"
          checked={outOfStock}
          id={`outOfStock-newIngredient`}
          htmlFor={undefined}
          onChange={() => setOutOfStock(!outOfStock)}
        />
      </Form.Group>
      <Form.Group className="mb-1">
        <Form.Check
          type="checkbox"
          label="Disabled"
          checked={disabled}
          id={`disabled-newIngredient`}
          htmlFor={undefined}
          onChange={() => setDisabled(!disabled)}
        />
      </Form.Group>
    </CreationModal>
  );
}