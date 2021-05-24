# Feedback for blackberry-binturong

( ) tagged commit on main for sprint2
(-) set of closed user stories
(X) working deployment on Heroku
(X) travis reports build passing
(-) team members have completed reflection
(X) demo

## Checklist notes

- There isn't a sprint tagged sprint2.

- There seem to be very few backlog items that successfully made it to the "Done" pile.

- Missing reflection from Cliff

## Discussion

### Functionality

You made some good steps forward, but I'll admit that I am quite concerned about how much you have left on your plate for the final sprint. I think that putting off all server, DB, and authentication functionality until the final sprint was an unfortunate decision. During your sprint planning, I would like you to really think about priorities and try to find a way to make a solid, _finished_ site. Finished does not mean everything that is currently stubbed in being complete -- it means that there are no more "under construction" areas or hand waving over how data gets into the system.

In addition, I would like you to think a little bit more about the flow for DJs entering in their playlists. The drop-down list of shows doesn't seem like the right solution. It may be different here, but my experience was that not many DJs had multiple shows. It also doesn't seem to answer the question of what to do about subbing as the sub would not have access to the show they are subbing for. Also, I know that back long ago when I subbed for folks I wouldn't just do "my" show, and sometimes I didn't even have an active show. I suspect that really getting that right will take more time and thought than you have time for, so perhaps the best solution would be for the editor to just populate the current show with a lock so no one else can edit at the same time.

This is a very minor point, but I would also suggest keeping track of when tracks are "dirty" and disabling the Update button when they are not. I think that will help to avoid the problem of people forgetting to click the buttons to save changed data.

Another question I would have about the playlist would be if you will have any way to indicate what the actual current song is. This leads to a related question of whether or not you are going to push out updates to the playlist or require listeners to reload the page.

### User stories

The user stories are looking better. I'm not terribly fond of #11 ("As a user, when I click on different links in the navigation bar, I want it to take me to that page") though. That is the opposite of most of what we are looking for in a user story. It is all interface and no justification. A user story for this would be along the line of "As a user, I want a consistent interface that allows me to quickly jump to the different functions of this site so that I don't waste time finding trying to find things, I don't miss any of the features of the site, and I don't get lost. ". This could even be broken down to discuss each of the specific features of the site. The navigation menu is just the _implementation_ of this. It is not the only possible choice.

I see that the user stories generally have acceptances tests, and there are some notes about implementation and data on them. You could take that a little further.

I would like to see a little more granularity in your backlog items, even if that means creating some pure todo list items that are derived from the user stories. I suspect that part of the reason you ended the sprint with so many things still "in flight" is because the backlog items were major pieces of functionality.

### Agility/scrum

I like the tagging and the use of the project board, but like I said above, you need more granularity for this process to really work well. The pattern of commits seems a little more steady this sprint, so that is a good improvement.

### Integration

The pull requests still seem to be going pretty smoothly. I like the 1/3, 2/3, 3/3 approach, and I see some reasonable comments rather than just lgtm all of the time. However, I note that many of the PRs I looked at had something like a two day gap between submission and acceptance. You are probably going to want to address that this sprint.

I'll also note that at the end of a sprint there shouldn't be _any_ open PRs.

### Implementation

I thought your group would jump on the multi-page practical and be the first to switch over. You site sort of calls out for that.

I am glad to see tests and proptypes being used. Some of the tests are a little trivial, but I realize that you are working from my model, which is a mix between useful tests and "professor tests" (tests that make sure you implemented required features to my specifications).

The playlist logging facility seems to have gotten a little extra complicated. I went back and forth with Maddie a bit at the last minute, and it seemed like state management got a little out of hand. remember that there is one source of truth, and you can't access state immediately after you set it. Here is an example from `SongInput`:

```javascript
const saveSong = (show) => {
  setSaved(true);
  const action = saved ? "update" : "enter";
  complete(action, show);
};
```

See how the value of `saved` is used one line after `setSaved(true)` is called? Remember that in React, we write our code more declaratively. The props and state should be considered constants. You are writing code to display content based on those values. If we have functionality (like this) that is calling a callback, we still use the value we have _right now_.
