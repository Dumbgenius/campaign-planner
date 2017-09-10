//set up the global collection for items
Items = new Mongo.Collection("items");

Schemas.Item = new SimpleSchema({
	//strings
	name: {type: String, defaultValue: "", trim: false},
	text: {type: String, defaultValue: "", trim: false},

	//parent campaign ID
	campaignId: {type: String, regEx: SimpleSchema.RegEx.Id, index: 1},

	//tags: the most important bit
	tags: {type: [String], defaultValue: []},
});

Items.attachSchema(Schemas.Item);

Items.allow({
	// the user must be logged in, and they must have write access on the campaign
	insert: function(userId, doc) {
		var campaign = Campaigns.findOne(
			doc.campaignId,
			{fields: {owner: 1, writers: 1}}
		);
		return (userId && campaign.owner === userId || _.contains(campaign.writers, userId));
	},
	update: function(userId, doc, fields, modifier) {
		var campaign = Campaigns.findOne(
			doc.campaignId,
			{fields: {owner: 1, writers: 1}}
		);
		return (userId && campaign.owner === userId || _.contains(campaign.writers, userId));
	},
	remove: function(userId, doc) {
		var campaign = Campaigns.findOne(
			doc.campaignId,
			{fields: {owner: 1, writers: 1}}
		);
		if (!campaign) return true; //so we can clean up orphaned items
		return userId && campaign.owner === userId || _.contains(campaign.writers, userId);
	},
	fetch: ["campaignId"],
});

Items.deny({
	// Can't change campaignId
	update: function(userId, doc, fields, modifier) {
		return _.contains(fields, "campaignId");
	},
	fetch: ["campaignId"],
});
