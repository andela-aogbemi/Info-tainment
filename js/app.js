var showsAndMusic = {
	showName: $("#shows"),
	showSearch: $("#tvSearch"),
	musicInfo: $("#artist"),
	musicSearch: $("#audioSearch"),
	searchForShow: function() {
		var searchInput = showsAndMusic.showName.val().trim();
		console.log(searchInput);

		var url = "http://api.tvmaze.com/singlesearch/shows?q="+searchInput;
		$.getJSON(url, function (data) {
			console.log(data.summary);
			$("#details").html("<div id='details'>"+data.summary+"</div>");
			$("#picture").html("<div id='picture'><img src='"+data.image.original+"'></div>");
			$("#date").html("<div id='date'>Premier Date: "+data.premiered+"</div>");
		});
	},

	searchForMusic: function() {
		var input = showsAndMusic.musicInfo.val().trim();
		console.log(input);

		var musicUrl = "http://developer.echonest.com/api/v4/artist/songs?api_key=4RTU0ONFIDEQOQTMM&name="+input+"&format=json&start=0&results=40";
		$.getJSON(musicUrl, function (reply) {
			console.log(reply);
			$.each(reply, function(key, value) {
				$("<li id='songs'>"+value.songs[0][1]+"</li>").appendTo("#tracklist");
				$("ul").appendTo("#tracks");
			});
		});
	}
};
showsAndMusic.showSearch.click(showsAndMusic.searchForShow);
showsAndMusic.musicSearch.click(showsAndMusic.searchForMusic);