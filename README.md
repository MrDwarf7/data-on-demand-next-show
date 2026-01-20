# README

## The short

`Data-On-Demand` was originally (at a production grade level) designed for inter-department automation of common communications that I was finding to bog down the
day-to-day tasks we also had to complete by creating self-service tools for other sections of the business.

### Tools overview

- Project Runner: [turbo](https://turborepo.dev/)
- Package Manager: We use [bun](https://bun.com/) for our package manager. (This can widely be ignored if you opt to use `turbo`. More on that below in the [###Note about `turbo`] section)
- Linting: [biomejs](https://biomejs.dev) - As a default, we turn _**all**_ linting on and to the highest severity. Rules and lints are only turned _off_ when a reasonable reason can be given or found.
- Formatting: [biomejs](https://biomejs.dev) - We also use `biomejs` for our formatting. Consolidating external developer tooling is always a nice plus.

### Internal dependency overview

- CSS: [TailwindCSS](https://tailwindcss.com/) - This is standard practice in most modern Next.Js projects.

> [!IMPORTANT]
>
> TailwindCSS is an open source product. It's also in danger of ceasing to exist.
> It's an amazing tool for development speed and solves a real problem that almost all developers face (even if you're personally not a frontend developer), which is the overhead of context switching while working.
> The owner has (recently as of Janurary 2026) talked about, and expressed the challenges that come with providing such widely used developer tooling,
> as an open source software. As you can imagine, this comes with challenges and requirements,
> with the biggest one being financial support for the talented developers that work on such a widely adopted project that still requires support.
>
> If you're in a position to do so; or you're a business owner that's open to giving back to the phenomenol technologies developers rely on
> Please consider supporting the amazing team over at `tailwindcss` through their `TailwindPlus` project ( link [here](https://tailwindcss.com/plus).
> These are stunning, pre-built templates for business applications that would assist the team in moving at _lightning speed_ which is critical, now more than ever.

## Getting up and running

This project uses `bun` as it's package manager, and is primarily set up to be run via [turbo](https://turborepo.dev/)
(A tool also provided by Vercel for large scale repositories, and doubles as a build script tool in this case)

### Note about `turbo`

This project _will_ run without turbo, though it's preferrable to use it when possible.
If you don't have turbo installed, and wish to use it they recommend installing it globally
(While maintaining the version as a pinned dependency in the `package.json` file).

To install turbo you can run:

```sh
bun add turbo --global
```

### If using turbo to run the project

If you opted to use `turbo` you can simply run:

```sh
turbo dev
```

This will install the dependencies (via `pnpm install`), run linting and lint fixes and formatter, before then running the server in development mode.

### If you wish to only use `pnpm`

The classic way to get started with this project is to run:

- Note the `devn`

```sh
pnpm install && pnpm devn # or `pnpm run devn`, both work.
```

## General Structure

### Root files

`Data-On-Demand` is setup to use `turbo` via `pnpm` (though can be run without it following the instructions above),
it uses [biomejs](https://biomejs.dev) for both formatting and linting configurations, with reasonably strict rules in place.

### `Src` directory structure

This project uses a `src/` directory to keep everything contained in one place.

Within the `src/` directory there are a few key folders:

- `apps/` - This contains the main applications for the project.

- `components/` - This houses both [shadcn/ui](https://ui.shadcn.com/) components, as well as custom generic components.
- `config/` - Configuration files, split up by the external facing side, and the internal facing side.
  A large portion of the project was to fetch information from the backend, in this case the config files act as a way to easily swap out the implementations later on.

- `hooks/` - Custom React hooks or Next.Js server hooks.
- `lib/` - Library code that is used across multiple parts of the project. Library code must be entirely generic and reusable (Could be taken to another project with no-to-minimal changes).
- `store/` - Application state management code (In this case using [Zustand](https://zustand-demo.pmnd.rs/)).
- `types/` - Custom TypeScript types and interfaces used throughout the project.
  Note: This will likely see heavy development as the porject moves from early prototype/development stages to polished production ready code.
  Currently types are defined mostly as needed, and will be consolidated and generalized later on.

There is also a file called 'proxy.tx' in the `src/` directory. This is the Next.Js convention for defining what was previously called `middleware`.

### App structure

The setup for `Data-On-Demand` is a little odd due to how Next.Js handles their base `layout.tsx` files and the nesting structure they use.
Because of this, we make use of 'route groups' to separate out the internal and external facing sides of the application.

This allows us to have 2 entirely (non-nested) layouts, while still being able to share components, hooks, and library code.
This can be seen directly via the `(external)/` directory for the external business facing side, and the `internal/` directory for the internal, team facing side.

- `src/(external)/` - The external facing side of the application.
  This is what business users will interact with to request data, view reports, and manage their requests.
- `src/api/` - Next.Js API routes split by internal and external facing sides.
- `src/internal/` - Internal facing side of the application.
  This is what team members will use to manage incoming requests, process data, creating news or information posts and to communicate with direct business enquiries.

- `src/styles/` - Global styles, CSS variables, and TailwindCSS configuration.
- `src/favicon.ico` - The favicon for the application. (Currently a placeholder)
