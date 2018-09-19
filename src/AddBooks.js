import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import * as BooksAPI from './BooksAPI'

import BookDetails from './BookDetails'

class AddBooks extends Component {

    static propTypes = {
        currentlySelected: PropTypes.array,
        updateShelf: PropTypes.func.isRequired
    }

    state = {
        query: '',
        books: []
    }

    //updateQuery and clearQuery methods are defined similar to the contact app in the course
    //to update the component state depending on the query
    updateQuery = (query) => {
        this.setState({ query: query.trim() })
    }

    clearQuery = () => {
        this.setState({ query: '', books: []})
    }

    //searchBooks method updates the books array with their shelf ("none" or currently selected)
    searchBooks = (query) => {
        if(!query) {
            this.clearQuery(query)
        } else {
            this.updateQuery(query)

            BooksAPI.search(query, 20).then(books => {
                if(!books.error) {
                    books.map(book => book.shelf = "none")
                    books.map(book => (this.props.currentlySelected.filter((bk) => bk.id === book.id).map(b => book.shelf = b.shelf)))
                    this.setState({ books })
                } else {
                    console.log(books.error)
                }
            })
        }
    }

    render() {
        const { updateShelf } = this.props
        const { query, books } = this.state;

        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to="/" className="close-search">Close</Link>
                    <div className="search-books-input-wrapper">
                        <input
                            type="text"
                            autoFocus
                            placeholder="Search by title or author"
                            value={query}
                            onChange={(event) => this.searchBooks(event.target.value)}
                        />
                    </div>
                </div>
                <div className="search-books-results">

                    <ol className="books-grid">
                        { books.map((book) => {
                            return (
                                <BookDetails key={book.id} book={book} updateShelf={updateShelf} />
                            )
                        })
                        }
                    </ol>
                </div>
            </div>
        )
    }
}

export default AddBooks
