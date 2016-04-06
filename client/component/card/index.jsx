import React from 'react'
import { Link } from 'react-router'
import Markdown from '../markdown'

import './style'

const Card = props => {
	const { article } = props
	const { introduction, number } = article
	return (
		<ideal-card>
			<Markdown content={introduction} />
			<Link to={`/articles/${number}/`}>View More</Link>
		</ideal-card>
	)
}

Card.propTypes = {
	article: React.PropTypes.object.isRequired,
}

export default Card
