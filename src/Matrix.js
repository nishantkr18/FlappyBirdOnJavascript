function Matrix(r,c)
{
    this.r=r;
    this.c=c;
    this.m=[];
     for(let i=0; i<r; i++)
       {this.m[i]=[];}
  

  this.randomMatrix=function()
  {
    for(let i=0; i<this.r; i++){
      for(let j=0; j<this.c; j++){
        this.m[i][j]=random(2)-1;
      }
    }
  }

  // this.copyFromMatrix=function(m)
  // {
  //   for(let i=0; i<this.r; i++){
  //     for(let j=0; j<this.c; j++){
  //       this.m[i][j]=m[i][j];
  //     }
  //   }
  // }
  this.mutate=function()
  {
    for(let i=0; i<this.r; i++){
      for(let j=0; j<this.c; j++){
        let rdm=random(1);
        if(mutateRate>=rdm)
          {this.m[i][j]=this.m[i][j]+random(-0.1,0.1);}
      }
    }
  }

  this.equalsMatrix=function(w1)
  {
    for(let i=0; i<this.r; i++){
      for(let j=0; j<this.c; j++){
        if(this.m[i][j]!=w1.m[i][j])
            return false;
      }
    }
    return true;
  }

  this.copyMatrix=function(w1)
  {
      for(let i=0; i<this.r; i++){
      for(let j=0; j<this.c; j++){
        this.m[i][j]=w1.m[i][j];
            
      }
    }
  }


}


