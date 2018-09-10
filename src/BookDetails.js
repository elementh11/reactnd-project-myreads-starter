import React, {Component} from 'react'
import PropTypes from 'prop-types'

class BookDetails extends Component {
    static propTypes = {
        book: PropTypes.object.isRequired,
        handleBookChange: PropTypes.func.isRequired
    }

    render() {
        const {book, handleBookChange} = this.props

        return (
            <li key={book.id}>
                <div className="book">
                    <div className="book-top">
                        <div className="book-cover" style={{width: 128, height: 192, backgroundImage: `url(${book.imageLinks ? book.imageLinks.thumbnail : null})` }}></div>
                        <div className="book-shelf-changer">
                            <select defaultValue={book.shelf} onChange={(event) => handleBookChange(event, book)}>
                                <option value="move" disabled>Move to...</option>
                                <option value="currentlyReading">Currently Reading</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
                            </select>
                        </div>
                    </div>
                    <div className="book-title">{book.title}</div>
                    <div className="book-authors">{book.authors}</div>
                </div>
            </li>
        )
    }
}

export default BookDetails
