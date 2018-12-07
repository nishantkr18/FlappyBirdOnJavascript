function ln(x1,y1,x2,y2,R,G,B,w)
{
  stroke(R,G,B,w);
  strokeWeight(4);
  line(x1,y1,x2,y2);
}

function MyNN(iNode,hn,on)
{
  this.I=[];
  this.H=[];
  this.O=[];
  this.iNode=iNode;
  this.hn=hn;
  this.on=on;

  this.copyNN=function(_nn)
  {
    this.iNode=_nn.iNode;
    this.hn=_nn.hn;
    this.on=_nn.on;
    for(let i=0; i<this.iNode; i++)
      this.I[i]=_nn.I[i];
    for(let i=0; i<this.hn; i++)
      this.H[i]=_nn.H[i];
    for(let i=0; i<this.on; i++)
      this.O[i]=_nn.O[i];


  }
  
  this.predict=function(inputs,w1,w2)
  {
    for(let i=0; i<inputs.length; i++)
      {this.I[i]=inputs[i];}    //print(a,b,c,d)
    this.genHnode(w1);
    this.genOnode(w2);
    return this.O[0];
  }
  
  this.showNN=function(startOfNNx,startOfNNy,R,G,B,w1,w2)
  {
    let gapBetLayers=100;
    let horizontalGap=40;
    for(let i=0; i<this.iNode; i++)
    {
      for(let j=0; j<this.hn; j++)
      {let color=[];
        if(w1.m[j][i]<=0)color=[255,0];else color=[0,255];
        ln(startOfNNx,startOfNNy+i*horizontalGap,startOfNNx+gapBetLayers,startOfNNy+j*horizontalGap,color[0],color[1],0,map(abs(w1.m[j][i]),0,1,0,255));
      }
    }

    for(let i=0; i<this.hn; i++)
    {
      for(let j=0; j<this.on; j++)
      {let color=[];
        if(w2.m[j][i]<=0)color=[255,0];else color=[0,255];
        ln(startOfNNx+gapBetLayers,startOfNNy+i*horizontalGap,startOfNNx+gapBetLayers*2,startOfNNy+floor(this.hn/2)*horizontalGap,color[0],color[1],0,map(abs(w2.m[j][i]),0,1,0,255));
      }
    }



    stroke(0);
    strokeWeight(1);



    let Color;
    for(let i=0; i<this.iNode; i++)
    { Color=map(this.I[i],0,1,0,255);
      fill(R,G,B,Color);
    ellipse(startOfNNx,startOfNNy+i*horizontalGap,20);}

    for(let i=0; i<this.hn; i++)
    { Color=map(this.H[i],0,1,0,255);
      fill(R,G,B,Color);
    ellipse(startOfNNx+gapBetLayers,startOfNNy+i*horizontalGap,20);}

    Color=map(this.O[0],0,1,0,255);
    // fill(0,255,0,Color);
    if(this.O[0]>=0.5)
      fill(0,0,255);
    else
      fill(R,G,B,Color);
    ellipse(startOfNNx+gapBetLayers*2,startOfNNy+floor(this.hn/2)*horizontalGap,20);
  }

  
  this.genHnode=function(w1)
  {
    for(let i=0; i<hn; i++)
    {this.H[i]=0;
      for(let j=0; j<iNode; j++)
      {
        this.H[i]+=(w1.m[i][j]*this.I[j]);
      }
      this.H[i]+=w1.m[i][iNode];
      this.H[i]=1/(1+Math.exp(-this.H[i]));
    }
  }
  this.genOnode=function(w2)
  {
    for(let i=0; i<on; i++)
    {this.O[i]=0;
      for(let j=0; j<hn; j++)
      {
        this.O[i]+=(w2.m[i][j]*this.H[j]);
      }
      this.O[i]+=w2.m[i][hn];
      this.O[i]=1/(1+Math.exp(-this.O[i]));
    }
  }
  
  
  
}
