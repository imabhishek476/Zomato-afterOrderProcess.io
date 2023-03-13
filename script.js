let isOrderAccepted=false;
let isValetFound=false;
let hasRestaurantSeenYourOrder=false;
let RestaurantTimer=null;
let valetTimer = null;
let valetDeliveryTimer = null;
let isOrderDelivered = false;

// Zomato App- Boot Up/ Power Up / start
window.addEventListener('load',function(){
    document.getElementById('acceptOrder').addEventListener('click',function(){
        askRestaurantToAcceptOrReject();
    });
    document.getElementById('findValet').addEventListener('click',function(){
        startSearchingForValets();
    })

    this.document.getElementById('deliverOrder').addEventListener('click',function(){
        setTimeout(()=>{
            isOrderDelivered=true;
        },2000)
    })

    checkIfOrderAcceptedFromRestaurant()
    .then(isOrderAccepted=>{
        console.log('update from restaurant- ',isOrderAccepted);
        //Step 4 -Start Preparing
        if(isOrderAccepted)  StartPreparingOrder();                             //alert('Your Order Has Been Accepted')
        //Step 3- Order Rejected
        else alert('Sorry Your Order Cancelled! Returning Your Payment')

    })
    .catch(err=>{
        console.log(err);
        alert('Something went wrong ! Please try again later')
    })
})


//Step 1 - Check Whether restaurant accepted order or not
function askRestaurantToAcceptOrReject(){
    //callback
    setTimeout(()=>{
        isOrderAccepted=confirm('Should restaurant order accept?');
        if(isOrderAccepted){
            document.getElementById('status-time').classList.remove('none');     //--changes by own
        }
        hasRestaurantSeenYourOrder=true;
        // console.log(isOrderAccepted);
    },1000)

}

//Step 2 - Check if Restaurant Order Accepted
function checkIfOrderAcceptedFromRestaurant(){
    //Promise - resolve , reject
    return new Promise((resolve,reject)=>{
        RestaurantTimer =setInterval(()=>{
            console.log('checking if Order Accepted or not')
            if(!hasRestaurantSeenYourOrder) return;

            if(isOrderAccepted) resolve(true);
            else resolve(false);

            clearInterval(RestaurantTimer);
        },2000)
    })
    // return promise;
}


//Step 4 - Start Preparing
function StartPreparingOrder(){
    Promise.allSettled([
        updateOrderStatus(),
        updateMapView(),
        checkIfValetAssigned(),
        // startSearchingForValets(),
        checkIfOrderDelivery()
    ])
    .then(res=>{
        console.log(res);
        setTimeout(()=>{
            alert('How was your food ? Rate your food and Delivery Partner?')
        },5000)
    })
    .catch(err=>{
        console.log(err);
    })
}

//Helper Function -> Pure functions
function updateOrderStatus(){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            document.getElementById('currentStatus').innerText= isOrderDelivered ? 'Order Delivered Successfully' : 'Preparing Your Order';
            resolve('Status Updated')
        },1500)
    })
}

function updateMapView(){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            document.getElementById('mapview').style.opacity='1';
            resolve('Map initialized')
        },1000)
    })
}

function startSearchingForValets(){
    //BED
    //Bht Complex Operations:-
    /*
    1. Get all locations of nearBy valets
    2. Sort the Valets based on shortest path of restaurant + Customer Home
    3. Select the valet with minimum orders
     */

    //Step 1- Get valets nearBy   -- total 5 valets taken
    const valetPromises= [];
    for(let i=0;i<5;i++){
        valetPromises.push(getRandomDriver());
    }
    console.log(valetPromises);
    Promise.any(valetPromises)
    .then(selectedValet=>{
        console.log('Selected a valet => ' ,selectedValet )
        isValetFound=true;                  //-- changes by own
    })
    .catch(err=>{
        console.error(err);
    })
}

function getRandomDriver(){
    //Fake delay to get location data from riders
    return new Promise((resolve,reject)=>{
        const timeout = Math.random()*1000;
        setTimeout(()=>{
            resolve('Valet - '+ timeout);
        },timeout)
    });
}

function checkIfValetAssigned(){
    return new Promise((resolve,reject)=>{
        valetTimer = setInterval(()=>{
            console.log('Searching for Valet');
            if(isValetFound){
                updateValetDetails();
                document.getElementById('currentStatus').innerText='Order Delivered From Restaurant';
                resolve('Updated Valet details');
                clearTimeout(valetTimer);
            }
        },2000);
    })
}

function checkIfOrderDelivery(){
    return new Promise((resolve,reject)=>{
        valetDeliveryTimer = setInterval(()=>{
            console.log('Is order delivered by Valet');
            if(isOrderDelivered){
                resolve('order delivered Valet details');
                updateOrderStatus();
                clearTimeout(valetDeliveryTimer);
            }
        },1000);
    })
}

function updateValetDetails(){
    if(isValetFound){
        document.getElementById('finding-driver').classList.add('none');
        document.getElementById('found-driver').classList.remove('none');
        document.getElementById('call').classList.remove('none');
    }
}

///Promise - .then,.catch       Callbacks - resolve,reject
//Types Of Promise
//1. Promise.all
//2. Promise.allsettled
//3. Promise.race
//4. Promise.any
