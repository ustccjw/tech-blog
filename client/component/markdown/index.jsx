import React from 'react'
import Remarkable from 'react-remarkable'
import hljs from 'highlight.js'
import { unsafeScript } from '../../../util'
import 'highlight.js/styles/github'
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

const Markdown = props => {
	const { content, options } = props
	const remarkableProps = {
		source: unsafeScript(content),
		options: { ...CONFIG, ...options },
	}
	return (
		<ideal-markdown>
			<Remarkable {...remarkableProps} />
		</ideal-markdown>
	)
}

Markdown.propTypes = {
	content: React.PropTypes.string.isRequired,
	options: React.PropTypes.object,
}

export default Markdown
