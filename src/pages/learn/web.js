import React from "react"
import styles from "../../components/learn-web.module.css"
import Helmet from 'react-helmet'

export default () => (
	<div>
		<Helmet>
    		<body id={styles.webbod} />
		</Helmet>
		<div d={styles.webmain}>
			<h1>
				Make Your Own Website with HTML/CSS 
			</h1>
			<p>
				In this tutorial, we will create a static web page using HTML and CSS, hosted for free using GitHub Pages  
			</p>
			<h2>
				Getting Started
			</h2>
			<ul>
				<li>
					<a href="https://www.java.com/ES/download/" target="_blank">
						Make a GitHub account
					</a>
				</li>
			</ul>
			<h2>
				Building the Project
			</h2>
			<a href="https://github.com/banubot/learn-web" target="_blank">
				Finished project code
			</a>
			<h2>
				More Resources
			</h2>
			<ul>
				<li>
					<a href="https://www.w3schools.com/" target="_blank">
						w3schools
					</a>
				</li>
				<li>
					<a href="https://www.w3schools.com/cssref/css_colors.asp" target="_blank">
						CSS colour names
					</a>
				</li>
			</ul>
		</div>
	</div>
);


