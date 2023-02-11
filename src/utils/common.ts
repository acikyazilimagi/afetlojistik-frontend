export const t = (s: string) => s
// replace all non turkish characters with english ones
export const replaceTurkishChars = (s?: string) => {
  const turkishChars = 'çÇğĞıİöÖşŞüÜ'
  const englishChars = 'cCgGiIoOsSuU'
  return s?.replace(/./g, (c) => {
    const index = turkishChars.indexOf(c)
    return index > -1 ? englishChars[index] : c
  })
}
