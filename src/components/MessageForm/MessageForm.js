import React, { Component } from 'react';
import Button from '../Button/Button';
import axios from 'axios';

//import './Button.css';
import Grid from '@material-ui/core/Grid';


//For TextInput
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

import TextFieldBS from '../UI/TextFieldBS/TextFieldBS';


import Snackbar from '../Snackbar/Snackbar';

const styles = theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end'
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  }
});

class MessageForm extends Component {
    state = {
        email: '',
        comment: '',
        statusMsg: '',
        showMsg: false
    }

    postDataHandler = () => {
        const data = {
            email: this.state.email,
            comment: this.state.comment
        };
        axios.post('/message', data)
            .then(response => {
            	this.setState({
            		showMsg: true,
            		statusMsg: 'SENT SUCCESSFULLY :)',
			        email: '',
			        comment: ''
            	});
            	this.props.updateComments();
                console.log(response);
            });
    }

    //Handle form input change
    handleChangeEmail(event) {
	  this.setState({email: event.target.value})
	}

    handleChangeComment(event) {
	  this.setState({comment: event.target.value})
	}

	changeSnackBarOpenStatus(open) {
		this.setState({
			showMsg: open
		});
	}

	render() {
		const { classes } = this.props;

		return (
			<div style={{ paddingTop: 20 }}>
			    <form className={classes.container} noValidate autoComplete="off">
			    	<Grid container direction="column" spacing={16} alignItems="center">
		              <Grid item xs={12}>
				            <TextFieldBS
								placeholder="Email"
								value={this.state.email}
								onChange={this.handleChangeEmail.bind(this)}
							/>
		              </Grid>
		              <Grid item xs={12}>
		      	            <TextFieldBS
		      	            	multiline
								rows="4"
								placeholder="Message"
								value={this.state.comment}
								onChange={this.handleChangeComment.bind(this)}
							/>
		              </Grid>
		              <Grid container item xs={12} justify="flex-end">
			              	<Button
			              		style={{width: '20px', fontWeight: 'bolder'}}
			              		clicked={this.postDataHandler}
			              		text="Submit"
			              	/>
		              </Grid>
	              </Grid>
	          </form>
	          <Snackbar
	          	text={this.state.statusMsg}
	          	open={this.state.showMsg}
	          	changeOpen={this.changeSnackBarOpenStatus.bind(this)}
	          />
	         </div>
		)
	}
}

MessageForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MessageForm);