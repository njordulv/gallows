export const getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)]

export const genHiddenWord = (word) => word.split('').map(() => '_')

export const updateWord = (randomWord, currentWord, letter) => {
  let updatedWord = ''
  let guess = false

  for (let i = 0; i < randomWord.length; i++) {
    if (randomWord[i].toLowerCase() === letter.toLowerCase()) {
      updatedWord += randomWord[i]
      guess = true
    } else {
      updatedWord += currentWord[i]
    }
  }

  return { updatedWord, guess }
}
