# Feedback for blackberry-binturong

(X) project repository with all team members
(X) package.json updated
(X) `npm test` and `npm run lint` run without errors
(X) travis reports build passing
(X) project deployed to heroku
(X) README.md is updated
(X) one pull request
(X) commit tagged sprint0
(X) backlog populated with epic user stories
( ) lo-fi storyboards created
( ) CRC cards created

## Checklist notes

- I don't see CRC cards or lo-fi prototypes anywhere
- I see some structures that are perhaps CRC card adjacent. You want to write the CRC cards for the pieces of data you will be moving around (like `article` and `film`). It seems like you might have `user`, `show`, `playlist`, `schedule`, etc...

## Design notes

It looks like you have a good start on the user stories. Your first task will be to prioritize to determine which piece to focus on initially.

Most of your stories seem justified, but recall that you want to express value to the user. Go deep. Some examples:

#6 Why does the DJ want exposure? Fame and glory? Feels more justified if there are more listeners? Likes people to call in?

#3: As a listener, you want to access shows so you can listen? Why on the website?

#5: For authentication, I like to have a more robust justification for why the website needs authentication (partly because so many sites have it that don't need it). Focus on what the specific functionality is that needs to be protected.

The other thing I would like to see more of is acceptance criteria. We need to know when a feature has been implemented.
