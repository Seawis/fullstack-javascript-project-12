import filter from 'leo-profanity'

const filtered = (text) => {
  filter.loadDictionary('en')
  const filteredEn = filter.clean(text)
  filter.loadDictionary('ru')
  return filter.clean(filteredEn)
}

export default filtered

