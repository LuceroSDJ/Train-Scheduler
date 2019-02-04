$(document).ready(function() {

//initialize Firebase
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

//select submit button and initiate an on 'click' event function
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

        //"We need to create a database reference in order to synchronize date from the realtime database to our web app" &
        //upload train data to the database
        database.ref().push(newTrain);       //here I am using the variable created in line 15
        
        //console.log local temporary object
        console.log(newTrain.name);
        console.log(newTrain.station);
        console.log(newTrain.time);
        console.log(newTrain.frequency);

        //clear input text boxes
        $('#trainName').val(' ');
        $('#destination').val(' ');
        $('#firstTrainTime').val(' ');
        $('#frequency').val(' ');
});




}); //closes $(document).ready(function())