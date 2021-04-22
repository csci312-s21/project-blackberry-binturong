# Feedback for alabaster-armadillo

(X) tagged commit on main for sprint1
(X) set of closed user stories
(X) working deployment on Heroku
(X) travis reports build passing
(-) team members have completed reflection
(X) demo

## Checklist notes

Missing a reflection from Cliff

## Discussion

### Functionality

I like that you started with the overall structure -- that fits well with the incremental/iterative approach. That said, the functionality is pretty minimal at this stage. I know the first sprint was a bit short because of the break, so I'll be expecting big things for sprint 2...

### User stories

One of the challenges you face is that you are re-implementing an existing website. It means you have a clearer vision of the end point, but... it also may mean that you worry less about justifying the design.

So, user story #11 was helpful in that it was a way to sketch in the interface, but... it is not a great user story. It talks directly about the interface, it doesn't justify its existence, and if I think about testing it it is both very general and trivial at the same time. This is almost backward from how you want to work. Start by justifying the individual pages and _why_ they should be on different pages. Then you can decide as a group that they way to handle them is the menu bar navigation.

Another example: "As a listener, I want to see more details about a particular show, so I can see if I want to tune in." (#2) What details? How long? What color the DJ's eyes are? You need to be specific so that it is testable. I will also note that this doesn't describe the context of where this information would be presented. In the schedule? Is it a blurb about the current show? Is there just a list of show somewhere? How will you know when you are done?

Here is another example "As a listener, I want a weekly schedule, so I know when to tune in." (#4). This is fine for something on the Epic level, but you want to get more specific.

- As a longtime fan of DJ Sparklepants, I want to be able to be able to quickly look up her so I can listen to it.

- As an old-schoool goth, I want to be able to see the genres of upcoming shows so I can find programs as dark as my soul.

- As an eclectic college radio listener, I want to be able to look over what will be on over the coming week so I can plan when to tune in.

These are just examples, but if these are the stories you are working with, they together suggest a schedule, but more specifically, they tell you what needs to be present -- it should show DJ names, it should be labeled by genre, and you should be able to see out over a week and see day and times when things are on. Of course, these could also be supported by something completely different, like search tools.

So, in the next sprint, strive for more specificity and acceptance criteria.

### Agility/scrum

I see some good user story management. I see movement through the columns, scoring, tagging, and assigning. As we noted in class, the commits sort of piled up at the end of the sprint, so a goal for the next sprint would be a more consistent pattern of work.

### Integration

The pull request process seems to be going smoothly. I'm seeing multiple sets of eyes and feedback with (almost) no self commits (I saw the rationale for it -- that's fine).

### Implementation

The implementation looks okay. Unfortunately, learning how to handle multiple pages will cause a lot of changes. That's Agile development for you.

I see a good number of tests, which is great. Hopefully you have been getting some good practice working with jest and the testing library. As you go forward, it will be more interesting to test integration for simple components. To some extent some of your tests are testing that buttons fire their event handlers, which you don't have to worry overmuch about. As you read through the tests in assignment and practicals, bear in mind that they are serving two purposes: (1) making sure the functionality of components is correct and (2) making sure that everyone is following directions and creating the specified interfaces. We obviously don't need the second type outside of the classroom.
