Template.campaignItem.onCreated(function(){
	this.editing = new ReactiveVar(!!this.data.startEditing);
});

Template.campaignItem.helpers({
	editing: function(){
		return Template.instance().editing.get()
	},
});

Template.campaignItem.events({
	"tap #editButton": function(event, instance){
		instance.editing.set(true);
	},

	"tap #doneEditingButton": function(event, instance){
		instance.editing.set(false);
	},
});

//////////////////////////[[view]]//////////////////////////




//////////////////////////[[edit]]//////////////////////////

const debounce = (f) => _.debounce(f, 300);

Template.campaignItemEdit.events({
	"input #itemNameInput": debounce(function(event){
		const input = event.currentTarget;
		var name = input.value;
		if (!name){
			input.invalid = true;
			input.errorMessage = "Name is required";
		} else {
			input.invalid = false;
			Items.update(this.item._id, {
				$set: {name: name}
			}, {
				removeEmptyStrings: false,
				trimStrings: false,
			});
		}
	}),
	"input #itemTextInput": debounce(function(event){
		var text = event.currentTarget.value;
		Items.update(this.item._id, {
			$set: {text: text}
		}, {
			removeEmptyStrings: false,
			trimStrings: false,
		});
	}),
});
