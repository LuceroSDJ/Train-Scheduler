$(document).ready(function() {

//"All Firebase Realtime Database data is stored as JSON objects." (firebase)
///////initialize Firebase
var config = {
    apiKey: "AIzaSyBbUMfjZ9PV9Tz51R17yeP5jhko_XcuWBo",
    authDomain: "scheduler-practice.firebaseapp.com",
    databaseURL: "https://scheduler-practice.firebaseio.com",
    projectId: "scheduler-practice",
    storageBucket: "scheduler-practice.appspot.com",
    messagingSenderId: "258658963966"
};
firebase.initializeApp(config);

//Get reference to the database service & assign a database object to a variable 
var database = firebase.database();

//////select submit button and initiate an on 'click' event function
$('button').on('click', function(event) {
    event.preventDefault();
    //select user's input and store them in variables
    var trainName = $('#trainName').val().trim();
    var destination = $('#destination').val().trim();
    var fstTrainTime = $('#firstTrainTime').val().trim();
    var frequency = $('#frequency').val().trim();

   

    //create local TEMPORARY object for holding train data
    var newTrain = {
        name: trainName,
        station: destination,
        time: fstTrainTime,
        frequency: frequency,
    };

        /* "We need to create a database reference in order to synchronize data from the realtime database to our web app" &
        upload train data to the database using our local temporary object*/
        /* "When you add data to the JSON tree, it becomes a node in the existing JSON structure with an associated key.
        You can provide your own keys, such as user IDs or semantic names, or they can be provided for you using push()." (firebase)*/
        database.ref().push(newTrain);       //here I am using the variable created in line 15 to SET VALUES IN THE DATABASE
        
        //console.log local temporary object
        console.log(newTrain.name);
        console.log(newTrain.station);
        console.log(newTrain.time);
        console.log(newTrain.frequency);

        //clear input text boxes for next train to be added
        $('#trainName').val(' ');
        $('#destination').val(' ');
        $('#firstTrainTime').val(' ');
        $('#frequency').val(' ');
});

////firebase function event for adding a new train to the database 
database.ref().on('child_added', function (childSnapshot) {
    console.log(childSnapshot.val());
    //store childSnapshot into a variable
    var trainName = childSnapshot.val().name;
    var destination = childSnapshot.val().station;
    var firstTrainTime = childSnapshot.val().time;
    var frequency = childSnapshot.val().frequency; 

    //console log the data that is coming out of snapshot
    console.log(trainName);
    console.log(destination);
    console.log(firstTrainTime);
    console.log(frequency);

    //time calculations
    //first train time input is in military time
    var timeConversion = moment(firstTrainTime, 'HH:mm').subtract(1, 'years');
    console.log('time converted: ' + timeConversion);

    //"To get the current date and time, just call moment() with no parameters." (FIREBASE)
    var currentTime = moment(); 
    //format() converts current date and time to the specified format based on moment.js documentation
    console.log('current time: ' + moment(currentTime).format('hh:mm'));  

    //difference between the current time and the time converted in minutes
    var differenceInTime = moment().diff(moment(timeConversion), 'minutes');
    console.log('difference in minutes: ' + differenceInTime + ' minutes');

    //calculate remainder
    //we must find the remainder after we divide the difference in minutes by the frequency (aka modulus)
    var remainder = differenceInTime % frequency;
    console.log('remainder in minutes: ' + remainder);

    //calcualte minutes away by subtracting our remainder(obtained in line 87) from frequency.
    var minutesAway = frequency - remainder;
    console.log('minutes away: ' + minutesAway + 'minutes');

    //calculate when the next train will be coming
    var nextTrain = moment().add(minutesAway, 'minutes');
    console.log('arrival time' + moment(nextTrain).format('hh:mm'));


    //create new row
    var newRow = $('<tr>').append(
        $('<td>').text(trainName),
        $('<td>').text(destination),
        $('<td>').text(firstTrainTime),
        $('<td>').text(frequency),
        $('<td>').text(moment(nextTrain).format('hh:mm')),
        $('<td>').text(minutesAway),
    );
 
    //append new row to table
    $('tbody').append(newRow);


}); //closes funciton event for adding a train

//calculate 'next arrival' & 'minutes away'
//use moment.js (add link)


}); //closes $(document).ready(function())


//notes: FIREBASE DOCUMENTATION
//"PUT is equivalent to set() in our JavaScript SDK."
//Using PUT will overwrite the data at the specified location, including any child nodes.