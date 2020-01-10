import React from "react"
import styles from "../../components/translations.module.css"
import { StaticQuery, graphql } from "gatsby"
import Helmet from 'react-helmet'

export default () => (
	<center>
		<Helmet>
    		<body className={styles.poembod} />
		</Helmet>
		<h1 id={styles.poemsTitle}>Poetry in Translation</h1>
		<StaticQuery
					query={
						graphql`
						  query PoemQuery {
							allPoemsJson {
							  edges {
								node {
									author
									rus
									eng
								}
							  }
							}
						  }
				`}
				render={data => (
					<div>
						{getPoemInfo(data)}
					</div>
				)}
			  />
	</center>
)

function getPoemInfo(data) {
	let col1 = [];
	let col2 = [];
	let i = 0;
	data.allPoemsJson.edges.forEach(item => {
		let imgSrc = "../poetPics/" + item.node.author + ".jpg";
		let img = <img src={imgSrc} alt="pic" className={styles.authors} />;
		let p = <p className={styles.text}
				onMouseOver={(event) => event.target.innerHTML = item.node.eng}
			onMouseLeave={(event) => event.target.innerHTML = item.node.rus}>
				{item.node.rus}
			</p>;
		if (i % 2 === 0) {
			col1.push(p);
		    col2.push(img);
		} else {
			col1.push(img);
			col2.push(p);
		}
		i++;
	});	
	col1 = col1.map((r) => <div>{r}</div>);
	col2 = col2.map((i) => <div>{i}</div>);
	return	<div className={styles.row}>
				<div className={styles.column}>
					{col1}
				</div>
				<div className={styles.column}>
					{col2}	
				</div>
			</div>;
}
