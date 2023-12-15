import createArticlesCode from './codeAsString/articlesCode'
import createIndexCode from './codeAsString/indexCode'
import { parsePages } from './parseLayout/parsePages'

const articles = parsePages()
const indexCodeStr = createIndexCode(articles)
const createArticlesCodeArr = createArticlesCode(articles)

figma.showUI(__html__, {
	height: 900,
	width: 700,
})

figma.ui.postMessage({ type: 'index-code', code: indexCodeStr })
figma.ui.postMessage({ type: 'articles-code', articlesArr: createArticlesCodeArr })

// figma.closePlugin()
