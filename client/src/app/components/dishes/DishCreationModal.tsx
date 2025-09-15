import React, { useState, useEffect } from 'react';

import Modal from '../generic/modal/Modal';
import ImageUploader from '../generic/image/ImageUploader';
import Control from '../generic/form/Control';
import Check from '../generic/form/Check';

import { Area } from 'react-easy-crop';

import { Dish } from '@models/Dish';

import getCroppedImg from '../../utils/getCroppedImg';

import { blobToBase64 } from '../../utils/blobToBase64';

import '../../styles/creationModal.css';
import ComboList from '../generic/form/ComboList';

import useStore from '../../state/useStore'

interface DishCreationModalProps {
  visible: boolean;
  close: () => void;
  create: (dish: Dish) => void;
}

const defaultNewDish: Dish = {
  name: "",
  description: "",
  ingredients: [],
  disabled: false,
  price: null,
  image: null,
  outOfStock: false,
}

export default function DishCreationModal({ visible, close, create }: DishCreationModalProps) {

  const [newDish, setNewDish] = useState<Dish>(defaultNewDish);
  const [uploadedImage, setUploadedImage] = useState(null);

  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

  const ingredients = useStore((state) => state.ingredients);

  const [ingredientsNames, setIngredientsNames] = useState(ingredients.map(obj => obj.name));

  useEffect(() => {
    setIngredientsNames(ingredients.map(obj => obj.name))
    console.log(ingredients.map(obj => obj.name))
  }, [ingredients])

  useEffect(() => {
    setNewDish(defaultNewDish);
  }, [visible])

  function handleIngredientAddition(ingredient: string) {
    setNewDish({ ...newDish, ingredients: [...newDish.ingredients, ingredient] });
  }

  function handleIngredientRemoval(ingredient: string) {
    setNewDish({ ...newDish, ingredients: newDish.ingredients.filter(i => i !== ingredient) });
  }

  async function createItem() {
    let ingredientToCreate = newDish;

    if (uploadedImage && croppedAreaPixels) {
      const croppedBlob = await getCroppedImg(uploadedImage, croppedAreaPixels) as Blob;
      ingredientToCreate = { ...newDish, image: await blobToBase64(croppedBlob), }
    }

    create(ingredientToCreate);
    setNewDish(defaultNewDish);
    close();
  }

  //! ingredients

  //! dish
  // ingredients: string[];

  return (
    <Modal
      title="New Dish"
      show={visible}
      close={close}
      saveItem={createItem}
    >
      <div className="d-flex flex-column gap-3">
        <Control
          type="text"
          itemKey={newDish.name}
          value={newDish.name}
          fieldName="Name"
          isEditing={true}
          handleChange={(e) =>
            setNewDish({ ...newDish, name: e.target.value })
          }
        />

        <Control
          type="textarea"
          itemKey={newDish.name}
          value={newDish.description}
          fieldName="Description"
          isEditing={true}
          handleChange={(e) =>
            setNewDish({ ...newDish, description: e.target.value })
          }
        />

        <ComboList
          valueList={newDish.ingredients}
          dataList={ingredientsNames}
          handleValueAddition={handleIngredientAddition}
          handleValueRemoval={handleIngredientRemoval}
          fieldName="Ingredients"
          itemKey={newDish.name}
          isEditing={true}
        />

        <ImageUploader
          uploadedImage={uploadedImage}
          setUploadedImage={setUploadedImage}
          setCroppedAreaPixels={(area: Area) => setCroppedAreaPixels(area)}
        />

        <Control
          type="price"
          step={0.1}
          itemKey={newDish.name}
          value={newDish.price}
          fieldName="Price"
          isEditing={true}
          handleChange={(e) =>
            setNewDish({ ...newDish, price: e.target.value })
          } 
        />

        <div className="d-flex gap-5">
          <Check
            itemKey={newDish.name}
            value={newDish.outOfStock}
            fieldName="Out Of Stock"
            isEditing={true}
            handleChange={() =>
              setNewDish({ ...newDish, outOfStock: !newDish.outOfStock })
            }
          />
          <Check
            itemKey={newDish.name}
            value={newDish.disabled}
            fieldName="Disabled"
            isEditing={true}
            handleChange={() =>
              setNewDish({ ...newDish, disabled: !newDish.disabled })
            }
          />
        </div> 
      </div>
    </Modal>
  );
}