import React, {Component} from 'react'
import escapeRegExp from 'escape-string-regexp'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import * as BooksAPI from './BooksAPI'

import BookDetails from './BookDetails'

class SearchBooks extends Component {

    static propTypes = {
        booksShelved: PropTypes.array,
        handleBookChange: PropTypes.func.isRequired
    }

    state = {
        query: '',
        books: []
    }

    updateQuery = (query) => {
        this.setState({ query: query.trim() })
    }

    clearQuery = () => {
        this.setState({ query: '', books: []})
    }

    handleBookSearch = (query) => {
        if(!query) {
            this.clearQuery(query)
        } else {
            this.updateQuery(query)

            BooksAPI.search(query, 20).then(books => {
                if(!books.error) {
                    books.map(book => (this.props.booksShelved.filter((b) => b.id === book.id).map(b => book.shelf = b.shelf)))
                    this.setState({ books })
                } else {
                    console.log(books.error)
                }
            })
        }
    }

    render() {
        const { handleBookChange } = this.props
        const { query, books } = this.state;
        let bookSearchResult

        if (query) {
            const match = new RegExp(escapeRegExp(query), 'i')
            bookSearchResult = books.filter(book => match.test(book.title))
        } else {
            bookSearchResult = books
        }

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
                            onChange={(event) => this.handleBookSearch(event.target.value)}
                        />
                    </div>
                </div>
                <div className="search-books-results">

                    {bookSearchResult.length !== 0 && (
                        <div className="showing-books">
                            <span><b>{bookSearchResult.length}</b> results found for: <b>{query}</b></span>
                        </div>
                    )}
                    <ol className="books-grid">
                        { bookSearchResult.map((book) => {
                            return (
                                <BookDetails key={book.id} book={book} handleBookChange={handleBookChange} />
                            )
                        })
                        }
                    </ol>
                </div>
            </div>
        )
    }
}

export default SearchBooks
