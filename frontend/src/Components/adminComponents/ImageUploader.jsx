import React, { useState, useRef } from 'react';
import { toast } from 'react-toastify';


const ImageUploader = ({images, setImages, formData, currentProduct, productImages}) => {

    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef(null);

    const selectFile = () => {
        fileInputRef.current.click();
    };

    const onFileSelect = (e) => {
        const selectedFiles = e.target.files;
        if (selectedFiles.length === 0) {
            return;
        }
        if (selectedFiles.length + images.length > 4) {
           toast.error('You can upload a maximum of 4 images.');
            return;
        }
        for (let i = 0; i < selectedFiles.length; i++) {
            if(selectedFiles[i].type.split('/')[0] !== 'image') continue;
            if(!images.find(image => image.name === selectedFiles[i].name)) {
                setImages((prevImages) => [...prevImages, { url: URL.createObjectURL(selectedFiles[i]), name: selectedFiles[i] }]);
                if(formData.image1 === null || formData.image1 === undefined) {
                    formData.image1 = selectedFiles[i];
                }
                else if(formData.image2 === null || formData.image2 === undefined) {
                    formData.image2 = selectedFiles[i];
                }
                else if(formData.image3 === null || formData.image3 === undefined) {
                    formData.image3 = selectedFiles[i];
                }
                else if(formData.image4 === null || formData.image4 === undefined) {
                    formData.image4 = selectedFiles[i];
                }
            }
        }
        
    };


    const DragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
        e.dataTransfer.dropEffect = 'copy';
    };

    const DragLeave = (e) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const OnDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        const files = e.dataTransfer.files;

        if (files.length + images.length > 4) {
            toast.error('You can upload a maximum of 4 images.');
             return;
         }
         for (let i = 0; i < files.length; i++) {
             if(files[i].type.split('/')[0] !== 'image') continue;
             if(!images.find(image => image.name === files[i].name)) {
                 setImages((prevImages) => [...prevImages, { url: URL.createObjectURL(files[i]), name: files[i] }]);
                 if(formData.image1 === null || formData.image1 === undefined) {
                     formData.image1 = files[i];
                 }
                 else if(formData.image2 === null || formData.image2 === undefined) {
                     formData.image2 = files[i];
                 }
                 else if(formData.image3 === null || formData.image3 === undefined) {
                     formData.image3 = files[i];
                 }
                 else if(formData.image4 === null || formData.image4 === undefined) {
                     formData.image4 = files[i];
                 }
             }

            }
                         
           
    }

    const removeImage = (index) => {
        setImages((prevImages) => prevImages.filter((_, i) => i !== index));
        if(formData.image1 === images[index].name || formData.image1 === images[index]) {
            formData.image1 = null;
        }
        else if(formData.image2 === images[index].name || formData.image2 === images[index]) {
            formData.image2 = null;
        }
        else if(formData.image3 === images[index].name || formData.image3 === images[index]) {
            formData.image3 = null;
        }
        else if(formData.image4 === images[index].name || formData.image4 === images[index]) {
            formData.image4 = null;
        }
            

    };



    //Coverting File to Base64 if needed

    const convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
    };



  return (
    <div onDragOver={DragOver} onDragLeave={DragLeave} onDrop={OnDrop} className='flex flex-col items-center gap-2 p-2 outline-2 w-full bg-neutral-600 text-white outline-neutral-500 outline-dotted rounded-2xl'>
        <div className='flex items-center gap-2'>
            <p>{currentProduct === null ? 'Drag & Drop image/images or' : 'Drag & Drop to upload new image/images or'} <span className='text-fuchsia-600 cursor-pointer' role='button' onClick={selectFile}>Browse</span></p>
            <input type="file" className='hidden' multiple ref={fileInputRef} onChange={onFileSelect} />
        </div>
        <div className='flex h-[300px] items-center gap-2'>
            { currentProduct !== null && images.length === 0 ?
                productImages.map((image, index) => (
                    <div key={index} className='flex w-full h-full items-center gap-2 relative'>
                        <img className='w-full h-full object-cover' src={image} />
                    </div>
                )) :
                 images.map((image, index) => (    
                    <div key={index} className='flex w-full h-full items-center gap-2 relative'>
                        <span onClick={() => removeImage(index)} className='absolute text-red-500 top-0 right-0 text-3xl cursor-pointer'>&times;</span>
                        <img className='w-full h-full object-cover' src={image.url} />
                    </div>
                    ))
            }
        </div>
    </div>
  )
}

export default ImageUploader;

