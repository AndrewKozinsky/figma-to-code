import ArticleType from '../types/articleType'
import { snakeToCamel } from '../utils/strings'

function createArticlesCode(articlesArr: undefined | ArticleType.Art[]) {
	if (!articlesArr) return []

	return articlesArr.map((article, i) => {
		let articleCode = getArticleCode(article, i + 1)
		articleCode = articleFileCodePostprocessing(articleCode)

		return {
			// Путь до файла статьи
			path: getArticlePath(article, i + 1),
			// Код, который нужно положить в файл
			code: articleCode,
		}
	})
}

export default createArticlesCode

function getArticlePath(article: ArticleType.Art, articleNum: number) {
	const camelCaseSlug = snakeToCamel(article.meta.slug)

	return `${articleNum}_${camelCaseSlug}/${camelCaseSlug}.tsx`
}

function getArticleCode(article: ArticleType.Art, articleNum: number) {
	const obj = {
		[ArticleType.ArtType.welcome]: parseWelcomeArt,
		[ArticleType.ArtType.level]: parseLevelArt,
		[ArticleType.ArtType.article]: parseArticleArt,
		[ArticleType.ArtType.media]: parseMediaArt,
	}

	// @ts-ignore
	return obj[article.type](article, articleNum)
}

function parseWelcomeArt(article: ArticleType.ArtWelcome, articleNum: number) {
	const camelCaseSlug = snakeToCamel(article.meta.slug)

	return `import ArticleType from '../../articleType'

const ${camelCaseSlug}: ArticleType.ArtWelcome = {
	type: ArticleType.ArtType.welcome,
	meta: {
		number: ${articleNum},
		slug: '${article.meta.slug}',
		caption: '${article.meta.caption}',
		articleName: '${article.meta.articleName}',
		articleDescription: '${article.meta.articleDescription}',
	},
}

export default ${camelCaseSlug}
`
}

function parseLevelArt(article: ArticleType.ArtLevel, articleNum: number) {
	const camelCaseSlug = snakeToCamel(article.meta.slug)

	return `import ArticleType from '../../articleType'

const ${camelCaseSlug}: ArticleType.ArtLevel = {
	type: ArticleType.ArtType.level,
	level: '${article.level}' as any,
	meta: {
		number: ${articleNum},
		slug: '${article.meta.slug}',
		caption: '${article.meta.caption}',
		articleName: '${article.meta.articleName}',
		articleDescription: '${article.meta.articleDescription}',
	},
}

export default ${camelCaseSlug}
`
}

function parseMediaArt(article: ArticleType.ArtMedia, articleNum: number) {
	const camelCaseSlug = snakeToCamel(article.meta.slug)

	return `import ArticleType from '../../articleType'

const ${camelCaseSlug}: ArticleType.ArtMedia = {
	type: ArticleType.ArtType.media,
	meta: {
		number: ${articleNum},
		slug: '${article.meta.slug}',
		caption: '${article.meta.caption}',
		articleName: '${article.meta.articleName}',
		articleDescription: '${article.meta.articleDescription}',
	},
}

export default ${camelCaseSlug}
`
}

function parseArticleArt(article: ArticleType.ArtArticle, articleNum: number) {
	const camelCaseSlug = snakeToCamel(article.meta.slug)

	return `import ArticleType from '../../articleType'
${createCustomComponentImportsStr(article.content)}

const ${camelCaseSlug}: ArticleType.ArtArticle = {
	type: ArticleType.ArtType.article,
	meta: {
		number: ${articleNum},
		slug: '${article.meta.slug}',
		caption: '${article.meta.caption}',
		articleName: '${article.meta.articleName}',
		articleDescription: '${article.meta.articleDescription}',
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

		/*if (artItem.type === 'list' || artItem.type === 'note') {
			customComponentImportsStr += createCustomComponentImportsStr(artItem.children)
		} else if (artItem.type === 'faq') {
			artItem.items.forEach((faqItem) => {
				customComponentImportsStr += createCustomComponentImportsStr(faqItem.answer.value)
				customComponentImportsStr += createCustomComponentImportsStr(faqItem.question.value)
			})
		} else if (artItem.type === 'grid') {
			artItem.cells.forEach((gridCell) => {
				customComponentImportsStr += createCustomComponentImportsStr(gridCell.children)
			})
		}*/
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
