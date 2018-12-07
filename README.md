# FlappyBirdOnJavascript
Improved flappy bird learns through neuroevolution.
To start, open index.html on any browser and press s. Use the slider for making the training fast. Press b for seeing BEST TRAINED Bird. P5.js library used here for JavaScript. On the right hand side is the neural Network of the fittestBirdOfPreviousGame on top and fittestBirdinCurrentGame at bottom.
Except for the p5.min.js and p5.dom.js, the entire project is self made.
Crossover is not used.
the Selection of parents is based such the in the new generation only those members are to be passed whose fitness is more than the average fitness value of the entire previous Population.
Mutation rate is set to 0.01.
Fitness is designed such that the score as well as the distance between the nearest pipe and the bird is also taken into account.
