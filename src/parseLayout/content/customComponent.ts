import { nodeNames } from '../../common/nodeNames'
import ArticleType from '../../types/articleType'

function parseCustomComponent(node: SceneNode): null | ArticleType.CustomComponent {
	if ([nodeNames.contentOffset, nodeNames.memorandum].includes(node.name)) {
		return null
	}

	return {
		type: 'customComponent',
		component: `<${node.name}/>`,
	}
}

export default parseCustomComponent
