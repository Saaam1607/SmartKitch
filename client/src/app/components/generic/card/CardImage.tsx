import React, { useState } from 'react';

import { Image, Pencil } from 'lucide-react';

import Modal from '../../generic/modal/Modal';
import ImageUploader from '../../generic/image/ImageUploader';

import getCroppedImg from '../../../utils/getCroppedImg';

interface CardImageProps {
  image: string;
  size?: number;
  isHovered?: boolean;
  borderRadius?: number;
  updateImage?: (image: string) => void;
  isEditing?: boolean;
}

export default function CardImage({ image, size=175, isHovered, borderRadius=15, updateImage, isEditing }: CardImageProps) {

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
        {image && image != "" ? (
          <div
            className="rounded-start"
            style={{
              width: `${size}px`,
              height: `${size}px`,
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
                width: `${size}px`,
                height: `${size}px`,
                objectFit: 'cover',
                borderRadius: `${borderRadius}px`,
        transition: 'transform 0.3s ease',
        transform: isHovered ? 'scale(1.091)' : 'scale(1)',
              }}
            /> 
          </div>
        ) : (
          <div
            className=""
            style={{
              width: `${size}px`,
              height: `${size}px`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#f0f0f0',
              borderRadius: `${borderRadius}px`
            }} 
          >
            <Image width={50} height={50} style={{color: "grey"}}/>
          </div>
        )}

        {isEditing && (
          <div
            className="d-flex align-items-center justify-content-center position-absolute top-0 end-0 p-2 m-1"
            style={{
              backgroundColor: "white",
              borderRadius: '50%',
              zIndex: 1
            }}
          >
            <Pencil size={15} onClick={() => {setShowEditModal(true)}} />
          </div>
        )}

      </div>
    </>
  );
}