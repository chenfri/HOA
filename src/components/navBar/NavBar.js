import React, { Component } from 'react'
import './NavBar.css' 
import LogOut from '../SignIn/LogOut'
import { Link } from 'react-router-dom'
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

class NavBar extends Component {
    state = ({
        hoa : false
    })
    
    constructor(props){
        super(props);
        if(firebase.auth().currentUser.uid === 'vusYD78f1XTaPQMNdeTS3sF1uDE3'){
            return
        }
        else{
            firebase.firestore().collection('Apt').doc( firebase.auth().currentUser.uid).get()
            .then(result =>{
                const hoa = result.data().hoa
                this.setState({
                    hoa:hoa
                })
                
            })
        }

    }

    hoaSeeOnly = () => {
        if(firebase.auth().currentUser.uid === 'vusYD78f1XTaPQMNdeTS3sF1uDE3'){
            return
        }
        else{
            firebase.firestore().collection('Apt').doc( firebase.auth().currentUser.uid).get()
            .then(result =>{
                const hoa = result.data().hoa
                this.setState({
                    hoa:hoa
                })
                
            })
        }
        
    }

    
    render() {

        if(firebase.auth().currentUser.uid === 'vusYD78f1XTaPQMNdeTS3sF1uDE3'){
            return(
                <div id="nav" className = "slideDown">
                <ul className="NavBar_ul">
                <li className="NavBar_li"><Link to = "/create-building" className="NavBar_li_a" style={{display: this.state.hoa ? 'block' : 'none' }} >ניהול בניינים</Link></li>
                <li className="NavBar_li">
                <button className="NavBar_logout" > <LogOut/> </button>
                </li>
                </ul>
            </div>
            )
        }
        else{
            return(
                <div id="nav" className = "slideDown">
                    <ul className="NavBar_ul">
                    <li className="NavBar_li"><Link to = "/HomePage" className="NavBar_li_a">דף הבית</Link></li>
                    <li className="NavBar_li"><Link to = "calendar" className="NavBar_li_a" >אירועים</Link></li>
                    <li className="NavBar_li"><Link to = "payment/payment-main-page" className="NavBar_li_a">תשלומים ודוחות</Link></li>
                    <li className="NavBar_li"><Link to = "/user-page" className="NavBar_li_a">איזור אישי</Link></li>
                    {/* <li className="NavBar_li"><Link to = "/create-building" className="NavBar_li_a" style={{display: this.state.hoa ? 'block' : 'none' }} >ניהול בניינים</Link></li> */}
                    <li className="NavBar_li">
                    <button className="NavBar_logout" > <LogOut/> </button>
                    </li>
                    </ul>
                </div>
            )
        }

        
    }

} 

export default NavBar