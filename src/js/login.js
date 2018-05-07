
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
        if( (window.location.pathname == "/2D/html/login.html" || window.location.pathname == "/2D/html/register.html")
            || window.location.pathname != "/2D/index.html"){
                window.location.pathname = "/2D/index.html";
            }
    }else {
        if(window.location.pathname == "/2D/" || window.location.pathname == "/2D/index.html")
            window.location.pathname = "/2D/html/login.html";
    }

});

  

function signUp(){
    email = document.getElementById("email").value;
    password = document.getElementById("password").value;

    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
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

function logout(){
    if(firebase.auth().currentUser){
        firebase.auth().signOut();
    }
}