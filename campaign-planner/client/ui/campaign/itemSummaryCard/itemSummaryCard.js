Template.itemSummaryCard.helpers({
	summary: function() {
		return this.item.text; //TODO: compute a summary - probably the first paragraph
	},
});