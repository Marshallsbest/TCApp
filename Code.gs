/**
 * Welcome to the Taurus Craco Service Tech Time Keeping App
 * This App will accept data submitted by the user and 
 * gradually create a data base of pertinant info to allow for 
 * easier data submission as it's used
 */

/**
 * The Web App Call for the user form to be displayed 
 */
function doGet(e) {
 let f =  HtmlService.createTemplateFromFile('index.html');
 f.data = CustomerSelectionList();
 return f.evaluate()
};

/**
 *  Loads Style Sheet and JS File. Called from index HTML page via scriptlets
 */
function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
};

/**
 * Create a menu for the user to test 
 */
function onOpen(){
  let ui = SpreadsheetApp.getUi();
  ui.createMenu("🔨Time Sheet Menu🔨")
      .addItem('Add test entry', 'AddTestEntry')
      .addItem('Create new weekly sheet', 'getWeeklySheet')
      .addItem('Update Customer List', 'UpdateCustomerList')
      .addItem('Email Time Sheet', 'EmailCurrentSheet')
      .addItem('Add Week to Archive','AddWeekToArchive')
      .addToUi();
};

/**
 * Call from the Web app once the user hits the Submit Button
 */
function AddResponse(formObject){
// console.log("add Response was called"+ formObject);
  let record = new Record(formObject);
  console.log("Logging New Record",record)
  let success = [];
  // let currentDate = new Date();
  // let currentTime = Utilities.formatDate(currentDate,'EST','HH:mm');
  // let sheet = getWeeklySheet(record.orderDate);
  // let customer = formObject.customerName;  
  // if(customer === ""){customer = formObject.customerSelect;};
  // let machine = formObject.machineName; 
  // if(machine === ""){machine = formObject.machineSelect;};
  // let workOrder = formObject.workOrder;
  // if(isNaN(workOrder)){workOrder = "Office Time"};
  // let hours = formObject.totalHours;
  // let log = formObject.logEntry;
  // let newEntry = [currentDate,currentTime,customer,machine,log,hours,workOrder];
  // sheet.appendRow(newEntry);
  console.log("Logging getRecord results",record.orderDate);
  // sheet.appendRow(record.getRecord());
  
  UpdateCustomerList(record.addClient)
  try {
    let addLog = record.setLogRecord() 
  return  success.push(addLog);
  //
  } catch (error) {
  return error  
  }
};

/**
 *  @function saveSettings 
 *  
 * 
 */
function saveSettings(){
  const userprefs = new Information
  try{
    const data =  getDocProperties("Doc","All",);
    for (const key in data) {
      console.log('Key: %s, Value: %s', key, data[key]);
    }
  } catch (err) {
    // TODO (developer) - Handle exception
    console.log('Failed with error %s', err.message);
  }
  if(!data){
    setProperties(userPrefs)
  
  }
}