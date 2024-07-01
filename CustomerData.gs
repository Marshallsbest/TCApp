/**
* Returns a 2 dimensional array of names for use in a menu
*/
function CustomerNames(){
  let ss = SpreadsheetApp.getActiveSpreadsheet();
  let customerNames = ss.getRangeByName('CUSTOMER_NAMES').getDisplayValues();
    // console.log(customerNames.map(function(name){if(name != ''){return name}}));
    // let customerList = customerNames.filter((customerName) => customerName[0].length > 0)
    // console.log(customerNames)
  let customerList = _getUniqueList(customerNames);
  console.log(customerList)
  return customerList
};

/**
 *  Customer Selection list
 *  
 */
function CustomerSelectionList(){
  let customerList = CustomerNames();
  customerList.unshift("New Customer");
  // console.log(customerList)
  return customerList
}
/**
 * Gets the names of the days customers and updates the list
 */

function DailyCustomerList(orderWeek){
  let ss = SpreadsheetApp.getActiveSpreadsheet();
  let ls = orderWeek? ss.getSheetByName(getMonday(orderWeek)) : ss.getActiveSheet().activate();
  let nameList = ls.getRange(4,3,ls.getLastRow()-3,1).getValues();
  // console.log("Name List before filter: ");
  // console.log(nameList);
  let names = _getUniqueList(nameList);
  //  console.log("_getUniqueList complete,");
  //  console.log("Returning names from DailyCustomerList"+names);
  return names 
};

/**
 * Merges company name List with new name list
 *
 * @param {array} company   
 * @return {array}
 */
function UpdateCustomerList(company){
  let oneCustomer = company;
  let ss = SpreadsheetApp.getActiveSpreadsheet();
  let ds = ss.getSheetByName('Data');
  let r = ss.getRangeByName('CUSTOMER_NAMES'); 
  let newCustomers = DailyCustomerList();
  let newList = CustomerNames();
  // let oldList = CustomerNames();
  // for(let i = 0;i<newCustomers.length;i++){
  //   newList.unshift(newCustomers[i])
  // }
  if(oneCustomer){
    if(!newList.find((item) => item == oneCustomer)){
      newList.unshift(oneCustomer);
    }
  } else{ 
      newCustomers.forEach(function(customer){
      if(!newList.find((item) => item == customer)){
        newList.unshift(customer)}})
  };
  // console.log("New List before Transposing"+newList);
  let newListArr = _transposeArray(newList)
  // console.log("NewListArr is newList Transposed:");
  // console.log(newListArr);
  // console.log("newListArr.length Call after this  Log : ");
  let numRows = newListArr.length;
  // console.log(numRows);
  r.clear;
  r = ds.getRange(2,1,numRows,1);
  r.setValues(newListArr);
  ss.setNamedRange('CUSTOMER_NAMES',r);
  return newList
}

/**
 * Gets the machines associated with the chosen customer
 * 
 */

function GetMachines(name){

  let assetList = [];
  if(name === "New Customer"){
    assetList.unshift("It's sending New Customer");
    return assetList
  } else {
    assetList = GetClientAssetList(name);
   }
  console.log(assetList);
  if(assetList.indexOf(name)>=0){
    assetList.shift();}
    assetList.push("New Machine")
    assetList.unshift('');
  console.log(assetList);
  return assetList
  }

/**
 * This should return a list of all machines shown to the 
 * right of the company name on the Data page
 */

function DailyMachineList(name){
  let ss = SpreadsheetApp.getActiveSpreadsheet();
  let logSheet = ss.getSheetByName(getMonday());
  let machList = logSheet.getRange(4,3,logSheet.getLastRow()-3,2).getValues();
// console.log(nameList)
  let machines = machList.filter((name) => name.toString.length>0);
// console.log("name : "+names);
// console.log(names);
  return machines 
}

/**
 * Update the Customers Machine list
 */
function UpdateCustomersMachines(customer, machine){
  // console.log(customer)
  let cusName = customer;
  let ss = SpreadsheetApp.getActiveSpreadsheet();
  let ds = ss.getSheetByName('Data');
  // console.log(cusName);
  let machines = GetClientAssetList(cusName);
  // console.log(machines);
  machines.push(machine)
  let range = ss.getRangeByName('CUSTOMER_MACHINES').getDisplayValues();
  let position;
  for(let i=0;i<range.length;i++){
   if(range[i].indexOf(machines[0])>=0){
   position = i+2;}
  };
  let values = [];
  values.push(machines)
  // console.log(position);
  // console.log(values);
  let length = machines.length;
  // console.log(length);
  ds.getRange(position,3,1,length).setValues(values)
  }

/**
 * returns the row index of the customer data
 */
function GetCusRecords(customer,machine){
  // console.log(customer)
  let ss = SpreadsheetApp.getActiveSpreadsheet(); 
  let dataSheet = ss.getSheetByName('Data');
  let nameRange = ss.getRangeByName('CUSTOMER_NAMES')
  let names = nameRange.getDisplayValues();
  // console.log("names: "+names);
  // console.log("names.length: "+names.length);
  // console.log("customer.name: "+customer.name)
  let customerList = names.filter((name) => name[0].length > 0);
  // console.log(customerList);
  let row = customerList.findIndex((cust) => cust[0] === customer.name);
  // console.log("row: "+row);
  let lastCol = customer.machines.length + 1;
  if(row >= 0){
    customer.row = row+2
    let machines = dataSheet.getRange(customer.row,2,1,lastCol).getDisplayValues()
    let machList = machines.filter((machineName) => machineName[0].length > 0)
    machList[0].unshift(machine);
    machList[0].unshift(customer.name);
    // console.log("machList "+machList);
    customer.column = machList[0].length;
    customer.machines = new Array(machList[0])
    // console.log(customer)
  };
  let newMachRange = dataSheet.getRange(customer.row,1,1,customer.column)  
    newMachRange.setValues(customer.machines);
  
  return customer
}

function GetClientAssetList(name){

  let ss = SpreadsheetApp.getActiveSpreadsheet();
  let ds = ss.getSheetByName('Data');
  name = name.trim();
  let cusRecords = ss.getRangeByName('CUSTOMER_MACHINES');
  let customerData = cusRecords.getValues();
  console.log(customerData);
  let machines = [];
  try{for(let i=1;i<customerData.length;i++) {
        if(customerData[i][0] === name){
            machines.push(customerData[i]);
        };
      };
    }catch{
    let message = "Failure at the array building the data given is "+customerData;  
    return message
    }
  let assetList = _getUniqueList(machines);
  console.log("after Get Unique List");
  console.log(assetList[0])
  
  return assetList
}

/**
 * Gets a property from the specified property table 
 * @ 
 * @param {string} propType
 * 
 */
function dataStore(func,propType,key,value){
  // Set a property in each of the three property stores.
  let property;
  if(propType == "script"){
  property = PropertiesService.getScriptProperties();}
  else if(propType == "user"){
  property = PropertiesService.getUserProperties();}
  else if(propType == "doc"){
  property = PropertiesService.getDocumentProperties();
  };
  if(func == "get" ){
    try{
      property.getProperty(key,
          value);
    } catch (err) {
      // TODO (developer) - Handle exception
      let errInfo = 'Failed with error %s '+ err.message;
      console.log(errInfo);
      return errInfo
    }
  }
    if(func == "set"){
      try{
      property.setProperty(key,value);
    } catch (err) {
      // TODO (developer) - Handle exception
      let errInfo = 'Failed with error %s '+ err.message;
      console.log(errInfo);
      return errInfo
    }
  }

}