<?php
	require_once 'MyAPI.class.php';
		//Array
	//echo $_SERVER."<br />";
		//*blank*
	//echo $_SERVER['HTTP_ORIGIN']."<br />";
		//abitagaming.netii.net
	//echo $_SERVER['SERVER_NAME']."<br />";
		//games/3
	//echo $_REQUEST['request']."<br />";
	// Requests from the same server don't have a HTTP_ORIGIN header
	//does not exist
	
	
	if (!array_key_exists('HTTP_ORIGIN', $_SERVER)) {
	    	//echo 'does not exist'.'<br />';	
	    $_SERVER['HTTP_ORIGIN'] = $_SERVER['SERVER_NAME'];
	}

	try {
		//new MyAPI(games/3, abitagaming.netii.net);
		//echo "new MyAPI(".$_REQUEST['request'].", ".$_SERVER['SERVER_NAME'].");<br />";
	    $API = new MyAPI($_REQUEST['request'], $_SERVER['HTTP_ORIGIN']);
	    //echo "I made it through<br />";
	    echo $API->processAPI();
	} catch (Exception $e) {
	    echo json_encode(Array('error' => $e->getMessage()));
	}
?>