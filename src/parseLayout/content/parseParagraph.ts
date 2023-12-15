import ArticleType from '../../types/articleType'

function parseParagraph(
	paragraphInstance: InstanceNode,
	hasOffset: boolean,
): null | ArticleType.Paragraph {
	const instanceProps = paragraphInstance.componentProperties
	const sizeProp = instanceProps.size.value as ArticleType.ParagraphSize

	return {
		type: 'paragraph',
		// Должен ли быть отступ от верхнего элемента
		offset: hasOffset,
		// Размер текста
		textSize: sizeProp,
		children: [
			{
				type: 'text',
				color: 'normal',
				// Жирность текста
				weight: 'normal',
				text: 'Мой текст',
			},
		],
	}
}

export default parseParagraph
