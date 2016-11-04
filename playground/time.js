var moment = require('moment');

//var date = new Date();

// var date = moment();
// date.add(1,'years').subtract(9,'months');
// console.log(date.format('MMM Do, YYYY'));

var someTimestam = moment().valueOf();
console.log(someTimestam);

var createdAt =1234;
var date = moment(createdAt);
console.log(date.format('hh:mm a'));
