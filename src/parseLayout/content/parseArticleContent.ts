import { nodeNames } from '../../common/nodeNames'
import ArticleType from '../../types/articleType'
import getOffsetSize from './getOffsetSize'
import parseHeader from './parseHeader'
import parseParagraph from './parseParagraph'

function parseArticleContent(articleContentNode: FrameNode) {
	const content: ArticleType.Content = []

	articleContentNode.children.forEach((node, i) => {
		const hasOffset = getOffsetSize(articleContentNode.children[i - 1])

		if (node.name === nodeNames.contentHeader && node.type === 'INSTANCE') {
			const header = parseHeader(node)
			if (!header) return

			content.push(header)
		} else if (node.name === nodeNames.contentParagraph && node.type === 'INSTANCE') {
			const paragraph = parseParagraph(node, hasOffset)
			if (!paragraph) return

			content.push(paragraph)
		}
	})

	return content
}

export default parseArticleContent
