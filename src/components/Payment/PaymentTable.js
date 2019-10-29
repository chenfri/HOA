import React, {Component} from 'react';
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import './PaymentTable.css';
import NavBar from '../navBar/NavBar';
import { Link } from 'react-router-dom'
import { Button } from '@material-ui/core/';
import XLSX from 'xlsx';

// for the export to excel //
const set_right_to_left = wb => {
    if (!wb.Workbook) wb.Workbook = {};
    if (!wb.Workbook.Views) wb.Workbook.Views = [];
    if (!wb.Workbook.Views[0]) wb.Workbook.Views[0] = {};
    wb.Workbook.Views[0].RTL = true;
  };
            
// a func to convert aoa to file //
const aoaToFile = ({ fileName, sheetName = 'Sheet1', aoa }) => {
    if (aoa) {
        const workbook = XLSX.utils.book_new();
        set_right_to_left(workbook);
        const sheet = XLSX.utils.aoa_to_sheet(aoa);
        XLSX.utils.book_append_sheet(workbook, sheet, sheetName);
        XLSX.writeFile(workbook, fileName + '.xlsx');
    }
};

class PaymentTable extends Component{
    constructor(props){
        super(props);
    
        
        this.state = {
            tableData: []
        }
    }
    buildingId = null
    
    

    PaymentTableStyle = () => {
        return{
            textAlign: 'center',
            paddingRight: '1em'
            
        }
    }

     // a func to export to excel //
	exportToExcel = () => {
        const columnNames = ["סכום התשלום הכולל","פירוט התשלום"];
        const aoa = [columnNames].concat(this.state.tableData.map(this.newPaymentToArr));
        aoaToFile({ fileName: 'payment report.xlsx', aoa });
    }
            
    // a func to convert object to arr //
    newPaymentToArr = newPayment => [{key: "amount"},{key:"details"}].map(r => newPayment[r.key]);
    

    render() { 
        return(
            <div>
                <NavBar/>        
                <h1 className="bigTitle">דוח תשלום ועד הבניין</h1>
                <button className="buttonStylePay" onClick={this.exportToExcel}>ייצוא הדוח לאקסל</button>
                <table id = "paymentTable" border= "1" style = {this.PaymentTableStyle()}>
                    
                    <thead>
                    <tr>
                        <th>   סטטוס תשלומי דיירים   </th>
                        <th>   סכום התשלום הכולל   </th>
                        <th>   פירוט התשלום   </th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.getTableRows()}
                    </tbody>
                </table>
            </div>
         );
        }

    //----------------------------- Functions -----------------------------

    componentDidMount() 
    {
        if (firebase.auth().currentUser == null) return
        firebase.firestore().collection('Apt').doc(firebase.auth().currentUser.uid).get().then(
          result => {
            if (!result.exists) return
            this.buildingId = result.data().buildingId
            this.renderPayment();
         }
        )
    }
    

    renderPayment(doc)
    {
        firebase.firestore().collection('Building').doc(this.buildingId).collection('Payment').get().then( querySnapshot => {
        this.setState({ tableData: querySnapshot.docs.map(i => {

             return {id: i.id,...i.data()}}) })
      })
    }

    // onClick(e){
    //     const id = e.target.name
    //     this.props.history.push('./payment/WhoPaid?paymentId='+id);
    // }

    getTableRows()
    {
        
        return this.state.tableData.map(dataRow => {
        let nextadrr = '/payment/WhoPaid?paymentId='+dataRow.id;
            if(dataRow.amount != null)
            return (
                <tr>
                    <td>
                        {/* <button name={dataRow.id} className="buttonStylePay" onClick={this.onClick}>
                        סטטוס ודיווח תשלום של דייר
                        </button> */}

                        <button className="buttonStylePay">
                            <Link className="linkStylePay" to={nextadrr}>סטטוס ודיווח תשלום של דייר
                            </Link>
                        </button>

                        </td>
                    <td>{dataRow.amount}</td>
                    <td>{dataRow.details}</td>
                </tr>
            )
        })
    }

   

}

export default PaymentTable;