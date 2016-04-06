import React from 'react'
import Markdown from '../markdown'

import './style'

const Article = props => {
	const { article } = props
	const { content } = article
	return (
		<ideal-article>
			{article && <Markdown content={content} />}
		</ideal-article>
	)
}

Article.propTypes = {
	article: React.PropTypes.object.isRequired,
}

export default Article
