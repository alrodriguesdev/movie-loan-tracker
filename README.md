# Movie Loaning App - Learning Project

https://github.com/alrodriguesdev/movie-loan-tracker/assets/149538735/2263ef99-2ceb-4148-9828-4f5226939cf4


## Introduction

This repository contains a project designed to help me learn and experiment with backend development technologies. It's a movie loaning app where users can search the TMDB database for movies they own and would like to loan to offline friends. Users can search for a movie by title, click "Loan this movie," and then see that movie listed under the "Out on Loan" tab. While the scope of the project expanded beyond the initial plan, it served as an excellent platform for practical learning and understanding web app architecture, database handling, and usability considerations.

**Note**: This project was created primarily for learning purposes and is not intended for production use.

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- React
- React-Bootstrap

## Challenges

- Managing state with pure JavaScript while using a templating engine was challenging. This experience highlighted the usefulness of frameworks like React for state management, prompting me to rebuild the app using React.
- Usability and UI design were limited due to the primary focus being on backend technologies.

## Known Issues

- Movies get duplicated in the collection if the 'Add to Collection' button is clicked multiple times.
- When a movie is loaned, it appears in the "Out on Loan" tab. Unfortunately, if the user refreshes the page or logs out, the "Out on Loan" list is cleared. Implementing this functionality was extremely challenging due to multiple moving parts like authentication, database saving, retrieval, and frontend adjustments.

## Features I'd Like to Implement in the Future

- A loan history feature that shows a log of all the friends who have borrowed a particular movie from the user.

---

This project has been a fantastic learning journey. Although it's far from perfect, it provided a playground for understanding the intricacies of backend development, data management, and usability.
