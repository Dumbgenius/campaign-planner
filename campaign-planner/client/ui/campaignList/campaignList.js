Template.campaignList.helpers({
	campaigns: function(){
		return Campaigns.find({});
	},
});

Template.campaignList.events({
	"click #newCampaignButton": function() {
		var name = window.prompt("Enter name","New Campaign");
		if (name != null && name != "") {
			let userId = Meteor.userId();
			Campaigns.insert({owner: userId, name:name});
		}
	}
})