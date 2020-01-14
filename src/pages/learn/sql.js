import React from "react"
import styles from "../../components/learn-sql.module.css"
import Helmet from 'react-helmet'

export default () => (
	<div>
		<Helmet>
    		<body id={styles.sqlbod} />
		</Helmet>
		<div d={styles.sqlmain}>
			<h1>
				Learn About Relational Databases with MySQL
			</h1>
			<p>
				In this tutorial, we will create a MySQL database with a table 
				to hold data about fictional characters, and learn how to write 
				queries to access our data.
			</p>
			<h2>
				Getting Started
			</h2>
			<ul>
				<li>
					<a href="https://dev.mysql.com/downloads/mysql/" target="_blank">
						Download MySQL 
					</a>
					<br/>
					Be sure to get the community version. You do not need to make any kind of account.
				</li>
				<li>
					<a href="https://dev.mysql.com/downloads/workbench/" target="_blank">
						Download MySQL Workbench
					</a>
				</li>
			</ul>
			<h2>
				Building the Project
			</h2>
			<iframe src=""/>
			<h2>
				More Resources
			</h2>
			<ul>
				<li>
					<a href="https://www.w3schools.com/sql/default.asp" target="_blank">
						w3schools SQL reference
					</a>
				</li>
				<li>
					<a href="https://www.codecademy.com/learn/learn-sql" target="_blank">
						Free Codecademy intro to SQL course
					</a>
				</li>
				<li>
					<a href="https://www.hackerrank.com/domains/sql" target="_blank">
						Hackerrank SQL practice problems
					</a>
				</li>
				<li>
					<a href="https://www.youtube.com/watch?v=7S_tz1z_5bA&t=88s" target="_blank">
						Tutorial video with MySQL Workbench
					</a>
				</li>
			</ul>
		</div>
	</div>
);


