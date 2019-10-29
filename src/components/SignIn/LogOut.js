import React, {Component} from 'react';
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

class LogOut extends Component{

    logout = () => {
      firebase.auth().signOut();
      }
      
    render(){
        return(
              <button className= 'NavBar_logout' onClick={this.logout}>
              התנתק
              </button>
            );
        }
}

export default LogOut;