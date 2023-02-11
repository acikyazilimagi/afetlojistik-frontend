export const t = (s: string) => s
// replace all non turkish characters with english ones
export const replaceTurkishChars = (s?: string) =>
  s
    ?.replaceAll('Ğ', 'G')
    .replaceAll('Ü', 'U')
    .replaceAll('Ş', 'S')
    .replaceAll('I', 'I')
    .replaceAll('İ', 'I')
    .replaceAll('Ö', 'O')
    .replaceAll('Ç', 'C')
    .replaceAll('ğ', 'G')
    .replaceAll('ü', 'U')
    .replaceAll('ş', 'S')
    .replaceAll('ı', 'I')
    .replaceAll('ö', 'O')
    .replaceAll('ç', 'C')
