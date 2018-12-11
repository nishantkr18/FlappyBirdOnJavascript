function pipe()
{
	this.speed=speed;
	this.gap=pipeGap;
	this.girth=pipeGirth;
	this.dead=false;
	this.x=width;
	this.y=random(this.gap,height-this.gap);

	

	this.show=function()
	{
		
		fill(10,255,10);
		rect(this.x-this.girth/2,0,this.girth,this.y-this.gap/2);
		rect(this.x-this.girth/2,this.y+this.gap/2,this.girth,height-this.y-this.gap/2);
	}


	this.move=function()
	{
		this.top=[this.x-this.girth/2,this.y-this.gap/2,this.x+this.girth/2,this.y-this.gap/2];
		this.bottom=[this.x-this.girth/2,this.y+this.gap/2,this.x+this.girth/2,this.y+this.gap/2];

		this.x-=this.speed;
		if(this.x+this.girth/2<=0)
			this.dead=true;
	
	}
}
function pipes()
{
	this.gapBetPipes=gapBetPipes;
	this.P=[new pipe()];

	this.show=function()
	{
		for(let i=0; i<this.P.length; i++){this.P[i].show();}
	}
	this.update=function()
	{
		let i;
		for(i=0; i<this.P.length; i++)
			{
				this.P[i].move();
			}

		if(width-this.P[i-1].x>=this.gapBetPipes)
			{this.P.push(new pipe());}

		if(this.P[0].dead==true)
				{this.P.splice(0,1)}

	}

}