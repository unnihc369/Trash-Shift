let a=0;
let b=0;
let collect;
let increase=document.querySelectorAll(".ri-add-circle-line");
let decrease=document.querySelectorAll(".minus");
let number_count=document.querySelectorAll(".number_count");
// variable submit 

// pop up information 
let overlay=document.querySelector('.overlay');
let popUpSHow=document.querySelector(".popUpSHow");
let popName=document.querySelector("#popName")
popName.innerHTML=JSON.parse(sessionStorage.getItem('user')).name;
let popUpClose=document.querySelector("#popUpClose");


let submit=document.querySelectorAll(".submit_anwser");
increase[0].addEventListener('click',function(e){
    e.preventDefault();
    a+=1;
    number_count[0].innerHTML=a;
})
console.log(increase,decrease);
increase[1].addEventListener('click',function(e){
    e.preventDefault();
    b+=1;
    number_count[1].innerHTML=b;
})

decrease[0].addEventListener('click',function(e){
    
    e.preventDefault();
    if(a==0) return ;
    a-=1;
   
    number_count[0].innerHTML=a;
})

decrease[1].addEventListener('click',function(e){
    e.preventDefault();
    if(b==0) return ;
    b-=1;
   
    number_count[1].innerHTML=b;
})

function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }

let submit1=document.querySelector("#submit-1");
let submit2=document.querySelector("#submit-2");
let ob=JSON.parse(sessionStorage.getItem('user'));
submit1.addEventListener('click',function(){
    if(a==0)return;
    let obj={
        name:ob.name,
        phone:ob.phone,
        adress:ob.address,
        kg:a,
        type:"Biodegradable",
    }
    scrollToTop();
    
    let abc=localStorage.getItem('value');
   
    if(abc===null){
        collect=[];
    }else{
        collect=JSON.parse(abc);
    }
    collect.push(obj);

    localStorage.setItem('value',JSON.stringify(collect));
    overlay.classList.toggle('hidden');
    popUpSHow.classList.toggle('hidden');
 

})
submit2.addEventListener('click',function(){
    if(b==0)return;
    let obj={
        name:ob.name,
        phone:ob.phone,
        adress:ob.address,
        kg:b,
        type:"non-Biodegradable",
    }
    scrollToTop();
    let abc=localStorage.getItem('value');
   
    if(abc===null){
        collect=[];
    }else{
        collect=JSON.parse(abc);
    }
    collect.push(obj);
    localStorage.setItem('value',JSON.stringify(collect));
    overlay.classList.toggle('hidden');
    popUpSHow.classList.toggle('hidden');

})

popUpClose.addEventListener('click',function(){
   overlay.classList.add('hidden');
   popUpSHow.classList.add('hidden');
})
