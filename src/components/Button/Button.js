import React, { Component } from 'react';
import Button from '@material-ui/core/Button';

//import './Button.css';

class button extends Component {
	render() {
		let btnText = this.props.text || 'Click';
		let btnColor = this.props.color || 'primary';
		return (
		    <Button
		    	variant="contained"
		    	color={btnColor}
		    	onClick={this.props.clicked}
		    	style={this.props.style}
		    >
		      {btnText}
		    </Button>
		)
	}
}

export default button;