import ArticleType from '../../types/articleType'

function parseCustomComponent(node: SceneNode): ArticleType.CustomComponent {
	return {
		type: 'customComponent',
		component: `<${node.name}/>`,
	}
}

export default parseCustomComponent
