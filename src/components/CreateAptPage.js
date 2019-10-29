import React, {Component} from 'react';
import CreateApt from './CreateApt';
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import { thisTypeAnnotation } from '@babel/types';




class CreateAptPage extends Component{
    
    constructor(props) {
        super(props);
        const args = this.props.location.search.split('?')
        const buildingId = args[1].split('=')[1]
        let id = buildingId
        let aptNum =args[2]
        this.state = ({
          buildingID : id,
          aptNum : aptNum,
          selectedOption : '-1'
        });
      }

    CreateAptPageStyle = () => {
        return{
            textAlign: 'center',
            paddingRight: '1em'
        }
    }

    render(){
        return(
            <div className="CreateAptPage" style =   {this.CreateAptPageStyle()}>
                      <h1 className="bigTitle">מסך יצירת בניין</h1>
                      <h4 className="smallTitle">שים לב! אין לצאת ממסך זה לפני סיום הזנת כל הדיירים למערכת</h4>
                {this.printApt()}
                <button className="buttonStyle" onClick={this.onSubmit}>סיום</button>
            </div>
        );
    }

    onSubmit=()=>{
      if(this.state.selectedOption == '-1'){
        alert("אנא בחר נציג בניין");
        return
      }
       alert("נציג ועד הבית הינו " + this.state.selectedOption + "\n בבקשה אשר או שנה לפני סיום ")
      const fb = firebase.firestore();
      fb.collection('Building').doc(this.state.buildingID).get().then(result=>{
        const arr= result.data().aptList;
        const index = parseInt(this.state.selectedOption) -1;
        fb.collection('Apt').doc(arr[index]).update({
          hoa:true
        })
      })
      

      this.props.history.push('./HomePage');

    }
    handleOptionChange = (changeEvent) => {
      this.setState({
        selectedOption: changeEvent.target.value
      });
    }

    printApt() {
      let radioText = "הדייר מטה הינו נציג ועד הבניין"
        let i = 0;
        let apt = [];
        while (i < this.state.aptNum) {
          i++;
          apt.push(<div><input  type="radio" name="hoa" value={i}  onChange={this.handleOptionChange}/> {radioText}</div>)
          apt.push(<CreateApt buildingID = {this.state.buildingID} />);
        }
        return apt;
      }
}

export default CreateAptPage;