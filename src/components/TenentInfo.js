import React, {Component} from 'react';
//import App from "./App";

class TenentInfo extends Component{
    
    TenentInfoStyle = () => {
        return{
            textAlign: 'right',
            paddingRight: '1em'
        }
    }

    render(){
        return(
            <div className="TenentInfo" style = {this.TenentInfoStyle()}>
                <p>שם מלא</p>
                <p>שם משפחה</p>
                <p>פאלפון</p>
                <p>כתובת דוא"ל</p>
                
            </div>
            );
        }
}

export default TenentInfo;