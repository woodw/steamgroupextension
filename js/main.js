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
				appid: "Not specified: appid",
				title: "Not specified: title",
				img_url_logo: "Not specified: logo",
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
			_template: _.template(bw('#game-item-template').html()),
			initialize: function(){
				this.listenTo(this.model, 'change:player_byte_value', this.render);
				this.listenTo(this.model, 'destroy', this.remove);
			},
			render: function() {
				//bw('body').append(this.bw(el).html(this._template(this.model.toJSON())));
				bw('body').append(bw(this.el).html(this._template(this.model.toJSON())));
				//this.$el.html(this.template());
				//return this;
			},
			clear: function(){
				//the view is listening for the destroy for the model so that it can remove the model.
				this.model.destroy();
			}
		});
		
		//My collection data should keep track of the data alone
		var gamecollection = Backbone.Collection.extend({
			model: game,
			initialize : function() {
				this.on('add',this.newComer,this);
				this.on('change:player_byte_value',this.playerValueChange,this);
			},
			newComer:function(model){
				console.log('this was added '+model.get('appid'));	
			},
			playerValueChange:function(model){
				//I will have the data update the player value from the player value byte
				//when it is set originally
				console.log('this was changed '+model.get('appid'));	
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
		console.log(newView.model);
		//im going to make a new collectionview & collection
		//I instantiate a new collectionview... then in the collectionview init i make a new collection.
		//once I have the new collection I have a listen from the collectionview for model add
		//this will give me the chance to make a new model view from the collection view
		//and then pass that modelview the model that is being added into the collection.
		//the collectionview will have a ref to the collection and a ref array of model views
		//the model view will have a ref to the model
		//the collection will have a ref array to the models
		//the model will have a ref to nothing.. which is what i want.
		
		
	});
})(jQuery);