const form =[...document.querySelector('.form').children];

form.forEach((item,i)=>{
    setTimeout(()=>{
        item.style.opacity =1;
    }, i*100);
})

window.onload=()=>{
    if(sessionStorage.name){
        location.href ='/';
    }

}




//form validation

const name=document.querySelector('.name') || null;
const email=document.querySelector('.email');
const password=document.querySelector('.password')||null;
const submitBtn=document.querySelector('.submit-btn');
const reemail=document.querySelector('.reemail')||null;
const repassword=document.querySelector('.repassword')||null;


if(reemail==null && repassword==null && name==null){
    //means login page is open
    submitBtn.addEventListener('click',()=>{
        fetch('/login-user',{
            method : 'post',
            headers:new Headers({'Content-Type':'application/json'}),
            body:JSON.stringify({
                email:email.value,
                password:password.value
            })

        })
        .then(res=>res.json())
        .then(data=>{
            validateData(data);
        })


    })



}

//forgot password 
else if(name==null && password==null){
    //event.preventDefault();

    submitBtn.addEventListener('click',()=>{
        
        fetch('/forgot-user',{
            method : 'post',
            headers:new Headers({'Content-Type':'application/json'}),
            body:JSON.stringify({
                
                password:repassword.value
            })

        })
        .then(res=>res.json())
        .then(data=>{
            validateData(data);
        })


    })




}








else{
    //means register page is open

    submitBtn.addEventListener('click',()=>{
        fetch('/register-user',{
            method:'post',
            headers: new Headers({'Content-Type':'application/json'}),
            body:JSON.stringify({
                name:name.value,
                email:email.value,
                password:password.value
            })
        })
        .then(res=>res.json())
        .then(data=>{
            validateData(data);
        })

    })


}

const validateData=(data)=>{
    if(!data.name){
        alertBox(data);
    }
    else{
        sessionStorage.name=data.name;
        sessionStorage.email=data.email;
        sessionStorage.password=data.password;
        sessionStorage.reemail=data.reemail;
        sessionStorage.repassword=data.repassword;

        location.href ='/';
    }
}

const alertBox =(data)=>{
    const alertContainer=document.querySelector('.alert-box');
    const alertMsg = document.querySelector('.alert-box');
    alertMsg.innerHTML =data;

    alertContainer.style.top = `5%`;
    setTimeout(()=>{
        alertContainer.style.top=null;
    },5000);
}