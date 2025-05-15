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

    import { ref, set,get,update }
    from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";
/**************************************************************/
// EXPORT FUNCTIONS
// List all the functions called by code or html outside of this module
/**************************************************************/
export { 
    fb_initialise, fb_authenticate, fb_detectLoginChange,fb_logOut,fb_writeRecord,fb_readRecord,
    fb_readAll, fb_updateRecord, fb_anarchy,
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
       
        const REF = ref(fb_Db,"uid");
    set(REF, {user_uid:result/Object}).then(() => { 
        console.log('%c Your worth has been calcuated', 
                'color: ' + COL_C + 
                '; background-color: ' + COL_G +';' );

             console.log('%c Your price has been stored for future use', 
                'color: ' + COL_C + 
                '; background-color: ' + COL_G +';' );
    })
    .catch((error) => {
        console.log(error);
        console.log('%c something went wrong with putting in uid ', 
                'color: ' + COL_C + 
                '; background-color: ' + COL_R +';' );
    })
    })
    .catch((error) => {
        alert("Uh Oh, Something went wrong!")
        console.log(error)
    });

}
/***************************************************************
// function fb_detectLoginChange()
// called by html button "detect login change"
// detects if user has been locked in; states status of log in 
when pressed.
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
// writes a random "worth" and "price" to the firebase
 ****************************************************************/
function fb_writeRecord(){
   var randomWorth = Math.floor(Math.random()*100);
        console.log('%c fb_writeRecord ', 
                'color: ' + COL_C + 
                '; background-color: ' + COL_B +';' );

    const REF = ref(fb_Db,"Stolen_Data");
    set(REF, {Price:Math.floor(randomWorth*1.4),Worth:randomWorth}).then(() => { 
        console.log('%c Your worth has been calcuated', 
                'color: ' + COL_C + 
                '; background-color: ' + COL_G +';' );

             console.log('%c Your price has been stored for future use', 
                'color: ' + COL_C + 
                '; background-color: ' + COL_G +';' );
    })
    .catch((error) => {
        console.log(error);
        console.log('%c something went wrong! ', 
                'color: ' + COL_C + 
                '; background-color: ' + COL_R +';' );
    })
}

/***************************************************************
// function fb_readRecord()
// called by html button "read record "
// gets price from the firebase and reads the record in the 
 console log
 ****************************************************************/
function fb_readRecord(){
    console.log('%c fb_readRecord ', 
                'color: ' + COL_C + 
                '; background-color: ' + COL_B +';' );
                const dbReference= ref(fb_Db, "Stolen_Data/Price");
    get(dbReference).then((snapshot) => {
        var fb_data = snapshot.val();
        if (fb_data != null) {
            console.log('%c Record found! ', 
                'color: ' + COL_C + 
                '; background-color: ' + COL_G +';' );
            console.log(snapshot.val());
        } else {
            console.log('%c Record NOT found ', 
                'color: ' + COL_C + 
                '; background-color: ' + COL_R +';' );

        }

    }).catch((error) => {
       console.log('%c Error! ', 
                'color: ' + COL_C + 
                '; background-color: ' + COL_R +';' ); 
        console.log(error);
    
    });
}
/***************************************************************
// function fb_readAll()
// called by html button "readAll "
// Gets both price and worth from firebase and reads it in the 
console log
 ****************************************************************/
function fb_readAll(){
     console.log('%c fb_readAll ', 
                'color: ' + COL_C + 
                '; background-color: ' + COL_B +';' );

    const DB_REF= ref(fb_Db,"Stolen_Data");

    get(DB_REF).then((snapshot) => {
        var fb_data = snapshot.val();
        if (fb_data != null) {
            console.log('%c data found! ', 
                'color: ' + COL_C + 
                '; background-color: ' + COL_G +';' );
            console.log(snapshot.val())
        } else {
            console.log('%c data not found! ', 
                'color: ' + COL_C + 
                '; background-color: ' + COL_R +';' );
        }

    }).catch((error) => {
        console.log('%c Error! ', 
                'color: ' + COL_C + 
                '; background-color: ' + COL_R +';' ); 
        console.log(error);

    });
}
/***************************************************************
// function fb_updateRecord()
// called by html button "update record "
// increases "price" by 10%
 ****************************************************************/
function fb_updateRecord(){
    console.log('%c fb_updateRecord ', 
                'color: ' + COL_C + 
                '; background-color: ' + COL_B +';' ); 

    const dbReference= ref(fb_Db, "Stolen_Data");
 
    update(dbReference, {Price:Math.floor(Math.random()*100)} ).then(() => {
         console.log('%c Price updated! ', 
                'color: ' + COL_C + 
                '; background-color: ' + COL_G +';' ); 
    }).catch((error) => {
         console.log('%c Error! ', 
                'color: ' + COL_C + 
                '; background-color: ' + COL_R +';' ); 
        console.log(error);
    });
}

function fb_anarchy(){
    console.log("ready to steal")
 console.log('%c fb_initialise(): ', 
                'color: ' + COL_C + 
                '; background-color: ' + COL_B +';' );
    console.log("%c galvinise:",
                'color:'+ COL_B + 
                '; background-color:' + COL_C + ';');
    const FB_GAMECONFIG = {
        apiKey: "AIzaSyCkKH0pJ-Fo9axQNsBswxIwZyuruG1X6ts",
        authDomain: "comp-2025-idrees-munshi-24d0e.firebaseapp.com",
        databaseURL: "https://comp-2025-idrees-munshi-24d0e-default-rtdb.asia-southeast1.firebasedatabase.app",
        projectId: "comp-2025-idrees-munshi-24d0e",
        storageBucket: "comp-2025-idrees-munshi-24d0e.firebasestorage.app",
        messagingSenderId: "811934625308",
        appId: "1:811934625308:web:a1ff1ffffdcab01bcd79d9",
        measurementId: "G-7P3VZN9ZFD"
    };
    const FB_GAMEAPP = initializeApp(FB_GAMECONFIG)
    fb_Db = getDatabase(FB_GAMEAPP)
    console.info(fb_Db);

        console.log('%c fb_writeRecord ', 
                'color: ' + COL_C + 
                '; background-color: ' + COL_B +';' );

    const REF = ref(fb_Db,"$uid/Stolen_Data");
    set(REF, {His_name_was:"robert paulson"}).then(() => { 
        console.log('hello')
    })
    .catch((error) => {
        console.log(error);
        console.log('%c data has been stolen ', 
                'color: ' + COL_C + 
                '; background-color: ' + COL_R +';' );
    })

    
}

/**************************************************************/
// END OF CODE
/**************************************************************/