
var email,password;


firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        var displayName = user.displayName;
        var email = user.email;
        var emailVerified = user.emailVerified;
        var photoURL = user.photoURL;
        var isAnonymous = user.isAnonymous;
        var uid = user.uid;
        var providerData = user.providerData;
                
        if( (window.location.pathname == "/html/login.html" || window.location.pathname == "/html/register.html")
            || window.location.pathname != "/index.html"){
                window.location.pathname = "/index.html";
            }
    }else {
        console.log(window.location.pathname);
        if(window.location.pathname == "/" || window.location.pathname == "/index.html")
            window.location.pathname = "/html/login.html";
    }

});

  

function signUp(){
    email = document.getElementById("email").value;
    password = document.getElementById("password").value;

    firebase.auth().createUserWithEmailAndPassword(email, password).then(function(){
        if(document.getElementById("name").value !=null)
        setTimeout(function(){user.updateProfile({displayName: document.getElementById("name").value});},100);
    }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(errorMessage);
    });
}

function login(){
    email = document.getElementById("email").value;
    password = document.getElementById("password").value;

    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(errorMessage);        
    });

}

function logoutMe(){
    
    if(firebase.auth().currentUser){
        firebase.auth().signOut();
    }
}