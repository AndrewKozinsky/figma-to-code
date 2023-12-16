import ArticleType from '../types/articleType'

const colors: Record<ArticleType.TextColor, { r: number; g: number; b: number }> = {
	black: { r: 30, g: 30, b: 30 },
	blue: { r: 0, g: 118, b: 222 },
	gold: { r: 241, g: 168, b: 0 },
	error: { r: 255, g: 57, b: 0 },
	gray: { r: 142, g: 142, b: 142 },
}

const Config = {
	colors,
}

export default Config
