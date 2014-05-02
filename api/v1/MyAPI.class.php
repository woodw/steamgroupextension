<?php
	require_once 'API.class.php';

	class MyAPI extends API
	{
		protected $User;

		public function __construct($request, $origin) {
			parent::__construct($request);
			// Abstracted out for example
			$APIKey = 'adadadadadada';
			//new Models\APIKey();
			$User = 'adadadadadada';
			//new Models\User();
			
			//echo "lalalala ".$this->request."<br />";
			
			//if (!array_key_exists('apiKey', $this->request)) {
			//	throw new Exception('No API Key provided');
			//} else if (!$APIKey->verifyKey($this->request['apiKey'], $origin)) {
			//	throw new Exception('Invalid API Key');
			//} else if (array_key_exists('token', $this->request) && !$User->get('token', $this->request['token'])) {
			//	throw new Exception('Invalid User Token');
			//}
			$this->blah = $request;
			$this->User = $User;
		}

		/**
		* Example of an Endpoint
		*/
		protected function example() {
			if ($this->method == 'GET') {
				return "Your name is " . $this->User->name;
			} else {
				return "Only accepts GET requests";
			}
		}
		protected function games($args) {
			
			//if $args[0] is null then that means we pull all the games, 
			//if $args[0] then pull just a specific game			
//			$array = array(
//				"games" => array(
//					array(
//						"appid" => $args[0],
//						"usertoken" => $this->method,
//						"value" => $this->endpoint,
//						"logo" => "www.image.com"
//					),
//					array(
//						"appid" => $this->verb,
//						"usertoken" => $this->blah,
//						"value" => $_GET['key'],
//						"logo" => $_POST['key']
//					)
//				)
//			);
			$array = array(
				
					array(
						"appid" => 4000,
						"name" => "Garry's Mod",
						"playtime_forever" => 220,
						"img_icon_url" => "d9101cbeddcc4ff06c7fa1936c3f381b0bbf2e92",
						"img_logo_url" => "dca12980667e32ab072d79f5dbe91884056a03a2",
						"has_community_visible_stats" => true
					),
					array(
						"appid" => 6310,
						"name" => "The Longest Journey",
						"playtime_forever" => 23,
						"img_icon_url" => "7d6b1336162f7c26a61ffe0d456efc07d41f26cf",
						"img_logo_url" => "958177d7ecf0e96d750d0814cc40645660636434"
					),
					array(
						"appid" => 220,
						"name" => "Half-Life 2",
						"playtime_forever" => 0,
						"img_icon_url" => "fcfb366051782b8ebf2aa297f3b746395858cb62",
						"img_logo_url" => "e4ad9cf1b7dc8475c1118625daf9abd4bdcbcad0",
						"has_community_visible_stats" => true
					),
					array(
						"appid" => 15100,
						"name" => "Assassin's Creed",
						"playtime_forever" => 942,
						"img_icon_url" => "cd8f7a795e34e16449f7ad8d8190dce521967917",
						"img_logo_url" => "5450218e6f8ea246272cddcb2ab9a453b0ca7ef5"
					),
					array(
						"appid" => 16600,
						"name" => "Trials 2: Second Edition",
						"playtime_forever" => 280,
						"img_icon_url" => "96c292be9e397fd9ac6b4b18eecb4f3fa622093e",
						"img_logo_url" => "808b7091e67e61f13ba15993301b7d732ddceaf3",
						"has_community_visible_stats" => true
					)
				
			);				

			return $array;
			//{'values':[
			//{}
			//]}
			//if ($this->method == 'GET') {
			//	return "Your name is ";
			//} else {
			//	return "Only accepts GET requests";
			//}
		}
	}
?>