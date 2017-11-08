var radLimit =40;
var numPlayers = 4;
var diameter = 1800;
var arcLength = 360/numPlayers;
var tempo = 300;
var memoryCounter = 0;
var timerColor = [0,0,0];
var osc, env;
// var colors = [[180,20,180],[20,120,200],[170,80,80],[120,100,200],[20,120,200],[170,80,80],[120,100,200]];
// var freqs = [350,390,410,430,480,530,550,590,620,640,350,390,410,430,480,530,550,590,620,640];
var arcs =[];
var sequence = [];
var chooseFrom = [];
var pickedNums = [];
var players = [];
var playerButtons = [];
var playerResponses = [];
var currentRound = 0;
var allNums, colors, freqs;


var startButton;
var player1Button;
var player2Button;
var player3Button;

var sequencePlaying = false;
var checkAnswerCounter = 0;
var gamePaused = true;
var scoreboard = document.getElementById('scoreboard');
var startGameSound = new Howl({src: 'start-game.mp3'});
var wrongAnswerSound = new Howl({src: 'wrong-answer.mp3'});
var loseGameSound = new Howl({src: 'lose-game.mp3'});
 // scoreboard.innerHTML = "this is a value";						
// nextRound = nextRound.bind(this);
// addStep = addStep.bind(this);
// console.log(this);

allNums =  Array.apply(null, Array(numPlayers));
colors =  Array.apply(null, Array(numPlayers));
freqs =  Array.apply(null, Array(numPlayers));


allNums.map((x,i) => {
	allNums[i] = i;
	});

colors.map((color,i) => {
	colors[i] = '#'+Math.floor(Math.random()*16777215).toString(16);
	});

colors.map((color,i) => {
	freqs[i] = 220+(i*50);
	});

// allnums = Array.apply(1, Array(3));
//allnums = Array.apply(null, Array(3)).map(function (x, y) { return y + 1; });

// console.log(freqs);


function setup() {

   createCanvas(1000,800);
   background(0);
   noStroke();




 	for(var i=0; i<numPlayers; i++) {
		// console.log("begin arcLegnth:"+arcLength);
		arcs[i] = new ArcButton(i,width/2,height/2, diameter, radians(i*arcLength), radians(arcLength+(i*arcLength)), colors[i%4]);
		 arcs[i].turnOff();
	};

   	startButton = createButton('start');
   	startButton.position(100,700);
   	startButton.mousePressed(startGame);

		// for(var i=0;i<numPlayers;i++) {
		// 	playerButtons[i] = createButton('player '+ (i+1));
		// 	playerButtons[i].position(300+(300*i),700);
		// 	playerButtons[i].mousePressed(playerTrigger.bind(this,i));
		// }



  	//env = new p5.Env(t1, l1, t2, l2, t3, l3);
  	env = new p5.Env();
		env.setADSR(0.01,0.1,0.5,0.01)
		env.setRange(1.0,0);
   	osc = new p5.Oscillator();
  	osc.setType('sine');
  	osc.freq(240);
  	osc.amp(env);
  	osc.start();


	textSize(32);
	fill(200,0,0);
	text("MY NAME IS SIMON.",350,100);  
	text("DO YOU WANT TO PLAY A GAME?",260,220);
	text("PRESS START TO PLAY",330,620);

   	// startButton.style("")
}



function startGame() {
	startGameSound.play();
	startButton.style("display", "none");
	 background(0);
	 
	sequence = [];
	chooseFrom = [];
	pickedNums = [];
	playerResponses = [];
	currentRound = 1;
	scoreboard.innerHTML = "round " + currentRound;
	setTimeout(nextRound,500);
}	



function playerTrigger(index){
	if(!sequencePlaying) {
		if(index === sequence[checkAnswerCounter]) {
			trigArc(index);
			playerResponses.push(index);
			checkAnswerCounter = checkAnswerCounter + 1;
			if(playerResponses.length === sequence.length) {
				playerResponses = [];
				currentRound = currentRound +1;
				
				scoreboard.innerHTML = "round " + currentRound;
				nextRound();
			}
		}
		else {
			wrongAnswerSound.play();
			setTimeout(loseGame,500);
			textSize(32);
			fill(200,0,0);
			text("YOU HAVE BEEN DEFEATED BY SIMON.",200,250);  
			text("TO TRY AGAIN PRESS START",270,600);
			scoreboard.innerHTML = "";
			gamePaused = true;
			setTimeout(showStartButton,1000);
		}

	}

}

function loseGame() {
	loseGameSound.play();
}

function showStartButton () {
	startButton.style("display", "inline-block");
}


function addStep(sequence) {

	setChooseFrom();

	var pickedNum = chooseFrom[Math.floor(Math.random() * chooseFrom.length)];


	pickedNums.push(pickedNum);
	sequence.push(pickedNum);
	return sequence
}

