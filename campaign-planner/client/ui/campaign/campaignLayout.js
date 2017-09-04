Template.layout.onCreated(function() {
	subsManager.subscribe("user");
});

Template.campaignLayout.helpers({
	
})

Template.campaignLayout.events({
	"tap #newItemButton": function(event, instance) {
		var name=prompt("Name?");
		var text=prompt("Text?");
		Items.insert({
			campaignId: this.campaign._id,
			name: name,
			text: text,
		});
	},
});