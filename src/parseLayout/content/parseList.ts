import { nodeNames } from '../../common/nodeNames'
import ArticleType from '../../types/articleType'
import parseParagraph from './parseParagraph'

function parseList(listFrame: FrameNode, hasOffset: boolean): null | ArticleType.List {
	const listInstanceName = listFrame.name === nodeNames.contentDotsList ? 'dots' : 'numbers'

	return {
		type: 'list',
		listType: listInstanceName,
		children: getListItems(listFrame.children),
	}
}

export default parseList

function getListItems(listChildren: readonly SceneNode[]) {
	const paragraphs: ArticleType.Paragraph[] = []

	listChildren.forEach((childNode) => {
		if (childNode.name !== nodeNames.contentParagraph || childNode.type !== 'INSTANCE') {
			return
		}

		const paragraph = parseParagraph(childNode, false)
		if (!paragraph) return

		paragraphs.push(paragraph)
	})

	return paragraphs
}
