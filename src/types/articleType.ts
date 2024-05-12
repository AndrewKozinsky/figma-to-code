import ExercisesType from './exercisesType'

namespace ArticleType {
	// Объединённый тип статьи
	export type Art = ArtWelcome | ArtLevel | ArtArticle | ArtMedia

	// Типы статей
	export enum ArtType {
		// Статья с приветствием с началом курса
		welcome = 'welcome',
		// Статья начала нового уровня в изучении
		level = 'level',
		// Стандартная статья
		article = 'article',
		// Статья про фильмы и книги, которые можно посмотреть и почитать
		media = 'media',
	}

	// Уровни владения языка
	export enum LangLevel {
		a1 = 'a1',
		a2 = 'a2',
		b1 = 'b1',
		b2 = 'b2',
	}

	// Статья с приветствием с началом курса
	export type ArtWelcome = {
		type: ArtType.welcome
		meta: ArtMeta
	}

	// Статья начала нового уровня в изучении
	export type ArtLevel = {
		type: ArtType.level
		level: LangLevel
		meta: ArtMeta
	}

	// Статья про фильмы и книги, которые можно посмотреть и почитать
	export type ArtMedia = {
		type: ArtType.media
		meta: ArtMeta
	}

	// Стандартная статья
	export type ArtArticle = {
		type: ArtType.article
		meta: ArtMeta
		// Содержимое статьи
		content: Content
	}

	// Метаданные статьи
	export type ArtMeta = {
		// Порядковый номер статьи
		number: number
		// Подпись статьи: Вводная глава, Уровень А1, Глава 1 и так далее.
		caption: string
		// Название статьи в адресной строке ('toBe')
		slug: string
		// Название статьи ('Глагол to be из данных')
		articleName: string
		// Описание статьи
		articleDescription: string
		// Платная статья?
		isPaid: boolean
		// Статья опубликована?
		// isPublished: boolean
	}

	// Содержимое статьи
	export type Content = (
		| Header
		| Paragraph
		| Note
		| Faq
		| CustomComponent
		| List
		| ExercisesType.Exercises
		| Grid
	)[]

	// Заголовок
	export type Header = {
		type: 'header'
		// Тег
		tag: HeaderTag
		// Стиль тега
		style: HeaderStyle
		// Текст заголовка
		text: string
	}
	export type HeaderTag = 'h2' | 'h3' | 'h4'
	export type HeaderStyle = 'h2' | 'h3' | 'h4'

	// Абзац. Включает в себя строковые элементы.
	export type Paragraph = {
		type: 'paragraph'
		// Должен ли быть отступ от верхнего элемента
		offset?: boolean
		// Размер текста
		textSize?: ParagraphSize
		children: TextElem[]
	}
	export type ParagraphSize = 'small' | 'normal' | 'big' | 'giant'

	// Список. Включает в себя блочные элементы.
	export type List = {
		type: 'list'
		// Нумерованный или ненумерованный список?
		listType: 'numbers' | 'dots'
		children: Paragraph[]
	}

	export type TextElem = Text | ArrowText

	// Текст. Строковый элемент помещаемый в абзац.
	export type Text = {
		type: 'text'
		// Стиль текста
		color?: TextColor
		// Жирность текста
		weight?: 'normal' | 'bold'
		text: string
	}
	export type TextColor = 'black' | 'blue' | 'gold' | 'error' | 'gray'

	// Текст. Строковый элемент помещаемый в абзац.
	export type ArrowText = {
		type: 'arrow'
	}

	// Заметка. Может включать весь доступный контент: заголовки, абзацы, грамматические таблицы.
	export type Note = {
		type: 'note'
		// Стиль заметки
		noteStyle?: 'gray' | 'yellow'
		children: Content
	}

	// Нестандартный компонент статьи
	export type CustomComponent = {
		type: 'customComponent'
		component: any // На самом деле ReactNode
	}

	// Вопросы и ответы.
	export type Faq = {
		type: 'faq'
		items: FaqItem[]
	}
	export type FaqItem = {
		question: { type: 'ReactNode'; value: Content }
		answer: { type: 'ReactNode'; value: Content }
	}

	// Сетка с горизонтальными колонками.
	export type Grid = {
		type: 'grid'
		// Должен ли быть отступ от верхнего элемента
		offset?: boolean
		// Случайный идентификатор сетки. Требуется внутри сетки чтобы автоматически создать стили для конкретной сетки.
		gridId: string
		cells: GridCell[]
	}

	// Ячейка сетки
	export type GridCell = {
		// Минимальная ширина. Если будет меньше, то ячейка переместится вниз.
		// Строка вида '100px' или '50%'.
		minWidth?: string
		// Ширина
		// Строка вида '100px' или '50%'.
		width?: string
		children: Content
	}
}

export default ArticleType
