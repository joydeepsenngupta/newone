import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import LoadingBar from 'react-redux-loading';
import { handleInitialData } from '../actions/shared';
import QuestionPage from './QuestionPage';
import Leaderboard from './Leaderboard';
import NewQuestion from './NewQuestion';
import Login from './Login';
import Home from './Home';


const NoMatch = () => (
  <div className='no-match'>
    <h3>404! Cannot find this page at the moment.</h3>
  </div>
);

class App extends Component {

  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }

  render() {
    return (
      <Router>
        <Fragment>
          <LoadingBar style={{ backgroundColor: '#00866B'}} />
          {
            this.props.loading
              ? null
              : <div className='app'>
                <Switch>
                  <Route exact path='/' component={Login} />
                  <Route exact path='/home' component={Home} />
                  <Route path='/questions/:id' component={QuestionPage} />
                  <Route exact path='/leaderboard' component={Leaderboard} />
                  <Route exact path='/add' component={NewQuestion} />
                  <Route component={NoMatch} />
                </Switch>
                </div>
          }
        </Fragment>
      </Router>
    );
  }
}

const mapStateToProps = ({ users }) => ({
    loading: users === {}
});

export default connect(mapStateToProps)(App);
