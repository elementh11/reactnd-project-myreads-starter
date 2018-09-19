import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import ListBooks from './ListBooks'
import AddBooks from './AddBooks'
import './App.css'
import * as BooksAPI from './BooksAPI'

class App extends Component {
  //set the initial state to an empty array
  state = {
    books: []
  }

  //use componentDidMount() lifecycle event to retrieve the books
  //then update the state
  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  //define a method to update the state on shelf changes
  updateShelf  = (event, book) => {
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

  //render the ListBooks component or AddBooks component
  //depending on the URL using the React Route component
  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
            <ListBooks books={this.state.books} updateShelf={this.updateShelf}/>
        )}/>

        <Route path="/add" render={( {history} ) => (
            <AddBooks currentlySelected={this.state.books} updateShelf={this.updateShelf} />
        )}/>
      </div>
    )
  }
}

export default App
