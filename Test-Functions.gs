/**
 * Function for inputting test data from the spreadsheet Customer menu
 */

function AddTestEntry() {
  // let dataDate = Utilities.formatDate(new Date("2024-11-24T12:00:00"),'EMT','HH:mm');
  // let dataDate2 = Utilities.formatDate(new Date("2024-11-24T13:00:00"),'EMT','HH:mm');
console.log("Test Entry was Called")
  // let currentTime = Utilities.formatDate(new Date(),'EMT','h:mm a');
  // let currentDate = Utilities.formatDate(new Date(),'EMT','h:mm a');
  let userObject = {
    addDateCheck: false,
    addTime: false,
    categoryName: "",
    categorySelect: "Service",
    customerName: "Magncon",
    customerSelect: "New Customer",
    dateOfOrder: "2025-01-17T20:59:07.117Z",
    logEntry: "Electrical Supply wiring had loose terminals",
    machineName: "Fimal P350",
    machineSelect: "New Machine",
    startTime: "",
    stopTime: "",
    totalHours: "1.75",
    workOrder: "12027"
    };
  AddResponse(userObject);
  console.log()
  return SpreadsheetApp.getActiveSpreadsheet().toast("Response added successfully!");
};


// /**
//  * Adds a new Client name to the customer list asnd updates it 
//  * 
//  */
// // function TestNewList(){
// //   let newCustomers = [];
// //   newCustomers.push(["tom"]);
// //   newCustomers.push(["Dan"]);
// //   newCustomers.push(["Pete"]);
// // console.log("New Customers Array being passed =");
// // console.log(newCustomers);
// // console.log("Updated Customer List = ");
// //   updateCustomerList(newCustomers)
// // }



// /**
//  * Test UpdateMachines
//  */
// function UpdateCustomerInfo(){
//   let customer = {
//      name : "Master Doors",
//      row : "",
//      column : "",
//      machines : []
//      }

//   let machine = "Hammer"
//   let cusInfo = GetCusRecords(customer,machine);
//   console.log(cusInfo+" Logged")
// }

// /**
//  * Test the Get Machines Funciton 
//  */

function TestGetMachines(){
  let name = "Master Doors";
  let machines = GetMachines(name,1);
console.log("Machines are: " + machines);
  // machines.unshift(name);
// console.log("New Pushed Machines are: "+ machines);
}

// function TestUpdateMachineList(){
// let name = "Master Doors";
// let machine = "Homag";
// console.log(UpdateCustomersMachines(name, machine))  
// }


  // <!-- MDL Spinner Component -->
  //         <div id="spinner" class="mdl-spinner mdl-js-spinner"></div>
  //         <div id="output"></div>
/**
 * Test UpdateMachines
 */
// function UpdateCustomerInfo(){
//   let customer = {
//      name : "Master Doors",
//      row : "",
//      column : "",
//      machines : []
//      }

//   let machine = "Hammer"
//   let cusInfo = GetCusRecords(customer,machine);
//   console.log(cusInfo+" Logged")
// }

/**
 * Adds a row of data to the current active log
 */
// function TestNewList(){
//   let newCustomers = "Gypsy";
//   // newCustomers.push(["Tom"]);
//   // newCustomers.push(["Dan"]);
//   // newCustomers.push(["Pete"]);
// console.log("New Customers Array being passed =");
// console.log(newCustomers);
// console.log("Updated Customer List = ");
//   updateCustomerList(newCustomers)
// }


/**
 * Test function to run getFolderByName_.
 * @prints a Google Drive FolderId.
 */
function test_getFolderByName() {

  // Gets the PDF folder in Drive.
  const folder = getFolderByName_(OUTPUT_FOLDER_NAME);

  console.log(`Name: ${folder.getName()}\rID: ${folder.getId()}\rDescription: ${folder.getDescription()}`)
  // To automatically delete test folder, uncomment the following code:
  // folder.setTrashed(true);
}

/**
 *  Test Date Week NUmber 
 *  
 */
function testGetWeekNum(){
  let today = getMondayAsDate(new Date);
  let num = getWeekNum(today)
  console.log("this weeks number is -> "+ num+" <-!!!"); 
}

/**
 * function testGetCustomerRow - Pass in a value that is currently in the list to test it  
 * 
 * 
 * */
 
 function testGetCustomerRow(){
  console.log(getCustomerRow("Furniture in Style"))  
}

/**
 *  function testCapitalization 
 */
function testCapitalize(){
  console.log (capitalize(" just some testing text "))
}


function playingWithTime(){
const log = console.log;
const randomMinutes = Math.random()*1000*60*60;
const startTime = new Date().getTime();
const endTime = new Date().getTime()+randomMinutes;
console.log(startTime);
console.log(endTime);
log. getTime(startTime,endTime)
}