import ArticleType from '../types/articleType'
import { snakeToCamel } from '../utils/strings'

function createIndexCode(articlesArr: undefined | ArticleType.Article[]) {
	if (!articlesArr) return 'Error.'

	let importsStr = ''

	for (let i = 0; i < articlesArr.length; i++) {
		const article = articlesArr[i]

		const camelCaseSlug = snakeToCamel(article.meta.slug)

		importsStr += `import ${camelCaseSlug} from './${i + 1}_${camelCaseSlug}/${camelCaseSlug}'
        `
	}

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

	return `import ArticleType from '../articleType'
${importsStr}
// Список статей учебника
const rowArticles: ArticleType.Article[] = [
    ${articleNamesStr}
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
