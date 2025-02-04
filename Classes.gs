/**
 *  A Class to create an object containing all the user defined parameters found on the settings page
 */

class Information{
  constructor(){
    const ss = SpreadsheetApp.getActiveSpreadsheet().getRangeByName;
    this.DC_NM = ss("DOC_NAME").getValue();
    this.THM_BCKGRND_CLR = ss("HEADER_BACKGROUND_COLOUR").getValue();
    this.THM_FNT_CLR = ss("HEADER_FONT_COLOUR").getValue();
    this.LS = ss("LOG_SHEET").getValue();
    this.CMP_LOGO_URL = ss("COMPANY_LOGO_URL").getValue();
    this.PRSNL_EML = ss("PERSONAL_EMAIL").getValue();
    this.MNGR_EML = ss("MANAGERS_EMAIL").getValue();
    this.CMP_NM = ss("COMPANY").getValue();
    this.FRST_NM = ss("FIRST_NAME").getValue();
    this.LST_NM = ss("LAST_NAME").getValue();
    this.FL_NM = ss("TECH_NAME").getValue();
    this.AUT_EMAIL = ss("AUTO_EMAIL").getValue();
    this.INCL_MNGR = ss("INCL_MANAGER").getValue();
    this.INCL_PRSNL = ss("INCL_PERSONAL").getValue();
    this.MNGR_FRST_NM = ss("MANAGER_FIRST_NAME").getValue();
    this.MNGR_LST_NM = ss("MANAGER_LAST_NAME").getValue();
  };
}
/**
 * test info class
 * 
 */
function testInfoClass(){
  const info = new Information;
  console.log(info);
}
/**
 * Class: Record
 * this creates an record object from the form response ;
 * @class
 * @param {string} name : String the name of the record being requested
 * @param {object} formObject : the data sent from a form submission to create a new record
 */
class Record{
  constructor(formObject,name){
    console.log("New Record Class Constructor Called:  "+ formObject);
    this.date = new Date();
    if(name != null){formObject = getRecord(name)}
    this.workOrder = formObject.workOrder;
    console.log("This order Date: "+formObject.dateOfOrder);
    this.orderDate = new Date(formObject.dateOfOrder);
    this.timeOff = formObject.timeOff;
    this.customer = formObject.customerSelect == "New Customer" ? updateCustomerList(formObject.customerName, formObject.machineName): formObject.customerSelect;
    this.machine = formObject.machineSelect == "New Machine" ? addNewAsset(formObject.customerName, formObject.machineName) : formObject.machineSelect;
    this.category = formObject.categorySelect == "New Category" ? updateCategoryList(formObject.categoryName) : this.category = formObject.categorySelect
    this.logEntry = formObject.logEntry;
    this.addTime = formObject.addTime;
    this.start = formObject.addTime ? new Date(formObject.startTime):"";
    this.stop = formObject.addTime ? new Date(formObject.stopTime):"";
    this.hours = formObject.totalHours;
    this.time = Utilities.formatDate(this.date,'EST','HH:mm');
    this.orderWeek = getWeekNum(this.orderDate);
    this.logYear = this.orderDate.getFullYear()+" Logs"
    console.log("This log Sheet Name: "+this.logYear);
    console.log("This Order Date: "+this.orderDate);
    console.log("This Order Week: "+this.orderWeek);
  };
    addClient(){
    try{
      dataStore("get","doc",this.customer)
    } catch(err) {
      dataStore("set","doc",this.customer,this)
      return err.message
    }
  };
  setLogRecord(){
    if(this.stop === "" && this.hours === ""){
      console.log("CalcTime will be called");
      let calcTime = getLastEntryTime(new Date());
      console.log("CalcTime is:"+calcTime)
      this.start = calcTime.start;
      this.stop = calcTime.stop;
      this.hours = calcTime.hours;
    }
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    console.log("record.setLogRecord was called! and the Sheet name is: |"+this.logYear+"|")
    let sheet = ss.getSheetByName(this.logYear).activate();  
    // let oDate = Utilities.formatDate(this.orderDate,"GMT -5:00",dtFormat,)
    try {
      console.log("Try was called to append the row to page: "+ss.getSheetName() )
      let entry = [this.orderWeek,this.orderDate,this.category,this.customer,this.machine,this.logEntry,this.start,this.stop,this.hours,this.workOrder,this.time];
      sheet.appendRow(entry);
      console.log("added this to the log Sheet: "+entry);
      formatEntryRow(this.logYear)
      return "success! Record added to "+sheet.getSheetName;
      
    } catch (error) {
      console.log("The try append failed and caught this error: "+error)
     return "logging Error: "+error 
    }
  };
 }
