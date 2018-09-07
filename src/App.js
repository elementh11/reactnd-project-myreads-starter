import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'

import ListBooks from './ListBooks'
import SearchBooks from './SearchBooks'
import './App.css'

class BooksApp extends Component {
  state = {
    books: []
  }

  componentDidMount() {
    this.getAllBooks()
  }

  getAllBooks = () => {
    BooksAPI.getAll().then((books) => {
        this.setState({ books });
    })
  }

  handleBookChange  = (event, book) => {
      const shelf = event.target.value

      if (this.state.books) {
        BooksAPI.update(book,shelf).then(() => {
          book.shelf = shelf;
          this.setState(state => ({
            books: state.books.filter(bk => bk.id !== book.id).concat([ book ])
          }))
        })
      }
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
            <ListBooks books={this.state.books} handleBookChange={this.handleBookChange}/>
        )}/>

        <Route path="/search" render={( {history} ) => (
            <SearchBooks booksShelved={this.state.books} handleBookChange={this.handleBookChange} />
        )}/>
      </div>
    )
  }
}

export default BooksApp
