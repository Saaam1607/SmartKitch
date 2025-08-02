import React, { useState } from 'react';

import { Image, Pencil } from 'lucide-react';

import Modal from '../../generic/modal/Modal';
import ImageUploader from '../../generic/image/ImageUploader';

import getCroppedImg from '../../../utils/getCroppedImg';

export default function CardImage({ image, updateImage, isEditing }) {

  const [showEditModal, setShowEditModal] = useState(false);
  const [newImage, setNewImage] = useState(image);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  async function saveChanges() {
    if (newImage) {
      const croppedBlob = await getCroppedImg(newImage, croppedAreaPixels);
      updateImage(URL.createObjectURL(croppedBlob));
    } else {
      updateImage("");
    }
    setShowEditModal(false);
    setCroppedAreaPixels(null);
  }

  function undoChanges() {
    setShowEditModal(false)
  }

  return (
    <>
      <Modal
        title="Edit Image"
        show={showEditModal}
        close={undoChanges}
        saveItem={saveChanges}
      >
        <ImageUploader
          uploadedImage={newImage}
          setUploadedImage={setNewImage}
          croppedAreaPixels={croppedAreaPixels}
          setCroppedAreaPixels={setCroppedAreaPixels}
        />
      </Modal>

      <div className="rounded-start position-relative" >
        {image != "" ? (
          <div
            className="rounded-start"
            style={{
              width: '200px',
              height: '150px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              userSelect: 'none',
              pointerEvents: 'none',
            }} 
          >
            <img
              className="rounded-start faded"
              src={image}
              style={{
                width: '200px',
                height: '150px',
                objectFit: 'cover',
              }}
            /> 
          </div>
        ) : (
          <div
            className="rounded-start faded"
            style={{
              width: '200px',
              height: '150px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#f0f0f0',
            }} 
          >
            <Image width={50} height={50} style={{color: "grey"}}/>
          </div>
        )}

        {isEditing && (
          <div
            className="position-absolute top-0 end-0 p-1"
            style={{ zIndex: 1 }}
          >
            <Pencil size={15} onClick={() => {setShowEditModal(true)}} />
          </div>
        )}

      </div>
    </>
  );
}