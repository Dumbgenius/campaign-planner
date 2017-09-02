Meteor.publish("user", function(){
	return Meteor.users.find(this.userId, {fields: {username: 1}});
});

Meteor.publish("campaign", function(campaignId){
	var campaign = Campaigns.findOne({
		_id: characterId,
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
			//other stuff goes here.
		]
	} else {
		return [];
	}
});