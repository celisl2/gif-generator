<?php	
    header('Access-Control-Allow-Origin: *');
    sleep(3);

    $url = 'http://35.245.106.144/csci441/assgn/random.php'; // path to your JSON file
    $data = file_get_contents($url); // put the contents of the file into a variable
    $characters = json_decode($data);
    var_dump($characters);
    header("Content-Type: application/json");
    echo $characters->ranNum;