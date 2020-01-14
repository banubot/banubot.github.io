import React from "react"
import styles from "../../components/learn-python.module.css"
import Helmet from 'react-helmet'

export default () => (
	<div>
		<Helmet>
    		<body id={styles.pythonbod} />
		</Helmet>
		<div d={styles.pythonmain}>
			<h1>
				Learn Python
			</h1>
			<p>
				In this tutorial, we will create the game tic tac toe 
				to learn basic programming concepts and become familiar with Python syntax. 
			</p>
			<h2>
				Getting Started
			</h2>
			<ul>
				<li>
					<a href="https://www.python.org/downloads/" target="_blank">
						Download Python
					</a>
				</li>
			</ul>
			<h2>
				Building the Project
			</h2>
			<a href="https://github.com/banubot/intro-python-tictactoe" target="_blank">
				Finished project code
			</a>
			<br/>
			<iframe src=""/>
			<h2>
				More Resources
			</h2>
			<ul>
				<li>
					<a href="https://docs.python.org/3/tutorial/" target="_blank">
						Tutorial from python.org
					</a>
				</li>
				<li>	
					<a href="https://www.hackerrank.com/domains/python" target="_blank">
						hackerrank practice problems
					</a>
				</li>
				<li>
					<a href="https://www.codecademy.com/learn/learn-python" target="_blank">
						Free Codecademy intro to Python course
					</a>
					<br/>
					Note: uses Python version 2, which has some small differences
				</li>
				<li>
					<a href="https://www.w3schools.com/python/python_intro.asp" target="_blank">
						w3schools Python tutorial
					</a>
				</li>
				<li>
					<a href="https://web.itu.edu.tr/hulyayalcin/MAK230E_PythonProgramming/%5B2014%5D%5BShaw%5DLEARNPYTHONTHE%20HARDWAY.pdf" target="_blank">
						Learn Python the Hard Way PDF
					</a>
				</li>
				<li>
					<a href="https://www.youtube.com/watch?v=ZDa-Z5JzLYM" target="_blank">
						object oriented Python YouTube tutorial
					</a>
				</li>		
				<li>
					<a href="https://web.itu.edu.tr/hulyayalcin/MAK230E_PythonProgramming/%5B2014%5D%5BShaw%5DLEARNPYTHONTHE%20HARDWAY.pdf" target="_blank">
						Python Data Science Tutorial
					</a>
				</li>
			</ul>
			<h2>
				Cool Stuff That Uses Python
			</h2>
			<ul>
				<li>
					<a href="https://www.raspberrypi.org/" target="_blank">
						Raspberry Pi for hardware hacks
					</a>
				</li>
				<li>
					<a href="https://www.scipy.org/" target="_blank">
						SciPy libraries for math and science 
					</a>
				</li>
				<li>
					Machine Learning
					<br/>
					<a href="https://spacy.io/" target="_blank">
						spaCy for natural language processing
					</a>
					<br/>
					<a href="https://pypi.org/project/opencv-python/" target="_blank">
						openCV for computer vision
					</a>
				</li>
			</ul>
		</div>
	</div>
);


