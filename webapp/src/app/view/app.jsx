var $ = require('jquery');
var Backbone = require('backbone');
var _ = require('lodash');
Backbone.$ = $;

var React = require('react');
var HomeView = require('./HomeView');

window.activeSession = { id: null };

var UserModel = Backbone.Model.extend({
       defaults : {
               loggedIn: true,
               name: 'Cactus'
       }
});


var HomeController = Backbone.Model.extend({
});

var AppRouter = Backbone.Router.extend({
	routes: {
		'' : 'home',
		'home' : 'home'
	},
	home: function () {
		console.log("home called");

		React.render(
			  <HomeView controller={new HomeController()} userModel={new UserModel()}/>,
			  document.getElementById('holder')
		);
	}
});

GLOBAL_ROUTER = new AppRouter();
Backbone.history.start();

// var testTimer = setInterval(function () 
// { 
// 	console.log("Timer ran");
// 	testmod.set("loggedIn", true);
// 	console.log(testmod);

// 	testmod.onUserChange();

// 	window.clearInterval(testTimer);
// }, 3000);