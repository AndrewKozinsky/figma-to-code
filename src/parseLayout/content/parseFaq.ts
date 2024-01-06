import { nodeNames } from '../../common/nodeNames'
import ArticleType from '../../types/articleType'
import parseArticleContent from './parseArticleContent'

function parseFaq(pageNode: FrameNode, faqFrame: FrameNode): null | ArticleType.Faq {
	const itemsFrames = faqFrame.children
		.filter((faqItemFrame) => {
			return faqItemFrame.name === nodeNames.contentFaqItem && faqItemFrame.type === 'FRAME'
		})
		.map((faqItemFrame) => {
			return parseFaqItem(pageNode, faqItemFrame as FrameNode)
		})

	return {
		type: 'faq',
		items: itemsFrames,
	}
}

export default parseFaq

function parseFaqItem(pageNode: FrameNode, faqItemFrame: FrameNode): ArticleType.FaqItem {
	const questionNode = faqItemFrame.children.find((childNode) => {
		return childNode.name === nodeNames.contentFaqQuestion && childNode.type === 'FRAME'
	}) as FrameNode

	const answerNode = faqItemFrame.children.find((childNode) => {
		return childNode.name === nodeNames.contentFaqAnswer && childNode.type === 'FRAME'
	}) as FrameNode

	return {
		question: {
			type: 'ReactNode',
			value: questionNode ? parseArticleContent(pageNode, questionNode.children) : [],
		},
		answer: {
			type: 'ReactNode',
			value: answerNode ? parseArticleContent(pageNode, answerNode.children) : [],
		},
	}
}
