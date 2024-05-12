import { nodeNames } from '../../common/nodeNames'
import ArticleType from '../../types/articleType'
import { parsePage } from './parsePage'

/**
 * Проходит по корневому фрейму страницы и находит фреймы страниц.
 * Их разбирает другая функция.
 */
export function parsePages() {
	const articles: ArticleType.Art[] = []

	// Фрейм с колонками страниц
	const allPagesNode = figma.currentPage.children.find((canvasChild) => {
		return canvasChild.name === nodeNames.allPages
	})
	if (!allPagesNode || allPagesNode.type !== 'FRAME') return

	// Перебор всех колонок страниц
	for (const pagesRowNode of allPagesNode.children) {
		if (pagesRowNode.name !== nodeNames.pagesColumn || pagesRowNode.type !== 'FRAME') {
			return
		}

		// Перебор страниц колонки страниц
		for (let i = 0; i < pagesRowNode.children.length; i++) {
			const pageNode = pagesRowNode.children[i]

			if (!pageNode.visible) continue

			const nodeMainName = pageNode.name.split(' ')[0]
			if (nodeMainName !== nodeNames.page || pageNode.type !== 'FRAME') {
				return
			}

			const parsedPage = parsePage(pageNode, i + 1)
			if (parsedPage) {
				articles.push(parsedPage)
			}
		}

		// ПОТОМ НУЖНО УБРАТЬ ЭТУ ИНСТРУКЦИЮ ЧТОБЫ ОН ПРОХОДИЛ ВСЕ КОЛОНКИ!!!!
		break
	}

	return articles
}
