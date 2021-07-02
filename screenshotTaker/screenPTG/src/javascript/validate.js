var nameValidated = false
var emailValidated = false
var passValidated = false
var cpassValidated = false
var empIdValidated = false
var currentPass = ""
const submit = document.getElementById('submitButton')
const inputName = document.getElementById('name')
const inputEmail = document.getElementById('email')
const inputPass = document.getElementById('password')
const inputCPass = document.getElementById('cpassword')
const inputEmpId =  document.getElementById('empId')
const MAXCHARNAMEFIELD = 20
const MINCHARNAMEFIELD = 3

document.addEventListener('change', event => {   
 
  if (event.target.matches('.inputNameField')) {
    validateName()
  } else if (event.target.matches('.inputEmailField')) {
    validateEmail(event.target.value)
  } else if(event.target.matches('.empId')){
    validateEmpId()
  }else if(event.target.matches('.password')){
    validatePass()
  }else if(event.target.matches('.cpassword')){
    validateCPass()
  }else{
    //nothing
  }
}, false)

submit.addEventListener('click', (event) => {
  if (event.target.matches('.button')) {
    submitCheck()
  } 
})

//-----Validate Name-------
function validateName() {
  if( (inputName.value.length > MINCHARNAMEFIELD) && (inputName.value.length < MAXCHARNAMEFIELD) &&
      (inputName.value != null) )
   {
     nameValidated = true
     inputName.focus() ;
     console.log(inputName.value)
     return true;
   }
  else{
    return false;
  } 
}

//------Validate Email------
function validateEmail(value) {
  const email = inputEmail.value;
  atpos = email.indexOf("@");
  dotpos = email.lastIndexOf(".");
 if (email == "" || atpos < 1 || ( dotpos - atpos < 2 ))
 {
     inputEmail.focus() ;
     return false;
 }
 else{
   console.log(inputEmail.value)
   emailValidated = true;
   return true;
 }
}

//-----Validate Password-----
function validatePass() {
  const str = inputPass.value 
  if(str.match(/[a-z]/g) && str.match(/[A-Z]/g) && 
  str.match(/[0-9]/g) && str.match(/[^a-zA-Z\d]/g) && 
  str != null && str.length >= 8 && str.length <= 15)
   {
     passValidated = true
     inputPass.focus() ;
     currentPass = inputPass.value
     console.log(inputPass.value)
     return true;
   }
  else{
    return false;
  } 
}

//------Validate Confirm Password-----
function validateCPass() {
  const str = inputCPass.value
  if( currentPass === str && str != null  )
   {
     cpassValidated = true
     inputCPass.focus();
     console.log(inputCPass.value)
     return true;
   }
  else{
    return false;
  } 
}

//------Validate Employee Id------
function validateEmpId() {
  if( inputEmpId.value != ""  )
   {
    empIdValidated = true
    inputEmpId.focus();
    console.log(inputEmpId.value)
    return true;
   }
  else{
    return false;
  } 
}

//-----OnSubmit Checks All Conditions-----
function submitCheck() {
  //console.log(nameValidated, emailValidated)
  //console.log(passValidated, cpassValidated)
  //console.log(empIdValidated)

  if (nameValidated === true && emailValidated === true) {
    console.log("validated Name and Email")
  } 
  else if(nameValidated === false && emailValidated === false){
    alert("Please provide your Name!" )
    alert("Please enter correct email ID" )
    inputName.classList.remove('is-sucess')
    inputName.classList.add('is-danger')
    inputEmail.classList.remove('is-sucess')
    inputEmail.classList.add('is-danger')

  }
  else if(nameValidated === false || emailValidated === false){
    if(nameValidated === false){
        alert("Please provide your Name!" )
        inputName.classList.remove('is-sucess')
        inputName.classList.add('is-danger')
    }
    else if(emailValidated === false){
        alert("Please enter correct email ID" )
        inputEmail.classList.remove('is-sucess')
        inputEmail.classList.add('is-danger')
      }
  }

  if(passValidated, cpassValidated){
    console.log("validated password fields!!")
  }
  else if(passValidated === false && cpassValidated === false){
    alert("Please provide valid password!" )
    inputPass.classList.remove('is-sucess')
    inputPass.classList.add('is-danger')
    inputCPass.classList.remove('is-sucess')
    inputCPass.classList.add('is-danger')

  }
  else if(passValidated === false || cpassValidated === false){
    if(passValidated === false){
        alert("Please provide valid password!!" )
        inputPass.classList.remove('is-sucess')
        inputPass.classList.add('is-danger')
    }
    else if(cpassValidated === false){
        alert("Please enter correct password" )
        inputCPass.classList.remove('is-sucess')
        inputCPass.classList.add('is-danger')
      }
  }

  if(empIdValidated === true)
  {
    console.log("Employee Id validated")
  }
  else if(empIdValidated === false){
    alert("Please enter Employee Id!")
    inputEmpId.classList.remove('is-sucess')
    inputEmpId.classList.add('is-danger')
  }
}

