import { nodeNames } from '../../common/nodeNames'

export function parseArticleHeader(headerInstance: InstanceNode) {
	const headerTextNode = headerInstance.children.find((childNode) => {
		return childNode.name === nodeNames.articleHeaderText
	})

	if (!headerTextNode || headerTextNode.type !== 'TEXT') {
		return 'Header did not fount'
	}

	return headerTextNode.characters
}
