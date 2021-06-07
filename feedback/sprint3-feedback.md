# Feedback for blackberry-binturong

(X) tagged commit on main for sprint3
(X) set of closed user stories
(-) working deployment on Heroku
(X) travis reports build passing
(X) handoff instructions

## Checklist notes

As we saw in the demo, the logged in DJ functionality is not working on Heroku.

The handoff instructions are a little bit on the minimal side. You list off the required values, but it would be good to actually explain a little bit how to acquire those values.

## Discussion

### Functionality

It was obvious from the onset that trying to completely replicate the WRMC website in our half of a semester was not going to be plausible, especially with the added functionality that can be developed once the site moves away from WordPress. So, it is not really surprising that you didn't produce a full website. The other observation that we can make is that being motivated to make the new website very similar to the old one also added some shackles to the design space that you considered.

With all of that said, you have made a good start on the site. You have multiple pages, a nice schedule, enough front end intelligence to track current and upcoming shows and the start of a playlist logger. There is also backend persistence so that logged playlists are actually tracked in the database.

For the most part, what is in the site itself seems to work. There are three things that popped out while I was poking around the site: (1) there are a couple of propType errors showing up in the console, (2) the site does a complete reload when you switch between pages, and (3) the 'Go to Current Playlist` button appears when you are already looking at the playlist, where it does nothing.

One feature that I wish your site had was live updating. For a site with a lot of time based information, it would be good if the data refreshed periodically without the user having to reload the page.

My second collection of thoughts are more about design rather than broken functionality. I like the fact that you continued the color scheme from the logo, but the homepage feels a little aggressively pink. I like the fact that the homepage is responsive, but in normal desktop view, the pink blobs don't feel placed -- they feel like they have just sort of flowed into position and the ordering is kind of arbitrary. I think it would be worth having another stab at designing the layout of the page, and i would at the very least combine the current show with the running playlist.

The other place I think could use a little bit of design work is the playlist entering page. I find the 'Update' button annoying. It seems like at the very least it should be disabled when there aren't any changes to be made. The more confusing thing is the playlist ordering. Part of the issue here is that it can make sense to order playlists in either ascending or descending order depending on the context. On the front page of the site, I think it makes sense for the most recent entry to be at the top. If I'm looking at a complete playlist for a show, I would expect it to be ordered with the oldest entry first, so that reading direction matches play order. So, the question to ask is which way to order the playlist as it is being made. Again, context matters a bit here. With the other WRMC group, I advised them to make the list with the most recent entry on top. However, this was because their text entry was (a) separate from the list itself, and (b) fixed at the top. So if they added to the bottom of the list, it would quickly vanish off the bottom of the page. The problem I see with your implementation is that you put the newest on the top, but the controls are all on the bottom of the page... So, if you keep with the current design, I would add new items on the bottom, where the user is typing them. That said, I think we all know that one of the primary things to "lift" from the other team's implementation is their album lookup interface (and their in-page player).

### User stories

The user stories generally look okay. However, I'm still seeing some weak user stories. #41 stood out to me "As a WRMC fan, I want to be able to see more details about a particular show from schedule, so I can get more information.". I found this one problematic for several reasons. First, it has no rationale ("I want more information to have more information"). Second, it doesn't have any details about what information (this should be tied to why the user wants it). Third, it doesn't have any acceptance criteria (which would possibly have included what information was available). Fourth, it seems to be a duplicate of #2 ("As a listener, I want to be able to click on a show on the schedule to get more information about it like the description, genre, and past playlists, so I can see if I want to tune in."), which was ostensibly finished in sprint 2. #2 is a little bit better of a user story, but the "like" modifier softens the implied requirements. I note, for example, that playlists are not available in this view. It also includes a description of the interaction which we typically avoid putting in user stories.

### Agility/scrum

The agility generally looks okay, though you clearly had a lull at the start of this sprint and a big spike at the end. I do see some dangling feature branches, which really should be cleared up by the end of the sprint. I assume that these are holding the abortive attempts to get the album art fetching working correctly.

### Integration

Pull requests look pretty good until at the very end when things got a little chaotic. Up until that point I see some good review happening.

### Implementation

I'm glad that you committed to the separate pages -- your site seemed to call out for that approach. However, as I indicated above, it looked like your page was doing a full refresh when moving between tabs. This works, but isn't the expected behavior, and if you were trying to maintain any kind of state, it would be lost when you did this. After a little digging around, this appears to be because you aren't use `Link` in `NavBar`, you are using raw `a` tags.

I like that you created a source file for common prop types. That is a great practice. Despite that you still had some propType errors in `DisplayCurrentPlaylist` and `Layout`.

Another error that caught my eye when I was running the code was "Can't perform a React state update on an unmounted component (StartShowButton)". This is happening because you added an extra piece of state and a `useEffect` in there. There is no reason to have the `newPlayList` state. This component doesn't need to remember it -- you are even leaving the page. This is a moment to just make the `fetch` call directly, rather than forcing a component re-render through a state change. In addition, I wouldn't wrap the button in a `Link`. In this instance, I would use the router to manually move to the new page after you successfully added the playlist.

I do see some tests, which is good, but it does seem like many of them are fairly trivial. Some of them are clearly just placeholders. Others, like the test in `DisplayCurrentPlaylist.test.js` have the appearance of doing something, but don't. I am really missing the integration testing. For example, it is great that the main page keeps up with the shows that are supposed to be on the air, showing the current and next three correctly. However, this behavior isn't tested. I see a little effort in `index.test.js` to mock `useSession`, but the only tests are for the logged out state. I also noticed a lot of "fetch not defined" errors when running the tests, which indicates you need to do more mocking of `fetch` and `useSession` in your other tests.

Looking at the error that comes up when I try to log a playlist, it appears that you got caught by another of the subtleties of SQLite vs Postgres. The error I see in the console is "insert into "Playlist" ("current", "date", "showID") values ($1, $2, $3) returning "id" - column "showID" of relation "Playlist" does not exist". Looking at your migration, I see you called the column `showId`. Postgres is case sensitive, while SQLite is not.

## Final Thoughts

I think overall you did a good job on this. It is clear that there were time and prioritization issues. I've pointed out some implementation and styling issues, but there is nothing there that is a show stopper (other than the PostgreSQL issue). I hope you keep me updated with future updates to the site (and know that I'll still answer any questions that arise).
