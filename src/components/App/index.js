import React from 'react'
import ErrorPage from '../ErrorPage';
import Footer from '../Footer';
import Header from '../Header';
import Landing from '../Landing';
import Login from '../Login';
import Signup from '../Signup';
import Welcome from '../Welcome';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import '../../App.css';
import ForgetPassword from '../ForgetPassword';
import {IconContext} from 'react-icons'

function App() {
  return (
    <div>

      <Router>
        <IconContext.Provider value={{ style: { verticalAlign: 'middle' } }}>
          
          <Header/>

            <Switch>
              <Route exact path='/' component={Landing}/>
              <Route  path='/welcome' component={Welcome}/>
              <Route  path='/login' component={Login}/>
              <Route  path='/signup' component={Signup}/>
              <Route  path='/forgetpassword' component={ForgetPassword}/>
              <Route  component={ErrorPage}/>
            </Switch>

          <Footer/>

        </IconContext.Provider>
      </Router>
     
    </div>
  );
}

export default App;