function setChooseFrom() {
		if(pickedNums.length < allNums.length) {
		chooseFrom = allNums.filter((num)=>{
			return !pickedNums.includes(num)
		})
	}
	else {
		chooseFrom = allNums;
	}
}

function nextRound() {
	gamePaused = false;
	sequencePlaying = true;
	checkAnswerCounter = 0;
	memoryCounter = 0;
	sequence = addStep(sequence);
	 // console.log("sequence: " + sequence);

	 setTimeout(function() {
	 	thisRound = setInterval(trigArc, tempo);
	 },tempo);
}


function trigArc(player) {
	var currentArc = typeof player != 'undefined'? player : sequence[memoryCounter];
	// var currentArc = sequence[memoryCounter];
	arcs[currentArc].turnOn();
	playSound(currentArc);
	memoryCounter++;
	if(memoryCounter == sequence.length) {

		clearInterval(thisRound);
		sequencePlaying = false;
		// setTimeout(nextRound, tempo);

		//setTimeout(awaitResponse, tempo);
	}
}


function playSound(index) {
	osc.freq(freqs[index]
		);
	env.play(osc);
}

function awaitResponse() {
	fill(210,110,20);
	rect(width-110,0,100,1000);
	// shrinkTimer = setInterval()
}

var ArcButton = function (id,x,y,diameter,start_arc,end_arc) {

	this.id = id;
	this.x = x;
	this.y = y;
	this.diameter = diameter;
	this.centerD = 150;
	this.start_arc = start_arc;
	this.end_arc = end_arc;
	this.onColor = [int(random(100,255)),int(random(100,255)),int(random(100,255))];
	// this.onColor = '#'+Math.floor(Math.random()*16777215).toString(16);
	this.offColor = 0;
	this.centerCircleFill = 20;
	this.clicked = false;


	this.turnOn = function() {

		console.log("in here");
	  	fill(this.onColor);
 	  	arc(this.x, this.y, this.diameter, this.diameter, this.start_arc, this.end_arc);
 	  	fill(this.centerCircleFill+100);
 	  	ellipse(width/2, height/2, this.centerD+40);
 	  	fill(this.centerCircleFill);
 	  	ellipse(width/2, height/2, this.centerD);
 	  	setTimeout(this.turnOff,tempo/2);

	},

	this.turnOff = function(){
		fill(this.offColor);
 	  	arc(this.x, this.y, this.diameter, this.diameter, this.start_arc, this.end_arc);
 	  	 	  	fill(this.centerCircleFill+100);
 	  	ellipse(width/2, height/2, this.centerD+40);
 	  	fill(this.centerCircleFill);
 	  	ellipse(width/2, height/2, this.centerD);
 	  	 	  	textSize(20);
		fill(200,0,0);
		
		 
	}

	this.turnOff = this.turnOff.bind(this);




}



function mousePressed() {
	if(!gamePaused) {
		var clicked = inCircle();
		if(clicked) {
			var pos = getRad();
			//var clickedArc = 10;
			var clickedArc = arcs.filter((arc,i) => (pos > arc.start_arc && pos < arc.end_arc),this);
			var player = clickedArc[0].id;
			playerTrigger(player);
		}
	}

}

var inCircle = function() {
	if(mouseX < 1000 && mouseX > 0 && mouseY < 800 && mouseY > 0) {


		if(dist(mouseX, mouseY, width/2, height/2) < diameter/2) {
			return true
		}
	}
}

function whichArc(pos) {
	arcs.filter((arc,i) => {

			if (pos > arc.start_arc && pos < arc.end_arc){
				console.log(arc.id);
				return arc.id
			}
			else {
				return 100
			}

		});
}



function getRad () {

	var deltaX = (width/2 - mouseX);
	var deltaY = (height/2 - mouseY);

	// In radians
	var rad =  Math.atan2(deltaY, deltaX) + Math.PI;
	// var deg = Math.round(rad * (180 / Math.PI)) //In degrees
	// console.log(degrees(rad));
	return rad
}

function revertColor(i) {

	arcs[i].fillColor = arcs[i].originalColor;
}




//boneyard

// function draw() {



// 	 background(0);
// //pacman
// //  fill([200,160,50]);
// //  arc(width/2-100, height/2-100, 200, 200, radians(40), radians(330));
// 	if(!paused) {



// 		for(var i=0; i<numPlayers; i++) {

//   		 	arcs[i].display();
//   		}
// 	}

// }

	// arcs.filter((arc,i) => {
	// 		if (pos > arc.start_arc && pos < arc.end_arc){
	// 			arc.clicked = true;
	// 			arc.fillColor = [0,0,0];
	// 			 setTimeout(revertColor.bind(this,i),1000);
	// 			return true
	// 		}
	// 		else
	// 		{
	// 			return false
	// 		};
	// 	}
