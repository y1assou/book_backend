import React, { useState } from 'react';
import Style from './Add.module.css';
import { FileInput, Select } from "flowbite-react";
import Swal from 'sweetalert2';

const Add = () => {
  const [uploadError, setUploadError] = useState('');
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    if (!file) {
      setUploadError('Please select an image to upload.');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64String = reader.result.split(',')[1];

      // Create book data
      const bookData = {
        title,
        category,
        author,
        description,
        image: {
          data: base64String,
          contentType: file.type,
        },
      };

      try {
        const bookResponse = await fetch('http://localhost:5000/api/books', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(bookData),
        });

        const bookResult = await bookResponse.json();
        console.log('Book added:', bookResult);
        Swal.fire({
          title: "Book added:",
          text: "succesefully",
          icon: "success",
          showConfirmButton: false,
          timer: 1000,
        });
        setUploadError('');
      } catch (error) {
        console.error('Error adding book:', error);
        setUploadError('Failed to add book');
        alert("Book addition failed");
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className={Style.container}>
      <div className={Style.formContainer}>
        <div className={Style.Content}>
          <h1>Add your book</h1>
          <p>Get started by adding your book to our library. You can add as many books as you'd like.</p>
        </div>
        <form className={Style.contactForm} onSubmit={handleFormSubmit}>
          <label className={Style.fileLabel}>
            Cover image
            <FileInput
              id="file-upload-helper-text"
              accept="image/png, image/jpeg"
              onChange={handleFileChange}
              helperText="File accepted: PNG, JPG."
            />
            {uploadError && <p className={Style.error}>{uploadError}</p>}
          </label>

          <label>
            Title
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </label>

          <label>
            Category
            <Select
              id={Style.category_select}
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="" disabled>Select a category</option>
              <option>Adventure</option>
              <option>Romance</option>
              <option>Thriller</option>
              <option>Memoir</option>
              <option>Travel</option>
              <option>Health</option>
              <option>Poetry</option>
              <option>Cooking</option>
            </Select>
          </label>

          <label>
            Author
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              required
            />
          </label>

          <label>
            Description
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>
          </label>

          <button type="submit">Add Book</button>
        </form>
      </div>
      <div className={Style.imageContainer}>
        <img src="https://d2616tuem1neks.cloudfront.net/misc_assets/press/Photography/Ereader.jpg" alt="E-reader" />
      </div>
    </div>
  );
}

export default Add;
