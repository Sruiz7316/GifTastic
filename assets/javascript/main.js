var topics = ['charmed','dexter','despicable me','matrix','underworld','a wrinkle in time','lost in space','spirited away','cable girls'];
console.log("Win win win")


function get_buttons(searchTerm) {
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + searchTerm + "&apikey=KI4kpMtwsELgjUE8hd5Z4Kn2XZG5QDM8&limit=10";
            $.ajax({ //Async request to giphy API URL 10micro sec
                url: queryURL,
                method: "GET"
            }).then(function(response) {
                console.log(response);
                for (var j = 0; j < response.data.length; j++) {
                    var current_item = response.data[j];
                    var rating = current_item.rating;
                    var image_still_source = current_item.images.fixed_height_small_still.url;
                    var image_animate_source = current_item.images.fixed_height_small.url;
                    var ht = '<img class="image-item" src="'+ image_still_source +'" data-still-url="'+ image_still_source +'" data-animate-url="'+ image_animate_source +'" data-isstill="yes" >';
                    $('.images').append(ht);
                }
            
            });
}


//The user should click a button
//2. The buttons value should be passed into the search term of the API
// For each of the Gifs that are returned, display them and their rating
    $(document).ready(function(){

        for (var i = 0; i < topics.length; i++) {
            var topic = topics[i];
            var html = '<button>' + topic + '</button>';
            $('.topics').append(html);
            
        }

        $('.topics').on("click", "button", function(){
            var user_input= $(this).html()
            console.log(user_input)
            get_buttons(user_input)
        })


        //Execute something. TO Make sure it happens syncronously, use a callback
        $("#find-title").on("click", function(event) {
            event.preventDefault();
            var title = $("#title-input").val();
            //Call the get_buttons function
            get_buttons(title)
            $("#title-input input").clear()
        }); 

        $(".images").on("click",".image-item",function(){
            var isstill = $(this).data('isstill');
            var still_url = $(this).data('still-url');
            var animate_url = $(this).data('animate-url');
            if(isstill=="yes"){
                $(this).attr("src",animate_url);
                $(this).data('isstill','no');
            }else{
                $(this).attr("src",still_url);
                $(this).data('isstill','yes');
            }
        });
    })
    
    