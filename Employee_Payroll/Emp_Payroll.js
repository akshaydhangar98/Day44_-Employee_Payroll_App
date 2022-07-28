window.addEventListener("DOMContentLoaded", (event) => {
    const name = document.querySelector("#name");
    const textError = document.querySelector(".text-error");
    name.addEventListener("input", function () {
      if (name.value.length == 0) {
        textError.textContent = "";
        return;
      }
      try {
        new PersonInfo().name = name.value;
        textError.textContent = "";
      } catch (e) {
        textError.textContent = e;
      }
    });
  
    const salary = document.querySelector("#salary");
    const output = document.querySelector(".salary-output-text");
    output.textContent = salary.value;
    salary.addEventListener("input", function () {
      output.textContent = salary.value;
    });
  
    var d = new Date();
    //clear all these values to 0 if you need to compare year, month, day only.
    d.setHours(0);
    d.setMinutes(0);
    d.setSeconds(0);
    //d.setMiliseconds(0);
  
    //Use parseInt instead of Date.parse, remember to use var to avoid overriding the global object
    var userMonth = parseInt(document.getElementById("#month").value);
    var userDay = parseInt(document.querySelector("#day").value);
    var userYear = parseInt(document.querySelector("#year").value);
    var selectedDate = new Date(userYear, userMonth, userDay);
  
    //Use getTime to compare instead of comparing manually.
    if (selectedDate.getTime() >= d.getDate()) {
      alert("Sorry, this date has not occurred yet. Please submit a new entry. ");
    } else {
      new PersonInfo().start_date = selectedDate.value;
    }
  });
  
  const save = () => {
    try {
        let PersonInfo = createPersonInfo();
    }
    catch (e) {
        return;
    }
  };
  
  
  const createPersonInfo = () => {
    let PersonInfo = new PersonInfo();
    try {
        PersonInfo.name = getInputValueById('#name');
    } catch (e) {
        setTextValue('. text-error', e);
        throw e;
    }
    PersonInfo.profilePic = getSelectedValues('[name=profile] ').pop();
    PersonInfo.gender = getSelectedValues('[name=gender]').pop();
    PersonInfo.department = getSelectedValues('[name = department]');
    PersonInfo.salary = getInputValueById('#salary'); 
    PersonInfo.note = getInputValueById( '#notes');
    
    let date = getInputValueById('#day') + " " + getInputValueById('#month') + " "+ getInputValueById('#year');
        PersonInfo.date =Date.parse(date); 
        alert(PersonInfo.toString());
        return PersonInfo;
    }
  
  
    // 1: querySelector is the newer feature.
    // 2: The querySelector method can be used when selecting by element name,nesting or class name. 
    // 3: querySelector lets you find elements with rules that can't be
    // expressed with getElementById 
    
    const getInputValueById= (id) => {
         let value= document.querySelector(id).value;
        return value;
    }
    
    // 1: getElementById is better supported than querySelector in older versions of the browsers. 
    // 2: The thing with getElementById is that it only allows to select an element by its id.
    
    const getInputElementValue = (id) => {
        let value= document.getElementById(id).value;
        return value;
    }    
  
    // save to local storage
    function createAndUpdateStorage (PersonInfo) {
      let employeePayrollList =JSON.parse(localStorage.getItem("EmployeePayrollList"));
      
      if(employeePayrollList != undefined){
                  employeePayrollList.push(PersonInfo);
      } else{
              employeePayrollList = [PersonInfo]
      }
      alert(employeePayrollList.toString());
      localStorage.setItem ("EmployeePayrollList", JSON.stringify (employeePayrollList))
  }
  
  //reset form
  
  const resetForm = () => {
    setValue( '#name','');
    unsetSelectedValues('[name=profile)');
    unsetSelectedValues ( '[name-gender]'); 
    unsetSelectedValues('[name=department]');
    
    setValue('#salary','');
    setValue('#notes','');
    setValue('#day', '1');
    setValue('#month', 'January');
    setValue( '#year', '2020');
  }
  
  const unsetSelectedValues= (propertyValue) => {
    let allItems = document.querySelectorAll(propertyValue);
    allItems.forEach(item => { item.checked= false;
    });
  }
    
  const setTextValue = (id, value) =>{
    const element =document.querySelector(id);
    element,textContent =value;
  }
    
  const setValue = (id, value) => {
    const element =document.querySelector(id); 
    element.value = value;
  }