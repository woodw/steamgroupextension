/**
 * @author Wood
 * This should hols all of my additional functionality. Probably for initializing the collection object.
 */

jQuery.noConflict();
(function(bw){				
	//JQUERY
	bw(function() {
		console.log('JQuery Ready');
		
		/*
		 * This is my model
		 */
		var game = Backbone.Model.extend({
			defaults: {
				appid: 'Not specified: appid',
				title: 'Not specified: title',
				img_url_logo: 'Not specified: logo',
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
				console.log('game initialize');
			}
		});
		
		/*
		 * This is my model view
		 */
		var gameview = Backbone.View.extend({
			tagName: 'li',
			_template: _.template(bw('#game-item-template').html()),
			initialize: function(){
				console.log('gameview initialize');
				_(this).bindAll('render');
				this.listenTo(this.model, 'change:player_byte_value', this.render);
				this.listenTo(this.model, 'destroy', this.remove);
			},
			render: function() {
				console.log('gameview render');
				return bw(this.el).html(this._template(this.model.toJSON()));
			},
			clear: function(){
				console.log('gameview clear');
				//the view is listening for the destroy for the model so that it can remove the model.
				this.model.destroy();
			}
		});
		
		//My collection data should keep track of the data alone
		var gamecollection = Backbone.Collection.extend({
			model: game,
			initialize : function() {
				console.log('gamecollection initialize');
				this.on('add',this.newComer,this);
				this.on('change:player_byte_value',this.playerValueChange,this);
			},
			newComer:function(model){
				console.log('gamecollection newcomer');
				//console.log('this was added '+model.get('appid'));	
			},
			playerValueChange:function(model){
				console.log('gamecollection playervalue');
			}
		});
		
		var gamecollectionview = Backbone.View.extend({
			tagName: 'ul',
			events: {
        		// only whole collection events (like table sorting)
        		// each child view has it's own events
			},
			initialize: function(){
				console.log('collectionview initialize');
				this._gameModelViews = {'views':[]};
				_(this).bindAll('add');
				this.collection.bind('add', this.add);
			},
			render: function() {
				console.log('collectionview render');
				for(var i=0;i<this._gameModelViews.views.length;i++)
				{
					bw(this.el).append(this._gameModelViews.views[i].render);
				}
				bw('body').html(bw(this.el));
			},
			add: function(m) {
				console.log('collectionview add');
				var newGameView = new gameview({model:m});
				this._gameModelViews.views.push(newGameView);
				bw(this.el).append(newGameView.render);
			}
		});

		/*
		 * Local Variables and entry commands
		 */
		var localGameCollectionView = new gamecollectionview({collection:new gamecollection});
		localGameCollectionView.collection.add(new game({
				'appid':'123',
				'title':'Billgame',
				'logo':'url.123.com'
		}));
		localGameCollectionView.render();
		localGameCollectionView.collection.add(new game({
				'appid':'456',
				'title':'Lauriegame',
				'logo':'url.456.com'
		}));
	});
})(jQuery);