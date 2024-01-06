import ArticleType from '../types/articleType'
import { snakeToCamel } from '../utils/strings'

function createArticlesCode(articlesArr: undefined | ArticleType.Article[]) {
	if (!articlesArr) return []

	return articlesArr.map((article, i) => {
		let articleCode = getArticleCode(article, i + 1)
		articleCode = articleFileCodePostprocessing(articleCode)

		return {
			path: getArticlePath(article, i + 1),
			code: articleCode,
		}
	})
}

export default createArticlesCode

function getArticlePath(article: ArticleType.Article, articleNum: number) {
	const camelCaseSlug = snakeToCamel(article.meta.slug)

	return `${articleNum}_${camelCaseSlug}/${camelCaseSlug}.tsx`
}

function getArticleCode(article: ArticleType.Article, articleNum: number) {
	const camelCaseSlug = snakeToCamel(article.meta.slug)

	return `import ArticleType from '../../articleType'
${createCustomComponentImportsStr(article.content)}

const ${camelCaseSlug}: ArticleType.Article = {
	meta: {
		number: ${articleNum},
		slug: '${article.meta.slug}',
		articleName: '${article.meta.articleName}',
		articleDescription: '${article.meta.articleDescription}',
		isPaid: ${article.meta.isPaid},
		isPublished: ${article.meta.isPublished},
	},
	content: ${JSON.stringify(article.content)},
}

export default ${camelCaseSlug}
`
}

function createCustomComponentImportsStr(articleContent: ArticleType.Content) {
	let customComponentImportsStr = ''

	articleContent.forEach((artItem) => {
		if (artItem.type === 'customComponent') {
			const compName = artItem.component.slice(1, -2)
			if (customComponentImportsStr.includes(compName)) return

			customComponentImportsStr += `import ${compName} from './${compName}'
`
		}

		if (artItem.type === 'list' || artItem.type === 'note') {
			customComponentImportsStr += createCustomComponentImportsStr(artItem.children)
		} else if (artItem.type === 'faq') {
			artItem.items.forEach((faqItem) => {
				customComponentImportsStr += createCustomComponentImportsStr(faqItem.answer.value)
				customComponentImportsStr += createCustomComponentImportsStr(faqItem.question.value)
			})
		} else if (artItem.type === 'grid') {
			artItem.cells.forEach((gridCell) => {
				customComponentImportsStr += createCustomComponentImportsStr(gridCell)
			})
		}
	})

	return customComponentImportsStr
}

/**
 * Дополнительно изменяет строку с кодом статьи
 * @param articleCodeStr — строка с кодом файла со статьёй
 */
function articleFileCodePostprocessing(articleCodeStr: string) {
	// В коде компоненты обрамляются одинарными кавычками.
	// Так: { type: 'customComponent', component: '<PersonalPronounseTable />' }
	// Но чтобы компонент подключился их быть не должно.
	// Поэтому тут они убираются.
	let updatedStr = articleCodeStr.replace(/component":"</g, 'component": <')
	updatedStr = updatedStr.replace(/\/>"/g, '/>')

	// Так как на странице может быть несколько одинаковых пользовательских компонентов,
	// то будет несколько одинаковых импортов. Поэтому их нужно убрать
	const uniqLines: string[] = []

	updatedStr.split('\n').forEach((line) => {
		if (!line.includes('import ') || !uniqLines.includes(line)) {
			uniqLines.push(line)
		}
	})

	updatedStr = uniqLines.join('\n')

	return updatedStr
}
