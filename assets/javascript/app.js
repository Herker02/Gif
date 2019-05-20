// topics for GIFs
var topics = ["football", "basketball", "baseball","hockey","soccer","lacrosse",];

// displays the function when its called on   
function renderButtons() {        
$("#topics").empty();

 for (var i = 0; i < topics.length; i++){
    var getButton = $('<button data-show=' + topics[i] +'>' + topics[i] + '</button>');
    getButton.addClass("button");
    $('#topics').append(getButton)
};
}

renderButtons()


$('body').on("click",".button",function(){
var sports = $(this).attr("data-show");

// query url and api key
var queryUrl ="https://api.giphy.com/v1/gifs/search?q=" + sports + "&api_key=o8csKa1WZnfxsr9cJUsUa2YJ8bTSe9MO&limit=10";

// AJAX call and creating var results to grab response data
$.ajax({
    url: queryUrl,
    method: "GET",
}).then(function(response){
    console.log(queryUrl);
    var results = response.data;

// creating a for loop targeting the GIFs in the topic

    for (var i = 0; i < results.length; i++){
        var sportsDiv = $('<div>');

        var p = $('<p>').text("Rating: " + results[i].rating);

        var sportImage = $('<img>');
    // creating img and targeting the src of the topics. targeting the img data and pulling it from database
        sportImage.attr("src", results[i].images.fixed_height_still.url);
        sportImage.attr("data-animate", results[i].images.fixed_height.url);
        sportImage.attr("data-still", results[i].images.fixed_height_still.url);
        sportImage.attr("data-state", "still");
        sportImage.addClass("gif");
    // appending the imgs to the p and prepending them to the div
        sportsDiv.append(p);
        sportsDiv.append(sportImage);
        $('#gifs-appear').prepend(sportsDiv);
    }
    // targeting the class gif on click
    
});

});
$('body').on("click",".gif", function() {
        
        var state = $(this).attr("data-state");
    // if else statements on the src of the image and whether they are still or animate 
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }

    });
$('#go-button').on('click', function(e){

e.preventDefault();
var output = $('#search-term').val().trim()
topics.push(output);
console.log(topics);

renderButtons();

});