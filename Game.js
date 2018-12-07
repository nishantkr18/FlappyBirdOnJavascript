const popL=800;
const mutateRate=0.01;
const gravity=0.8;
const upVel=8;
const pipeGap=120;
const pipeGirth=50;
const speed=4;
const gapBetPipes=300;

let Score=0;
let highestScore=0;
let p,p2;let test;
let dummy=false,dummy2=false;
let slider;
function setup()
{
	createCanvas(900,500);
	p=new pipes();
	p2=new pipes();
	test=new popu();
	print("type 1 3 s p");
	slider=createSlider(1,100,1);
}

function draw()
{
	if(dummy==true)
	{
		for(let i=0; i<slider.value(); i++){
		test.update();
		}
		background(100);
		test.show();
	}
	if(dummy2==true)
	{
		for(let i=0; i<slider.value(); i++){
		test.bestRunSoFar.updateIndividual();
		}
		background(100);
		p2.show();
		test.bestRunSoFar.show(200,200,20);
		test.bestRunSoFar.nn.showNN(700,50,200,200,20,test.bestRunSoFar.w1,test.bestRunSoFar.w2);
	}
	
}
function keyPressed()
{
	for(let _i='0'; _i<key; _i++)
		{
			background(100);
			test.update();
			test.show();
		}
	if(key=='s')
		{dummy=true;dummy2=false;}

	if(key=='p')
		{dummy=false;dummy2=false;}

	if(key=='b')
		{dummy=false;dummy2=true;}
}

