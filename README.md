# Article editor

## Setup

Article editor consists of FE part and BE part
Before running each package for the first time use `npm i` to install node modules
To start each package use `npm run dev`

## Intro

The app starts in the Article list where you can select an article to view. You can also search articles or sort them by clicking on the column header.
Once you select an article you will view it in the Editor, where you can view, edit or delete the article. You can also create a new article there.
You can access an article directly by copying its url. You can allso access specific search/order query the same way.

## Scalability, maintenance and performance.

The project uses prettier and linting to keep the codebase consistent across the dev team (one thing left is to setup husky).
The app is using redux toolkit with the state divided in slices which help with organisation of the global state according to use case.
Api calls are using reduxAsyncThunk which provides all the necessary states for informing user about the api call progress and result.
The project uses theme which helps to keep UI look consistent, provides both light and dark theme for additional users comfort.
Project also uses translations from the start to ensure support for multiple languages.
The sorting mechanism is based on a type of data, so if the articles metadata is expanded in future it will be posssible to sort by a new field.
The api has set error messages so that the user should be informed accoridngly when something happens.
If an unknown error arises, there is an error boundary created, so that the app does not crash completely.
The pages in routes are lazy loaded to save loadup time.
The component rendering article text is memoised to save unnecessary rerenders.
Styles are done directly in file using TSS react (I hope that was the library you wanted me to use). The styles could be done in separate file. (depends on the preference)

## BE

This is not a full fledged BE setup. It uses in memory "database", is not type checking, nor validating requests. It was made just to support the FE project.
For propper BE I would use a real database, use ORM like Prisma, setup database schemas for type safety and so on.
The api adds 1sec delay before sending a response to enable loading indicators to be visible for a brief moment on FE.
