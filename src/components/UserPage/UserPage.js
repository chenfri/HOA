import React, {Component} from 'react';
import ContactTable from '../ContactTable';
import PaidTable from '../Payment/PaidTable';
import Tenant from '../Tenant'
import NavBar from '../navBar/NavBar';
import 'firebase/firestore'
import 'firebase/auth'
import '../Style/Style.css';


class UserPage extends Component
{
    UserPageStyle = () => {
        return{
            textAlign: 'center',
            paddingRight: '1em'  
        }
    }

    render()
    {
        return(
            <div className="UserPage" style = {this.UserPageStyle()}>
                <NavBar/>
                <Tenant/>
                <ContactTable/>
                <PaidTable/>
            </div>
            );
        }
}

export default UserPage;