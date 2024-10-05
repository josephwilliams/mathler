# Mathler

**Github**: [Github](https://github.com/josephwilliams/mathler)
**Live App**: [Mathler](https://mathler-chi.vercel.app/)  
**Challenge Overview**: [Dynamic's Take Home Frontend](https://dynamic-labs.notion.site/Dynamic-s-Take-Home-Frontend-438fdbcfc950403484988468e3db7fc0)

---

## Introduction

Hello Dynamic team! Thanks for taking the time to check out my app, **Mathler** – a number-based puzzle game inspired by the mechanics of Wordle. You can explore it live at the [link above](https://mathler-chi.vercel.app/) or, if you'd prefer to run it locally, follow the instructions below to get started.

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-repo/mathler.git
   cd mathler
   ```

2. **Install dependencies**

   ```bash
   yarn install
   ```

3. **Start the development server**

   ```bash
   yarn dev
   ```

4. **Open the app**  
   Visit [http://localhost:3000](http://localhost:3000) in your browser.

## Tech Stack

This project was built using the following technologies:

- **Next.js**: React framework for server-rendered apps
- **Tailwind CSS**: CSS framework for styling
- **TypeScript**: Strongly typed JavaScript for maintainable code
- **React Context API**: For managing game state across components
- **Cypress**: End-to-end testing framework to ensure a smooth experience

## Features

- **Regular vs Hard Mode**
  - Hard mode removes yellow background tiles, only showing exact matches, making the game more challenging.
- **Local Storage based DB**

  - Your results are stored locally, allowing you to track your progress over time.

- **Dynamic Feedback**
  - Get instant visual feedback after each attempt, with color-coded hints to help guide your next move.

## Testing

Mathler is fully tested using **Cypress**, which ensures the UI behaves as expected. To run the tests:

```bash
yarn cypress:open
```

This command will open the Cypress dashboard, where you can run the tests in an interactive environment.

## Some thoughts and gotchyas

- When setting board values, I usually update the entire array of arrays. If the board were larger than 6x6 or of an unknown size, I'd likely optimize this to only update the specific row of tiles. But since this is a frontend-focused challenge with a fixed number of indices, this approach works fine for now.

- I didn't originally see the sample equations, so I ended up writing a function to generate them. I since deprecated it as I wasn't able to fully test it, but I'd be happy to re-add.

- I considered disallowing "impossible" equations (like starting/ending with an operator or using consecutive operators), but decided to allow them because Mathler.com does.

- I combined some tests that could have been separated conceptually, such as testing attempt population from local storage to tiles in the board within the board-failure test file.

- Due to compatibility issues between NextJS and Cypress component tests, I ran some unit tests as part of the more "end-to-end" tests, particularly for the StatsCard and DifficultyToggle components.
