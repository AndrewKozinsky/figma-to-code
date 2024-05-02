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
	const cellsConfig: ArticleType.GridCell[] = gridFrame.children
		.filter((cell) => {
			return cell.name.startsWith(nodeNames.contentGridCell) && cell.type === 'FRAME'
		})
		.map((gridCellNode) => {
			const gridCellFrame = gridCellNode as FrameNode

			const constraints = getCellConstraints(gridCellFrame)

			return {
				minWidth: constraints.minWidth,
				width: constraints.width,
				children: parseArticleContent(pageNode, gridCellFrame.children),
			}
		})

	return {
		type: 'grid',
		offset: hasOffset,
		cells: cellsConfig,
	}
}

export default parseGrid

function getCellConstraints(gridCellFrame: FrameNode) {
	// ['content-grid-cell', 'minwidth=300px', 'width=50%']
	const cellNodeNameParts = gridCellFrame.name.split(' ')

	// Строка вида 'minwidth=300px'
	const minWidthValue =
		cellNodeNameParts.find((namePart) => {
			return namePart.toLowerCase().startsWith('minwidth')
		}) || ''

	// Строка вида 'width=50%'
	const widthValue =
		cellNodeNameParts.find((namePart) => {
			return namePart.toLowerCase().startsWith('width')
		}) || ''

	return {
		minWidth: minWidthValue.split('=')[1],
		width: widthValue.split('=')[1],
	}
}
