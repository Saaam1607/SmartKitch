import React, { useState, useEffect } from 'react';

import Modal from '../generic/modal/Modal';
import ImageUploader from '../generic/image/ImageUploader';
import Control from '../generic/form/Control';
import Check from '../generic/form/Check';

import { Area } from 'react-easy-crop';

import { Drink } from '@models/Drink';

import getCroppedImg from '../../utils/getCroppedImg';

import { blobToBase64 } from '../../utils/blobToBase64';

import { useLoading } from '../../loadingProvider/LoadingProvider';

import imagesService from '../../services/imagesService';

import '../../styles/creationModal.css';

interface DrinkCreationModalProps {
  visible: boolean;
  close: () => void;
  create: (drink: Drink) => void;
}

const defaultNewDrink: Drink = {
  name: "",
  description: "",
  disabled: false,
  price: 0,
  imageUrl: "",
  outOfStock: false,
}

export default function DrinkCreationModal({ visible, close, create }: DrinkCreationModalProps) {

  const [newDrink, setNewDrink] = useState<Drink>(defaultNewDrink);
  const [uploadedImage, setUploadedImage] = useState(null);

  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

  const { setLoading } = useLoading();

  useEffect(() => {
    setNewDrink(defaultNewDrink);
  }, [visible])

  async function createItem() {
    let drinkToCreate = newDrink;

    setLoading(true);

    if (uploadedImage && croppedAreaPixels) {
      const croppedBlob = await getCroppedImg(uploadedImage, croppedAreaPixels) as Blob;
      const imageString = await blobToBase64(croppedBlob);
      const imageUrl = await imagesService.uploadImage(imageString, drinkToCreate.name);
      drinkToCreate = { ...drinkToCreate, imageUrl: imageUrl }
    }
    
    create(drinkToCreate);
    setNewDrink(defaultNewDrink);
    setUploadedImage(null);
    close();
    setLoading(false);
  }

  return (
    <Modal
      title="New Drink"
      show={visible}
      close={close}
      saveItem={createItem}
    >
      <div className="d-flex flex-column gap-3">
        <Control
          type="text"
          itemKey={newDrink.name}
          value={newDrink.name}
          fieldName="Name"
          isEditing={true}
          handleChange={(e) =>
            setNewDrink({ ...newDrink, name: e.target.value })
          }
        />

        <Control
          type="textarea"
          itemKey={newDrink.name}
          value={newDrink.description}
          fieldName="Description"
          isEditing={true}
          handleChange={(e) =>
            setNewDrink({ ...newDrink, description: e.target.value })
          }
        />

        <ImageUploader
          uploadedImage={uploadedImage}
          setUploadedImage={setUploadedImage}
          setCroppedAreaPixels={setCroppedAreaPixels}
        />
          
        <Control
          type="price"
          step={0.1}
          itemKey={newDrink.name}
          value={newDrink.price}
          fieldName="Price"
          isEditing={true}
          handleChange={(e) =>
            setNewDrink({ ...newDrink, price: e.target.value })
          } 
        />

        <div className="d-flex gap-5">
          <Check
            itemKey={newDrink.name}
            value={newDrink.outOfStock}
            fieldName="Out Of Stock"
            isEditing={true}
            handleChange={() =>
              setNewDrink({ ...newDrink, outOfStock: !newDrink.outOfStock })
            }
          />
          <Check
            itemKey={newDrink.name}
            value={newDrink.disabled}
            fieldName="Disabled"
            isEditing={true}
            handleChange={() =>
              setNewDrink({ ...newDrink, disabled: !newDrink.disabled })
            }
          />
        </div> 
      </div>
    </Modal>
  );
}