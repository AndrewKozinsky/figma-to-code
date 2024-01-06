import { nodeNames } from '../../common/nodeNames'
import ArticleType from '../../types/articleType'
import parseArticleContent from './parseArticleContent'

/**
 *
 * @param pageNode — узел страницы
 * @param gridFrame — элемент сетки
 * @param hasOffset — нужно ли делать отступ
 */
function parseGrid(
	pageNode: FrameNode,
	gridFrame: FrameNode,
	hasOffset: boolean,
): null | ArticleType.Grid {
	const cells = gridFrame.children
		.filter((gridCellFrame) => {
			return (
				gridCellFrame.name === nodeNames.contentGridCell && gridCellFrame.type === 'FRAME'
			)
		})
		.map((gridCellNode) => {
			const gridCellFrame = gridCellNode as FrameNode
			return parseArticleContent(pageNode, gridCellFrame.children)
		})

	return {
		type: 'grid',
		offset: hasOffset,
		cells,
	}
}

export default parseGrid
