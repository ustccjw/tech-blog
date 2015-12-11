import React from 'react'
import Article from '../../component/article'
import { dataModel } from '../../../model'

export default class ArticleContainer extends React.Component {
	static propTypes = {
		params: React.PropTypes.object,
		article: React.PropTypes.object,
	}

	static async loadProps(params, cb) {
		try {
			const { number } = params
			const content = await dataModel.getValue(['articleByNumber',
				number, 'content'])
			const article = { content }
			cb(null, { article })
		} catch (err) {
			console.error(err.message)
			cb(err)
		}
	}

	static childContextTypes = {
		reload: React.PropTypes.func,
	}

	getChildContext() {
		const { reloadAsyncProps } = this.props
		return {
			reload: () => reloadAsyncProps(),
		}
	}

	render() {
		const { article } = this.props
		const props = { article }
		return <Article { ...props } />
	}
}
