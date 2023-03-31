let ob = JSON.parse(localStorage.getItem("value"));
console.log(ob);
let info = document.querySelector(".info");
let n = ob.length;
let html = "";

if(ob==null) ob=[];

function display(){
  if(ob==[]) return;

  for (let i = n - 1; i >= 0; i--) {
    html += `
  
    <ul>
    <li class="phoneNumber">
      <span>name : - </span><span id="name">${ob[i].name}</span>
    </li>
    <li class="phoneNumber">
      <i class="ri-phone-fill"></i> :-
      <span id="phone number">${ob[i].phone}</span>
    </li>
    
    <li class="phoneNumber">
      <i class="ri-home-heart-line"></i> : -<span id="adress">
        ${ob[i].adress}
      </span>
    </li>
    <li class="phoneNumber">
      <p id="inertType">${ob[i].type}</p> type of ${ob[i].kg}KG
    </li>
    </ul>
    
    `;
  }
  info.innerHTML = html;

}
display();


let clearALL=document.querySelector('#closeALL');
clearALL.addEventListener('click',function(e){
  localStorage.clear();
  info.innerHTML="";
})


// close all 

