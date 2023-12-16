import { nodeNames } from '../../common/nodeNames'
import ArticleType from '../../types/articleType'
import { parsePage } from './parsePage'

/**
 * Проходит по корневому фрейму страницы и находит фреймы страниц.
 * Их разбирает другая функция.
 */
export function parsePages() {
	const articles: ArticleType.Article[] = []

	// Фрейм с колонками страниц
	const allPagesNode = figma.currentPage.children[0]

	if (allPagesNode.name !== nodeNames.allPages || allPagesNode.type !== 'FRAME') {
		return
	}

	// Перебор всех колонок страниц
	for (const pagesRowNode of allPagesNode.children) {
		if (pagesRowNode.name !== nodeNames.pagesColumn || pagesRowNode.type !== 'FRAME') {
			return
		}

		// Перебор страниц колонки страниц
		for (let i = 0; i < pagesRowNode.children.length; i++) {
			const pageNode = pagesRowNode.children[i]

			if (pageNode.name !== nodeNames.page || pageNode.type !== 'FRAME') {
				return
			}

			articles.push(parsePage(pageNode, i + 1))
		}
	}

	return articles
}
