import React, {Component} from 'react';
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import { Link } from 'react-router-dom'
//import './PaymentMainPage.css';
import NavBar from '../navBar/NavBar';
import '../Style/Style.css';

class PaymentMainPage extends Component{

    state=({
        hoa:false
    })

    PaymentMainPagetStyle = () => {
        return{
            textAlign: 'center',
            paddingRight: '1em'  
        }
    }
    hoaSeeOnly = () => {
        firebase.firestore().collection('Apt').doc(firebase.auth().currentUser.uid).get()
        .then(result =>{
            const hoa = result.data().hoa
            this.setState({
                hoa:hoa
            })
            
        })
    }
    
    render(){

        this.hoaSeeOnly()

        
        return(
            <div className = "PaymentMainPage" style = {this.PaymentMainPagetStyle()} >
                <NavBar/>
                <h1 className = "mainTitle">תשלומים</h1>
                <h3 className = "smallTitle"> עמוד ראשי</h3>
                <div style={{display: this.state.hoa ? 'block' : 'none' }}>
                <button className="buttonStyle"><Link to="/payment/create-payment" className="LinkStyle">הוספת תשלום</Link></button>
                </div>
                
                <p></p>
                <button className="buttonStyle"><Link to="/payment/payment-table"className="LinkStyle">דוח תשלומים</Link></button>

            </div>
        );
    }
}
export default PaymentMainPage;