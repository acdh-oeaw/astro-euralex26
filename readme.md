# EURALEX 2026 website

## how to run

Install [Node.js 26](https://nodejs.org/en/download) and the pnpm version pinned in
[`package.json`](./package.json).

```bash
npm install --global "$(node -p 'require("./package.json").packageManager')"
```

set required environment variables in `.env.local`:

```bash
cp .env.local.example .env.local
```

The [validation](./.github/workflows/validate.yaml) and
[deployment](./.github/workflows/build-deploy.yaml) workflows use GitHub Actions variables for
public build settings.

- `PUBLIC_REDMINE_ID` (required): service issue for this application in the acdh-ch
  [redmine](https://redmine.acdh.oeaw.ac.at) issue tracker.
- `PUBLIC_APP_BASE_URL` (required): the base url for this application. the default of
  "http://localhost:3000" should be fine for local development.
- `PUBLIC_APP_BASE_PATH` (optional): set this when deploying to a path other than "/".
- `PUBLIC_BOTS` (required): whether this website can be indexed by web crawlers like the google bot.
  supported values are "disabled" and "enabled", defaults to "disabled".
- `PUBLIC_MATOMO_BASE_URL` and `PUBLIC_MATOMO_ID` (optional): set these to support client-side
  analytics with matomo.
- `PUBLIC_GOOGLE_SITE_VERIFICATION` (optional): set this to verify site ownership for google search
  console.
- `ENV_VALIDATION` (optional): whether environment variables should be validated. supported values
  are "disabled", "enabled" and "public", defaulting to "enabled".

when adding new environment variables, don't forget to add them to `.env.local.example` as well.

install dependencies:

```bash
pnpm install
```

Use `pnpm format:check` for Oxfmt and `pnpm lint:check` for Oxlint and Stylelint. The install step
sets up Lefthook to lint and format staged files before each commit.

run a development server on <http://localhost:3000>:

```bash
pnpm run dev
```

> [!TIP]
>
> this template supports developing in containers. when opening the project in your editor, you
> should be prompted to re-open it in a devcontainer.

## how to edit content

Run `pnpm dev` and open <http://localhost:3000/admin>. Keystatic saves edits to the local checkout.
Commit and push the content changes to publish them.

## how to preview the production build

```bash
pnpm build
pnpm start
```

Astro generates the public pages in `dist/` and Pagefind writes the search index to
`dist/pagefind/`. The production image serves those files with Caddy on port 3000.

## how to deploy

- ask a sysadmin to create a new acdh-ch kubernetes project.
- create a new namespace in that project via [rancher](https://rancher.acdh-dev.oeaw.ac.at), and set
  the `KUBE_NAMESPACE` github variable to that namespace.
- adjust the [`app_name`](./.github/workflows/build-deploy.yaml#L36), which will be the name of the
  deployment in the above namespace.
- set the `PUBLIC_URL` github variable to the application's public url (e.g.
  "https://my-app.acdh-ch-dev.oeaw.ac.at"), and set the `KUBE_INGRESS_BASE_DOMAIN` to the public
  url's base domain (e.g. "acdh-ch-dev.oeaw.ac.at"). `PUBLIC_URL` should match
  `PUBLIC_APP_BASE_URL`.
- if you haven't yet, create a service issue in the acdh-ch
  [redmine](https://redmine.acdh.oeaw.ac.at) issue tracker, and set the `SERVICE_ID` github variable
  to the issue number. this should match the `PUBLIC_REDMINE_ID` variable in your `.env.local` file.
- ensure required build args (prefixed with `PUBLIC_`) are referenced in both the
  [`Dockerfile`](./Dockerfile), as well as the [validation](./.github/workflows/validate.yaml) and
  [deployment](./.github/workflows/build-deploy.yaml) pipelines, and set as
  [github variables](https://github.com/acdh-oeaw/template-website-astro/settings/variables/actions).
- ensure both the github repository, as well as the
  [package registry](https://github.com/orgs/acdh-oeaw/packages/container/my-app/settings) is set to
  public.

if everything is set up correctly, every git push to the `main` branch will create a new deployment
if the validation pipeline passes.
