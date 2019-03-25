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

		/*
		image[i] = '<a href="' + data.data[x].url + '"/>' + data.data[x].title  + "</a>";
		content +=  "<p>" + image[i] + "<p/>" + closeDiv;
		'<iframe src="https://giphy.com/embed/6yxIP39EMwP7IlIA28" width="480" height="270" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/nba-player-court-det-wayne-ellington-6yxIP39EMwP7IlIA28">via GIPHY</a></p>'
		*/
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

/*
	fetch("//api.giphy.com/v1/gifs/trending?api_key=6QpBaZxQUBqszPZjK5Mh4uiOze6ahofm")
	.then(function(response) { return response.json()})
	.then(function(data) {
		parseContent(data, gifNum);
	})
	.catch(function() {
					alert("couldnt get gifs");
	});
*/

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