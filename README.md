# SplashSearch

A tiny yet advanced Unsplash image search web app 🔭

## Getting Started 💻

#### 1. Clone the repo

Git clone this repository either with HTTPS, SSH, or download the repo ZIP:

```bash
# SSH
git clone git@github.com:adithwip/splash-search.git

#HTTPS
git clone https://github.com/adithwip/splash-search.git
```

#### 2. Unsplash API Client-key

Retrieve **Unsplash Client-key** from [Unsplash Developer](https://unsplash.com/developers) or ask me for it
Put it inside `.env.local` file (you have to manually create this file)

```bash
NEXT_PUBLIC_ENV_UNSPLASH_CLIENT_KEY=aSkMeforTh1$-or-u$eItY0uRoWn
```

#### 3. Package install

Node.js v12.22.0 or later. The latest the better 😉

Run node package install:

```bash
npm install
# or
yarn install
```

#### 4. Start the development

Run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Development Stacks 🧱

#### Next.js (React v18)

In today's web development, we are fortunate to have frameworks like Next.js (or others like SvelteKit or Nuxt). Developing web apps these days with this “SDK” for the web is an advantage that every web developer shouldn’t be missed out on to take to the production level. Next.js (as of today) is the SDK of the web to simplify and take every web app to the next level. The built-in routing, data fetching APIs, Image optimization components, API routes, etc., make every web app development focuses more on the product outputs and outcomes, rather than on maintaining the framework and libraries.

**Alternatives: Create React App, Gatsby, Remix**

#### TanStack React Query v4

React does not come with an opinionated way to fetch data, we can use React hooks API like useEffect to make side effect changes to render the UI. But modern web apps shouldn’t be dependent only on useEffect. We need to use a library to do more with the data we fetch on the client, things like caching the data, cache revalidation, optimistic UI, etc. Also, we need to separate states based on paradigms like Server State and Client/UI state. Server State is the data from another source that is not in our control, like someone’s else server. Client State, however, is what we usually manage with a state management library like Redux, the only purpose of this is just managing the web app UI states (opening/closing modal, preventing too many props drilling between parents and child component, etc).

**Alternatives: SWR, Redux Toolkit Query**

#### Mantine

Creating a web app with a component library can give both benefits and tradeoffs. When the team has its dedicated UX Designer that provided a robust Design System, using component libraries such as Mantine or other like MUI, ChakraUI, Bootstrap, etc. could double the effort of the development of the UI to customizing the components to match the Design System. Some solutions emerged such as a new paradigm like Headless UI such as Radix, which provided robust component logic with “default” styles that can be themed to match any existing Design System with ease, unlike Bootstrap which comes with a specific design in mind. But I'm not using “pure” Radix for this project because I still need quite-styled “styles” from the components and also have the flexibility to choose what logic will be used in each of the components. That’s why Mantine is chosen because it separates the package of the UI and Hooks, so this project doesn't have to install big chunks of dependencies. It also comes with a specific package for Next.js integration. Mantine uses Radix in some of its components, like ScrollArea. And most important, Mantine is accessible.

**Alternatives: Material UI, ChakraUI, Radix, TailwindCSS**

#### Jest and React Testing Library (Unit and Integration Test)

React Testing Library “enforced” the test mindset for this project to avoid testing on implementation details, and focus more on real users-centric scenario tests instead (via DOM events). Jest as the test framework is still one of the best choices to date, also it is what the library recommended for now. It will also enable this project to have an end-to-end test via Cypress in the future.

## Architecture 🏗

The heart of this app is the search functionality. End users will be bombarding the search bar to use this web app. Specific architecture must be chosen to prevent query abuse in the search bar. The most common strategy to prevent this is using debounce technique. But advanced architecture specifically to address data caching needs to be done, thanks to React Query to make it easier. The primary thing React Query solved is by using a stale-while-revalidate caching strategy that allows this app to cache and control the data to only make a direct server request only if the data is staled. So if end users try to search with a previous query search keyword, the app won't request any data to the server and get the data right from the cache instead.

<figure>
<img width="1920" alt="React Query Data Flow" src="https://user-images.githubusercontent.com/27177332/178522457-fc9568ed-71c2-4a13-9a2e-19f45b154c04.png">
<figcaption style="text-align: center;">React Query archirecture</figcaption>
</figure>

## Design Pattern 🎨

Influenced by [Solid Patterns for React](https://solidbook.io/), this web app codebase follows the principles of decoupled logic and view. Mainly to make a testable codebase in the future.

## TODO 📝

This web app is far from finished. The MVP phase is done mainly to covers its basic feature for search, favorite, and download images. Here is the plan for the upcoming development of this project:

- Develop Login and Auth for users
- Implement unit and integration Tests with Jest and React Testing Library
- Implement end-to-end Test with Cypress
- Pre-commit hooks with Husky (Lint and Test)
- Implement Masonry images view
- Implement API routes for proxy the client request to Unsplash API
- Implement Zustand to manage client-state in the future
