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
	const folderName = snakeToCamel(article.meta.slug)

	let fileName = snakeToCamel(article.meta.slug.slice(1))
	fileName = article.meta.slug.slice(0, 1).toUpperCase() + fileName

	return `${articleNum}_${folderName}/${fileName}.tsx`
}

function getArticleCode(article: ArticleType.Article, articleNum: number) {
	const camelCaseSlug = snakeToCamel(article.meta.slug)

	return `import ArticleType from '../../articleType'
${createCustomComponentImportsStr(article.content)}

const ${camelCaseSlug}: ArticleType.Article = {
	number: ${articleNum},
	slug: '${article.meta.slug}',
	articleName: '${article.meta.articleName}',
	articleDescription: '${article.meta.articleDescription}',
	isPaid: ${article.meta.isPaid},
	isPublished: ${article.meta.isPublished},
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
			customComponentImportsStr += `import ${compName} from './${compName}'`
		}

		if (artItem.type === 'list' || artItem.type === 'note') {
			customComponentImportsStr += createCustomComponentImportsStr(artItem.children)
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
	let updatedStr = articleCodeStr.replace(/component":"</, 'component": <')
	updatedStr = updatedStr.replace(/\/>"/, '/>')

	return updatedStr
}
