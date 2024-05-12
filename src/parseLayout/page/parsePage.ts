import { nodeNames } from '../../common/nodeNames'
import ArticleType from '../../types/articleType'
import parseArticleContent from '../content/parseArticleContent'
import { parseArticleHeader } from './parseArticleHeader'
import { parseMeta } from './parseMeta'

// Номер статьи типа ArticleType.ArtArticle
let artArticleCounter = 0

export function parsePage(pageNode: FrameNode, pageNum: number): null | ArticleType.Art {
	// Получить массив частей из которых состоит имя узла вида: ['page', 'type=article']
	const pageNameParts = pageNode.name.split(' ')

	// Получить строку вида type=article
	const pageTypeStr = pageNameParts.find((str) => str.startsWith('type='))
	if (!pageTypeStr) return null

	// Получить строку с типом статьи: welcome, level, article или media
	const articleType = pageTypeStr.split('=')[1]

	if (articleType === ArticleType.ArtType.welcome) {
		return parseWelcomePage(pageNode, pageNum)
	} else if (articleType === ArticleType.ArtType.level) {
		return parseLevelPage(pageNode, pageNum)
	} else if (articleType === ArticleType.ArtType.media) {
		return parseMediaPage(pageNode, pageNum)
	} else if (articleType === ArticleType.ArtType.article) {
		artArticleCounter++
		return parseArticlePage(pageNode, pageNum, artArticleCounter)
	}

	return null
}

function parseWelcomePage(pageNode: FrameNode, pageNum: number): ArticleType.ArtWelcome {
	const articleObj: ArticleType.ArtWelcome = {
		type: ArticleType.ArtType.welcome,
		meta: {
			number: pageNum,
			caption: '',
			slug: '',
			articleName: '',
			articleDescription: '',
			isPaid: false,
			// isPublished: false,
		},
	}

	// Поиск статьи в детях страницы
	for (let i = 0; i < pageNode.children.length; i++) {
		const node = pageNode.children[i]

		// Завершить если статья не найдена
		if (node.type !== 'FRAME' || node.name !== nodeNames.article) continue

		for (let j = 0; j < node.children.length; j++) {
			const articleChildNode = node.children[j]

			// Если это метаинформация
			if (
				articleChildNode.name === nodeNames.articleMeta &&
				articleChildNode.type === 'FRAME'
			) {
				articleObj.meta = parseMeta(articleChildNode, pageNum, 'Вводная глава')
			}
			// Если это заголовок статьи
			else if (
				articleChildNode.name === nodeNames.articleHeader &&
				articleChildNode.type === 'INSTANCE'
			) {
				articleObj.meta.articleName = parseArticleHeader(articleChildNode)
			}
		}
	}

	return articleObj
}

function parseLevelPage(pageNode: FrameNode, pageNum: number): ArticleType.ArtLevel {
	const articleObj: ArticleType.ArtLevel = {
		type: ArticleType.ArtType.level,
		level: getLevel(pageNode),
		meta: {
			number: pageNum,
			caption: '',
			slug: '',
			articleName: '',
			articleDescription: '',
			isPaid: false,
			// isPublished: false,
		},
	}

	// Возвращает значение уровня статьи: а1, a2.
	function getLevel(pageNode: FrameNode) {
		const pageNameParts = pageNode.name.split(' ')
		const levelArg = pageNameParts.find((str) => str.startsWith('level'))

		if (!levelArg) {
			return ArticleType.LangLevel.a1
		}

		const levelValueArr = levelArg.split('=')

		return levelValueArr[1] as ArticleType.LangLevel
	}

	const caption = 'Уровень ' + ArticleType.LangLevel.a1.toUpperCase()

	// Поиск статьи в детях страницы
	for (let i = 0; i < pageNode.children.length; i++) {
		const node = pageNode.children[i]
		// Завершить если статья не найдена
		if (node.type !== 'FRAME' || node.name !== nodeNames.article) continue

		for (let j = 0; j < node.children.length; j++) {
			const articleChildNode = node.children[j]

			// Если это метаинформация
			if (
				articleChildNode.name === nodeNames.articleMeta &&
				articleChildNode.type === 'FRAME'
			) {
				articleObj.meta = parseMeta(articleChildNode, pageNum, caption)
			}
			// Если это заголовок статьи
			else if (
				articleChildNode.name === nodeNames.articleHeader &&
				articleChildNode.type === 'INSTANCE'
			) {
				articleObj.meta.articleName = parseArticleHeader(articleChildNode)
			}
		}
	}

	return articleObj
}

function parseMediaPage(pageNode: FrameNode, pageNum: number): ArticleType.ArtMedia {
	const articleObj: ArticleType.ArtMedia = {
		type: ArticleType.ArtType.media,
		meta: {
			number: pageNum,
			caption: '',
			slug: '',
			articleName: '',
			articleDescription: '',
			isPaid: false,
			// isPublished: false,
		},
	}

	// Поиск статьи в детях страницы
	for (let i = 0; i < pageNode.children.length; i++) {
		const node = pageNode.children[i]
		// Завершить если статья не найдена
		if (node.type !== 'FRAME' || node.name !== nodeNames.article) continue

		for (let j = 0; j < node.children.length; j++) {
			const articleChildNode = node.children[j]

			// Если это метаинформация
			if (
				articleChildNode.name === nodeNames.articleMeta &&
				articleChildNode.type === 'FRAME'
			) {
				articleObj.meta = parseMeta(articleChildNode, pageNum, 'Фильмы и книги')
			}
			// Если это заголовок статьи
			else if (
				articleChildNode.name === nodeNames.articleHeader &&
				articleChildNode.type === 'INSTANCE'
			) {
				articleObj.meta.articleName = parseArticleHeader(articleChildNode)
			}
		}
	}

	return articleObj
}

function parseArticlePage(
	pageNode: FrameNode,
	pageNum: number,
	chapterNum: number,
): ArticleType.ArtArticle {
	const articleObj: ArticleType.ArtArticle = {
		type: ArticleType.ArtType.article,
		meta: {
			number: pageNum,
			caption: '',
			slug: '',
			articleName: '',
			articleDescription: '',
			isPaid: false,
			// isPublished: false,
		},
		content: [],
	}

	const chapterStr = 'Глава ' + chapterNum

	// Поиск статьи в детях страницы
	for (let i = 0; i < pageNode.children.length; i++) {
		const node = pageNode.children[i]
		// Завершить если статья не найдена
		if (node.type !== 'FRAME' || node.name !== nodeNames.article) continue

		for (let j = 0; j < node.children.length; j++) {
			const articleChildNode = node.children[j]

			// Если это метаинформация
			if (
				articleChildNode.name === nodeNames.articleMeta &&
				articleChildNode.type === 'FRAME'
			) {
				articleObj.meta = parseMeta(articleChildNode, pageNum, chapterStr)
			}
			// Если это заголовок статьи
			else if (
				articleChildNode.name === nodeNames.articleHeader &&
				articleChildNode.type === 'INSTANCE'
			) {
				articleObj.meta.articleName = parseArticleHeader(articleChildNode)
			}

			// Если это содержимое статьи
			else if (
				articleChildNode.name === nodeNames.articleContent &&
				articleChildNode.type === 'FRAME'
			) {
				articleObj.content = parseArticleContent(pageNode, articleChildNode.children)
			}
		}
	}

	return articleObj
}
