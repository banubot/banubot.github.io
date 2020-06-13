import React from "react"
import styles from "../../components/learn-java.module.css"
import Helmet from 'react-helmet'

export default () => (
	<div>
		<Helmet>
    		<body id={styles.javabod} />
		</Helmet>
		<div d={styles.javamain}>
			<h1>
				Learn Java
			</h1>
			<p>
				In this tutorial, we will create the popular wordgame <a href="https://en.wikipedia.org/wiki/Mad_Libs" target="_blank">
					Madlibs
				</a>
				.
			</p>
			<h2>
				Getting Started
			</h2>
			<ul>
				<li>
					<a href="https://www.java.com/ES/download/" target="_blank">
						Download Java
					</a>
				</li>
				<li>
					<a href="https://www.jetbrains.com/idea/download/" target="_blank">
						Download IntelliJ
					</a>
				</li>	
			</ul>
			<h2>
				Building the Project
			</h2>
			<a href="https://github.com/banubot/intro-java-madlibs" target="_blank">
				Finished project code
			</a>
			<h2>
				More Resources
			</h2>
			<ul>
				<li>
					<a href="https://docs.oracle.com/en/java/javase/13/docs/api/index.html" target="_blank">
						Oracle Java documentation
					</a>
				</li>
				<li>
					<a href="https://www.hackerrank.com/domains/java" target="_blank">
						hackerrank practice problems
					</a>
				</li>
				<li>
					<a href="https://www.codecademy.com/learn/learn-java" target="_blank">
						Free Codecademy intro to Java course
					</a>
				</li>
			</ul>
		</div>
	</div>
);


