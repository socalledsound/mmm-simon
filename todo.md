so the structure of the game:
	client logs in, makes a new player object.
	inside draw loop, number of pieces of the pie is constantly being updated.
	
	can't update players list while a round is being played.
	
	a round looks like this:
	
	"ready?" -- everyone who wants to join clicks 'play this round' button.
	pie gets divided into number of players; a sound chosen at random is attached to each piece of pie -- very interested to find out if using sound files will be too slow, i think most likely it will be ok.
	all the pieces of pie play in order, then everyone is proompted to click their piece of pie.
	after everyonoe has clicked starts the real round.


	add timer -- 6 clicks like a clock then seventh is a buzzer and a player gets eliminated

SOUNDS:
	wilhelm scream
	electronic sounds
		





MODES:
	standard simon mode.
	with sound effects
	free jam mode
	a thing where you generate patterns and then they get played back
	
	--- might be a different app --
	chat and generate patterns of words, spoken by speech synthesizer
	kind of a mad libs game

	-- 
	a game that's like these clapping games but over phone.....

	--
	or like 



<!-- 	a sequence is generated for say 100 moves; which would be like, choose a random user to play, but weight it so that prviously chosen people go down in weighting????  start with straight random and then work on weighting notion.
	first note is playeed, that player has to click or they lose;
	if they click then next note, etc.
	if they lose then a new sequence is generated.
	keeps going like this until everyone excpt one is eliminated. -->
	(figured this out with an add number function that only chooses among people that haven't been added yet......)	
	
	
	
	
	-- something to add to main page should eventually be "be admin"/"invite others to join"	
	
	this would also be a cool thing for a messages app maybe?  o maybe too hectic















var Player = function() {
		// a player is going to be created when a user logs in.
		// actually it probably lives on the server === User.
		//players array will get passed to each client when necessary and will 
		//update the simon pie
	};