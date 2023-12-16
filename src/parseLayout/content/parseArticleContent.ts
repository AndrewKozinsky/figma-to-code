import { nodeNames } from '../../common/nodeNames'
import ArticleType from '../../types/articleType'
import parseCustomComponent from './customComponent'
import getOffsetSize from './getOffsetSize'
import parseHeader from './parseHeader'
import parseList from './parseList'
import parseNote from './parseNote'
import parseParagraph from './parseParagraph'

function parseArticleContent(nodes: readonly SceneNode[]) {
	const content: ArticleType.Content = []

	nodes.forEach((node, i) => {
		const hasOffset = getOffsetSize(nodes[i - 1])

		if (node.name === nodeNames.contentHeader && node.type === 'INSTANCE') {
			const header = parseHeader(node)
			if (!header) return

			content.push(header)
		} else if (node.name === nodeNames.contentParagraph && node.type === 'INSTANCE') {
			const paragraph = parseParagraph(node, hasOffset)
			if (!paragraph) return

			content.push(paragraph)
		} else if (
			[nodeNames.contentDotsList, nodeNames.contentNumbersList].includes(node.name) &&
			node.type === 'FRAME'
		) {
			const list = parseList(node, hasOffset)
			if (!list) return

			content.push(list)
		} else if (
			[nodeNames.contentGrayNote, nodeNames.contentYellowNote].includes(node.name) &&
			node.type === 'FRAME'
		) {
			const note = parseNote(node)
			if (!note) return

			content.push(note)
		} else {
			content.push(parseCustomComponent(node))
		}
	})

	return content
}

export default parseArticleContent
