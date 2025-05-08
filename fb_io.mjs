//**************************************************************/
// fb_io.mjs
// Generalised firebase routines
// Written by Conor Church, Term 2 2025
//
// All variables & function begin with fb_  all const with FB_
// Diagnostic code lines have a comment appended to them //DIAG
/**************************************************************/
const COL_C = 'white';	    // These two const are part of the coloured 	
const COL_B = '#CD7F32';	//  console.log for functions scheme
const COL_G = '#15ff00'
const COL_R = '#ff0000'
console.log('%c fb_io.mjs',
            'color: blue; background-color: white;');
var fb_Db; 
/**************************************************************/
// Import all external constants & functions required
/**************************************************************/
// Import all the methods you want to call from the firebase modules
import { initializeApp }
    from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";

import { getDatabase }
    from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";
    
import { getAuth, GoogleAuthProvider, signInWithPopup,onAuthStateChanged,signOut }
    from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js"; 
    import { ref, set,get }
    from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";
/**************************************************************/
// EXPORT FUNCTIONS
// List all the functions called by code or html outside of this module
/**************************************************************/
export { 
    fb_initialise, fb_authenticate, fb_detectLoginChange,fb_logOut,fb_writeRecord,fb_readRecord
};

/***************************************************************
// function fb_intitialise()
// called by html button "fb_initialise()"
// intatilises connecting to firebase
 ****************************************************************/
function fb_initialise() {
    
    console.log('%c fb_initialise(): ', 
                'color: ' + COL_C + 
                '; background-color: ' + COL_B +';' );
    console.log("%c galvinise:",
                'color:'+ COL_B + 
                '; background-color:' + COL_C + ';');
    const FB_GAMECONFIG = {
        apiKey: "AIzaSyCCqhJW7S5L9nSkhlB_8Nvg3zzD4w65hjU",
        authDomain: "comp-conor-church.firebaseapp.com",
        databaseURL: "https://comp-conor-church-default-rtdb.asia-southeast1.firebasedatabase.app",
        projectId: "comp-conor-church",
        storageBucket: "comp-conor-church.firebasestorage.app",
        messagingSenderId: "807950196532",
        appId: "1:807950196532:web:44538dd1b8184ee5760f61",
        measurementId: "G-G7Z4YR3HX7"
    };
    const FB_GAMEAPP = initializeApp(FB_GAMECONFIG)
    fb_Db = getDatabase(FB_GAMEAPP)
    console.info(fb_Db);
}

/***************************************************************
// function fb_authenticate()
// called by html button "authenticate"
// call functions from import to login the user
 ****************************************************************/
function fb_authenticate(){
console.log('%c authenticate():',
    'color:' + COL_C +
    'background-color:' + COL_B + ';');
    const AUTH =  getAuth(); //something is wrong here
    const PROVIDER = new GoogleAuthProvider();
    PROVIDER.setCustomParameters({
        prompt: 'select_account'
    });

    signInWithPopup(AUTH, PROVIDER).then((result) => {
        alert("thank you for signing correctly")
        console.log(result)
    })
    .catch((error) => {
        alert("Uh Oh, Something went wrong!")
        console.log(error)
    });
   
}
/***************************************************************
// function fb_detectLoginChange()
// called by html button "detect login change"
// 
 ****************************************************************/
function fb_detectLoginChange(){
    const AUTH = getAuth();
    onAuthStateChanged(AUTH, (user) => {
        if (user) {
            console.log("users is currently logged in")
            alert("you are currently logged into "+user.email)
        } else {
            console.log("users is currently not logged in")
            alert("you are currently not logged in")
        }

    });
};
/***************************************************************
// function fb_logOut()
// called by html button "logout "
// Log's you out of your account 
 ****************************************************************/
function fb_logOut(){
    console.log('%c fb_LogOut ', 
                'color: ' + COL_C + 
                '; background-color: ' + COL_B +';' );
    const AUTH = getAuth();

    signOut(AUTH).then(() => {
        alert("you have successfully been logged out")
        console.log('%c successful logout ', 
                'color: ' + COL_C + 
                '; background-color: ' + COL_G +';' );
    })

    .catch((error) => {
        alert("you have NOT been successfuly logged out. Please try again")
        console.log('%c unsuccesful logout ', 
                'color: ' + COL_C + 
                '; background-color: ' + COL_R +';' );
    });
}

/*****************************************************************
// function fb_writeRecord()
// called by html button "write record"
// 
 ****************************************************************/
function fb_writeRecord(){
        console.log('%c fb_writeRecord ', 
                'color: ' + COL_C + 
                '; background-color: ' + COL_B +';' );
    const REF = ref(fb_Db,"Stolen_Data");
    set(REF, {Price:Math.floor(Math.random()*100)}).then(() => { 
        console.log('%c data has been stolen ', 
                'color: ' + COL_C + 
                '; background-color: ' + COL_G +';' );
    })
    .catch((error) => {
        console.log(error);
        console.log('%c data has been stolen ', 
                'color: ' + COL_C + 
                '; background-color: ' + COL_R +';' );
    });
}
/***************************************************************
// function fb_readRecord()
// called by html button "read record "
// 
 ****************************************************************/
function fb_readRecord(){
    console.log('%c fb_readRecord ', 
                'color: ' + COL_C + 
                '; background-color: ' + COL_B +';' );
}
/***************************************************************
// function fb_readAll()
// called by html button "readAll "
// 
 ****************************************************************/
function fb_readAll(){

}
/***************************************************************
// function fb_updateRecord()
// called by html button "update record "
// 
 ****************************************************************/
function fb_updateRecord(){

}

/**************************************************************/
// END OF CODE
/**************************************************************/