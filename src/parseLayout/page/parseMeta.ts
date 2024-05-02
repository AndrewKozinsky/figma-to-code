import { nodeNames } from '../../common/nodeNames'
import ArticleType from '../../types/articleType'

export function parseMeta(
	pageNode: FrameNode,
	pageNum: number,
	caption: string,
): ArticleType.ArtMeta {
	let slug = ''
	let articleDescription = ''
	let isPaid = true
	// let isPublished = true

	for (let i = 0; i < pageNode.children.length; i++) {
		const node = pageNode.children[i]

		if (node.name === nodeNames.articleMetaSlug && node.type === 'TEXT') {
			slug = node.characters
		} else if (node.name === nodeNames.articleMetaDescription && node.type === 'TEXT') {
			articleDescription = node.characters
		} else if (node.name === nodeNames.articleMetaIsPaid && node.type === 'INSTANCE') {
			isPaid = node.componentProperties.isPaid.value === 'true'
		}
		/*else if (node.name === nodeNames.articleMetaIsPublished && node.type === 'INSTANCE') {
			isPublished = node.componentProperties.isPublished.value === 'true'
		}*/
	}

	return {
		number: pageNum,
		caption,
		slug,
		articleName: 'Неизвестно',
		articleDescription,
		isPaid,
		// isPublished,
	}
}
