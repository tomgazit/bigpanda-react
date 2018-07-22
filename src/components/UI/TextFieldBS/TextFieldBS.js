import React, { Component } from 'react';

import classNames from 'classnames';


//For TextInput
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

import InputAdornment from '@material-ui/core/InputAdornment';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    width: 400,
    borderRadius: 4,
    backgroundColor: theme.palette.common.white,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '4px 12px',
	'&:focus': {
	      borderColor: '#80bdff',
	      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
	  },
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    
   },
  menu: {
    width: 200,
  },
  bootstrapRoot: {
    padding: 0,
    'label + &': {
      marginTop: theme.spacing.unit * 3,
    },
  },
  bootstrapInput: {
  	
  },
  bootstrapFormLabel: {
    fontSize: 18,
  },
});

class TextFieldBS extends Component {
	render() {
		const { classes } = this.props;

		let InputProps = {disableUnderline: true};

		if (typeof(this.props.icon) !== 'undefined') {
			InputProps = {
				
		          	disableUnderline: true,
		            startAdornment: <InputAdornment position="start">
		            					{this.props.icon}
		            				</InputAdornment>,
		        
			}
		}

		return (
			<div>
				<TextField
		          id="simple-start-adornment"
		          placeholder={this.props.placeholder}
		          type={this.props.type}
		          multiline={this.props.multiline}
		          rows={this.props.rows}
		          className={classNames(classes.margin, classes.textField)}
		          onChange={this.props.onChange}
		          InputProps={InputProps}
		        />
	        </div>
		)
	}
}
/*
export default CommentList;

*/
TextFieldBS.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TextFieldBS);