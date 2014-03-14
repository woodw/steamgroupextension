/**
 * @author Wood
 * This should hols all of my additional functionality. Probably for initializing the collection object.
 */

jQuery.noConflict();
(function(bw){				
	//JQUERY
	bw(function() {
		console.log('mwahahaha');
		
		var game = Backbone.Model.extend({
			defaults: {
				appid: "Not specified",
				title: "Not specified",
				img_url_logo: "Not specified",
				player_byte_value: 00000000,
				player_values: [
					{'local_one':0},
					{'local_two':0},
					{'local_three':0},
					{'local_four':0},
					{'online_two':0},
					{'online_three':0},
					{'online_four':0},
					{'online_numerous':0}
				]
			},
			initialize: function(){
				console.log("Down in Fraggle Rock");
			}
		});
		
		var gamecollection = Backbone.Collection.extend({
			model: game,
			initialize : function() {
				this.on('add',this.newComer,this);
				this.on('change',this.someChange,this);
			},
			newComer:function(model){
				console.log('this was added '+model.get('appid'));	
			},
			someChange:function(model){
				console.log('this was changed '+model.get('appid'));	
			}
		});

		var gamecollection1 = new gamecollection();
		gamecollection1.add({});
		gamecollection1.add({});
		console.log(gamecollection1.at(0));
		gamecollection1.at(0).set({'appid':'And then some baby'});
		console.log(gamecollection1); // [game,game]
	});
})(jQuery);