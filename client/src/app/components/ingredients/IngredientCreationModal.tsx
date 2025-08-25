import React, { useState, useEffect } from 'react';

import Modal from '../generic/modal/Modal';
import ImageUploader from '../generic/image/ImageUploader';
import Control from '../generic/form/Control';
import Check from '../generic/form/Check';

import { Area } from 'react-easy-crop';

import { Ingredient } from "@my-org/shared";

import getCroppedImg from '../../utils/getCroppedImg';

import { blobToBase64, blobUrlToBlob } from '../../utils/blobToBase64';

import '../../styles/creationModal.css';

interface IngredientCreationModalProps {
  visible: boolean;
  close: () => void;
  create: (ingredient: Ingredient) => void;
}

export default function IngredientCreationModal({ visible, close, create }: IngredientCreationModalProps) {

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const [outOfStock, setOutOfStock] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

  useEffect(() => {
    setName("");
    setDescription("");
    setOutOfStock(false);
    setDisabled(false);
    setUploadedImage(null);
  }, [visible])

  async function createItem() {
    let newIngredient: Ingredient = {
      name: name,
      description: description,
      image: '',
      outOfStock: outOfStock,
      disabled: disabled,
      isAddable: false,
      additionPrice: 0,
    }

    if (uploadedImage && croppedAreaPixels) {
      const croppedBlob = await getCroppedImg(uploadedImage, croppedAreaPixels) as Blob;
      newIngredient = {
        ...newIngredient,
        image: await blobToBase64(croppedBlob),
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
      <ImageUploader
        uploadedImage={uploadedImage}
        setUploadedImage={setUploadedImage}
        setCroppedAreaPixels={(area: Area) => setCroppedAreaPixels(area)}
      />

      <div className="d-flex gap-5">
        <Check
          itemKey={name}
          value={outOfStock}
          fieldName="Out Of Stock"
          isEditing={true}
          handleChange={() => setOutOfStock(!outOfStock)}
        />
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