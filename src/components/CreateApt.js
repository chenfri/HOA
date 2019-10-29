import React, {Component} from 'react';
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import { secondFirebaseInstance } from '../Firebase'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './Style/Style.css';

class CreateApt extends Component
{
    error = null

    constructor(props){
        super(props);

        this.state = {
            email: '',
            password: '',
            aptId: '',
            buildingId: this.props.buildingID,
            tenants: [],
            fullName: '',
            phoneNum: '',
            aptNum: ''
    };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


render()
{
    return(
        <div className="CreateAptContainer" style = {this.CreateAptStyle()}>
        <h4 className="smallTitle">הכנס פרטי דירה</h4>
        <Form>
            <Form.Group  controlId="formBasicEmail">
                <Form.Control className="inputStyleForm" placeholder="הכנס את שם הדייר הראשי" name="fullName" type="text"  value={this.state.fullName} onChange={this.handleChange}/>
                <Form.Control className="inputStyleForm" placeholder="הכנס כתובת דואל של הדייר" name="email" type="email"  value={this.state.email} onChange={this.handleChange}/>
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
                <Form.Control className="inputStyleForm" type="password" placeholder="הכנס סיסמא" name="password" value={this.state.password} onChange={this.handleChange}   />
                <Form.Control className="inputStyleForm" type="number" placeholder="הכנס מספר דירה" name="aptNum" value={this.state.aptNum} onChange={this.handleChange}   />
            </Form.Group>
            <Button  className = "buttonStyleForm" variant="primary" onClick={this.handleSubmit} type="button" value="Submit">
                הזן פרטי דירה נוכחית למאגר
            </Button>
            {this.returnDiv()}
        </Form>
        </div>
    );
}
    
// -------------------- Functions --------------------------------

   handleChange = (event) =>
    {
        const target = event.target;
        if(target.type === 'email'){
            this.setState({
                email: target.value
            });
        }
        if(target.type ==='password'){
            this.setState({
                password: target.value
            });
        }
        if(target.name === 'fullName'){  
            this.setState({
                fullName: target.value
            });
        }

        if(target.name === 'phoneNum'){   
            this.setState({
                phoneNum: target.value
            });
        }
        if(target.name === 'aptNum'){   
            this.setState({
                aptNum: target.value
            });
        }
   }

   handleSubmit(event)
   {
       if(this.state.fullName ===''){
           this.setState({fullName:this.state.email})
       }
       if(this.state.email == '' || this.state.password == '' || this.state.aptNum == '')
       alert("נא למלא את כל השדות")

       else
       {
        let aptId = null
        secondFirebaseInstance.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).catch(function(error) {
           alert("שם המשתמש כבר קיים")

            var errorCode = error.code;
            var errorMessage = error.message;
            return Promise.resolve(null)
          })
          .then(result =>{
              if(result == null){
                this.error = "null";
                  return
            }
            const db = firebase.firestore();
            aptId = result.user.uid
            return db.collection('Apt').doc(aptId).set({
                email: this.state.email,
                buildingId:this.state.buildingId,
                aptId : aptId,
                fullName:this.state.fullName,
                aptNum: this.state.aptNum,
                hoa: false
              })
          })
          .then(result => {
            const fb = firebase.firestore();
            fb.collection('Tenants').add({
                email: this.state.email,
                buildingId:this.state.buildingId,
                aptId: aptId,
                aptNum: this.state.aptNum
              })
            .then(result => {
                this.setState({tenantId : result.id})
                const fb = firebase.firestore();
                try{
                    return fb.collection('Apt').doc(aptId).update({
                        tenants: firebase.firestore.FieldValue.arrayUnion(this.state.tenantId)
                    })
                }
                catch{
                    return
                }
                
            })              
        })
        .then(rseult => {
            const fb = firebase.firestore();
            return fb.collection('Building').doc(this.state.buildingId).update({
                aptList: firebase.firestore.FieldValue.arrayUnion(aptId)
            })
        })
        this.error = "done";
        } 
    }

    returnDiv()
    {
        if (this.error == "done" )
        {
            this.error = ''
            return <div style ={this.MsgStyle()}><p>!הדירה נוספה בהצלחה</p></div>
       }
    }


    CreateAptStyle = () => {
        return{
            textAlign: 'center',
            paddingRight: '1em'
        }
    }


    MsgStyle = () => {
        return{
            backgroundColor: 'white',
            borderColor: 'white',
            paddingRight: '1em',
            marginLeft: '50em'
        }
    }

}
export default CreateApt;