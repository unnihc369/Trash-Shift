let signup = document.querySelector(".signup");
let login = document.querySelector(".login");
let slider = document.querySelector(".slider");
let formSection = document.querySelector(".form-section");

// signup.addEventListener("click", () => {
// 	slider.classList.add("moveslider");
// 	formSection.classList.add("form-section-move");
// });

// login.addEventListener("click", () => {
// 	slider.classList.remove("moveslider");
// 	formSection.classList.remove("form-section-move");
// });

//firebase

const firebaseApp = firebase.initializeApp({
     apiKey: "AIzaSyC9d_C_UpiPks56hpPyl8_J7kugTXXto6U",
    authDomain: "manag-login.firebaseapp.com",
    projectId: "manag-login",
    storageBucket: "manag-login.appspot.com",
    messagingSenderId: "141283506212",
    appId: "1:141283506212:web:5fe4254b7a9644fa55c0b1",
    measurementId: "G-YK1RV4HLY9"
});

const db = firebaseApp.firestore();
const auth = firebaseApp.auth();

const register = () => {
    const email = document.getElementById('email-su').value
    const password = document.getElementById('password-su').value
    
    auth.createUserWithEmailAndPassword(email, password)
    .then((res) => {
        saveData();
        console.log(res.user)
    })
    .catch((err) => {
        alert(err.message)
        console.log(err.code)
        console.log(err.message)
    })
}

const loin = () => {
    const email = document.getElementById('email-lg').value
    const password = document.getElementById('password-lg').value

    auth.signInWithEmailAndPassword(email, password)
    .then((res) => {
        console.log(res.user)
        window.location.assign("manage.html")
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
            return {...item.data(), id: item.id}
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
    .catch((err) =>{
        console.log(err)
    })
}