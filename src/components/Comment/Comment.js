import React, { Component } from 'react';
import Button from '../Button/Button';
import axios from 'axios';
import gravatar from 'gravatar';
import Grid from '@material-ui/core/Grid';
import Modal from '@material-ui/core/Modal';

import classes from './Comment.css';

import SimpleModal from '../UI/Modal/Modal';
import Spinner from '../UI/Spinner/Spinner';

import moment from 'moment';

//import './Comment.css';


class Comment extends Component {
    state = {
        modalOpen: false,
        lastActiveDate: null,
        lastActiveLoaded: false,
        lastActiveLoading: false,
        lastActiveError: true,
        lastActiveErrorText: 'Error loading last active time :('
    }

    openModal = () => {
        this.setState({ modalOpen: true });
        this.getLastActiveTime();
    }

    getLastActiveTime = () => {
        axios.get(`/message/byEmail/${this.props.commentData.email}`)
          .then(response => {
              this.setState({
                lastActiveDate: response.data.msgDate,
                lastActiveLoaded: true,
                lastActiveLoading: false
              });
          })
          .catch(error => {
              console.log(error);
              this.setState({
                lastActiveLoading: false,
                lastActiveError: true,
                lastActiveErrorText: 'Error loading comments :('
              });
          });
    }

    handleClose = () => {
        this.setState({
            modalOpen: false
        });
    }

	render() {
        let modalText = (
            <div style={{textAlign: 'center'}}>
                <img
                    src={gravatar.url(this.props.commentData.email, {s: '200'})}/>
                <br/>
                Email: {this.props.commentData.email}
                <br/>
                Last Active: {this.state.lastActiveDate == null ? <Spinner/> : moment(this.state.lastActiveDate).format('DD-MM-YYYY HH:mm')}
            </div>
        );

		return (
			<div>
                <Grid container>
                    <Grid item xs={2}>
                        <img
                            onClick={this.openModal}
                            className={classes.gravatar}
                            src={gravatar.url(this.props.commentData.email, {s: '50'})}
                        />
                    </Grid>
                    <Grid item xs={10} container alignItems="flex-start">
                        <Grid className={classes.commentData}>
                            <Grid item xs={12}>
                                <b>{this.props.commentData.email}</b>
                            </Grid>
                            <Grid item xs={12}>
                                {this.props.commentData.comment}
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <SimpleModal
                    open={this.state.modalOpen}
                    handleClose={this.handleClose.bind(this)}
                    text={modalText}
                />
            </div>
		)
	}
}

export default Comment;

