import React, { useState, useEffect } from 'react';
import Style from './Books.module.css';
import { Card as BootstrapCard } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useParams } from 'react-router-dom'; 

const Books = () => {
    let { category } = useParams(); // Retrieve category from URL params
    const [books, setBooks] = useState([]);
    const [selectedBook, setSelectedBook] = useState(null);
  
    useEffect(() => {
      const fetchBooks = async () => {
        try {
          const bookResponse = await fetch('http://localhost:5000/api/books', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            },
          });
  
          const bookResult = await bookResponse.json();
          console.log('Books fetched:', bookResult);
          setBooks(bookResult);
        } catch (error) {
          console.error("Error fetching books:", error);
        }
      };
  
      fetchBooks();
    }, []);
  
    const handleShowInfo = (book) => {
      setSelectedBook(book);
    };
  
    const handleCloseInfo = () => {
      setSelectedBook(null);
    };

    // Filter books based on the category
    const filteredBooks = category ? books.filter(book => book.category === category) : books;
   
    return (
        <>
            <h1 className={Style.title}>Books in {category ? category : 'All Categories'}</h1>

            <div className={Style.gridContainer}>

                {/* When a book is selected */}
                {selectedBook && (
                    <div className={Style.infoRow}>
                        <div className={Style.selectedCategory} onClick={handleCloseInfo}>
                            <BootstrapCard>
                                <BootstrapCard.Img variant="top" src={selectedBook.image} style={{ height: '15rem' }} />
                                <BootstrapCard.Body>
                                    <BootstrapCard.Title>{selectedBook.title}</BootstrapCard.Title>
                                    <BootstrapCard.Text>
                                        <span style={{fontWeight:"bold"}}>Author :</span> {selectedBook.author}
                                    </BootstrapCard.Text>
                                </BootstrapCard.Body>
                            </BootstrapCard>
                        </div>
                        
                        {/* Info */}
                        <div className={Style.info}>
                            <div className={Style.header_info}>
                                <h2>{selectedBook.title}</h2>
                                <a onClick={handleCloseInfo}><i className="bi bi-x-lg"></i></a>
                            </div>
                            <img src={selectedBook.image} alt={selectedBook.title} className={Style.info_image} />
                            <p>{selectedBook.description}</p>
                        </div>
                    </div>
                )}

                {/* All books */}
                <div className={Style.booksContainer}>
                    {filteredBooks.map(book => (
                        <div key={book._id} className={`${Style.bookContainer} ${selectedBook && selectedBook._id === book._id ? Style.hidden : ''}`}>
                            <div onClick={() => handleShowInfo(book)} className={`${Style.category} ${Style.clickable}`}>
                                <BootstrapCard>
                                    <BootstrapCard.Img variant="top" src={book.image} style={{ height: '15rem' }} />
                                    <BootstrapCard.Body>
                                        <BootstrapCard.Title>{book.title}</BootstrapCard.Title>
                                        <BootstrapCard.Text>
                                            <span style={{fontWeight:"bold"}}>Author :</span> {book.author}
                                        </BootstrapCard.Text>
                                    </BootstrapCard.Body>
                                </BootstrapCard>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Books;
