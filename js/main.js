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
				title: 'Not specified: name',
				img_url_logo: 'Not specified: logo',
				player_int_value: 0
			},
			initialize: function(){
				console.log('game initialize');
				//I have to initialize nested values outside of default. Default is a shared reference object.
				var tempPlayerIntValue=this.get('player_int_value');
				var tempBitValues=[];
				if( !this.get('player_values') ){ 
                	this.set({player_values:[
               			{'type':'L1','value':0},
						{'type':'L2','value':0},
						{'type':'L3','value':0},
						{'type':'L4','value':0},
						{'type':'O2','value':0},
						{'type':'O3','value':0},
						{'type':'O4','value':0},
						{'type':'OM','value':0}
                	]});
              	}
              	
              	for(var i=7;i>=0;i--){
					if(Math.pow(2,i)<=tempPlayerIntValue){
						tempPlayerIntValue=tempPlayerIntValue-Math.pow(2,i);
						this.get('player_values')[i].value = 1;
					}
				}
				
				//Bind this as "this model" within these methods
				_(this).bindAll('setNewPlayerIntValue');
				
				//This is a model event handler
				this.on('change:player_values', this.setNewPlayerIntValue, this);
			},
			setNewPlayerIntValue:function(){
				console.log('here');
				var temp=0;
				for(var i=7;i>=0;i--){
					//console.log('i= '+i);console.log(this.get('player_values')[i].value);
					temp = temp * 2 + this.get('player_values')[i].value; 
				}
				//console.log(this);
				//console.log('temp '+temp);
			}
		});
		
		/*
		 * This is my model view
		 */
		var gameview = Backbone.View.extend({
			tagName: 'li',
			className:'game',
			_template: _.template(bw('#game-item-template').html()),
			initialize: function(){
				//console.log('gameview initialize');
				_(this).bindAll('render');
				this.listenTo(this.model, 'change:player_int_value', this.render);
				//this.listenTo(this.model, 'change:player_values', this.render);
				this.listenTo(this.model, 'destroy', this.remove);
			},
			events: {
              // the element IS the link, you don't have to specify its id there
            	'click .player_value_selection': 'updateSelection'
          	},
          	updateSelection: function(something){
				//console.log('gameview update selection');
            	bw(something.currentTarget).toggleClass('selected');
            	//console.log(this);
            	//var tempArray = this.model.get('player_values');
            	//tempArray[0].value = 2;
            	//this.model.set({'player_values':tempArray});
            	//this.model.get('player_values')[0].type = 'fish';
            	//console.log(localGameCollectionView._gameModelViews.views[0].model);
    			//console.log(localGameCollectionView._gameModelViews.views[1].model);            	
    			//this.model.get('player_values')[0].value = 2;
            	this.model.get('player_values')[(bw(something.currentTarget).index()-1)].value = Math.abs(this.model.get('player_values')[(bw(something.currentTarget).index()-1)].value-1);
				//by setting my values this was instead of .set i need to trigger the change event on player_value
				//myModel.trigger("change");
				this.model.trigger('change:player_values');
          	},
			render: function() {
				//console.log('gameview render');
				return bw(this.el).html(this._template(this.model.toJSON()));
			},
			clear: function(){
				//console.log('gameview clear');
				//the view is listening for the destroy for the model so that it can remove the model.
				this.model.destroy();
			}
		});
		
		//My collection data should keep track of the data alone
		var gamecollection = Backbone.Collection.extend({
			model: game,
			url: '/api/v1/games',
			initialize : function() {
				console.log('gamecollection initialize');
				this.on('add',this.newComer,this);
				this.on('change',this.newChanger,this);
				this.on('change:player_int_value',this.playerValueChange,this);
			},
			newComer:function(model){
				console.log('gamecollection newcomer');
				//console.log('this was added '+model.get('appid'));	
			},
			newChanger:function(model){
				console.log('gamecollection newChanger');
				//console.log('this was added '+model.get('appid'));	
			},
			playerValueChange:function(model){
				console.log('gamecollection playervalue');
			}
		});
		
		var gamecollectionview = Backbone.View.extend({
			tagName: 'ul',
			className:'game_collection',
			events: {
        		// only whole collection events (like table sorting)
        		// each child view has it's own events
			},
			initialize: function(){
				//console.log('collectionview initialize');
				this._gameModelViews = {'views':[]};
				_(this).bindAll('newView','render','newViews');
				this.collection.bind('add', this.newView);
				//this.collection.bind('reset', this.newViews);
			},
			render: function() {
				console.log('collectionview render');
				//for(var i=0;i<this._gameModelViews.views.length;i++)
				for(var i=0;i<10;i++)
				{
					bw(this.el).append(this._gameModelViews.views[i].render);
				}
				bw('body').html(bw(this.el));
			},
			newView: function(m) {
				console.log('collectionview add');
				console.log(m);
				var newGameView = new gameview({model:m});
				this._gameModelViews.views.push(newGameView);
				bw(this.el).append(newGameView.render());
			},
			newViews: function(ms){
				console.log('collection add Multiple Views');
				var newGameView = {};
				for(var i=0;i<ms.models.length;i++){
					newGameView = new gameview({model:ms.models[i]});
					this._gameModelViews.views.push(newGameView);
					//bw(this.el).append(newGameView.render());
				}
			}
		});
		
		/*
		 * Local Variables and entry commands
		 */
		var localGameCollectionView = new gamecollectionview({collection:new gamecollection});
		
		localGameCollectionView.collection.fetch({reset: true});
		
		/*		//bw.getJSON('temp/data_dump.json', function(){						
		//			}).done(function(response){
		//				//event.stopPropagation();
		//				//console.log( "success" );
		//				
		//				localGameCollectionView.collection.reset(response.response.games);
		//				localGameCollectionView.render();	
		//			});
		*/
		
		//localGameCollectionView.render();
		
		
    	//var Number.toString(2)
		console.log(localGameCollectionView);
    	//console.log(localGameCollectionView._gameModelViews.views[0]);
    	//console.log(localGameCollectionView._gameModelViews.views[1]);
    	//var x = 255;
	    //alert(x.toString(2));
	    //this is fine for a string array
	    //var y = 11111111;
	    //alert(y.toString(10));	
	});
})(jQuery);