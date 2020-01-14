import React from "react"
import {Link} from "gatsby"
import styles from "../../components/learn-spring.module.css"
import Helmet from 'react-helmet'

export default () => (
	<div>
		<Helmet>
    		<body id={styles.springbod} />
		</Helmet>
		<div d={styles.springmain}>
			<h1>
				Learn Spring Boot
			</h1>
			<p>
				In this tutorial, we will create a REST API and connect to a database
				using Spring Boot, a powerful Java framework.
			</p>
			<h2>
				Getting Started
			</h2>
			<ul>
				<li>
					You should know
					<Link to="/learn/java">
						 Java
					</Link>
					. We will use a local MySQL database
					<Link to="/learn/sql">
						 created here 
					</Link>
					.
				</li>
				<li>
					<a href="https://www.jetbrains.com/idea/download/" target="_blank">
						Download IntelliJ
					</a>
				</li>
				<li>
					<a href="https://www.getpostman.com/downloads/" target="_blank">
						Download Postman
					</a>
				</li>
				<li>
					<a href="https://github.com/banubot/learn-springboot/blob/master/pom.xml" target="_blank">
						Add Maven dependencies to your project
					</a>
				</li>
			</ul>
			<h2>
				Building the Project
			</h2>
			<a href="https://github.com/banubot/learn-springboot" target="_blank">
				Finished project code
			</a>
			<iframe src=""/>
			<h2>
				More Resources
			</h2>
			<ul>
				<li>
					<a href="https://www.youtube.com/watch?v=Ke7Tr4RgRTs&t=2259s" target="_blank">
						Spring Boot YouTube Tutorial
					</a>
				</li>
			</ul>
		</div>
	</div>
);


