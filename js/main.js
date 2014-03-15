/**
 * @author Wood
 * This should hols all of my additional functionality. Probably for initializing the collection object.
 */

jQuery.noConflict();
(function(bw){				
	//JQUERY
	bw(function() {
		console.log('mwahahaha');
		
		/*
		 * This is my model
		 */
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
		
		/*
		 * This is my model view
		 */
		var gameview = Backbone.View.extend({
			tagName: "div",
			initialize: function(){
				this.listenTo(this.model, 'change:player_byte_value', this.render);
				this.listenTo(this.model, 'destroy', this.remove);
			},
			render: function() {
				bw('body').append('fish');
				//this.$el.html(this.template());
				//return this;
			},
			clear: function(){
				//the view is listening for the destroy for the model so that it can remove the model.
				this.model.destroy();
			}
		});
		
		/*
		 * This is my command line code
		 */
		//we make a new modelView and we pass a new model.
		//We now have a reference to the view and the model through the view
		var newView = new gameview({model:new game});
		newView.render();
		console.log(newView.model.get('appid'));
		newView.model.set({'appid':'123'});
	});
})(jQuery);