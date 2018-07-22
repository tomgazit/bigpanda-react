import React, { Component } from 'react';
import logo from './logo.png';
import MessageForm from './components/MessageForm/MessageForm';
import CommentList from './components/CommentList/CommentList';
import axios from 'axios';
import Snackbar from './components/Snackbar/Snackbar';
import Grid from '@material-ui/core/Grid';

import classes from './App.css';

class App extends Component {
  state = {
      comments: [],
      commentsLoading: false,
      commentsLoaded: false,
      commentsError: false,
      commentsErrorText: ''
  }

  updateComments() {

    this.setState({
      commentsLoading: true
    });

    axios.get('/message')
      .then(response => {
          this.setState({
            commentsLoaded: true,
            commentsLoading: false,
            comments: response.data
          });
      })
      .catch(error => {
          console.log(error);
          this.setState({
            commentsLoading: false,
            commentsError: true,
            commentsErrorText: 'Error loading comments :('
          });
      });
  }

  render() {
    
    return (
      <div className={classes.App}>
        <header className={classes.AppHeader}>
          <img src={logo} className={classes.AppLogo} alt="logo" />
          <h1 className={classes.AppTitle}>Welcome to Big Panda's Comments Page!</h1>
        </header>
        <div>
          <Grid container justify="center" direction="column" alignItems="center">
              <Grid item xs={12}>
                  <MessageForm
                    updateComments={this.updateComments.bind(this)}
                  />
              </Grid>
              <Grid item xs={12} className={classes.CommentList}>
                <CommentList
                  updateComments={this.updateComments.bind(this)}
                  commentsLoaded={this.state.commentsLoaded}
                  commentsLoading={this.state.commentsLoading}
                  commentsError={this.state.commentsError}
                  comments={this.state.comments}
                />
              </Grid>
          </Grid>

          
          
          <Snackbar text={this.state.commentsErrorText} type="warning" open={this.state.commentsError}/>
        </div>
      </div>
    );
  }
}

export default App;