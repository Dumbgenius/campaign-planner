//set up the global collection for campaigns
Campaigns = new Mongo.Collection("campaigns");

Schemas.Campaign = new SimpleSchema({
	//strings
	name:         {type: String, defaultValue: "", trim: false},
	imageUrl:     {type: String, defaultValue: "", trim: true,  optional: true},

	//permissions
	owner:   {type: String, regEx: SimpleSchema.RegEx.Id},
	readers: {type: [String], regEx: SimpleSchema.RegEx.Id, defaultValue: []},
	writers: {type: [String], regEx: SimpleSchema.RegEx.Id, defaultValue: []},

	//TODO: add more settings
	//show to anyone with link
	"settings.viewPermission": {
		type: String,
		defaultValue: "whitelist",
		allowedValues: ["whitelist", "public"],
	},
});

Campaigns.attachSchema(Schemas.Campaign);

Campaigns.allow({
	insert: function(userId, doc) {
		// the user must be logged in, and the document must be owned by the user
		return (userId && doc.owner === userId);
	},
	update: function(userId, doc, fields, modifier) {
		// can only change documents you have write access to
		return doc.owner === userId || _.contains(doc.writers, userId);
	},
	remove: function(userId, doc) {
		// can only remove your own documents
		return doc.owner === userId;
	},
	fetch: ["owner", "writers"],
});

Campaigns.deny({
	update: function(userId, docs, fields, modifier) {
		// can't change owners
		return _.contains(fields, "owner");
	}
});
