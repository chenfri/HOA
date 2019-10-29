import React, {Component} from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import firebase from 'firebase/app'
import './App.css';
import 'firebase/firestore'
import 'firebase/auth'
import UserPage from './components/UserPage/UserPage';
import CreatBuilding from './components/CreatBuilding';
import CreateApt from './components/CreateApt'
import Message from './components/MessageBlog/Message';
import HomePage from './components/HomePage/HomePage';
import Tenant from './components/Tenant'
import CreateAptPage from './components/CreateAptPage';
import CreatePayment from './components/Payment/CreatePayment';
import PaymentTable from './components/Payment/PaymentTable';
import PaymentMainPage from './components/Payment/PaymentMainPage';
import SignIn from './components/SignIn/SignIn';
import WhoPaid from './components/Payment/WhoPaid';
import NewComponentText from './components/NewComponentText';
import ContactTable from './components/ContactTable';
import LogOut from './components/SignIn/LogOut';
import EventCalendar from './components/Calendar/EventCalendar'



class App extends Component 
{

  constructor() {
    super();
    this.state = ({
      user: null
    });
    this.authListener = this.authListener.bind(this);
  }

  componentDidMount() {
    this.authListener();
  }

  authListener() {
    firebase.auth().onAuthStateChanged((user) => {
      console.log(user);
      if (user) {
        this.setState({ user });
        localStorage.setItem('user', user.uid);
      } else {
        this.setState({ user: null });
        localStorage.removeItem('user');
      }
    });
  }



  render() {
    return(



    <Switch>
      <Route path="/sign-in" exact component={SignIn} />
      <GuardRoute path="/calendar" exact component={EventCalendar} />
      <GuardRoute path="/HomePage" exact component={HomePage} />
      <GuardRoute path="/message" exact component={Message} />
      <GuardRoute path="/create-building" exact component={CreatBuilding} />
      <GuardRoute path="/user-page" exact component={UserPage} />
      <GuardRoute path="/create-apt" exact component={CreateApt} />
      <GuardRoute path="/create-apt-page" exact component={CreateAptPage} />
      <GuardRoute path="/tenant" exact component={Tenant} />
      <GuardRoute path="/payment/create-payment" exact component={CreatePayment} />
      <GuardRoute path="/payment/payment-table" exact component={PaymentTable}/>
      <GuardRoute path="/payment/payment-main-page" exact component={PaymentMainPage} />
      <GuardRoute path="/payment/WhoPaid" exact component={WhoPaid} />
      <Redirect to='/sign-in' />
    </Switch> 
    )
  }
}

function GuardRoute(props) {
  const user = firebase.auth().currentUser
  if(user != null) return <Route {...props}/>
  window.location.href = '/'
}

export default App;
