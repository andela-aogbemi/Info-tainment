var showsAndMusic = {
	showName: $("#shows"),
	showSearch: $("#tvSearch"),
	musicInfo: $("#artist"),
	musicSearch: $("#audioSearch"),
	searchForShow: function() {
		var searchInput = showsAndMusic.showName.val().trim();
		console.log(searchInput);

		var url = "http://api.tvmaze.com/singlesearch/shows?q=" + searchInput;
		$.getJSON(url, function (data) {
			console.log(data.summary);
			$("#details").html("<div id='details'>" + data.summary + "</div>");
			$("#picture").html("<div id='picture'><img src='" + data.image.original + "'></div>");
			$("#date").html("<div id='date'>Premier Date: " + data.premiered + "</div>");
		});
	},

	searchForMusic: function() {
		$("#tracklist").empty();
		var input = showsAndMusic.musicInfo.val().trim();
		console.log(input);

		var imageUrl = "http://developer.echonest.com/api/v4/artist/images?api_key=4RTU0ONFIDEQOQTMM&name=" + input + "&format=json&results=1&start=0"
		$.getJSON(imageUrl, function (picture) {
			$.each(picture.response.images, function (i, images) {
				$("<div id='pix'><img src='" + images.url + "'></div>").appendTo("#pix");
			})
		});

		var musicUrl = "http://developer.echonest.com/api/v4/artist/songs?api_key=4RTU0ONFIDEQOQTMM&name=" + input + "&format=json&start=0&results=40";
		$.getJSON(musicUrl, function (reply) {
			console.log(reply);
			$.each(reply.response.songs, function (i, songs) {
			console.log("all songs: " + songs.title);
			$("<li id='songs'>" + songs.title + "</li>").appendTo("#tracklist");
			$("ul").appendTo("#tracks");
			});
		});	

		var artistUrl = "http://developer.echonest.com/api/v4/artist/biographies?api_key=4RTU0ONFIDEQOQTMM&name=" + input + "&format=json&results=1&start=0";	
		$.getJSON(artistUrl, function (bio) {
			console.log(bio);
			$.each(bio.response.biographies, function (i, biographies) {
				$("<p id='story'>" + biographies.text + "</p>").appendTo("#details");
			});
		});
	}
};
showsAndMusic.showSearch.click(showsAndMusic.searchForShow);
showsAndMusic.musicSearch.click(showsAndMusic.searchForMusic);



// //$.getJSON(musicUrl, function (reply) {
		//console.log(reply.songs);
			//$.each(reply.songs, function(i, data) {
				//$("<li id='songs'>"+data.title+"</li>").appendTo("#tracklist");
				//$("ul").appendTo("#tracks");
			//});
		//});