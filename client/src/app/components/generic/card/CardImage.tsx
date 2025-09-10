import React, { useState, useEffect } from 'react';

import { Image, Pencil } from 'lucide-react';

import Modal from '../../generic/modal/Modal';
import ImageUploader from '../../generic/image/ImageUploader';

import getCroppedImg from '../../../utils/getCroppedImg';

import { useThemeStyles } from '../../../hooks/useThemeStyles';

import { blobToBase64 } from '../../../utils/blobToBase64';

interface CardImageProps {
  imageUrl: string;
  size?: number;
  isHovered?: boolean;
  borderSize?: number;
  borderRadius?: number;
  updateImage?: (image: string) => void;
  isEditing?: boolean;
}

export default function CardImage({ imageUrl, size=175, isHovered, borderSize=0, borderRadius=15, updateImage, isEditing }: CardImageProps) {

  const [showEditModal, setShowEditModal] = useState(false);
  const [newImage, setNewImage] = useState<string | null>(null);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<null | { x: number; y: number; width: number; height: number }>(null);

  const {
    mainCardBg,
    mainCardEditingBg,
  } = useThemeStyles();

  async function saveChanges() {

    if (newImage) {

    if (newImage && croppedAreaPixels) {
      const croppedBlob = await getCroppedImg(newImage, croppedAreaPixels) as Blob;
      const imageString = await blobToBase64(croppedBlob);
      updateImage(imageString);
    }

      // const croppedBlob = await getCroppedImg(newImage, croppedAreaPixels) as Blob;
      // const imageUrl = URL.createObjectURL(croppedBlob);
      // if (imageUrl && updateImage)
    // } else {
    //   if (updateImage) updateImage("");
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

      <div
        className="position-relative"
        style={{
          border: `${borderSize}px solid ${!isEditing ? mainCardBg : mainCardEditingBg}`, 
          borderRadius: `${borderRadius + borderSize}px`,
          width: size + 2 * borderSize,
          height: size + 2 * borderSize,
        }}
      >

        {imageUrl ? (
          <img
            alt="Card Image"
            src={imageUrl}
            style={{
              width: "100%",
              height: "100%",
              objectFit: 'cover',
              borderRadius: `${borderRadius}px`,
              transition: 'transform 0.3s ease',
              transform: isHovered ? 'scale(1.05)' : 'scale(1)',
            }}
          />
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
        {/* {getImage ? (
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
              transform: isHovered ? 'scale(1.05)' : 'scale(1)',
            }}
          /> 
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
        )} */}

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