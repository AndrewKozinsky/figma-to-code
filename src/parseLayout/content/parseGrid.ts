import { nodeNames } from '../../common/nodeNames'
import ArticleType from '../../types/articleType'
import parseArticleContent from './parseArticleContent'

function parseGrid(pageNode: FrameNode, gridFrame: FrameNode): null | ArticleType.Grid {
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
		cells,
	}
}

export default parseGrid
