import { useState, useCallback } from 'react';

import Cropper from 'react-easy-crop';

import { Form, Button } from 'react-bootstrap';

import { Trash, ImagePlus  } from 'lucide-react';

import '../styles/imageUploader.css';

export default function ImageUploader({ uploadedImage, setUploadedImage, croppedAreaPixels, setCroppedAreaPixels }) {

  const [isDragging, setIsDragging] = useState(false);

  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  const onCropComplete = useCallback((_, areaPixels) => {
    setCroppedAreaPixels(areaPixels);
  }, []);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;

    if (files && files.length > 0) {
      setImageFile(files[0]);
    }
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
    }
  };

  function setImageFile(file) {
    const reader = new FileReader();
    reader.onloadend = () => {
      setUploadedImage(reader.result);
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
                <p>{isDragging ? 'Rilascia qui il file' : 'Upload Image'}</p>
              </div>
            </label>
          ) : (
            <div
              style={{
                position: 'relative',
                width: '100%',
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

      <Button
        variant="danger rounded-circle"
        className="d-flex align-items-center p-2 mt-1"
        style={{ height: 'fit-content'}}
        title="Drop Image"
      >
        <Trash size={18} onClick={handleDeleteImage} />
      </Button>
    </div>
  );
}