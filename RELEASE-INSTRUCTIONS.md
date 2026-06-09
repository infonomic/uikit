# Package Changset and Release Instructions

## I: Auto flow with GitHub action:

NOTE: This flow will use a GitHub action to version packages based on a pending changeset in the .changeset directory, and then create a PR to be merged after manual review. Once the PR has been accepted, the action will then publish the package to NPM - currently using a token from the 58bits NPM account (expires in 20 years, and only has access to the @infonomic/uikit repo).

1. `pnpm changeset`

Choose packages to version with major, minor or patch releases.
Write a summary for the change set.

2. Git commit the change set to main and push.

3. The github action will create a pull request for the changeset

4. Manually review and accept the PR - the github action will then publish to npm.

NOTE: the auto-flow GitHub action will also create a Releases entry in the repo as well as attach zipped binaries.

IMPORTANT: It's important that everyone then git fetches, git pulls the latest from the main branch of the repo, and merges / rebases their local branches to bring them up to date with the release.

## II Manual flow:

NOTE: This flow publishes via `./publish-packages.sh`, which uses the npm bypass token in your `~/.npmrc`. We use this instead of `pnpm release:npm` (`changeset publish`) because `pnpm`/`changeset` cannot publish under passkey-only 2FA — pnpm's OTP pre-check accepts only a typed numeric code and dead-ends at `ERR_PNPM_OTP_NON_INTERACTIVE`. Plain `npm publish` honours the `~/.npmrc` bypass token silently. The script `pnpm pack`s first (which rewrites any `workspace:*` deps into real versions) and then `npm publish`es the resulting tarball.

1. `pnpm changeset`

Choose packages to version with major, minor or patch releases.
Write a summary for the change set.

2. `pnpm version-packages`

This will call changeset version, updating all package.json versions and updating release notes. It will also clear / remove the pending changeset from the .changeset directory.

3. Commit the release (e.g. `chore(release): X.Y.Z`).

The publish script tags this commit, so make the release commit before running it.

4. `./publish-packages.sh`

This builds `@infonomic/uikit`, packs it, publishes the tarball to npm via the token in your `~/.npmrc`, then creates and pushes the `@infonomic/uikit@X.Y.Z` git tag. It is idempotent — if the version is already published it skips the publish and just ensures the tag — so it's safe to re-run after a partial failure.

Options:
- `./publish-packages.sh --dry-run` — pack + verify only; no publish, no tag, no push.
- `./publish-packages.sh --no-build` — skip the turbo build and use the existing `dist/`.
- `./publish-packages.sh --yes` — skip the confirmation prompt.

NOTE: The manual flow will not create a Releases entry in the repo (and therefore not create any attached zip binaries).
