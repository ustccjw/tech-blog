import React from 'react'
import Remarkable from 'react-remarkable'
import hljs from 'highlight.js'
import './style'

export default class Markdown extends React.Component {
	static propTypes = {
		content: React.PropTypes.string,
	}

	render() {
		const { content } = this.props
		const options = {
			// html: true,
			xhtmlOut: true,
			linkify: true,
			typographer: true,
			highlight: (str, lang) => {
				if (lang && hljs.getLanguage(lang)) {
					try {
						return hljs.highlight(lang, str).value
					} catch (err) {}
				}
				try {
					return hljs.highlightAuto(str).value
				} catch (err) {}
				return ''
			},
		}
		const props = { source: content, options }
		return (
			<ideal-markdown>
				<Remarkable {...props} />
			</ideal-markdown>
		)
	}
}
