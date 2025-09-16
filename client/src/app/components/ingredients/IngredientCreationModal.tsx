import React, { useState, useEffect } from 'react';

import Modal from '../generic/modal/Modal';
import ImageUploader from '../generic/image/ImageUploader';
import Control from '../generic/form/Control';
import Check from '../generic/form/Check';

import { Area } from 'react-easy-crop';

import { Ingredient } from '@models/Ingredient';

import getCroppedImg from '../../utils/getCroppedImg';

import { blobToBase64 } from '../../utils/blobToBase64';

import { useLoading } from '../../loadingProvider/LoadingProvider';

import imagesService from '../../services/imagesService';

import '../../styles/creationModal.css';

interface IngredientCreationModalProps {
  visible: boolean;
  close: () => void;
  addItem: (newItem: Ingredient) => Promise<Ingredient>;
  refreshData: () => void;
}

const defaultNewIngredient: Ingredient = {
  name: "",
  description: "",
  disabled: false,
  isAddable: false,
  additionPrice: 0,
  imageUrl: "",
  outOfStock: false,
}

export default function IngredientCreationModal({ visible, close, addItem, refreshData }: IngredientCreationModalProps) {

  const [newIngredient, setNewIngredient] = useState<Ingredient>(defaultNewIngredient);
  const [uploadedImage, setUploadedImage] = useState("");

  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

  const { setLoading } = useLoading();

  useEffect(() => {
    setNewIngredient(defaultNewIngredient);
  }, [visible])

  async function createItem() {
    let ingredientToCreate = newIngredient;

    setLoading(true);

    if (uploadedImage && croppedAreaPixels) {
      const croppedBlob = await getCroppedImg(uploadedImage, croppedAreaPixels) as Blob;
      const imageString = await blobToBase64(croppedBlob);
      const imageUrl = await imagesService.uploadImage(imageString, ingredientToCreate.name);
      ingredientToCreate = { ...ingredientToCreate, imageUrl: imageUrl }
    }
    
    await addItem(ingredientToCreate);
    await refreshData();

    setNewIngredient(defaultNewIngredient);
    setUploadedImage("");
    close();

    setLoading(false);
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
          setCroppedAreaPixels={setCroppedAreaPixels}
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
              setNewIngredient({ ...newIngredient, additionPrice: parseFloat(e.target.value) })
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