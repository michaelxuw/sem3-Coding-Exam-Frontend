# 2. Semester CA2 React Frontend - Template

This a template project build around React, TailwindCSS and React-Router-dom using Vite.

## Authors

- [@Legolai](https://github.com/Legolai)
- [@MuneebAsharf](https://github.com/MuneebAsharf)
- [@Michaelxuw](https://github.com/Michaelxuw)


## Tech Stack

React, React-Router-dom, TailwindCSS, Vite, TypeScript

## Features

- Guarded Routes
- Type safe (TypeScript)
- Auth context

## Guarded Routes

1. Replace ```"/private"``` with the name of a new guarded route. E
2. Edit ```allowedRoles``` array to add or remove which roles have permission to the route
3. Replace ```<Private/>``` with component/page that should be shown if the client has permission


```tsx
<Route path="/private" element={<GuardedRoute allowedRoles={["admin"]} />}>
  <Route index element={<Private />} />
</Route>
```


## Setup Project

Clone the project

```bash
  git clone git@github.com:Legolai/sem3-CA2-frontend-template.git sem3-CA2-frontend
```

Go to the project directory

```bash
  cd sem3-CA2-frontend
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```

## Deployment

```bash
$ ./deploy.sh
please enter the droplet url (e.g myserver.dk): <YOUR_WEBSITE_URL>
```
