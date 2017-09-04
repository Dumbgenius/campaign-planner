Router.configure({
	loadingTemplate: "loading",
	layoutTemplate: "layout",
	trackPageView: true,
});

Router.plugin("ensureSignedIn", {
 	only: [
 		"profile",
 		"campaignList",
 	]
});

Router.plugin("dataNotFound", {notFoundTemplate: "notFound"});

//  ROUTES
Router.route("/", {
	name: "home",
	template: "home",
	onAfterAction: function() {
		document.title = APP_NAME;
	},
});

Router.route("/signIn", {
	name: "signIn",
	template: "signIn",
	onAfterAction: function() {
		document.title = APP_NAME + " - Sign In";
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
	layoutTemplate: "campaignLayout",
	template: "campaignSearch",
	waitOn: function() {
		return [
			subsManager.subscribe("campaign", this.params._id),
		];
	},
	data: function() {
		var campaign = Campaigns.findOne(this.params._id);
		return {campaign: campaign};
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

Router.route("/campaign/:_id/item/:itemId", {
	name: "campaignItem",
	layoutTemplate: "campaignLayout",
	template: "campaignItem",
	waitOn: function() {
		return [
			subsManager.subscribe("campaign", this.params._id),
		];
	},
	data: function() {
		var campaign = Campaigns.findOne(this.params._id);
		var item = Items.findOne(this.params.itemId)
		return {campaign: campaign, item: item};
	},
	onAfterAction: function() {
		var campaign = Campaigns.findOne({_id: this.params._id}, {fields: {name: 1}});
		var campaignName = campaign && campaign.name;
		var item = Items.findOne({_id: this.params.itemId}, {fields: {name: 1}});
		var itemName = item && item.name;
		if (name){
			document.title = itemName + " - " + campagnName;
		}
	},
	fastRender: true,
});

Router.route("/campaign/:_id/log", {
	name: "campaignLog",
	template: "campaignLog",
	layoutTemplate: "campaignLayout",
	waitOn: function() {
		return [
			subsManager.subscribe("campaign", this.params._id),
		];
	},
	data: function() {
		var campaign = Campaigns.findOne(this.params._id);
		return {campaign: campaign};
	},
	onAfterAction: function() {
		var campaign = Campaigns.findOne({_id: this.params._id}, {fields: {name: 1}});
		var name = campaign && campaign.name;
		if (name){
			document.title = name + " - Log";
		}
	},
	fastRender: true,
});

Router.route("/campaign/:_id/calendar", {
	name: "campaignCalendar",
	template: "campaignCalendar",
	layoutTemplate: "campaignLayout",
	waitOn: function() {
		return [
			subsManager.subscribe("campaign", this.params._id),
		];
	},
	data: function() {
		var campaign = Campaigns.findOne(this.params._id);
		return {campaign: campaign};
	},
	onAfterAction: function() {
		var campaign = Campaigns.findOne({_id: this.params._id}, {fields: {name: 1}});
		var name = campaign && campaign.name;
		if (name){
			document.title = name + " - Calendar";
		}
	},
	fastRender: true,
});

Router.route("/loading", {
	name: "loading",
	template: "loading",
});

Router.route("/profile", {
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
