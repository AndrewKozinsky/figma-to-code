import ArticleType from '../types/articleType'
import { snakeToCamel } from '../utils/strings'

function createArticlesCode(articlesArr: undefined | ArticleType.Article[]) {
	if (!articlesArr) return []

	return articlesArr.map((article, i) => {
		return {
			path: getArticlePath(article, i + 1),
			code: getArticleCode(article, i + 1),
		}
	})
}

export default createArticlesCode

function getArticlePath(article: ArticleType.Article, articleNum: number) {
	const camelCaseSlug = snakeToCamel(article.meta.slug)

	return `${articleNum}_${camelCaseSlug}/${camelCaseSlug}.ts`
}

function getArticleCode(article: ArticleType.Article, articleNum: number) {
	const camelCaseSlug = snakeToCamel(article.meta.slug)

	return `import ArticleType from '../../articleType'

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
