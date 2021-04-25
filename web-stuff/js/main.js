const urlRequest = 'http://35.245.106.144/csci441/assgn/random.php';
var num = 0;
let gifPosition = 0;
let lastNum = 0;

function parseContent(data, size) {
	var content = '';
	var closeDiv = '</div>';
	var divOpen = '<div id="gif">';
	let image = new Array(size);

	for(var i = 0; i < size; i ++) {
		var x = Math.floor((Math.random() * 24));
		image[i] = '<img src="' + data.data[x].images.downsized_medium.url + '"/>';
		content +=  image[i] + closeDiv;
	}
	document.getElementById("content").innerHTML = content;
}

function getGif(gifNum)
{
	
	var xhr = $.get("//api.giphy.com/v1/gifs/trending?api_key=6QpBaZxQUBqszPZjK5Mh4uiOze6ahofm");
	xhr.done(function(data){ 
		//alert(data.data[gifNum].embed_url);
		console.log("success got data", data);
		parseContent(data, gifNum);
	});

}

function getAjax() {
    var ajaxRequest = $.ajax({
				type: "GET",
        url: 'http://35.245.106.144/csci441/assgn/random.php',
        dataType: "json"
		});

	ajaxRequest.done(function(jsonObj){
		//alert(jsonObj.ranNum);
		num = jsonObj.ranNum;
	
		$("#number").html(jsonObj.ranNum);
		//console.log(jsonObj);
		getGif(num);
		if (true == true){
			setTimeout(getAjax, 5000);
		}
		//getGif(num);
	});

	ajaxRequest.fail(function(returnedFailData){
		console.log('fail: ' + returnedFailData.status);
		console.log('fail: ' + returnedFailData.state());
		$("#content").html("Ajax Fail<br> Status: " + returnedFailData.status + "<br>State: " + returnedFailData.state());
		getGif(6);
	});
}



//main
$(document).ready(function() {
	$("#content").html("Loading your content");
	getAjax();
});
