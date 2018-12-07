let gen=1;
function popu()
{
	this.allDead=false;
	this.oldPop=[];
	this.newPop=[];
	print("once")
	for(let i=0; i<popL; i++)
		{
			this.oldPop[i]=new Bird();
		    this.newPop[i]=new Bird();
		    print("initialize")
		}
	this.fittest=new Bird();
	this.runningFittest=new Bird();
	this.bestRunSoFar=new Bird();


	this.update=function()
	{
		p.update();
		let count=0;
		for(let i=0; i<popL; i++)
		{
			this.oldPop[i].update();
			this.oldPop[i].calScore();
			
			
			if(this.oldPop[i].dead==true)
				{count++;}
		}
		this.fittest.update();
		this.fittest.calScore();
		this.findRunningFittest();

		if(count==popL&&this.fittest.dead==true)//all are dead
		{
			this.findFittest();
			this.genNewPop();
			this.rstAll();
		}
	}

	this.findRunningFittest=function()
	{
		this.runningFittest=new Bird();
		for(let i=0; i<popL; i++)
			{
				if(this.oldPop[i].fitness>this.runningFittest.fitness&&this.oldPop[i].dead==false)
					{
						this.runningFittest.copyBird(this.oldPop[i]);
					}
			}
		if(this.fittest.fitness>=this.runningFittest.fitness&&this.fittest.dead==false)
			{this.runningFittest.copyBird(this.fittest);}
		Score=this.runningFittest.fitness;
		if(Score>highestScore)
			{highestScore=Score;
				this.bestRunSoFar.copyBird(this.runningFittest);}
	}
	
	this.findFittest=function()
	{
		for(let i=0; i<popL; i++)
			{
				if(this.oldPop[i].fitness>=this.fittest.fitness)
					{
						let temp=new Bird();
						temp.copyBird(this.oldPop[i]);
						this.oldPop[i].copyBird(this.fittest);
						this.fittest.copyBird(temp);
					}
			}
		
	}

	this.genNewPop=function()
	{
		
		this.fitnessSum=0;
		for(let i=0; i<popL; i++)
			this.fitnessSum+=this.oldPop[i].fitness;

		this.avg=this.fitnessSum/popL;
		let j=0;let k=0;
		for(let i=0; i<popL; i++)
		{
			let diff=this.oldPop[i].fitness-this.avg;
			if(diff>0)
				{
					this.oldPop[k].copyBird(this.oldPop[i]);
					this.oldPop[k].fitness=diff;
					k++;
				}
			else
				{j++;}
		}
		for(let i=0; i<j; i++)
			{this.oldPop[popL-1-i].copyBrain(this.fittest);
				this.oldPop[popL-1-i].mutate();
			}


		// for(let i=0; i<popL; i++)
		// 	print(this.oldPop[i].fitness);


		this.fitnessSum=0;
		for(let i=0; i<popL-j; i++)
			this.fitnessSum+=this.oldPop[i].fitness;

		let baby;
		for(let i=0; i<popL-j; i++)
		{
			baby=new Bird();
			baby.copyBrain(this.selectParent(j));
			baby.mutate();
			this.newPop[i].copyBrain(baby);
		}
		for(let i=0; i<popL-j; i++)
			{
				this.oldPop[i].copyBrain(this.newPop[i]);
			}
	}

	this.selectParent=function(j)
	{
		let rdm=random(this.fitnessSum);
		let runningSum=0;
		for(let i=0; i<popL-j; i++)
		{
			runningSum+=this.oldPop[i].fitness;
			if(runningSum>=rdm)
      			{return this.oldPop[i];}
		}
		print("ERROR!!!!!!!!!!!!!!!!");
	}
	this.rstAll=function()
	{
		p=new pipes();
		gen++;
		for(let i=0; i<popL; i++)
			{this.oldPop[i].resetBird();
			this.newPop[i].resetBird();}
		this.fittest.resetBird();
		this.runningFittest.resetBird();
		this.allDead=false;
		this.bestRunSoFar.dead=true;
		print("next generation");
	}

	this.show=function()
	{
		p.show();
		for(let i=0; i<popL; i++)
			this.oldPop[i].show(20,20,200);
		
		this.runningFittest.show(20,200,20);
		this.fittest.show(200,20,20);
		this.fittest.nn.showNN(700,50,200,20,20,this.fittest.w1,this.fittest.w2);
		this.runningFittest.nn.showNN(700,250,20,200,20,this.runningFittest.w1,this.runningFittest.w2);
		print(highestScore)
	}

}