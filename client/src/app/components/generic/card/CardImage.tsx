import React, { useState } from 'react';

import { Image, Pencil } from 'lucide-react';

import Modal from '../../generic/modal/Modal';
import ImageUploader from '../../generic/image/ImageUploader';

import getCroppedImg from '../../../utils/getCroppedImg';

interface CardImageProps {
  image: string;
  updateImage: (image: string) => void;
  isEditing: boolean;
}

export default function CardImage({ image, updateImage, isEditing }: CardImageProps) {

  const [showEditModal, setShowEditModal] = useState(false);
  const [newImage, setNewImage] = useState<string | null>(null);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<null | { x: number; y: number; width: number; height: number }>(null);

  async function saveChanges() {
    if (newImage) {
      const croppedBlob = await getCroppedImg(newImage, croppedAreaPixels) as Blob;
      const imageUrl = URL.createObjectURL(croppedBlob);
      updateImage(imageUrl);
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
          setCroppedAreaPixels={setCroppedAreaPixels}
        />
      </Modal>

      <div className="rounded-start position-relative" >
        {image != "" ? (
          <div
            className="rounded-start"
            style={{
              width: '150px',
              height: '150px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              userSelect: 'none',
              pointerEvents: 'none'
            }} 
          >
            <img
              className=""
              alt={"Card Image"}
              src={image}
              style={{
                width: '150px',
                height: '150px',
                objectFit: 'cover',
                borderRadius: "15px"
              }}
            /> 
          </div>
        ) : (
          <div
            className="faded"
            style={{
              width: '150px',
              height: '150px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#f0f0f0'
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