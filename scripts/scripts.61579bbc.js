"use strict";angular.module("roommatesApp",["ngAnimate","ngCookies","ngResource","ngRoute","ngSanitize","ngTouch","google-maps","firebase","geocoder","ngStorage"]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl"}).when("/about",{templateUrl:"views/about.html",controller:"AboutCtrl"}).when("/chooselocation",{templateUrl:"views/chooselocation.html",controller:"ChooselocationCtrl"}).when("/question/:id",{templateUrl:"views/question.html",controller:"QuestionCtrl"}).when("/login",{templateUrl:"views/login.html",controller:"LoginCtrl"}).when("/register",{templateUrl:"views/register.html",controller:"MainCtrl"}).when("/matches",{templateUrl:"views/matches.html",controller:"MainCtrl"}).otherwise({redirectTo:"/"})}]),angular.module("roommatesApp").controller("MainCtrl",["$scope","$location","$anchorScroll",function(a,b,c){a.scrollTo=function(a){b.hash(a),c()}}]),angular.module("roommatesApp").controller("AboutCtrl",["$scope",function(a){a.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}]),angular.module("roommatesApp").service("getStuff",function(){}),angular.module("roommatesApp").controller("ChooselocationCtrl",["$scope","Geocoder",function(a,b){a.findLocation=function(){b.geocodeAddress(a.location).then(function(b){console.log(b),a.coords={lat:b.lat,lng:b.lng},a.map={center:{latitude:b.lat,longitude:b.lng},zoom:12},a.circle={id:1,center:{latitude:b.lat,longitude:b.lng},radius:500,stroke:{color:"#000",weight:2,opacity:1},fill:{color:"#000",opacity:.5},draggable:!0,editable:!0}},function(a){console.log(a)})},a.resetSearch=function(){a.coords=null,a.location=""}}]),angular.module("roommatesApp").controller("QuestionCtrl",["$scope","$routeParams","$firebase",function(a,b,c){a.qId=parseInt(b.id,10);var d=new Firebase("https://housemates.firebaseio.com/questions/"),e=c(d),f=e.$asObject();f.$loaded().then(function(){a.questionText=f.saturdayNight.questionText}),a.nextQuestion=function(){a.qId++,a.choice=null,a.choices=null,a.questionText="What is your ideal Saturday night?",a.questionType="choice"},a.questionText="What is your ideal Saturday night?",a.questionType="choice",a.choices=[{id:1,imagePath:""},{id:2,imagePath:""},{id:3,imagePath:""},{id:4,imagePath:""}],a.select=function(b,c){a.choice=c;for(var d=0;d<a.choices.length;d++)a.choices[d].selected=!1;a.choices[b].selected=!0}}]),angular.module("roommatesApp").controller("LoginCtrl",["$scope","$firebase","$firebaseSimpleLogin",function(a,b,c){var d=new Firebase("https://housemates.firebaseio.com");console.log(d);var e=c(d);a.facebookLogin=function(){e.$login("facebook").then(function(a){console.log("username is "+a.uid)},function(){})}}]),angular.module("roommatesApp").factory("simpleLogin",["$firebaseSimpleLogin",function(a){var b=new Firebase("https://housemates.firebaseio.com");return a(b)}]),angular.module("geocoder",["ngStorage"]).factory("Geocoder",["$localStorage","$q","$timeout","$rootScope",function(a,b,c,d){var e=a.locations?JSON.parse(a.locations):{},f=[],g=250,h=function(){var b=f[0],i=new google.maps.Geocoder;i.geocode({address:b.address},function(i,j){if(j===google.maps.GeocoderStatus.OK){var k={lat:i[0].geometry.location.lat(),lng:i[0].geometry.location.lng(),formattedAddress:i[0].formatted_address};e[b.address]=k,a.locations=JSON.stringify(e),f.shift(),b.d.resolve(k)}else j===google.maps.GeocoderStatus.ZERO_RESULTS?(f.shift(),b.d.reject({type:"zero",message:"Zero results for geocoding address "+b.address})):j===google.maps.GeocoderStatus.OVER_QUERY_LIMIT?b.executedAfterPause&&(f.shift(),b.d.reject({type:"busy",message:"Geocoding server is busy can not process address "+b.address})):j===google.maps.GeocoderStatus.REQUEST_DENIED?(f.shift(),b.d.reject({type:"denied",message:"Request denied for geocoding address "+b.address})):(f.shift(),b.d.reject({type:"invalid",message:"Invalid request for geocoding: status="+j+", address="+b.address}));if(f.length)if(j===google.maps.GeocoderStatus.OVER_QUERY_LIMIT){var l=f[0];l.executedAfterPause=!0,c(h,g)}else c(h,0);d.$$phase||d.$apply()})};return{geocodeAddress:function(a){var c=b.defer();return _.has(e,a)?c.resolve(e[a]):(f.push({address:a,d:c}),1===f.length&&h()),c.promise}}}]);