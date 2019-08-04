let popL=800;
let mutateRate=0.01;
let gravity=0.6;
let upVel=6;
let pipeGap=120;
let pipeGirth=50;
let speed=3;
let gapBetPipes=250;
let diameter=30;

let gen=1;
let Score=0;
let highestScore=0;
let p,p2,p3;let test;
let dummy=false,dummy2=false,dummy3=false;
let HTMLelements;
let yourBird;

let bird_UP, bird_DOWN, bg, Pipe_UP, Pipe_DOWN;
function preload()
{
	bg = loadImage('bg.jpeg')
	bird_UP = loadImage('bird_UP.png');
	bird_DOWN = loadImage('bird_DOWN.png');
	Pipe_UP = loadImage('Pipe_UP.jpeg');
	Pipe_DOWN = loadImage('Pipe_DOWN.jpeg');
}

function setup()
{
	print("you can ask for or change:");
	print("popL, mutateRate, gravity, upVel");
	print("pipeGap, pipeGirth, speed, gapBetPipes and diameter");
	HTMLelements={
		canvas:createCanvas(800,400),
		resetGame:createButton('Reset Game'),
		H1:createElement('h1'),
		H2:createElement('h2'),
		H3:createElement('h2'),
		button:createButton(),
		pauseButton:createButton(),
		letMePlayButton:createButton(),
		SuperHumanLevel:createButton(),
		sliderVal:createElement('h4','Speed of Training: '),
		slider:createSlider(1,50,1)
	};
	HTMLelements.slider.size(400);
	resetGame();

	HTMLelements.resetGame.mousePressed(resetGame);
	HTMLelements.letMePlayButton.mousePressed(()=> {dummy=false; dummy2=false; dummy3=true});
	HTMLelements.SuperHumanLevel.mousePressed(()=> {speed = 15; gravity = 5; resetGame();});
	HTMLelements.pauseButton.mousePressed(()=> {dummy=false; dummy2=false; dummy3=false});
	HTMLelements.button.mousePressed(toggleButton);
	HTMLelements.slider.input(()=> HTMLelements.sliderVal.html('Speed of Training: '+HTMLelements.slider.value()));
	
}

function resetGame()
{
	background(255);
	gen=1;
	Score=0;
	highestScore=0
	p=new pipes();
	p2=new pipes();
	p3=new pipes();
	yourBird=new Bird();
	test=new popu();
	dummy=false,dummy2=false,dummy3=false; 

	HTMLelements.H1.html("Highest Score: "+highestScore);
	HTMLelements.H2.html('Score: '+Score);
	HTMLelements.H3.html('Generation: '+gen);
	HTMLelements.button.html('Start Training');
	HTMLelements.pauseButton.html('Stop All');
	HTMLelements.letMePlayButton.html('Let ME Play');
	HTMLelements.SuperHumanLevel.html('SuperHuman Level');	
}

function toggleButton()
{
	if(dummy==false)
	{
		dummy=true;dummy2=false;dummy3=false;test.bestRunSoFar.resetBird();p2=new pipes();
		HTMLelements.button.html('Run best so far');
	}
	else if(dummy==true&&dummy2==false)
	{
		dummy=false;dummy2=true;dummy3=false;HTMLelements.slider.value(1);
		HTMLelements.button.html('Start Training');
	}
}

function draw()
{
	
	if(dummy==true)
	{

		for(let i=0; i<HTMLelements.slider.value(); i++){
		test.update();
		}
		background(bg);
		test.show();
		HTMLelements.H1.html("Highest Score: "+highestScore);
		HTMLelements.H2.html('Score: '+Score);
		HTMLelements.H3.html('Generation: '+gen);
	}
	if(dummy2==true)
	{
		for(let i=0; i<HTMLelements.slider.value(); i++){
		test.bestRunSoFar.updateIndividual();
		}
		background(bg);
		p2.show();
		HTMLelements.H1.html("Score: "+Score);
		HTMLelements.H2.html("THIS IS THE BEST RUN SO FAR");
		HTMLelements.H3.html('Generation: '+gen);
		test.bestRunSoFar.show(2,20,200);
		test.bestRunSoFar.nn.showNN(625,50,200,200,20,test.bestRunSoFar.w1,test.bestRunSoFar.w2);
		if(test.bestRunSoFar.dead==true)
		{
			slep(1000);
			
		}
	}
	if(dummy3==true)
	{
		background(bg);
		p3.show();
		HTMLelements.H1.html("Your Highest Score: "+yourBird.yourHighest);
		HTMLelements.H2.html("Your Present Score: "+Score);
		HTMLelements.H3.html('Your tries: '+yourBird.yourTries);
		yourBird.show(200,20,200);
		if(yourBird.dead==true)
		{
			slep(1000);
			yourBird.yourTries++;
			yourBird.resetBird();
     		p3=new pipes();
		}
		if(yourBird.yourHighest<yourBird.fitness)
			{yourBird.yourHighest=yourBird.fitness;}

		p3.update();
   		Score=yourBird.fitness;

   		if(mouseIsPressed==true||keyIsPressed==true)
      	yourBird.jmp();

    	if(yourBird.dead==false){
      		yourBird.fitness++;
      		if(yourBird.y>=height||yourBird.y<=0||yourBird.hit(p3)==true)
         		 {yourBird.dead=true;}
    		}

    if(yourBird.dead==false){
    yourBird.y+=yourBird.vel;
    yourBird.vel+=gravity;}
	}
	
}

function slep(miliS)
			{let startingTime=new Date().getTime();
				while(true){if(new Date().getTime()-startingTime>=miliS)break;}
			}
// function keyPressed()
// {
// 	if(key>='0'&&key<='9'){
// 	for(let _i='0'; _i<key; _i++)
// 		{
// 			background(100);
// 			test.update();
// 			test.show();
// 		}
// 	}
// 	if(key=='s'||key=='S')
// 		{dummy=true;dummy2=false;test.bestRunSoFar.resetBird();p2=new pipes();}

// 	if(key=='p'||key=='P')
// 		{dummy=false;dummy2=false;}

// 	if(key=='b'||key=='B')
// 		{dummy=false;dummy2=true;HTMLelements.slider.value(1);}
// }

