Template.campaignLayout.helpers({
	searchResultsTitle: function(){
		return; //TODO
	},
	searchResultsTags: function(){
		return; //TODO
	},
	items: function(){
		return Items.find({campaignId: this.campaign._id});
	},
	isSearching: function(){
		return false; //TODO
	},

	neither: function(a, b){
		return (!a && !b);
	},
})

Template.campaignLayout.events({
	"tap #openDrawerButton": function(event, instance) {
		navigationDrawer.toggle();
	},
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