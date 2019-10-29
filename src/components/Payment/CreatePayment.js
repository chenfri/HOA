import React, {Component} from 'react';
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import './CreatePayment.css';
import NavBar from '../navBar/NavBar';

class CreatePayment extends Component
{

    buildingId = null
    aptAmount = null

    constructor(props)
    {
        super(props);
        this.state = {
            details: '',
            amount: ''
         };
        this.handleAddPayment = this.handleAddPayment.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    render()
    {
        return(
            <div className="CreatePayment" style = {this.CreatePaymentStyle()}>
                <NavBar/>
                <h1 className="mainTitle">הוספת תשלום חדש</h1>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        <h3 className = "smallTitle">
                        פירוט תשלום
                        <br/>
                        <input className="inputStyle" name="details" type="text" value={this.state.details} onChange={this.handleAddPayment} />
                        </h3>
                    </label>
                    <br/>
                    <label>
                        <h3 className = "smallTitle">
                        סכום לתשלום
                        <br/>
                        <input className="inputStyle" name="amount" type="number" value={this.state.amount} onChange={this.handleAddPayment} />
                        </h3>
                    </label>
                    <br/>
                    <input className="inputStyle" type="submit" value="הוסף תשלום" />
                </form>
            </div>
            );
        }

// --------------------- Functions ----------------------
    
    CreatePaymentStyle = () => {
        return{
            textAlign: 'center',
            paddingRight: '1em'  
        }
    }

    handleAddPayment(event)
    {
        const target = event.target;

        if(target.type === 'text'){   
            this.setState({
                details: target.value
            });
        }
        if(target.type === 'number'){
                this.setState({
                amount: target.value
            });
        }
        
    }

    componentDidMount()
    {
        if (firebase.auth().currentUser == null) return
        firebase.firestore().collection("Apt").doc(firebase.auth().currentUser.uid).get().then(
        result => { if (!result.exists) return
            this.buildingId = result.data().buildingId
            this.findNumOfApt()
        })
    }


    findNumOfApt()
    {
        firebase.firestore().collection("Building").doc( this.buildingId).get().then(
        result => { if (!result.exists) return
            this.aptAmount = result.data().aptAmount
        })
    }

    handleSubmit(event)
    {
        if(this.state.amount === '' || this.state.details === ''){
            alert('שגיאה: חסר שדות, הכנס בבקשה פירוט וסכום לתשלום')
        }
        else if(this.state.amount<=0){
            alert('שגיאה: סכום לתשלום לא תקין, אנא הכנס מספר חיובי')
        }
        else
        {

            let paymentListForApt = []
            for(let i = 0 ; i < this.aptAmount ; i++)
                paymentListForApt[i] = 0;

            const db = firebase.firestore();
            db.collection('Building').doc(this.buildingId).collection('Payment').add({
                details: this.state.details,
                amount: this.state.amount,
                paymentListForApt: paymentListForApt
            })
            .then(result => {
                const db = firebase.firestore();
                db.collection('Building').doc(this.buildingId).collection('Payment').doc(result.id).update({
                    id:result.id
                })
            })
            alert('הוספת התשלום החדש בוצעה בהצלחה!')
            this.props.history.push('/payment/payment-main-page');
        }
    }

}
export default CreatePayment;