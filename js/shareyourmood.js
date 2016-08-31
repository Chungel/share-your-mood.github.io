this.Documents= new Mongo.Collection("documents");

//To access to variables you have to have templates => scope

/*
 var dummieVariable = 10;

	Template.date_display.helpers({
	current_date:function(){
		return Session.get("current_date");
		},
		dummieVariable:function(){
			return dummieVariable;
		}

*/



if (Meteor.isClient){
	//updae the session curren_date variable every minute (1000 milisecs)
	Meteor.setInterval(function(){
		
		Session.set("current_date", new Date());
	}, 1000);
	
	Template.date_display.helpers({
	current_date:function(){
		return Session.get("current_date");
		}
	});
	
	Template.editor.helpers({
		docid:function(){
			var doc = Documents.findOne();
			if (!doc) {
                return undefined;
				console.log("no hay nada");
            }
			
			else{
				console.log("doc id helper:"+doc._id);
				return doc._id;
			}
			}
		});
}

if (Meteor.isServer){
	Meteor.startup(function(){
		// code to run on server at startup
		if (!Documents.findOne()) {
            Documents.insert({title:"poetas"});
        }
	})
}