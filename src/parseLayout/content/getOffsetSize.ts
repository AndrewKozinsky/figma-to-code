import { nodeNames } from '../../common/nodeNames'
import ArticleType from '../../types/articleType'

function getOffsetSize(node: undefined | SceneNode): boolean {
	return !!node && node.name === nodeNames.contentOffset
}

export default getOffsetSize
