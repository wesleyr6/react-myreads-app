import React, { Component } from 'react';
import PropTypes from 'prop-types';
import EmptyShelf from './emptyShelf';

import './index.sass';

class Shelf extends Component {
	render() {
		const props = this.props;

		return(
			<div className="shelf">
				<h2>{props.title}</h2>
				<ul>
					{
						props.books.length ? (
							props.books.map((book) => {
								return(
									<li key={book.id}>
										<div className="book-wrapper">
											<figure>
												<img src={book.imageLinks.smallThumbnail} alt={book.title} />
											</figure>

											<div className="book-description">
												<p className="book-title" title={book.title}>{book.title}</p>
												<p className="book-authors" title={book.authors}>{book.authors}</p>
											</div>
										</div>

										<div className="book-status">
											<select className="full" value={book.shelf} onChange={(e) => this.props.onChangeMoveShelf(e, book, book.shelf)}>
												<option value="none" disabled>Move to...</option>
												<option value="currentlyReading">Currently Reading</option>
												<option value="wantToRead">Want to Read</option>
												<option value="read">Read</option>
												<option value="none">None</option>
											</select>
										</div>
									</li>
								);
							})
						) : (
							<EmptyShelf />
						)
					}
				</ul>
			</div>
		);
	}
}

Shelf.propTypes = {
	title: PropTypes.string.isRequired,
	books: PropTypes.array.isRequired,
	onChangeMoveShelf: PropTypes.func.isRequired
};

export default Shelf;
