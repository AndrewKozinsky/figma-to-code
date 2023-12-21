import ArticleType from '../../types/articleType'

function parseCustomComponent(node: SceneNode): null | ArticleType.CustomComponent {
	if (node.name[0] !== node.name[0].toUpperCase()) {
		return null
	}

	return {
		type: 'customComponent',
		component: `<${node.name}/>`,
	}
}

export default parseCustomComponent
