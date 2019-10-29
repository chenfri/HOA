import React, { Component } from 'react'
import './Message.css'
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import NavBar from '../navBar/NavBar'


const uid = ''

class Message extends Component {

  buildingId = null
  fullName = ''

  state = {
    input: "",
    messages: [],
    hoa:false
  }
  constructor(props){
    super(props);
    firebase.firestore().collection('Apt').doc( firebase.auth().currentUser.uid).get()
        .then(result =>{
            const hoa = result.data().hoa
            this.setState({
                hoa:hoa
            })
            
        })

  }
  

  handleChangeText = event => {
    const value = event.target.value;
    this.setState({
      input: value
    });
  };


  render() {
    if (firebase.auth().currentUser == null) return null
    return (
      <React.Fragment>
        <div id="object" class="slideLeft">
        <div className="messages_body">

        <h2 className="bigTitle">לוח מודעות</h2>
          <form>
            <label>מוסרים משהו? צריכים משהו? כתבו לדיירי הבניין</label>
            <div>
              <textarea className="messages_textarea"
                type="text"
                value={this.state.input}
                onChange={this.handleChangeText}
                placeholder="..כתוב/י כאן את הודעתך   "
              />
            </div>
            <button className="messages_btn" type='button' onClick={() => this.onClickSave()}>שלח</button>
          </form>
          <p></p>
          {this.getMessage()}
        </div>
        </div>
      </React.Fragment>
    )
  }

  
  //----------------------- Functions ---------------------------

  componentDidMount() {
    console.log(firebase.auth().currentUser.uid)
    if (firebase.auth().currentUser == null) return
    firebase.firestore().collection("Apt").doc(firebase.auth().currentUser.uid).get().then(
      result => {
        if (!result.exists) return
        this.buildingId = result.data().buildingId
        this.fullName = result.data().fullName
        this.getMessagesFromServer()
      }
    )
  }


  getMessagesFromServer()
  {
    firebase.firestore().collection("Building").doc(this.buildingId).collection("Message").get().then(
      result => {
        if (result.empty) return
        this.setState({ messages: result.docs.map(doc => ({ id: doc.id, ...doc.data() })) })
      }
    )
  }


  getMessage() 
  {
    return this.state.messages.map(messageObj => {
      if (messageObj == null || messageObj.text == null || messageObj.text.length <= 0) return null

      return <div key={messageObj.id} className="message_button_buuble">
        <p>נכתב ע"י: {messageObj.author}</p>
        <p>{messageObj.timestamp} :תאריך</p>
        <p className="messages_talkbubble"> הודעה: {messageObj.text}</p>
        <br />
        <button style={{display: this.state.hoa ? 'block' : 'none' }} className="messages_btnDel" onClick={() => this.onClickDelete(messageObj.id)}>מחק</button>
      </div>
    })
  }


  onClickDelete(idToDelete)
  {
    const db = firebase.firestore();
    db.collection('Building').doc(this.buildingId).collection('Message').doc(idToDelete).delete()
    this.setState({ messages: this.state.messages.filter(item => item.id !== idToDelete) });
  }


  onClickSave()
  {
    if(this.buildingId == null || this.buildingId.length <= 0) {
      alert('no building to add the message to')
      return
    }

    if (this.state.input === '') return
    const newMessageObj = {
      text: this.state.input,
      timestamp: new Date().toLocaleString('en-GB', { hour12: false }),
      author: this.fullName
    }
 
   
    const db = firebase.firestore();
    db.collection('Building').doc(this.buildingId).collection('Message').add(newMessageObj)
    .then(result => {



      const user = firebase.auth().currentUser.uid
      db.collection('Building').doc(this.buildingId).collection('Message').doc(result.id).update({
        userId: firebase.auth().currentUser.uid
      })



      newMessageObj.id = result.id
      this.setState({
      messages: [...this.state.messages, newMessageObj] });
      this.setState({ input: '' });
    })
  }

}
export default Message



