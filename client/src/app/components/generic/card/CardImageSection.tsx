import React, { useState, useEffect } from 'react';

import CardImage from './CardImage';

import ColorThief from 'colorthief';

import { Pencil } from 'lucide-react';

import Modal from '../../generic/modal/Modal';
import ImageUploader from '../../generic/image/ImageUploader';

import { useThemeStyles } from '../../../hooks/useThemeStyles';

import imagesService from '../../../services/imagesService';

import getCroppedImg from '../../../utils/getCroppedImg';
import { blobToBase64 } from '../../../utils/blobToBase64';

import useStore from '../../../state/useStore'

import { useLoading } from '../../../loadingProvider/LoadingProvider';


interface CardImageSectionProps {
  imageUrl: string;
  handleImageChange?: (newImageUrl: string, fieldName: string) => void;
  isEditing: boolean;
}

export default function CardImageSection({ imageUrl, handleImageChange, isEditing }: CardImageSectionProps) {

  const { componentKey } = useStore();

  const [showEditModal, setShowEditModal] = useState(false);
  const [newImage, setNewImage] = useState<string | null>(null);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<null | { x: number; y: number; width: number; height: number }>(null);

  const [mainColor, setMainColor] = useState<[number, number, number] | null>(null);
  const [isLgUp, setIsLgUp] = useState(false);

  const { setLoading } = useLoading();

  const {
    mainCardBg,
    mainCardEditingBg,
  } = useThemeStyles();

  useEffect(() => {
    if (imageUrl) {
      const img = new window.Image();
      img.crossOrigin = 'Anonymous';
      img.src = imageUrl;

      img.onload = () => {
        const colorThief = new ColorThief();
        const color: [number, number, number] = colorThief.getColor(img);
        setMainColor(color);
      };
    }
  }, [imageUrl]);

  useEffect(() => {
    const handleResize = () => setIsLgUp(window.innerWidth >= 992);

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  async function saveChanges() {
    if (newImage) {
      if (newImage && croppedAreaPixels) {
        setLoading(true);

        const croppedBlob = await getCroppedImg(newImage, croppedAreaPixels) as Blob;
        const imageString = await blobToBase64(croppedBlob);
        const imageUrl = await imagesService.uploadImage(imageString, componentKey);
        handleImageChange(imageUrl, "imageUrl");

        setLoading(false);
      }
    }
    setShowEditModal(false);
    setCroppedAreaPixels(null);
  }

  function undoChanges() {
    setShowEditModal(false)
  }

  const background =
    mainColor && mainColor.length > 0
      ? isLgUp
        ? `linear-gradient(to right, rgb(${mainColor[0]}, ${mainColor[1]}, ${mainColor[2]}) 75%, transparent 25%)`
        : `rgb(${mainColor[0]}, ${mainColor[1]}, ${mainColor[2]})`
      : "#ffffff";

  return (
    <div
      className="d-flex justify-content-center align-items-center p-3"
      style={{
        minHeight: '100%',
        background: background,
        transition: "opacity 0.5s ease",
        borderTopLeftRadius: isLgUp ? "15px" : "0",
        borderBottomLeftRadius: isLgUp ? "15px" : "0",
      }}
    >
      <div
        className="position-relative"
        style={{
          border: `${8}px solid ${!isEditing ? mainCardBg : mainCardEditingBg}`, 
          borderRadius: "24px",
          width: 175 + 2 * 8,
          height: 175 + 2 * 8,
        }}
      >
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
        <CardImage
          imageUrl={imageUrl}
          size={175}
          borderSize={8}
          isEditing={isEditing}
        />
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
    </div>
  );
}