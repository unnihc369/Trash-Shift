let signup = document.querySelector(".signup");
let login = document.querySelector(".login");
let slider = document.querySelector(".slider");
let formSection = document.querySelector(".form-section");

signup.addEventListener("click", () => {
    slider.classList.add("moveslider");
    formSection.classList.add("form-section-move");
});

login.addEventListener("click", () => {
    slider.classList.remove("moveslider");
    formSection.classList.remove("form-section-move");
});

//firebase

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyBLu9N2gvg2Bqf-MIxYamDAEtkcWysgY4g",
    authDomain: "fire-front-ac272.firebaseapp.com",
    projectId: "fire-front-ac272",
    storageBucket: "fire-front-ac272.appspot.com",
    messagingSenderId: "847503407361",
    appId: "1:847503407361:web:d99956105cc1f631738300",
    measurementId: "G-5SVDN90QRN"
});

const db = firebaseApp.firestore();
const auth = firebaseApp.auth();

const register = async () => {
    const email = document.getElementById('email-su').value;
    const password = document.getElementById('password-su').value;
    const repassword = document.getElementById('repassword-su').value;
    const name = document.getElementById('name-su').value;
    const phone = document.getElementById('phone-su').value;
    const address = document.getElementById('address-su').value;
    const mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const passwordformat = /^[a-zA-Z0-9!@#$%^&*]{8,16}$/;

    var resName = 0;
    for (var i = 0; i < (name).length; i++) {
        if ((name).charAt(i) >= '0' && (name).charAt(i) <= '9') {
            resName = 1;
            break;
        }
    }
    if (!name || !email || !phone || !password || !repassword || !address) {
        alert("Fill all fields");
        return;
    }
    else if (resName !== 0) {
        alert("Invalid name");
        resName = 0;
        return;
    }
    else if (!(email).match(mailformat)) {
        alert("Invalid email id");
        return;
    }
    else if (phone < 6000000000 || phone > 9999999999) {
        alert("Invalid Phone number");
        return;
    }
    else if (!(password).match(passwordformat)) {
        alert("Password should contain atlest 8 charecters with captital letter, small letters and special charecter.");
        return;
    }
    else if (password !== repassword) {
        alert("Password is not matching");
        return;
    }

    var flag = false;

    console.log(name + '\n' + email + "\n" + password + "\n" + repassword + '\n' + address);
    await auth.createUserWithEmailAndPassword(email, password)
        .then(async (user) => {
            await db.collection("users").add({
                name: name,
                email: email,
                phone: phone,
                address: address,
            }).then(async() => {
                await db.collection('users')
            .get().then((data) => {
                data.forEach((item) => {
                    if(item.data().email === auth.currentUser.email){
                        sessionStorage.setItem("user",JSON.stringify(item.data()));
                    }
                    
                });
            })
                window.location.assign("main.html");
            }).catch(e => console.log(e));
        })
        .catch((err) => {
            alert(err.message);
            console.log(err.code);
            console.log(err.message);
        })

  
}
email="";

const loin = async () => {
    const email = document.getElementById('email-lg').value
    const password = document.getElementById('password-lg').value

    await auth.signInWithEmailAndPassword(email, password)
        .then(async(res) => {
            const user = res.user;
            await db.collection('users')
            .get().then((data) => {
                data.forEach((item) => {
                    if(item.data().email === auth.currentUser.email){
                        sessionStorage.setItem("user",JSON.stringify(item.data()));
                    }
                    
                });
            })
            window.location.assign("main.html")
        })
        .catch((err) => {
            alert(err.message)
            console.log(err.code)
            console.log(err.message)
        })


   

}

const saveData = () => {
    const email = document.getElementById('email-su').value
    const password = document.getElementById('password-su').value

    db.collection('users')
        .add({
            email: email,
            password: password
        })
        .then((docRef) => {
            console.log("Document written with ID: ", docRef.id);
        })
        .catch((error) => {
            console.error("Error adding document: ", error);
        });
}

const readData = () => {
    db.collection('users')
        .get()
        .then((data) => {
            console.log(data.docs.map((item) => {
                return { ...item.data(), id: item.id }
            }))
        })
}

const updateData = () => {
    db.collection('users').doc('6caYOiNxwviOJFIQ4Uag')
        .update({
            email: 'ashishisagoodboy1234@gmail.com',
            password: '123456'
        })
        .then(() => {
            alert('Data Updated')
        })
}

const deleteData = () => {
    db.collection('users').doc('6caYOiNxwviOJFIQ4Uag').delete()
        .then(() => {
            alert('Data Deleted')
        })
        .catch((err) => {
            console.log(err)
        })
}