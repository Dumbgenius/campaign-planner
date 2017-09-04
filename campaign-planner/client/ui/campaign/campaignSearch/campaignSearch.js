Template.campaignSearch.helpers({
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