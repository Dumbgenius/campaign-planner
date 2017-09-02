Router.configure({
	loadingTemplate: "loading",
	layoutTemplate: "layout",
	trackPageView: true,
});

// Router.plugin("ensureSignedIn", {
// 	only: [
// 		"profile",
// 		"campaignList",
// 	]
// });

Router.plugin("dataNotFound", {notFoundTemplate: "notFound"});


//  ROUTES
Router.route("/", {
	name: "home",
	template: "home",
	onAfterAction: function() {
		document.title = APP_NAME;
	},
});

Router.route("/campaignList", {
	name: "campaignList",
	template: "campaignList",
	waitOn: function(){
		return subsManager.subscribe("campaignList");
	},
	onAfterAction: function() {
		document.title = APP_NAME + " - Campaigns";
	},
	fastRender: true,
});

Router.route("/campaign/:_id", {
	name: "campaign",
	template: "campaignLayout",
	waitOn: function() {
		return [
			subsManager.subscribe("campaign", this.params._id),
		];
	},
	data: function() {
		var data = Campaigns.findOne(
			{_id: this.params._id},
			{fields: {_id: 1, name: 1}}
		);
		return data;
	},
	onAfterAction: function() {
		var campaign = Campaigns.findOne({_id: this.params._id}, {fields: {name: 1}});
		var name = campaign && campaign.name;
		if (name){
			document.title = name;
		}
	},
	fastRender: true,
});

Router.route("/loading", {
	name: "loading",
	template: "loading",
});

Router.route("/account", {
	name: "profile",
	template: "profile",
	onAfterAction: function() {
		document.title = APP_NAME + " Account";
	},
});


// TODO

// Router.route("/guide", {
// 	name: "guide",
// 	template: "guide",
// 	onAfterAction: function() {
// 		document.title = APP_NAME + " Guide";
// 	},
// });
