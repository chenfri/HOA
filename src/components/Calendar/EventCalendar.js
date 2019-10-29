//import { render } from 'react-dom';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import React, { Component } from 'react';
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import './Calendar.css'
import NavBar from '../navBar/NavBar';
import 'moment/locale/he';


moment.locale('he');
const localizer = BigCalendar.momentLocalizer(moment);

//const uid = 'V1oEfd7SK8Xbzv8UDK2WmGnwqpr1'

class EventCalender extends Component {


  BigCalendarStyle = () => {

    return {
      height: 700
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      title: '',
      allDay: '',
      start: '',
      end: '',
      id: 1,
      events: [],
      hoa:false
    };


    firebase.firestore().collection('Apt').doc( firebase.auth().currentUser.uid).get()
        .then(result =>{
            const hoa = result.data().hoa
            this.setState({
                hoa:hoa
            })
            
        })

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {

    const target = event.target;

    if (event.target.name === 'title') {
      this.setState({
        title: target.value
      });
    }
    if (event.target.name === 'allDay') {
      this.setState({
        allDay: target.value
      });
    }
    if (event.target.name === 'startDate') {
      this.setState({
        start: target.value
      });
    }
    if (event.target.name === 'endDate') {
      this.setState({
        end: target.value
      });
    }
  }

  handleSubmit(event) {
    if(this.buildingId == null || this.buildingId.length <= 0) {
      alert('no building to add the message to')
      return
    }
    if (this.state.title == '') {
      alert('חסר את שם האירוע')
    }
    else if (this.state.startDate == '' && this.state.endDate == '') {
      alert('חסרים תאריכים')
    }
    else if (this.state.startDate == '') {
      alert('חסר תאריך התחלה')
    }
    else if (this.state.endDate == '') {
      alert('חסר תאריך סיום')
    }
    else {
   /*    
      this.setState({
            events: [...this.state.events,{
            title: this.state.title,
            allDay: this.state.allDay,
            start: this.state.start,
            end: this.state.end,
            id: this.state.id++
              }]
            } , () =>{   
            const db = firebase.firestore();
            db.collection('Building').doc(this.buildingId).collection('Events').add({
              events: this.state.events,
              id: this.state.id
           })

        }
      );
  //  this.setState({title: ''})
   
    
   */
    const newEvent = {
      title: this.state.title,
        title: this.state.title,
        allDay: this.state.allDay,
        start: this.state.start,
        end: this.state.end,
       }

      this.setState({
        events: [...this.state.events, newEvent]
      }, () => {
        const db = firebase.firestore();
        db.collection('Building').doc(this.buildingId).collection('Events').add(newEvent)
        .then(result => {
        newEvent.id = result.id
        });
      }
    )
      this.setState({ title: '' });
  }
  }


 componentDidMount() {
  if (firebase.auth().currentUser==null /*uid == null*/) return
  firebase.firestore().collection("Apt").doc(firebase.auth().currentUser.uid).get().then(
    result => {
      if (!result.exists) return
      this.buildingId = result.data().buildingId
      this.getEventsFromServer()
    }
  )
 }

  getEventsFromServer() {
    firebase.firestore().collection("Building").doc(this.buildingId).collection("Events").get().then(
      result => {
        if (result.empty) return
        this.setState({ events: result.docs.map(doc => ({ id: doc.id, ...doc.data() })) })
      }
    )
  }



 //Clicking an existing event allows you to remove it
onSelectEvent(pEventId) {
  if(this.state.hoa){

    const r = window.confirm("האם את/ה בטוח/ה שאת/ה רוצה למחוק את האירוע?")
   if(r === true){
    
       const db = firebase.firestore();
       db.collection('Building').doc(this.buildingId).collection('Events').doc(pEventId).delete()

       //var temp = db.collection('Events').doc("Events")
        //temp.update({events: this.state.events.filter(item => item.id !== pEvent.id)});
        this.setState({events: this.state.events.filter(item => item.id  !== pEventId)});

       
      }
  }
   
  
      }

  render() {
    if (firebase.auth().currentUser==null/*uid == null*/) return null

    return (
      <>

    <NavBar></NavBar>
    <h1 className = 'calendar_big_title'>
      לוח אירועים
    </h1>
    <div className = 'calendar_bar'>
        <input className = 'calendar_title' name='title' onChange={event => this.handleChange(event)} placeholder='הכנס את שם האירוע'/>
        <input className = 'calendar_startDate' name='startDate' onChange={event => this.handleChange(event)}  type='date' placeholder='start date' label="תאריך התחלה"/>
        <input className = 'calendar_endDate' name='endDate' onChange={event => this.handleChange(event)}  type='date' placeholder='end date' label="תאריך סיום"/>
        
            <label className = 'titleAllDay'>:יום שלם</label>
            <input className = 'calendar_allDay' name = 'allDay' type='checkbox' placeholder='all day' onChange={event => this.handleChange(event)}/>
      
       <button className = 'calendar_save' onClick={() => this.handleSubmit()}>שמור ביומן</button>
        

    </div>



<BigCalendar
      messages={{
        previous: 'חודש קודם',
        next: 'חודש הבא',
        today: 'היום',
        month: 'חודש',
        week: 'שבוע',
        day: 'יום',
        agenda: 'סֵדֶר הַיוֹם',
        date: 'תאריך',
        time: 'שעה',
        event: 'אירוע',
      }}

      style={{height: '70vh'}}
      localizer={localizer}
      events={this.state.events}
      popup= {true}
      
      startAccessor="start"
      endAccessor="end"
      selectable={true} //אפשרות לבחור תאריכיפ ע"י לחיצה על היומן
  
      //defaultView={BigCalendar.Views.WEEK} //נשים אם נרצה שיראו בהתחלה רק את אותו שבוע 
      scrollToTime={new Date(1970,1,1,6)}
   
     // onSelectEvent={event => alert(event.title)}
   
      step={30} //קובע את קצב הזמן שניתן לבחירה בתצוגות שבוע ויום
      defaultView='month'  //התצוגה הראושנית היא חודש
     // views={['month','week','day']}  //הופעה של רק שלושת אלה בצד (ללא אגנדה שזה לראות את כל האירועים )
      scrollToTime={new Date(1970, 1, 1, 6)}// התאריך האחרון אליו הגלילה למטה תגיע
      onSelectEvent = {event => this.onSelectEvent(event.id)  } //Fires selecting existing event

   //   onSelectSlot={this.handleSelect} //יפעל כאשר נבחר תאריך ביומן
    />

      </>
    );

  }

}
export default EventCalender;