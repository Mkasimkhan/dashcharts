import React, { useState, useRef } from 'react';
import { Header } from '..';
import { SlCloudUpload } from "react-icons/sl";
import './Upload.css';

const Upload = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef(null);

    // Function to handle file input click
    const handleBrowseClick = (e) => {
        e.preventDefault();
        fileInputRef.current.click();
    };

    // Function to handle file selection
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setSelectedFile(file); // Store the selected file in state
        console.log('Selected file:', file);
    };

    // Handle drag events
    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragEnter = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files[0];
        setSelectedFile(file); // Store the dropped file in state
        console.log('Dropped file:', file);
    };

    return (
        <>
                <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-md">
                    <Header category="Report Setting" title="Upload File" />
                    <div className="upload-page">
                        <div
                            className={`file-upload-container ${isDragging ? 'dragging' : ''}`}
                            onDragOver={handleDragOver}
                            onDragEnter={handleDragEnter}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                        >
                            <div className="file-uploader">
                                <SlCloudUpload className='cloud' />
                                <h2>
                                    Drag files here or click to
                                    <a href="" className='browse' onClick={handleBrowseClick}> browse</a>
                                </h2>
                            </div>

                            {/* Hidden file input */}
                            <input
                                type="file"
                                ref={fileInputRef}
                                style={{ display: 'none' }}
                                onChange={handleFileChange}
                            />
                        </div>
                        {selectedFile && (
                            <div className="file-info">
                                <p>Selected file: {selectedFile.name}</p>
                            </div>
                        )}
                    </div>
                </div>
        </>
    );
};

export default Upload;