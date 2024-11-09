/**
 *  A Class to create an object containing all the user defined parameters found on the settings page
 */

class Information{
  constructor(){
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    this.name = ss.getRangeByName("FIRST_NAME").getValue();
    this.managersEmail = ss.getRangeByName("MANAGERS_EMAIL").getValue();
    this.email = ss.getRangeByName("PERSONAL_EMAIL").getValue();
    this.firstName = ss.getRangeByName("FIRST_NAME").getValue();
    this.lastName = ss.getRangeByName("LAST_NAME").getValue();
    this.companyName = ss.getRangeByName("COMPANY_NAME").getValue(); 
    this.includingMyManager = ss.getRangeByName("INCL_MANAGER").getValue();
    this.includePersoanlEmail = ss.getRangeByName("INCL_PERSONAL").getValue();
    this.techName = ss.getRangeByName("TECH_NAME").getValue();
    this.logo = ss.getRangeByName("COMPANY_LOGO_URL").getValue();
    this.autoEmail = ss.getRangeByName("AUTO_EMAIL").getValue();
  }
}


/**
 *  ClientData is the object class which should handle the Usage of Client data 
 */
// class ClientData{
//   constructor(name){
//     const ss = SpreadsheetApp.getActiveSpreadsheet();
//     this.companyName = name;
//     }
//     initializeClient(name,machines){
//       let sheet;
//       if(ss.getSheetByName(name)){
//         sheet = ss.getSheetByName(name).activate();
//       }else{
//         sheet = ss.insertSheet(name).activate();
        
//       };
//       let info = [];
//       let data = [];
//       data.unshift("Name:")
//       data.unshift(name)
//       machines.forEach(machine => {
//         info.unshift(machine) 
//       });
//       info.unshift("Machines:");
//       sheet.appendRow(info);
//       sheet.appendRow("Date","Machine","Log","time").activate();
//       sheet.getRange(1,1,2,10).setBackground('#38761d')
//         .setFontColor('#ffe599')
//         .setHorizontalAlignment('center')
//         .setFontWeight('bold');
//       }
// }

/**
 * Function: Customer
 * @param {string} name
 * @param {string} machine
 * @param {string} category
 * @param {string} log
 * @param {date} logDate
 * 
 */
// function customerLog(name,machine,category,log,logDate){
//     this.name = name;
//     this.log = log;
//     this.serviceLogs = [];
//     this.category = category;
    
//         addMachine(machine){
//       machines.unshift(machine);
//     };
//     getAssetList(name){
//       machines = GetClientAssetList(name).shift();
//       return machines
//     }; 

/**
 * Class: Record
 * this creates an record object from the form response ;
 * @class
 * @param {string} name : String the name of the record being requested
 * @param {object} formObject : the data sent from a form submission to create a new record
 */
 class Record{
  constructor(formObject,name){
    if(name){let formObject = getRecord(name)}
    this.customer = formObject.customerName ? formObject.customerName : formObject.customerSelect;
    this.machine = formObject.machineName ? formObject.machineName:formObject.machineSelect;
    this.logEntry = formObject.logEntry;
    this.hours = formObject.totalHours;
    this.workOrder = formObject.workOrder;
    this.category = formObject.category;
    this.date = new Date();
    this.orderDate = formObject.addDateCheck == "on" ? new Date(formObject.dateOfOrder) : this.date;
    // this.time = Utilities.formatDate(this.date,'EST','HH:mm');
    console.log(this.orderDate)
    this.orderWeekMonday = getMonday(this.orderDate)
    this.orderWeek = getWeekNum(this.orderDate)
    this.logSheet = getThisYearsLogSheet()
    console.log(this.orderWeek);
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
    let logYear = this.orderDate.getFullYear()
    let sheet = this.logSheet.activate();  
    try {
      sheet.appendRow([this.orderWeek,this.orderDate,this.customer,this.machine,this.category(),this.logEntry,this.hours,this.workOrder]);
      return "success! Record added to "+sheet.getSheetName;
    } catch (error) {
     return "logging Error: "+error 
    }
  };
 }