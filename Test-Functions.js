// /**
//  * Function for inputting test data from the spreadsheet Customer menu
//  */

// function AddTestEntry() {
// // console.log("Test Entry was Called")
//   const ACTIVE_ENTRY_SHEET = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(GetMonday());
//   let currentTime = Utilities.formatDate(new Date(),'GMT','HH:mm');
//   let currentDate = new Date();
//   let userObject = {
//     customerName:"Taurus Craco",
//     machine:"Show Room",
//     logEntry:"Testing Object",
//     totalHours:2,
//     workOrder:"NaN"
//   };
//   AddResponse(userObject);
//   return SpreadsheetApp.getActiveSpreadsheet().toast("Response added successfully!");
// };


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
// //   UpdateCustomerList(newCustomers)
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

// function TestGetMachines(){
//   let name = "Master Doors";
//   let machines = GetMachines(name,1);
// console.log("Machines are: " + machines);
//   // machines.unshift(name);
// // console.log("New Pushed Machines are: "+ machines);
// }

// function TestUpdateMachineList(){
// let name = "Master Doors";
// let machine = "Homag";
// console.log(UpdateCustomersMachines(name, machine))  
// }