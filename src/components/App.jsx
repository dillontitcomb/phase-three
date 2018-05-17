import React from 'react'
import { Switch, Route, withRouter, Link} from 'react-router-dom'
import { connect } from 'react-redux'
import Footer from './Footer'
import Navbar from './Navbar'
import LandingPage from './LandingPage'
import Game from './Game'
import Admin from './Admin'
class App extends React.Component {

  constructor(props){
    super(props)
  }

  render(){

    return(
      <div>
        <Navbar/>
        <Switch>
          <Route exact path='/' component={LandingPage} />
          <Route exact path='/play' component={Game} />
          <Route exact path='/admin' component={Admin} />
        </Switch>
        <Footer/>
      </div>
    )
  }
}

export default withRouter(connect()(App))
