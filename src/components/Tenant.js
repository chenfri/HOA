import React, {Component} from 'react';
import Form from 'react-bootstrap/FormControl';
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import NavBar from './navBar/NavBar';
import './Style/Style.css';


class Tenant extends Component{
 
    TenantStyle = () => {
        return{
            textAlign: 'right',
            paddingRight: '1em',
            float: 'right'
        }
    }
    TableStyle = () => {
        return{
            float: 'right'
        }
    }
    onEditStyle = () => {
        if(this.state.edit === false)
        return{
            display: 'none'
        }
    }
    onSaveStyle = () => {
        if(this.state.edit === true)
        return{
            display: 'none'
        }
    }
    

    constructor(props){
        super(props);
        const user = firebase.auth().currentUser;
        this.state = ({
            aptId: user.uid,
            tenantId: this.tenantId,
            fullName: '',
            phoneNum: '' ,
            email: '',
            dob: '',
            edit: false
        })
        firebase.firestore().collection("Apt").doc(firebase.auth().currentUser.uid).get().then(
            result => {
              if (!result.exists){
                return
              } 
              else{
                  this.setState({
                    fullName: result.data().fullName,
                    phoneNum: result.data().phoneNum,
                    email: result.data().email,
                    dob: result.data().dob,
                  })
              }
            }
        )
   
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleEdit = this.handleSubmit.bind(this);
        

    }
    handleChange(event){
        const target = event.target;

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
        if(target.name === 'email'){   
            this.setState({
                email: target.value
            });
        }
        if(target.name === 'dob'){   
            if(target.value!== 'dd/mm/yyy'){
                this.setState({
                    dob: target.value
                });
            }
        }
    }

    handleSubmit(event){
        if(this.state.edit === false){
            this.setState({
                edit : true
            });
        }
        else{
            this.setState({
                edit : false
            });  
            const db = firebase.firestore()
            try{
                db.collection('Apt').doc(firebase.auth().currentUser.uid).update({
                    fullName: this.state.fullName,
                    phoneNum:this.state.phoneNum,
                    email:this.state.email,
                    dob:this.state.dob 
                 })
            }
            catch{
                try{
                    db.collection('Apt').doc(firebase.auth().currentUser.uid).update({
                        fullName: this.state.fullName,
                        phoneNum:this.state.phoneNum,
                        email:this.state.email
                     })
                }
                catch{
                    db.collection('Apt').doc(firebase.auth().currentUser.uid).update({
                        phoneNum:this.state.phoneNum,
                        email:this.state.email
                     })
                }
            }
            
           // this.props.history.push('user-page');
            
        }
    }
    
    render(){
        return (
            <div className="TenantText container" style = {this.TenantStyle()}>
                <h1 className="bigTitle">פרטים אישיים</h1>
                <table className="TenantTable" style={this.TableStyle()}>
                    <tr>
                        <input className="onEdit" value={this.state.fullName} style = {this.onEditStyle()} type='text' name="fullName" onChange={this.handleChange}></input>
                        <td style={this.onSaveStyle()}>{this.state.fullName}</td>
                        <td> שם מלא</td>
                    </tr>
                    <tr>
                    <input className="onEdit" value={this.state.phoneNum} style = {this.onEditStyle()} type='tel' name="phoneNum" onChange={this.handleChange}></input>
                        <td style={this.onSaveStyle()}>{this.state.phoneNum}</td>
                        <td>מספר פלאפון</td>
                    </tr>
                    <tr>
                    <input className="onEdit" value={this.state.email} style = {this.onEditStyle()} type='email' name="email" onChange={this.handleChange}></input>
                    <td style={this.onSaveStyle()}>{this.state.email}</td>
                        <td>דואר אלקטרוני</td>
                    </tr>
                    <tr>
                    <input className="onEdit" value={this.state.dob} style = {this.onEditStyle()} type='date' name="dob" onChange={this.handleChange} placeholder={this.state.dob}></input>
                        <td style={this.onSaveStyle()}>{this.state.dob}</td>
                        <td>תאריך לידה</td>
                    </tr>


                    <button className="buttonStyleForm" type="click" value="עריכת פרטים אישיים" onClick={this.handleEdit} style={this.onSaveStyle()}>עריכת פרטים אישיים</button>
                    <input className="buttonStyleForm" type="submit" value="שמור שינויים" onClick={this.handleSubmit} style = {this.onEditStyle()}/>

                </table>

        </div>
        );
        
    }

}

export default Tenant;
//     handleSubmit(event){
//         if(this.state.edit === false){
//             this.setState({
//                 edit : true
//             });
//         }
//         else{
//             this.setState({
//                 edit : false
//             })  
//             const db = firebase.firestore();
//             alert(this.state.tenantId)
//             db.collection('Tenants').doc(this.state.tenantId).update({
//                fullName: this.state.fullName,
//                phoneNumber:this.state.phoneNum,
//                email:this.state.email,
//                dob:this.state.dob 
//             })
//         }
//     }
    
//     render(){
//         const fullname = this.state.fullName
//         return (
//         <div className="TenantText" >
//             {/* <NavBar/> */}
//             <table style={this.TableStyle()}>

//             <tr>
//                 <input className="onEdit" value={this.fullname} style = {this.onEditStyle()} type='text' name="fullName" onChange={this.handleChange}></input>
//                 <td style={this.onSaveStyle()}>{this.state.fullName}</td>
//                 <td> שם מלא</td>
//             </tr>
//             <tr>
//             <input className="onEdit" value={this.state.phoneNum} style = {this.onEditStyle()} type='number' name="phoneNum" onChange={this.handleChange}></input>
//                 <td style={this.onSaveStyle()}>{this.state.phoneNum}</td>
//                 <td>מספר פלאפון</td>
//             </tr>
//             <tr>
//             <input className="onEdit" value={this.state.email} style = {this.onEditStyle()} type='email' name="email" onChange={this.handleChange}></input>
//             <td style={this.onSaveStyle()}>{this.state.email}</td>
//                 <td>דואר אלקטרוני</td>
//             </tr>
//             <tr>
//             <input className="onEdit" value={this.state.dob} style = {this.onEditStyle()} type='date' name="dob" onChange={this.handleChange}></input>
//                 <td style={this.onSaveStyle()}>{this.state.dob}</td>
//                 <td>תאריך לידה</td>
//             </tr>

//             <div className ="tenant_button">
//             <button type="click" value="עריכה" onClick={this.handleEdit} style={this.onSaveStyle()}>עריכה </button>
//             <input type="submit" value="שמור" onClick={this.handleSubmit} style = {this.onEditStyle()}/>
//             </div>
//             <br/>
//             </table>
//         </div>
//         );
        
//     }

// }

// export default Tenant;