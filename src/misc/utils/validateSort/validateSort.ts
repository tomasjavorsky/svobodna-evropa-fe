import { ArticleInfo } from '../../../redux/slices/articles/articlesSlice'

export function validateSort(value: string): value is keyof ArticleInfo {
  return (['id', 'author', 'title', 'dateOfPublication'] as const).includes(
    value as keyof ArticleInfo
  )
}
