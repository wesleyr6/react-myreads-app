import React, { Component } from 'react';
import CloudTags from '../../components/CloudTags';
import Shelf from '../../components/Shelf';
import * as BooksAPI from '../../api/booksAPI';
import * as TagsAPI from '../../api/tagsAPI';

class Home extends Component {
	constructor(props) {
		super(props);

		this.state = {
			tags: [],
			myBooks: {
				currentlyReading: [],
				read: [],
				wantToRead: []
			}
		};

		this.onChangeMoveShelf = this.onChangeMoveShelf.bind(this);
	}

	componentDidMount() {
		BooksAPI.getAll().then(obj => {
			this.setState({
				myBooks: {
					currentlyReading: obj.filter(val => val.shelf === 'currentlyReading'),
					read: obj.filter(val => val.shelf === 'read'),
					wantToRead: obj.filter(val => val.shelf === 'wantToRead')
				}
			});
		});

		this.setState({
			tags: TagsAPI.getAll()
		});
	}

	onChangeMoveShelf(e, book, oldShelf) {
		e.preventDefault();
		const newShelf = e.target.value;

		BooksAPI.update(book, newShelf).then(() => {
			book.shelf = newShelf;
			this.setState(prevState => {
				prevState.myBooks[newShelf].push(book);
				prevState.myBooks[oldShelf] = prevState.myBooks[oldShelf].filter(obj => obj.id !== book.id);
			});
		});
	}

	render() {
		const state = this.state;

		return(
			<div className="wrapper">
				<CloudTags tags={this.state.tags} />

				<Shelf title="Currently reading" books={state.myBooks.currentlyReading} onChangeMoveShelf={this.onChangeMoveShelf} />
				<Shelf title="Want to read" books={state.myBooks.wantToRead} onChangeMoveShelf={this.onChangeMoveShelf} />
				<Shelf title="Have read" books={state.myBooks.read} onChangeMoveShelf={this.onChangeMoveShelf} />
			</div>
		);
	}
}

export default Home;