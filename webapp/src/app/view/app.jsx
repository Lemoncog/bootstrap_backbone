var $ = require('jquery');
var Backbone = require('backbone');
var _ = require('lodash');
Backbone.$ = $;

var React = require('react');
var HomeView = require('./HomeView');
var LoginView = require('./LoginForm');

window.activeSession = { id: null };

var UserModel = Backbone.Model.extend({
	defaults : {
		loggedIn: true,
		name: 'Cactus'
	}
});

var ClientModel = Backbone.Model.extend({
	defaults: {
		clientName : 'Ellie Gibson',
		carerName: 'Water'
	}
})

GLOBAL_USER = new UserModel();

var LoginController = Backbone.Model.extend({
  onSubmit: function() {
  	//Pretend it al went well.
  	GLOBAL_USER.set('loggedIn', true);
  	GLOBAL_ROUTER.navigate("home", {trigger: true});
  }
}) 

var HomeController = Backbone.Model.extend({
	clientSelected: function(client) {
		console.log('clientSelected = ' + client);

		//Query our model, find who is carer, update.
		//TODO - Use a real model, query on unique ID.
		GLOBAL_ROUTER.navigate("track/client/" + client, {trigger: true});
	}
});

var AppRouter = Backbone.Router.extend({
	routes: {
		'' : 'track',
		'home' : 'track',
		'track/client/:id' : 'track',
		'login' : 'login'
	},
	loginCheck: function() {
		if(!GLOBAL_USER.get('loggedIn')) {
			this.navigate('login', {trigger: true, replace: true});
			return false;
		}
		return true;
	},
	track: function (id) {
		console.log("home called id=" + id);

		//No id, use defaults
		if(!id) {
			id = 'Gandalf';
		}

		var dummyData = [];
		dummyData['Sam Wise'] = "Kitness";
		dummyData['Frodo'] = "Ellie";
		dummyData['Gandalf'] = "Molly";

		var clientModel = new ClientModel({ clientName : id, carerName : dummyData[id]});

		//Always do a login check
		if(this.loginCheck()) {
			React.render(
				  <HomeView clientModel={clientModel} controller={new HomeController()} userModel={new UserModel()}/>,
				  document.getElementById('holder')
			);
		}
			
	},
	login: function() {
		console.log("login called");
		React.render(
			  <LoginView submissionHandler={new LoginController()}/>,
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