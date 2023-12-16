import { nodeNames } from '../../common/nodeNames'
import ArticleType from '../../types/articleType'
import parseArticleContent from '../content/parseArticleContent'
import { parseArticleHeader } from './parseArticleHeader'
import { parseMeta } from './parseMeta'

export function parsePage(pageNode: FrameNode, pageNum: number): ArticleType.Article {
	const articleObj: ArticleType.Article = {
		meta: {
			number: pageNum,
			slug: '',
			articleName: '',
			articleDescription: '',
			isPaid: false,
			isPublished: false,
		},
		content: [],
	}

	for (let i = 0; i < pageNode.children.length; i++) {
		const node = pageNode.children[i]
		if (node.type !== 'FRAME') continue

		if (node.name === nodeNames.article) {
			for (let j = 0; j < node.children.length; j++) {
				const articleNode = node.children[j]

				// Если это метаинформация
				if (articleNode.name === nodeNames.articleMeta && articleNode.type === 'FRAME') {
					articleObj.meta = parseMeta(articleNode, pageNum)
				}
				// Если это заголовок статьи
				else if (
					articleNode.name === nodeNames.articleHeader &&
					articleNode.type === 'INSTANCE'
				) {
					articleObj.meta.articleName = parseArticleHeader(articleNode)
				}
				// Если это содержимое статьи
				else if (
					articleNode.name === nodeNames.articleContent &&
					articleNode.type === 'FRAME'
				) {
					articleObj.content = parseArticleContent(articleNode.children)
				}
			}
		} else if (node.name === nodeNames.exercises) {
			// Потом тут напиши разбор упражнений
		}
	}

	return articleObj
}
