/**
 * @author Wood
 */

var game = Backbone.Model.extend({
	defaults: {
		appid: "Not specified",
		title: "Not specified",
		img_url_logo: "Not specified",
		player_value: "Not specified",
		player_value_set: [{'local_one':0},{'local_two':0}]
	},
	initialize: function(){
		console.log("Music is the answer");
	}
});

var Album = Backbone.Collection.extend({
	model: Song
});

var song1 = new Song({ name: "How Bizarre", artist: "OMC" });
var song2 = new Song({ name: "Sexual Healing", artist: "Marvin Gaye" });
var song3 = new Song({ name: "Talk It Over In Bed", artist: "OMC" });

var myAlbum = new Album([ song1, song2, song3]);
console.log( myAlbum.models ); // [song1, song2, song3]