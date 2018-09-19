import React from 'react'
import BookDetails from './BookDetails'

// this is a functional (stateless) component which just renders all shelves
// with books (props) from BookDetails
function BookShelf (props) {

  return(
          <div className="bookshelf">
              <h2 className="bookshelf-title">{props.title}</h2>
              <div className="bookshelf-books">
                  <ol className="books-grid">
                  { props.books.map((book) => {
                      return (
                          <BookDetails key={book.id} book={book} updateShelf={props.updateShelf} />
                      )
                    })
                  }
                  </ol>
              </div>
          </div>
        )
}

export default BookShelf
