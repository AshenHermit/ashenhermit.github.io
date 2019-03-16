function generateAbility() 
{
	var Name = [];
	var index;
	//Creates and formats the url for the ability
	var url = 'https://powerlisting.fandom.com/wiki/'
	
	$.getJSON('https://api.allorigins.win/get?url=' + encodeURIComponent('https://powerlisting.fandom.com/wiki/Special:Random') + '&callback=?', function(data){
	
		var siteContents = data.contents;
		//Finds the meta tag that holds the description of the power.  1 is added to descriptionStart because the first character is a quote
		var metaTagStart = siteContents.indexOf("og:description");
		var contentStart = siteContents.indexOf("content", metaTagStart);
		var descriptionStart = siteContents.indexOf("\"", contentStart) + 1;
		
		//Finds the end of the description and creates a sub-string containing the description.
		var metaTagEnd = siteContents.indexOf("\" />", descriptionStart);
		var powerDescription = siteContents.substring(descriptionStart, metaTagEnd);
		var description = powerDescription;
		
		//link to the power page and display Stand information
		$('#description').html('<span style="color: #fff;font-weight: 500;font-size: 1.5em">Описание:</span><br>'+description);
	});
}
