import { Link } from "gatsby"
import React from "react"
import styles from "../components/main.module.css"
import Helmet from 'react-helmet'

export default () => (
	<div>
	<Helmet>
    		<body id={styles.mainbod} />
	</Helmet>
	<div id={styles.main}>
		<h1>Hannah Parraga</h1>
		<a href="/flashcards/">
			Flashcards
		</a>
		<br/>
		<Link to="/translations/">
			Translations
		</Link>
		<br/>	<Link to="/learn/">
			Programming Tutorials
		</Link>
		<br/>
		<a href="https://milas-icecream-parlour.appspot.com">
			Mila's Icecream Parlour
		</a>
		<br/>
		<a href="https://github.com/banubot">
			<img src="github.png" alt=""/>
		</a>
		<a href="https://instagram.com/banubot">
			<img src="insta.png" alt=""/>
		</a>
	</div>
	</div>
);


