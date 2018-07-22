import React, { Component } from 'react';
import Comment from '../Comment/Comment';
import Spinner from '../UI/Spinner/Spinner';

import classNames from 'classnames';

import Grid from '@material-ui/core/Grid';


//For TextInput
import Search from '@material-ui/icons/Search';

import TextFieldBS from '../UI/TextFieldBS/TextFieldBS';

import classes from './CommentList.css';

class CommentList extends Component {
	state = {
		filterByEmail: ''
	}

	componentDidMount() {
		this.props.updateComments();
	}

	handleFilterChange(event) {
		console.log(event.target.value);
		this.setState({filterByEmail: event.target.value})
	}

	render() {
		let commentsArray = this.props.comments;
		let commentList = null;

		if (this.props.commentsError) {
			commentList = 'Error loading comments';
		}
		else if (this.props.commentsLoading) {
			commentList = <Spinner/>;
		}
		else if (this.props.commentsLoaded) {
			commentList = commentsArray.map((_,commentKey) => {
				if (
					this.state.filterByEmail.length === 0 || 
					(this.state.filterByEmail.length > 0 && commentsArray[commentKey].email.indexOf(this.state.filterByEmail) !== -1)
					)
				{
					return <Comment
								key={commentKey}
								commentData={commentsArray[commentKey]}
							/>;
				}
			});
		}

		return (
			<div>
				<TextFieldBS
					placeholder="Filter Comments by Email"
					type="search"
					icon={<Search />}
					onChange={this.handleFilterChange.bind(this)}
				/>
				<div className={classes.commentListSection}>
					{commentList}
				</div>
	        </div>
		)
	}
}

export default CommentList;