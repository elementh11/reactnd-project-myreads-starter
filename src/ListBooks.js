import React from 'react'
import { Link } from 'react-router-dom'
import BookShelf from './BookShelf'

//this stateless component renders the selected books on their shelves
function ListBooks(props) {
        const { books, updateShelf } = props
        return (
            <div className="list-books">
                <div className="list-books-title">
                        <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <div>
                        <BookShelf title="Currently Reading" updateShelf={updateShelf} books={books.filter(book => book.shelf === 'currentlyReading')}/>
                        <BookShelf title="Want To Read" updateShelf={updateShelf} books={books.filter(book => book.shelf === 'wantToRead')}/>
                        <BookShelf title="Read" updateShelf={updateShelf} books={books.filter(book => book.shelf === 'read')}/>
                    </div>
                </div>
                <div className="open-search">
                    <Link
                        to="/add"
                        className="add-book"
                    >Add Books</Link>
                </div>
            </div>
        )
}

export default ListBooks
