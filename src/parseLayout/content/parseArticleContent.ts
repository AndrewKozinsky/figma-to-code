import { nodeNames } from '../../common/nodeNames'
import ArticleType from '../../types/articleType'
import parseCustomComponent from './customComponent'
import getOffsetSize from './getOffsetSize'
import parseExercises from '../exercises/parseExercises'
import parseFaq from './parseFaq'
import parseHeader from './parseHeader'
import parseList from './parseList'
import parseNote from './parseNote'
import parseParagraph from './parseParagraph'

function parseArticleContent(pageNode: FrameNode, artContentNodes: readonly SceneNode[]) {
	const content: ArticleType.Content = []

	let exerciseIdx = 0

	artContentNodes.forEach((artContentNode, i) => {
		if (!artContentNode.visible) return

		const hasOffset = getOffsetSize(artContentNodes[i - 1])

		if (artContentNode.name === nodeNames.contentHeader && artContentNode.type === 'INSTANCE') {
			const header = parseHeader(artContentNode)
			if (!header) return

			content.push(header)
		} else if (
			artContentNode.name === nodeNames.contentParagraph &&
			artContentNode.type === 'INSTANCE'
		) {
			const paragraph = parseParagraph(artContentNode, hasOffset)
			if (!paragraph) return

			content.push(paragraph)
		} else if (
			[nodeNames.contentDotsList, nodeNames.contentNumbersList].includes(
				artContentNode.name,
			) &&
			artContentNode.type === 'FRAME'
		) {
			const list = parseList(artContentNode, hasOffset)
			if (!list) return

			content.push(list)
		} else if (
			[nodeNames.contentGrayNote, nodeNames.contentYellowNote].includes(
				artContentNode.name,
			) &&
			artContentNode.type === 'FRAME'
		) {
			const note = parseNote(pageNode, artContentNode)
			if (!note) return

			content.push(note)
		} else if (
			artContentNode.name === nodeNames.contentExercise &&
			artContentNode.type === 'INSTANCE'
		) {
			const exercise = parseExercises(pageNode, exerciseIdx, hasOffset)
			exerciseIdx++
			if (!exercise) return

			content.push(exercise)
		} else if (
			artContentNode.name === nodeNames.contentFaq &&
			artContentNode.type === 'FRAME'
		) {
			const note = parseFaq(pageNode, artContentNode)
			if (!note) return

			content.push(note)
		} else {
			const customComponent = parseCustomComponent(artContentNode)
			if (!customComponent) return

			content.push(customComponent)
		}
	})

	return content
}

export default parseArticleContent
