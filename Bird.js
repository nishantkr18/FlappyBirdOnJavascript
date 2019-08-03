let _in=5,_hn=5;
function Bird()
{
  this.fitness=0;
  this.nn=new MyNN(_in,_hn,1);
  this.w1=new Matrix(_hn,_in+1);
  this.w2=new Matrix(1,_hn+1);
  this.w1.randomMatrix();
  this.w2.randomMatrix();
  this.yourHighest=0;
  this.yourTries=1;
  
  this.radius=diameter;
  this.x=50;
  this.y=height/2;
  this.vel=0;
  this.dead=false;

  this.updateIndividual=function()
  {
    if(this.dead==true)
    {
      this.resetBird();
      p2=new pipes();
    }
    p2.update();
    Score=this.fitness;
    let pipeNo;
    if(this.x>p2.P[0].x+p2.P[0].girth/2)
      pipeNo=1;
    else
      pipeNo=0;

    let yLocation=p2.P[pipeNo].y;
    this.inputs=[(this.vel+upVel)/(upVel+sqrt(2*gravity*height)),this.y/height,p2.P[pipeNo].x/width,p2.P[pipeNo].top[1]/height,p2.P[pipeNo].bottom[1]/height];
    //let inputs=[1,2,3,4];
    let result=this.nn.predict(this.inputs,this.w1,this.w2);
    // print(this.y,p.P[0].x,p.P[0].top[1],p.P[0].bottom[1]);
    // print("result is "+result)
   if(result>=0.5)
      this.jmp();

    // 5print(result)
    if(this.dead==false){
      this.fitness++;
      if(this.y>=height||this.y<=0||this.hit(p2)==true)
          {this.dead=true;}
    }

    if(this.dead==false){
    this.y+=this.vel;
    this.vel+=gravity;}

  }




  this.copyBird=function(_b)
  {
    this.fitness=_b.fitness;
    this.copyBrain(_b);
    this.nn.copyNN(_b.nn);
    this.dead=_b.dead;
    this.vel=_b.vel;
    this.x=_b.x;
    this.y=_b.y;
    this.radius=_b.radius;
  }

  this.resetBird=function()
  {
    this.fitness=0;
    this.y=height/2;
    this.vel=0;
    this.dead=false;
  }

  this.show=function(R,G,B)
  {
    if(this.dead==false){
//     fill(R,G,B,100);
    image(android,this.x,this.y,this.radius, this.radius);}
  }
  this.calScore=function()
  {
     if(this.dead==false)
      this.fitness+=speed;
  }


  this.update=function()
  {
    //I made the biggest mistake here by placing this line outside this update function that is in the constructor function
    let nearestPipe;
    if(this.x>p.P[0].x+p.P[0].girth/2)
      nearestPipe=p.P[1];
    else
      nearestPipe=p.P[0];

    let yLocation=nearestPipe.y;
    this.inputs=[(this.vel+upVel)/(upVel+sqrt(2*gravity*height)),this.y/height,nearestPipe.x/width,nearestPipe.top[1]/height,nearestPipe.bottom[1]/height];
    //let inputs=[1,2,3,4];
    let result=this.nn.predict(this.inputs,this.w1,this.w2);
    // print(this.y,p.P[0].x,p.P[0].top[1],p.P[0].bottom[1]);
    // print("result is "+result)
   if(result>=0.5)
      this.jmp();

    // 5print(result)
    if(this.dead==false){
      if(this.y>=height||this.y<=0||this.hit(p)==true)
          {this.dead=true;this.calFinalFitness(yLocation);}
    }

    if(this.dead==false){
    this.y+=this.vel;
    this.vel+=gravity;}

    
  }

  this.jmp=function()
  {
      this.vel=-upVel;
  }

  this.hit=function(p)
  {
    if(p.P[0].top[0]<this.x&&p.P[0].top[2]>this.x)
    {
      if(this.y-this.radius/2<p.P[0].top[1]||this.y+this.radius/2>p.P[0].bottom[1])
        return true;

    }
    return false;
  }

  this.copyBrain=function(someBird)
  {
    this.w1.copyMatrix(someBird.w1);
    this.w2.copyMatrix(someBird.w2);
  }

  this.mutate=function()
  {
    this.w1.mutate();
    this.w2.mutate();
  }

  this.calFinalFitness=function(yLocation)
  {
    let val=1-(abs(yLocation-this.y)/height);
    val=val*this.fitness;
    this.fitness+=val;
    ///print(val,this.fitness);
  }
}
