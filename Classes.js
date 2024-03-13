/**
 *  A Class to create an object containing all the user defined parameters found on the settings page
 */

class Information {
  constructor(){
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const MANAGERS_EMAIL = ss.getRangeByName("MANAGERS_EMAIL").getValue();
  const PERSONAL_EMAIL = ss.getRangeByName("PERSONAL_EMAIL").getValue();
  const FIRST_NAME = ss.getRangeByName("FIRST_NAME").getValue();
  const COMPANY_NAME = ss.getRangeByName("COMPANY_NAME").getValue();
  this.email = !PERSONAL_EMAIL?GetData("PERSONAL_EMAIL"):PERSONAL_EMAIL;
  this.managersEmail = !MANAGERS_EMAIL?GetData("MANGERS_EMAIL"):MANAGERS_EMAIL;
  this.includingMyManager = ss.getRangeByName("INCL_MANAGER").getValue();
  this.name = !FIRST_NAME?GetData("FIRST_NAME"):FIRST_NAME;
  this.companyName = !COMPANY_NAME?GetData("COMPANY_NAME"):COMPANY_NAME;
  }
}

class ClientData{
  constructor(name){
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    this.companyName = name;
    }
    initializeClient(name,machines){
      let sheet;
      if(ss.getSheetByName(name)){
        ss.getSheetByName(name).activate();
      }else{
      sheet = ss.insertSheet(name).activate();
      };
      let info = [];
      let data = [];
      data.unshift("Name:")
      data.unshift(name)
      machines.forEach(machine => {
        info.unshift(machine) 
      });
      info.unshift("Machines:");
      sheet.appendRow(info);
      sheet.appendRow("Date","Machine","Log","time").activate();
      sheet.getRange(1,1,2,10).setBackground('#38761d')
            .setFontColor('#ffe599')
            .setHorizontalAlignment('center')
            .setFontWeight('bold');
            }
}

/**
 * Class: Customer
 * @param name
 */
class Customer{
  constructor (name, machine){
    this.name = name;
    this.machine = machine;
    this.machines = [];
    };
    addMachine(machine){
      machines.unshift(machine);
    };
    getAssetList(name){
      machines = GetClientAssetList(name).shift();
      return machines
    }; 
}

/**
 * Class: Record
 * Description: this creates an object from the form response 
 * which will give the response data methods to use;
 * 
 * @param formObject
 * 
 */
 class Record{
  constructor(formObject){
    this.customer = formObject.customerName ? formObject.customerName : formObject.customerSelect;
    // this.selectedCustomer = formObject.customerSelect;
    this.machine = formObject.machineName ? formObject.machineName:formObject.machineSelect;
    // this.selectedMachine = formObject.machineSelect;
    this.logEntry = formObject.logEntry;
    this.hours = formObject.totalHours;
    this.workOrder = formObject.workOrder;
    this.date = new Date();
    this.time = Utilities.formatDate(this.date,'EST','HH:mm');
  }
    getRecord(){
      // let customer;
      // let machine;
      // if(this.selectedCustomer === "New Customer"){
      // customer = this.newCustomerName;}
      // else{customer = this.selectedCustomer;}
      // if(this.selectedMachine === "New Machine"){
      // machine = this.newMachineName;}
      // else{machine = this.selectedMachine;}
      return [this.date,this.time,this.customer,this.machine,this.logEntry,this.hours,this.workOrder]
    };


 
 }