import ArticleType from '../types/articleType'
import { snakeToCamel } from '../utils/strings'

/**
 * Формирует из объекта строку кода
 * @param articlesArr — массив статей
 */
function createIndexCode(articlesArr: undefined | ArticleType.Art[]) {
	if (!articlesArr) return 'Error.'

	// Строка с импортами файла
	const importsStr = createImportsStr(articlesArr)

	// Строка вида personalPronouns
	const articleName = getArticleName(articlesArr)

	return `import ArticleType from '../articleType'
${importsStr}
// Список статей учебника
const rowArticles: ArticleType.Art[] = [
    ${articleName}
]

const articles: ArticleType.Art[] = rowArticles.map((article, i) => {
    const newArticle = { ...article }
    newArticle.meta.number = i + 1

    return newArticle
})

export default articles`
}

export default createIndexCode

/**
 * Формирует строку с импортами файла
 * @param articlesArr — массив статей
 */
function createImportsStr(articlesArr: ArticleType.Art[]) {
	let importsStr = ''
	let articleNum = 1

	for (let i = 0; i < articlesArr.length; i++) {
		const article = articlesArr[i]

		const camelCaseSlug = snakeToCamel(article.meta.slug)

		if (article.type === 'article') {
			importsStr += `import ${camelCaseSlug} from './${articleNum++}_${camelCaseSlug}/${camelCaseSlug}'
        `
		} else {
			importsStr += `import ${camelCaseSlug} from './${camelCaseSlug}/${camelCaseSlug}'
        `
		}
	}

	return importsStr
}

/**
 * Возвращает строку с названием файла со статьёй. Например personalPronouns.
 * @param articlesArr — массив статей
 */
function getArticleName(articlesArr: ArticleType.Art[]) {
	let articleNamesStr = ''

	for (let i = 0; i < articlesArr.length; i++) {
		const article = articlesArr[i]

		const camelCaseSlug = snakeToCamel(article.meta.slug)

		if (i === 0) {
			articleNamesStr += `${camelCaseSlug}`
		} else {
			articleNamesStr += `,
			${camelCaseSlug}`
		}
	}

	return articleNamesStr
}
