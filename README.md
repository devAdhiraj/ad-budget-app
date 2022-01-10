# AD Budgeting App

A web app built using [NextJS](https://nextjs.org/) and [React](https://reactjs.org/) that employs Server-Side Rendering (SSR) along with Firebase authentication and Realtime-database.

The web app uses firebase to authenticate users with Google Sign-In. Once authenticated, the user can add entries to track their income/expenses.
All users and their transactions are stored in a Firebase Realtime Database.

To effectively use SSR, the auth state needed to be determined at backend. However, firebase auth state is only available on client side. To get around this issue, the NextJS backend includes custom APIs to login which use Firebase admin SDK to login from the backend. The custom login API also returns a JWT which is stored in an HTTP Only cookie. The JWT can then be used to determine auth state at backend. The JWT is refreshed at each request.

The frontend is a responsive, dark-theme web app styled with Bootstrap and CSS modules.

<img src="https://user-images.githubusercontent.com/75645547/148712232-63a6cb19-e5a0-4543-892f-157a2b03af54.png" width="300">

