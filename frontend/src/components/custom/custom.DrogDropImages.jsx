// src/ImageUpload.js
import React, { useState } from 'react';
import '../../styles/uploadImages.css';

const FileUpload = () => {
    const [images, setImages] = useState([]);
    const [currentImage, setCurrentImage] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleFiles = (files) => {
        const fileArray = Array.from(files).map((file) => URL.createObjectURL(file));
        setImages((prevImages) => prevImages.concat(fileArray));
        Array.from(files).map((file) => URL.revokeObjectURL(file));
    };

    const handleDrop = (e) => {
        e.preventDefault();
        handleFiles(e.dataTransfer.files);
    };

    const handleBrowse = (e) => {
        handleFiles(e.target.files);
    };

    const handleDelete = (index) => {
        const newImages = images.filter((_, i) => i !== index);
        setImages(newImages);
    };

    const handleView = (image) => {
        setCurrentImage(image);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setCurrentImage(null);
    };

    return (
        <div className="upload-container">
            <div
                className="drag-area"
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
            >
                <h2>Drag & Drop to Upload Images</h2>
                <span>OR</span>
                <span className="choose-file" onClick={() => document.getElementById('fileInput').click()}>
                    Choose file
                </span>
                <input
                    type="file"
                    id="fileInput"
                    multiple
                    accept="image/*"
                    onChange={handleBrowse}
                    hidden
                />
            </div>
            <div id="gallery">
                {images.map((image, index) => (
                    <div key={index} className="image-container">
                        <img src={image} alt={`upload-${index}`} />
                        <button className="delete-btn" onClick={() => handleDelete(index)}>X</button>
                        <button className="view-btn" onClick={() => handleView(image)}>👁️</button>
                    </div>
                ))}
            </div>
            {isModalOpen && (
                <div className="modal">
                    <span className="close" onClick={closeModal}>&times;</span>
                    <img className="modal-content" src={currentImage} alt="view" />
                </div>
            )}
        </div>
    );
};

export default FileUpload;
