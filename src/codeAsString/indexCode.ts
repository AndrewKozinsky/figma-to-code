import ArticleType from '../types/articleType'
import { snakeToCamel } from '../utils/strings'

/**
 * Формирует из объекта строку кода
 * @param articlesArr — массив статей
 */
function createIndexCode(articlesArr: undefined | ArticleType.Article[]) {
	if (!articlesArr) return 'Error.'

	// Строка с импортами файла
	const importsStr = createImportsStr(articlesArr)

	// Строка вида personalPronouns
	const articleName = getArticleName(articlesArr)

	return `import ArticleType from '../articleType'
${importsStr}
// Список статей учебника
const rowArticles: ArticleType.Article[] = [
    ${articleName}
]

const articles: ArticleType.Article[] = rowArticles.map((article, i) => {
    const newArticle = { ...article }
    newArticle.number = i + 1

    return newArticle
})

export default articles
    `
}

export default createIndexCode

/**
 * Формирует строку с импортами файла
 * @param articlesArr — массив статей
 */
function createImportsStr(articlesArr: ArticleType.Article[]) {
	let importsStr = ''

	for (let i = 0; i < articlesArr.length; i++) {
		const article = articlesArr[i]

		const folderName = snakeToCamel(article.meta.slug)

		let fileName = snakeToCamel(article.meta.slug.slice(1))
		fileName = article.meta.slug.slice(0, 1).toUpperCase() + fileName

		importsStr += `import ${fileName} from './${i + 1}_${folderName}/${fileName}'
        `
	}

	return importsStr
}

/**
 * Возвращает строку с названием файла со статьёй. Например personalPronouns.
 * @param articlesArr — массив статей
 */
function getArticleName(articlesArr: ArticleType.Article[]) {
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
