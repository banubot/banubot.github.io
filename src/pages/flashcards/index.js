/* Hannah Parraga
 * Russian flashcards website with cards taken
 * from the 10000 most common words (I deleted ones I know)
 */
import React, { Component } from "react"
import Helmet from 'react-helmet'
import styles from "../../components/flashcards-container.module.css"
import Card from './Card'

class Flashcards extends Component {
	render() {
		return (
			<div>
				<Helmet>
					<body className={styles.flashbod} />
				</Helmet>
				<Card/>
			</div>
		);
	}
}

export default Flashcards;

