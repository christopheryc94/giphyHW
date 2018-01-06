//global variables
var topics = ["Elf", "Hercules", "Ted", "Marley and Me", "Ice Age",
				"Up", "Aladdin", "Moana", "Frozen", "Mulan"];



var apiKey = "mQgq2ullfPkSrrBAzzP8QbFUw68zywql";

//will be what search term user adds to array
var searchTerm = "";


//pull from array and make button
function renderBttns () {
	//deleting the movie buttons prior to adding new movie buttons
	$("#movieButtons").empty();

	for(var i = 0; i < topics.length; i++){
		var button = $("<button>");
		button.addClass("movie");
		button.attr("data-name", topics[i]);
		button.text(topics[i]);

		//adding the button to the html
		$("#movieButtons").append(button);
	}
}

renderBttns();

$("#run-search").on("click", function(event) {
//function addMovie () {
	event.preventDefault();

	var newMovie = $("#search-term").val();
	topics.push(newMovie);
	renderBttns();
	console.log(topics);

	//delete search term
	$("#search-term").val("");
});



console.log(topics);

$("body").on("click", ".movie", function(event) {

	event.preventDefault();
	//empty gifs for new one
	$("#giph-here").empty();

	searchTerm = $(this).attr("data-name");
	console.log(searchTerm);

	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        searchTerm + "&api_key=" + apiKey + "&limit=10";

    $.ajax({
    	url: queryURL,
    	method: "GET"
    })
    .done(function(response) {
    	var results = response.data;
    	console.log(results);

    	for(var i = 0; i < results.length; i++) {
    		var gifDiv = $("<div class ='item'>");
    		var rating = results[i].rating;
    		var p = $("<p>").text("Rating: " + rating);
    		var movieImage = $("<img>");
    		movieImage.attr("src", results[i].images.fixed_height_still.url);
    		movieImage.attr("data-still", results[i].images.fixed_height_still.url);
    		movieImage.attr("data-animate", results[i].images.fixed_height.url);
    		movieImage.attr("data-state", "still");
    		movieImage.addClass("gif");

    		gifDiv.append(p);
    		gifDiv.append(movieImage);

    		$("#giph-here").prepend(gifDiv);
    	}

    	console.log(movieImage)

    });

});

$("body").on("click", ".gif", function() {

    var state = $(this).attr("data-state");
    console.log(state);

    if(state === 'still'){
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
     }
     else{
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
     }

});


















