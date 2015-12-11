import React from 'react'
import Remarkable from 'react-remarkable'
import hljs from 'highlight.js'
import { unsafeScript } from '../../../util'
import './style'

const CONFIG = {
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

export default class Markdown extends React.Component {
	static propTypes = {
		content: React.PropTypes.string.isRequired,
		options: React.PropTypes.object,
	}

	render() {
		const { content, options } = this.props
		const props = {
			source: unsafeScript(content),
			options: { ...CONFIG, ...options },
		}
		return (
			<ideal-markdown>
				<Remarkable {...props} />
			</ideal-markdown>
		)
	}
}
