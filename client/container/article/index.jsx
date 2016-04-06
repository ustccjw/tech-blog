import React from 'react'
import Article from '../../component/article'

import { loadProps } from '../../action/article'

const ArticleContainer = props => {
	const { article } = props
	const articleProps = { article }
	return <Article {...articleProps} />
}

ArticleContainer.propTypes = {
	article: React.PropTypes.object,
}

ArticleContainer.loadProps = loadProps

export default ArticleContainer
