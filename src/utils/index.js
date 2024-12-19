export const getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)]

export const genHiddenWord = (word) =>
  word
    .split('')
    .map((char) => (char === ' ' ? ' ' : '_'))
    .join('')

export const updateWord = (randomWord, currentWord, letter) => {
  let updatedWord = ''
  let guess = false

  for (let i = 0; i < randomWord.length; i++) {
    if (
      randomWord[i].toLowerCase() === letter.toLowerCase() ||
      currentWord[i] !== '_'
    ) {
      updatedWord += randomWord[i]
      if (randomWord[i].toLowerCase() === letter.toLowerCase()) {
        guess = true
      }
    } else {
      updatedWord += '_'
    }
  }

  return { updatedWord, guess }
}

export const capitalizeWord = (word) =>
  word.charAt(0).toUpperCase() + word.slice(1)

export const triesCount = (count, ammount) => ammount - count

export const uniqueArray = (array, value) =>
  array.includes(value) ? array : [...array, value]

export const isValidCategory = (config, name) =>
  Object.keys(config.categories).includes(name)

export const getLocalStorage = (key, defaultValue) => {
  const value = localStorage.getItem(key)
  return value ? JSON.parse(value) : defaultValue
}

export const setLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value))
}
