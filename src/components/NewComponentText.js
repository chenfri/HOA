import React, {Component} from 'react';

class NewComponentText extends Component{
    
    NewComponentTextStyle = () => {
        return{
            textAlign: 'right',
            paddingRight: '1em'
        }
    }

    render(){
        return(
            <div className="NewComponentText" style = {this.NewComponentTextStyle()}>
                <p>שם מלא</p>
            </div>
            );
        }
}

export default NewComponentText;