# Technical Assessment

### by Jeff Martin

#### Assumptions

- Event data description does not seem to be complete. The spec describes fetching events by user, so I assume user will have to be part of the event structure.
- An event with no created field supplied will default to the current time.
- There is no user get method defined, but I assume we would want to see a user record minus the password.

#### Future considerations

- I was going to make the data save and retrieve be async/await, since these methods will likely be database methods. I didn't want to introduce any bugs since I was nearing my time limit, so left that task for the future.
- event.getByUser doesn't check to see if the user exists. Make sense that a user should exist before logging an event attached to them.
- Passwords are being stored in whatever format they were sent to us. Depending on what format that was, we could have a security issue.
- No https support

#### How I spent my time

- 0.25 hrs, Read task description.
- 0.25 hrs, Set up environment with npm init, npm install, tweaking package.json and tsconfig.json
- 0.25 hrs, Set up index.ts
- 0.25 hrs, Set up routes: ./routes/index.ts, ./routes/user.ts, ./routes/event.ts with place holder messages. Test to make sure we are getting to the correct endpoint.
- 0.5 hrs, Create ./entities/user.ts. Test user creation
- 0.25 hrs, Make sure phone is optional and pattern matched
- 0.5 hrs, Create ./entities/event.ts. The doc says I will be returning events based on user and time, so making those fields required for the event. Test event creation
- 0.25 hrs, Test getAll, getByUser
- 0.25 hrs, Made event.time optional and default to current time. Test getWithinDay. Oops, change occurrences of event.time to event.created
- 0.25 hrs, There is no user get method defined, but I assume we would want to see a user record minus the password.
- 0.25 hrs, Review requirements. Add some comments
- 0.5 hrs, Create git repo and upload, created README
