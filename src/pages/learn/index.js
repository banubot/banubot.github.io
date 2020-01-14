import { Link } from "gatsby"
import React from "react"
import styles from "../../components/learn.module.css"
import Helmet from 'react-helmet'

export default () => (
	<div>
		<Helmet>
    		<body id={styles.learnbod} />
		</Helmet>
		<div id={styles.main}>
			<h1>Programming Tutorials</h1>
			<a href="/learn/python/">
				Python
			</a>
			<br/>
			<Link to="/learn/java/">
				Java
			</Link>
			<br/>	
			<Link to="/learn/springboot">
				Spring Boot
			</Link>
			<br/>	
			<Link to="/learn/web">
				Static Websites (HTML/CSS)
			</Link>
			<br/>	
			<Link to="/learn/sql">
				Databases (MySQL)
			</Link>
		</div>
	</div>
);


