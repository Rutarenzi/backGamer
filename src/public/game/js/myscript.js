const hasQueryParameters = window.location.search !== '';
const myDataInLocalStorage = localStorage.getItem('myData') === null;

if(window.location.search === '' && !localStorage.getItem('token')) {
   window.location.href = 'http://localhost:5173';
   sessionStorage.removeItem('redirected')
 }

if (hasQueryParameters && !localStorage.getItem('token')) {
const urlSearchParams = new URLSearchParams(window.location.search);
const dataToStore = urlSearchParams.get('data');
localStorage.setItem('token', dataToStore);

}   

if (localStorage.getItem('token') && !sessionStorage.getItem('redirected')) {
const currentUrl = window.location.href;
const newUrlWithoutData = currentUrl.split('?')[0];
sessionStorage.setItem('redirected', 'true');
window.location.href = newUrlWithoutData

}  
var socket=io("http://localhost:3500", {
extraHeaders: {
token:`${localStorage.getItem('token')}`
},
});

socket.on("accountDetails",(msg)=>{
      localStorage.setItem('moneyy',JSON.stringify(msg));
});

// window.onload = function() {
// let messageDisplayed = false;
// };