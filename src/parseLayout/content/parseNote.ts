import { nodeNames } from '../../common/nodeNames'
import ArticleType from '../../types/articleType'
import parseArticleContent from './parseArticleContent'

function parseNote(pageNode: FrameNode, noteFrame: FrameNode): null | ArticleType.Note {
	const noteStyle = noteFrame.name === nodeNames.contentGrayNote ? 'gray' : 'yellow'

	return {
		type: 'note',
		noteStyle,
		children: parseArticleContent(pageNode, noteFrame.children),
	}
}

export default parseNote
