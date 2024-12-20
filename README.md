# Gallows Game

A modern take on the classic word-guessing game! Guess the hidden word one letter at a time before the hangman is fully drawn.
Built with React and Vite for a smooth and interactive user experience.

## Link Demo

Check out the live version here: [Gallows Game](https://njordulv-gallows.netlify.app).

## Features

- **Random Word Selection:** A new word is randomly chosen from the selected category for each game session.
- **Interactive Letter Guessing:** Intuitive interface with alphabet buttons to guess letters.
- **Dynamic Hangman Animation:** Canvas-based animations visually represent the hangman as the game progresses.
- **Restart Functionality:** A restart button resets the game and starts a new session.
- **Smart Letter Tracking:** Used letters are tracked and automatically disabled to prevent repeated guesses.
- **Comprehensive Game Stats:** Displays the number of attempts, wins, and losses in real-time.
- **Category Selection Menu:** A menu button allows players to choose a specific word category.

## Technologies

- **Frontend library:** React ^18
- **Languages:** JavaScript
- **Animation library:** Motion
- **Store library:** Zustand
- **Build tool:** Vite

## Installation

Follow these steps to set up and run the project locally:

1. Clone the Repository
   git clone https://github.com/njordulv/gallows.git
   cd gallows

2. Install Dependencies
   Ensure you have Node.js installed, then run:
   npm install

3. Run the Application
   Start the development server:
   npm run dev

4. Build for Production
   To create an optimized build for deployment:
   npm run build

The production-ready files will be in the build/ directory.

## How to Play

1. A random word is selected and displayed as underscores (\_).
2. Guess letters by clicking the buttons.
   • Correct guesses reveal the letter(s) in the word.
   • Incorrect guesses add a part to the hangman figure.
3. You have 7 incorrect guesses before the game ends.
4. Use the Restart button to reset the game and try again.

## Screenshot

![Gallows Game Screenshot](./public/screenshot.jpg)

## License

This project is licensed under the [MIT License](LICENSE).

This project was bootstrapped with [Vite](https://vite.dev/).
