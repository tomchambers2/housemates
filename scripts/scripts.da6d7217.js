"use strict";angular.module("roommatesApp",["ngAnimate","ngCookies","ngResource","ngRoute","ngSanitize","ngTouch","google-maps","firebase","geocoder","ngStorage"]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl"}).when("/about",{templateUrl:"views/about.html",controller:"AboutCtrl"}).when("/choosetype",{templateUrl:"views/choosetype.html",controller:"ChoosetypeCtrl"}).when("/chooselocation",{templateUrl:"views/chooselocation.html",controller:"ChooselocationCtrl"}).when("/questions/",{templateUrl:"views/question.html",controller:"QuestionCtrl"}).when("/login",{templateUrl:"views/login.html",controller:"LoginCtrl"}).when("/register",{templateUrl:"views/register.html",controller:"RegisterCtrl",resolve:{currentUser:["login",function(a){return a.$getCurrentUser()}]}}).when("/matches",{templateUrl:"views/matches.html",controller:"MatchesCtrl"}).when("/admin",{templateUrl:"views/admin.html",controller:"AdminCtrl"}).otherwise({redirectTo:"/"})}]),angular.module("roommatesApp").controller("MainCtrl",["$scope","$location","$anchorScroll",function(a,b,c){a.scrollTo=function(a){b.hash(a),c()}}]),angular.module("roommatesApp").controller("AboutCtrl",["$scope",function(a){a.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}]),angular.module("roommatesApp").service("getStuff",function(){}),angular.module("roommatesApp").controller("ChooselocationCtrl",["$scope","$localStorage","$timeout","$location","Geocoder",function(a,b,c,d,e){var f=function(b){a.message=b,c(function(){a.message=null},3e3)};b.type="househunter",a.findLocation=function(){e.geocodeAddress(a.location).then(function(b){a.coords={lat:b.lat,lng:b.lng},a.map={center:{latitude:b.lat,longitude:b.lng},zoom:12},a.circle={id:1,center:{latitude:b.lat,longitude:b.lng},radius:500,stroke:{color:"#000",weight:2,opacity:1},fill:{color:"#000",opacity:.5},draggable:!0,editable:!0}},function(){f("Sorry we couldn't find that address")})},a.submitLocation=function(){b.location={lat:a.circle.center.latitude,lng:a.circle.center.longitude,radius:a.circle.radius},d.path("/questions/")},a.resetSearch=function(){a.coords=null,a.location=""}}]),angular.module("roommatesApp").controller("QuestionCtrl",["$scope","$location","$routeParams","$firebase","$localStorage",function(a,b,c,d,e){a.selected={},e.currentQuestion||(e.currentQuestion=0),e.answers||(e.answers={});var f=new Firebase("https://housemates.firebaseio.com/questions/"),g=d(f),h=g.$asArray();h.$loaded().then(function(){a.proceed(!1)});var i=function(b){a.questionText=h[b].questionText,a.answers=h[b].answers};a.proceed=function(c){c&&e.currentQuestion++,e.currentQuestion<h.length?(a.selected={},i(e.currentQuestion)):b.path("/login")},a.select=function(b){a.selected.any=!0;for(var c=0;c<a.answers.length;c++)a.selected[c]=!1;a.selected[b]=!0,e.answers[h[e.currentQuestion].$id]=b}}]),angular.module("roommatesApp").controller("LoginCtrl",["$scope","$localStorage","$firebase","$firebaseSimpleLogin","$location","createMatches",function(a,b,c,d,e,f){var g=new Firebase("https://housemates.firebaseio.com/users"),h=c(g),i=d(g);a.facebookLogin=function(){i.$login("facebook",{rememberMe:!0,scope:"email"}).then(function(a){console.log(a),h.$set(a.uid,{gender:a.thirdPartyUserData.gender,name:a.thirdPartyUserData.name,picture:a.thirdPartyUserData.picture.data.url,age_range:a.thirdPartyUserData.age_range,location:b.location,answers:b.answers,mainType:b.mainType,subType:b.subType,lastLooking:Date.now()}),f.forUser(a.uid),e.path("/register")})}}]),angular.module("roommatesApp").factory("simpleLogin",["$firebaseSimpleLogin",function(a){var b=new Firebase("https://housemates.firebaseio.com");return a(b)}]),angular.module("geocoder",["ngStorage"]).factory("Geocoder",["$localStorage","$q","$timeout","$rootScope",function(a,b,c,d){var e=a.locations?JSON.parse(a.locations):{},f=[],g=250,h=function(){var b=f[0],i=new google.maps.Geocoder;i.geocode({address:b.address},function(i,j){if(j===google.maps.GeocoderStatus.OK){var k={lat:i[0].geometry.location.lat(),lng:i[0].geometry.location.lng(),formattedAddress:i[0].formatted_address};e[b.address]=k,a.locations=JSON.stringify(e),f.shift(),b.d.resolve(k)}else j===google.maps.GeocoderStatus.ZERO_RESULTS?(f.shift(),b.d.reject({type:"zero",message:"Zero results for geocoding address "+b.address})):j===google.maps.GeocoderStatus.OVER_QUERY_LIMIT?b.executedAfterPause&&(f.shift(),b.d.reject({type:"busy",message:"Geocoding server is busy can not process address "+b.address})):j===google.maps.GeocoderStatus.REQUEST_DENIED?(f.shift(),b.d.reject({type:"denied",message:"Request denied for geocoding address "+b.address})):(f.shift(),b.d.reject({type:"invalid",message:"Invalid request for geocoding: status="+j+", address="+b.address}));if(f.length)if(j===google.maps.GeocoderStatus.OVER_QUERY_LIMIT){var l=f[0];l.executedAfterPause=!0,c(h,g)}else c(h,0);d.$$phase||d.$apply()})};return{geocodeAddress:function(a){var c=b.defer();return _.has(e,a)?c.resolve(e[a]):(f.push({address:a,d:c}),1===f.length&&h()),c.promise}}}]),angular.module("roommatesApp").controller("RegisterCtrl",["$scope","login","$firebase",function(a,b,c){a.user=b.user,a.picture=b.user.thirdPartyUserData.picture.data.url;var d=new Firebase("https://housemates.firebaseio.com/users/"),e=c(d);a.saveBio=function(){a.bio&&e.$update(b.user.uid,{bio:a.bio}).then(function(){a.saved=!0})}}]),angular.module("roommatesApp").factory("login",["$firebaseSimpleLogin",function(a){var b=new Firebase("https://housemates.firebaseio.com/");return a(b)}]),angular.module("roommatesApp").filter("range",function(){return function(a,b){b=parseInt(b);for(var c=0;b>c;c++)a.push(c);return a}}),angular.module("roommatesApp").controller("AdminCtrl",["$scope","$firebase",function(a,b){var c=new Firebase("https://housemates.firebaseio.com/questions/"),d=b(c),e=function(){a.questions=d.$asObject()};a.removeQuestion=function(a){console.log(a),d.$remove(a)},a.addQuestion=function(){var c=new Firebase("https://housemates.firebaseio.com/questions/"),d=b(c),e={questionText:a.question.questionText,questionType:a.question.questionType,answers:a.question.answers};d.$push(e),a.message="Saved new question",a.question={}},e()}]),angular.module("roommatesApp").controller("MatchesCtrl",["$scope","$firebase",function(a,b){var c=new Firebase("https://housemates.firebaseio.com/"),d=b(c.child("matches")),e=b(c.child("users"));a.user={uid:"facebook:1547041612178501"},a.matches=d.$asArray(),a.users=e.$asObject(),a.emailMatch=function(){},a.rejectMatch=function(){}}]),angular.module("roommatesApp").controller("ChoosetypeCtrl",["$scope","$location","$localStorage",function(a,b,c){a.type="",a.form={wantroom:!1,wantbuddy:!1},a.proceed=!1,a.nextStep=function(){b.path("/chooselocation")},a.setType=function(b){a.mainType=b,c.mainType=b,"hasroom"===b?a.proceed=!0:"househunter"===b&&a.proceed===!1},a.$watch("form",function(b){console.log(b),a.proceed=a.form.wantbuddy===!0||a.form.wantroom===!0?!0:!1,c.subType=[{wantbuddy:a.form.wantbuddy},{wantroom:a.form.wantroom}]},!0)}]),angular.module("roommatesApp").filter("objectByKeyValFilter",function(){return function(a,b,c){var d={};return angular.forEach(a,function(a,e){a[b]&&a[b]==c&&(d[e]=a)}),d}}),angular.module("roommatesApp").factory("createMatches",["$http",function(a){var b=function(b){a.get("http://housemates-server.herokuapp.com/?uid="+b)};return{forUser:b}}]);