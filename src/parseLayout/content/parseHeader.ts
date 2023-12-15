import ArticleType from '../../types/articleType'

function parseHeader(headerInstance: InstanceNode): null | ArticleType.Header {
	const instanceProps = headerInstance.componentProperties
	const sizeProp = instanceProps.size.value as ArticleType.HeaderTag
	const tagProp = instanceProps.tag.value as ArticleType.HeaderStyle

	const textNode = headerInstance.children[0]

	if (textNode.type !== 'TEXT') {
		return null
	}

	return {
		type: 'header',
		tag: tagProp,
		style: sizeProp,
		text: textNode.characters,
	}
}

export default parseHeader
