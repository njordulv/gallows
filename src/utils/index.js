export const getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)]

export const genHiddenWord = (word) => word.split('').map(() => '_')

export const updateWord = (randomWord, currentWord, letter) => {
  let guess = false

  const updatedWord = currentWord.map((el, index) => {
    if (randomWord[index] === letter) {
      guess = true
      return letter
    }
    return el
  })

  return { updatedWord, guess }
}
