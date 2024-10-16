const form = document.querySelector("#form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");
const captcha = document.getElementById("captcha");

//  event propagation is when i click on a button and it affect everything on the form .
// add a submit eventListener on the form 
//prevent the default behaviour  

form.addEventListener('submit',  (event) =>{
event.preventDefault();
checkInput();
});

function setError(input, message){
const formControl = input.parentElement;
const small = formControl.querySelector("small") ;
formControl.className = "form-control error ";
small.innerText = message 

}

function setSuccess(input){
const formControl = input.parentElement;
formControl.className = "form-control success";


}

function checkInput(){
const usernameValue = username.value.trim();
const emailValue = email.value.trim();
const passwordValue = password.value.trim();
const password2Value = password2.value.trim();
const captchaValue = captcha.value.trim();
// console.log(usernameValue, emailValue,passwordValue,password2Value,captchaValue);

//validate the username (empty fields, min length is 5)

if (usernameValue === ""){
//username is required 
setError(username, "username is required ");

}else if (usernameValue.length < 5){
    //minimum username length is 5 
    setError(username, "Minimum username lenght is 5");
}else{
    //success 
    setSuccess(username)
}

// validate email (email must not be empty , email must include @)
if ( emailValue === ""){
    setError(email, "Email is required ");

}else if(!emailValue.includes('@')){
setError(email, "Email reqires @")
}else{
    setSuccess(email);
}

//password must not be empty and the minimum password length is 7
if(passwordValue=== ""){
    setError(password, "password is required");
}else if ( passwordValue.length < 7 ){ 
setError( password, "minimum password is 7");
}else{
    setSuccess(password)
}

// must not be empty and must match the first password 
if( password2Value===""){
    setError(password2, "password confirmation must not be empty");

}else if (password2Value !== passwordValue){
    setError( password2, "password must match ")
}else{
    setSuccess(password2)
}

// make sure it is not empty, if it is empty set error 

if(captchaValue === ""){
    setError (captcha, "Authentication is needed ");
}

}

//select that button using the class show-btn
const showBtn = document.querySelector(".show-btn");
showBtn.addEventListener("click", (event) =>{
event.preventDefault();

const inputType = password.getAttribute("type");
if(inputType === "password"){
    password.setAttribute("type", "text");
    showBtn.value = "Hide";

}else {
password.setAttribute("type", "password");
showBtn.value = "show";
}

});




captcha.addEventListener('input', (e) =>{
    //select the img
const img = document.querySelector('img');
const text = e.target.value;
const blurValue = 20 - text.length; 
//blur(blurvalue)px
img.style.filter = `blur(${blurValue}px)`

if (blurValue <= 0){
    setSuccess(captcha);
}else{
    setError(captcha, "Text is not long enough")
}


});