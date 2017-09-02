Meteor.publish("user", function(){
	return Meteor.users.find(this.userId, {fields: {username: 1}});
});

Meteor.publish("campaign", function(campaignId){
	var userId = this.userId;
	var campaign = Campaigns.findOne({
		_id: campaignId,
		$or: [
			{readers: userId},
			{writers: userId},
			{owner: userId},
			{"settings.viewPermission": "public"},
		],
	});

	if (campaign) {
		return [
			campaign, 
			//other child stuff goes here.
		]
	} else {
		return [];
	}
});

Meteor.publish("campaignList", function(){
	var userId = this.userId;
	if (!userId) {
		this.ready();
		return;
	}
	return Campaigns.find({
		$or: [
			{readers: userId},
			{writers: userId},
			{owner: userId},
		],
	});
})