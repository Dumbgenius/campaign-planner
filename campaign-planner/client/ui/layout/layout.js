Template.layout.onCreated(function() {
	this.subscribe("user");
});

Template.appDrawer.helpers({
	profileName: function() {
		var user = Meteor.user();
		return user.profile && user.profile.username || user.username || "My Account";
	},
});

let drawerLayout;
const closeDrawer = function(instance){
	if (!drawerLayout) drawerLayout = $("app-drawer-layout")[0];
	if (drawerLayout && drawerLayout.narrow){ //only on mobile
		drawerLayout.drawer.close();
	}
}

Template.appDrawer.events({
	"click a": function(event, instance){
		closeDrawer(instance); //so it properly closes on mobile
	},
});
