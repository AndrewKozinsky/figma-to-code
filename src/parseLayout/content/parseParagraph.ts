import ArticleType from '../../types/articleType'
import { parseText } from './parseText'

function parseParagraph(
	paragraphInstance: InstanceNode,
	hasOffset: boolean,
): null | ArticleType.Paragraph {
	const instanceProps = paragraphInstance.componentProperties
	const sizeProp = instanceProps.size.value as ArticleType.ParagraphSize

	const paragraphNode = paragraphInstance.children[0]
	if (paragraphNode.type !== 'TEXT') {
		return null
	}

	return {
		type: 'paragraph',
		// Должен ли быть отступ от верхнего элемента
		offset: hasOffset,
		// Размер текста
		textSize: sizeProp,
		children: parseText(paragraphNode),
	}
}

export default parseParagraph
