import React, { useState, useEffect } from 'react';

import Modal from '../generic/modal/Modal';
import ImageUploader from '../generic/image/ImageUploader';
import Control from '../generic/form/Control';
import Check from '../generic/form/Check';

import { Area } from 'react-easy-crop';

import { Ingredient } from '@models/Ingredient';

import getCroppedImg from '../../utils/getCroppedImg';

import { blobToBase64 } from '../../utils/blobToBase64';

import '../../styles/creationModal.css';

interface IngredientCreationModalProps {
  visible: boolean;
  close: () => void;
  create: (ingredient: Ingredient) => void;
}

const defaultNewIngredient: Ingredient = {
  name: "",
  description: "",
  disabled: false,
  isAddable: false,
  additionPrice: 0,
  image: null,
  outOfStock: false,
}

export default function IngredientCreationModal({ visible, close, create }: IngredientCreationModalProps) {

  const [newIngredient, setNewIngredient] = useState<Ingredient>(defaultNewIngredient);
  const [uploadedImage, setUploadedImage] = useState(null);

  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

  useEffect(() => {
    setNewIngredient(defaultNewIngredient);
  }, [visible])

  async function createItem() {
    let ingredientToCreate = newIngredient;

    if (uploadedImage && croppedAreaPixels) {
      const croppedBlob = await getCroppedImg(uploadedImage, croppedAreaPixels) as Blob;
      ingredientToCreate = { ...newIngredient, image: await blobToBase64(croppedBlob), }
    }

    create(ingredientToCreate);
    setNewIngredient(defaultNewIngredient);
    close();
  }

  return (
    <Modal
      title="New Ingredient"
      show={visible}
      close={close}
      saveItem={createItem}
    >
      <div className="d-flex flex-column gap-3">
        <Control
          type="text"
          itemKey={newIngredient.name}
          value={newIngredient.name}
          fieldName="Name"
          isEditing={true}
          handleChange={(e) =>
            setNewIngredient({ ...newIngredient, name: e.target.value })
          }
        />

        <Control
          type="textarea"
          itemKey={newIngredient.name}
          value={newIngredient.description}
          fieldName="Description"
          isEditing={true}
          handleChange={(e) =>
            setNewIngredient({ ...newIngredient, description: e.target.value })
          }
        />

        <ImageUploader
          uploadedImage={uploadedImage}
          setUploadedImage={setUploadedImage}
          setCroppedAreaPixels={(area: Area) => setCroppedAreaPixels(area)}
        />

        <div className="d-flex gap-5">
          <Check
            itemKey={newIngredient.name}
            value={newIngredient.isAddable}
            fieldName="Is Addable"
            isEditing={true}
            handleChange={() =>
              setNewIngredient({ ...newIngredient, isAddable: !newIngredient.isAddable })
            } 
          />

          <Control
            type="price"
            step={0.1}
            itemKey={newIngredient.name}
            value={newIngredient.additionPrice}
            fieldName="Addition Price"
            isEditing={true}
            handleChange={(e) =>
              setNewIngredient({ ...newIngredient, additionPrice: e.target.value })
            } 
          />
        </div>

        <div className="d-flex gap-5">
          <Check
            itemKey={newIngredient.name}
            value={newIngredient.outOfStock}
            fieldName="Out Of Stock"
            isEditing={true}
            handleChange={() =>
              setNewIngredient({ ...newIngredient, outOfStock: !newIngredient.outOfStock })
            }
          />
          <Check
            itemKey={newIngredient.name}
            value={newIngredient.disabled}
            fieldName="Disabled"
            isEditing={true}
            handleChange={() =>
              setNewIngredient({ ...newIngredient, disabled: !newIngredient.disabled })
            }
          />
        </div> 
      </div>
    </Modal>
  );
}