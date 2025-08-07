import { useState, useCallback } from 'react';

import Cropper, { Area } from 'react-easy-crop';

import {  ImagePlus  } from 'lucide-react';

import IconButton from '../button/IconButton';

import '../../../styles/imageUploader.css';

interface ImageUploaderProps {
  uploadedImage: string | null;
  setUploadedImage: (image: string | null) => void;
  setCroppedAreaPixels: (area: Area) => void;
}

export default function ImageUploader({ uploadedImage, setUploadedImage, setCroppedAreaPixels }: ImageUploaderProps) {

  const [isDragging, setIsDragging] = useState(false);

  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  const onCropComplete = useCallback((_croppedArea: Area, areaPixels: Area) => {
    setCroppedAreaPixels(areaPixels);
  }, [setCroppedAreaPixels]);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;

    if (files && files.length > 0) {
      setImageFile(files[0]);
    }
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      setImageFile(files[0]);
    }
  };

  function setImageFile(file: File) {
    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === 'string' || reader.result === null) {
        setUploadedImage(reader.result);
      }
    };
    reader.readAsDataURL(file);
  }

  const handleDeleteImage = () => {
    setUploadedImage(null);
  }

  return (
    <div className="d-flex gap-1 justify-content-center">
      <div>
        <input
          type="file"
          id="myfile"
          name="myfile"
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />
          {uploadedImage == null ? (
            <label htmlFor="myfile">
              <div
                className={`d-flex flex-column rounded upload-image-container ${isDragging ? 'dashed' : ''}`}
                style={{
                  width: '200px',
                  height: '150px',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: isDragging ? '#e0e0e0' : '#f0f0f0',
                  display: 'flex',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s, border 0.2s',
                }}
                title="Upload Image"
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <ImagePlus width={50} height={50} style={{ color: 'grey' }} />
                <p>{isDragging ? 'Release File Here' : 'Upload Image'}</p>
              </div>
            </label>
          ) : (
            <div
              style={{
                position: 'relative',
                width: '200px',
                height: '150px',
              }}
              className="border border-danger rounded"
            >
              <Cropper
                image={uploadedImage}
                crop={crop}
                zoom={zoom}
                aspect={4 / 3}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
              />
            </div>
          )}
      </div> 

      <IconButton variant="danger" iconName="Trash" title="Drop Image" onClick={handleDeleteImage} />

    </div>
  );
}