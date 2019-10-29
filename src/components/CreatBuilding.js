import React, {Component} from 'react';
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import LogOut from './SignIn/LogOut';
import NavBar from './navBar/NavBar';
import './Style/Style.css';


class CreatBuilding extends Component{
    

    CreatBuildingStyle = () => {
        return{
            textAlign: 'center',
            paddingRight: '1em'  
        }
    }


    constructor(props){
        super(props);
        this.state = {
            address: '',
            aptNum: '' ,
    };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event){
        const target = event.target;

        if(target.type === 'text'){   
            this.setState({
                address: target.value
            });
        }
        if(target.type === 'number'){
             this.setState({
                aptNum: target.value
            });
        }
    }

    handleSubmit(event){
        if(this.state.aptNum<=0){
            alert('מספר הדירות חייב להיות מספר חיובי')
        }
        else if(this.state.aptNum === '' || this.state.address === ''){
            alert('חסר שדות, בבקשה מלא גם כתובת וגם מספר דירוות')
        }
        else{
            const db = firebase.firestore();
            db.collection('Building').add({
                address: this.state.address,
                aptAmount: this.state.aptNum
                //create an array on apt that will contain the id of each apt
            }).then(result => {
                // user react router to extract param
                this.props.history.push('./create-apt-page?buildingId='+result.id+'?'+this.state.aptNum);
                db.collection("Building").doc(result.id).collection("Message").add({});
                db.collection("Building").doc(result.id).collection("Payment").add({});
                db.collection("Building").doc(result.id).collection("Events").add({});
            })
        }
        //this.prop.location.params
    }

    render(){
        return(
            <div className="CreatBuilding" style = {this.CreatBuildingStyle()}>
               <NavBar></NavBar>
                <h1 className="bigTitle">יצירת בניין</h1>
                <form>
                    <label>
                        <p className="smallTitle">
                        כתובת הבניין
                        <br/>
                        <input className="inputStyle" name="address" type="text" value={this.state.address} onChange={this.handleChange} />
                        </p>
                    </label>
                    <br/>
                    <label>
                        <p className="smallTitle">
                        מספר הדירות בבניין זה
                        <br/>
                        <input className="inputStyle" name="aptNum" type="number" value={this.state.aptNum} onChange={this.handleChange} />
                        </p>
                    </label>
                    <br/>
                    <input className="inputStyle" onClick={this.handleSubmit} type="button" value="שלח" />
                </form>
            </div>
            );
        }
}

export default CreatBuilding;