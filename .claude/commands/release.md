---
name: release
description: Full release for @infonomic/uikit — changeset → version-packages → release commit → publish-packages.sh (npm publish + tag) → sync develop/main → GitHub release.
allowed-tools: AskUserQuestion, Bash, Read, Write
argument-hint: [optional bump level: patch|minor|major]
---

Drive the full release loop for `@infonomic/uikit`, end to end. `@infonomic/uikit` is the **only** publishable package in this repo — the three apps under `apps/*` are `private: true` and are bumped automatically as internal dependents (`updateInternalDependencies: patch`), so they are never named in the changeset and never published.

## What this command does

1. Asks the user for the bump level (patch / minor / major).
2. Derives a one- or two-line changeset summary from the commits since the previous release and writes a changeset file naming `@infonomic/uikit` at the chosen bump level.
3. Runs `pnpm version-packages` and verifies the version delta matches the requested bump level — **and that the resulting version is not already published on npm or already tagged** (the collision that has bitten this repo before).
4. Runs `pnpm lint` to catch any issue on the bumped CHANGELOGs / package.json files.
5. Stages the bump + lint output and creates a single `chore(release): X.Y.Z` commit on the current branch (usually `develop`).
6. Pushes that branch.
7. Runs `./publish-packages.sh --yes` — builds, packs (rewriting `workspace:*` deps), `npm publish`es `@infonomic/uikit`, then creates and pushes the `@infonomic/uikit@X.Y.Z` tag. Replaces `pnpm release:npm` / `changeset publish`, which dead-end under passkey-only 2FA.
8. Fast-forwards `main` to the release commit and pushes it, bringing `develop` and `main` back into sync — the step whose absence caused a duplicate-version collision in the past.
9. Creates a GitHub release on the `@infonomic/uikit@X.Y.Z` tag summarising the cycle.

The command is idempotent at every step — re-running after a partial failure should detect what's already done and skip it (`publish-packages.sh` skips an already-published version and an existing tag; the GitHub-release step detects an existing release).

## Preconditions

Before any visible action, verify all of these. If any fails, stop and explain what the user needs to do:

1. **`gh` is installed and authenticated** — `gh auth status` shows a logged-in account with `repo` scope.
2. **Working tree is clean** — `git status --porcelain` is empty. (Otherwise the release commit would sweep up unrelated work.) If the *only* diff is an un-committed `pnpm version-packages` run the user just did by hand, offer to `git restore` it and drive the bump through this command instead, so the summary/guards run.
3. **`develop` and `main` are both in sync with their remotes** — `git fetch origin`, then for each branch `git rev-list --left-right --count <branch>...origin/<branch>` shows `0 0`.
4. **`main` is not ahead of `develop`.** Run `git rev-list --left-right --count origin/main...origin/develop`. If the left number is non-zero, a previous release landed on `main` but was never synced back to `develop` — **stop**. Bumping now would recompute a version that already exists. Tell the user to reconcile first (`git checkout develop && git merge origin/main`), then re-run. This is the guard for the exact failure this repo has hit before.
5. **You are on a branch where the release should land** — normally `develop`. If on `main` or a feature branch, confirm with the user before proceeding.
6. **Read the *current* version** from `packages/uikit/package.json` and stash it as `PREV_VERSION`. This is the "before" anchor for the bump-level check.

## Step 1 — Choose bump level

If `$ARGUMENTS` is one of `patch` / `minor` / `major`, use that. Otherwise ask via `AskUserQuestion`:

- Question: `"Release bump level for v<PREV_VERSION> → next?"`
- Header: `"Bump level"`
- Options (in this order): **Patch (Recommended)** (bug fixes, internal chores), **Minor** (backward-compatible features), **Major** (breaking changes).

## Step 2 — Derive the changeset summary from commits

Do **not** ask the user for a summary. Build a short one (one or two lines, never a paragraph) from the commits between the previous release and `HEAD`:

```sh
git log --oneline "@infonomic/uikit@<PREV_VERSION>..HEAD"
```

Rules for synthesising the line(s):

- Lead with the most user-visible change in the range. Bug fixes and features beat chores; chores beat dependency bumps.
- Name the affected component/area in bold backticks when it disambiguates (e.g. **`Search`**, **`Checkbox`**, **`Input`/`Label`**) — otherwise keep it general.
- Past tense, lowercase, no trailing period. Style should read like a one-line changelog entry, e.g. *"accessibility fixes for Search, Checkbox, and focus-ring contrast from the a11y audit"*.
- Skip release commits (`chore(release): …`), pure lint/format commits, and dep bumps unless that's literally all there is in the range.
- Hard cap: two lines. If you can't compress the range into two lines, pick the two highest-impact items — the longer prose belongs in the GitHub release notes in Step 9, not in the CHANGELOG.

This text goes verbatim into the changeset markdown body, where `pnpm version-packages` fans it into the `@infonomic/uikit` CHANGELOG (and, as a dependency line, into the private apps' CHANGELOGs).

## Step 3 — Write the changeset file

Pick a slug — `release-<timestamp>` is fine (e.g. `release-2026-07-03-1545`). Write `.changeset/<slug>.md` naming only the one publishable package at the chosen bump level, followed by the summary from Step 2:

```markdown
---
"@infonomic/uikit": <level>
---

<summary derived in Step 2>
```

Do **not** list the `apps/*` packages — they are private and `pnpm version-packages` bumps them automatically via `updateInternalDependencies`. `fixed` and `linked` in `.changeset/config.json` are both empty; re-read the config rather than assuming, in case that changes.

## Step 4 — Run version-packages

`pnpm version-packages` (non-interactive — it consumes the changeset file). After it completes:

- Read `packages/uikit/package.json` `version`. Compute the expected next version from `PREV_VERSION` and the chosen bump level (e.g. `6.7.6` + patch = `6.7.7`, + minor = `6.8.0`, + major = `7.0.0`). Confirm the new version matches; if not, stop and show actual vs expected.
- Record this as `NEXT_VERSION`.
- **Collision guard (critical).** Verify `NEXT_VERSION` is not already taken:
  - `npm view @infonomic/uikit@<NEXT_VERSION> version` — must be empty / error. If it returns the version, it is **already on npm** — stop. (This is exactly what goes wrong when `main` carried a release `develop` never received; recheck Precondition 4.)
  - `git rev-parse -q --verify "refs/tags/@infonomic/uikit@<NEXT_VERSION>"` — must fail. If the tag already exists, stop and reconcile.
- Also confirm the private apps under `apps/*` picked up their dependency bump (their `package.json` version and a `@infonomic/uikit@<NEXT_VERSION>` line in their CHANGELOG). This is expected, not an error.

## Step 5 — Lint

`pnpm lint` — this repo's lint runs Biome with `--write --unsafe`, so it **auto-fixes** in place rather than just reporting. Expect it to succeed. Two things to watch for afterward:

- **Unrelated formatting churn.** Biome will reformat any pre-existing drift it finds, not just the bumped files — e.g. long-line wrapping in CSS, trailing newlines, `routeTree.gen.ts`. Run `git status --short` and separate these from the bump: the version/CHANGELOG files belong in the release commit; everything else is incidental and must **not** be swept into it (this repo's release commits are pure bumps — see any past `chore(release): X.Y.Z`). Commit the incidental files first as a separate `style: biome formatting fixes` commit (Step 6 handles the split).
- **A real failure.** If lint errors instead of quietly fixing, stop and surface the output — something unrelated needs attention.

## Step 6 — Release commit

If Step 5 produced incidental formatting fixes (files outside the version/CHANGELOG set), commit those **first** so the release commit stays a pure bump:

- `git add` only the incidental files, then `git commit -m "style: biome formatting fixes"`.

Then stage the bump artefacts explicitly — do **not** use `git add -A`:

- `git add .changeset/` (the consumed changeset file is removed; the config stays — both diffs land here)
- `git add packages/uikit/package.json packages/uikit/CHANGELOG.md`
- `git add apps/*/package.json apps/*/CHANGELOG.md` (the auto-propagated dependency bumps)

After staging, `git status --porcelain` should show **only** the version/CHANGELOG files staged and nothing left unstaged. If anything else is staged, unstage it — it belongs in the `style:` commit, not here.

Commit with the literal message `chore(release): <NEXT_VERSION>` (match the format of past release commits — e.g. `chore(release): 6.7.7`). Then `git push` on the current branch.

## Step 7 — Confirm before publishing

Stop here and show the user:

- `PREV_VERSION → NEXT_VERSION`
- The anchor commit SHA (short form, just-pushed `HEAD`)
- The changeset summary line(s) from Step 2
- The remaining steps: `./publish-packages.sh --yes` (publish + push tag) → fast-forward `main` and push → create GitHub release.

Wait for explicit approval. `./publish-packages.sh` actually publishes to the public npm registry and is not trivially reversible — the user must confirm.

## Step 8 — Publish to npm (+ push tag)

`./publish-packages.sh --yes` — Step 7 already captured explicit approval, so `--yes` skips the script's own (otherwise redundant) confirmation prompt.

The script builds `@infonomic/uikit` via turbo, `pnpm pack`s it (rewriting `workspace:*` into real versions), guards against a `workspace:` leak in the tarball, `npm publish`es the tarball (`--access public`; plain npm honours the `~/.npmrc` bypass token silently, unlike pnpm under passkey 2FA), then creates and pushes the `@infonomic/uikit@<NEXT_VERSION>` tag.

It is **idempotent**: a version already live on npm is skipped and an existing tag is left alone, so re-running after a partial failure just finishes the job. Run `./publish-packages.sh --dry-run` first if you want to pack + verify without publishing.

If publish fails partway, surface the script's output verbatim and stop. Re-running the script is the intended recovery path — but only after the user diagnoses why it failed.

## Step 9 — Sync `main`

Bring `main` up to the release commit so the branches don't drift — **the step whose absence caused the past duplicate-version collision.** Skipping it is not optional.

- `git checkout main`
- `git merge --ff-only <release-branch>` (the branch you were on at the start — normally `develop`). If fast-forward isn't possible because `main` has commits `develop` doesn't, **stop** and ask the user how to reconcile.
- `git push origin main`
- `git checkout <original-branch>` to return to where you started.

## Step 10 — GitHub release

Create a single GitHub release on the per-package tag (this repo uses `@infonomic/uikit@X.Y.Z` as the release tag — there is no umbrella `v<version>` tag; see the existing releases via `gh release list`).

1. **Find the anchor commit.** `git rev-list -n 1 "@infonomic/uikit@<NEXT_VERSION>"`.
2. **Detect prior state (idempotency).** `gh release view "@infonomic/uikit@<NEXT_VERSION>" --repo infonomic/uikit` (capture exit code). If a release already exists, show its URL and ask whether to (a) leave it, (b) edit notes, or (c) delete + recreate. The tag already exists and was pushed by `publish-packages.sh` in Step 8 — do not recreate it.
3. **Synthesize release notes.** Group changes into these sections, in this order. Omit any section with no entries — never include an empty heading.

   ```markdown
   ## Highlights

   New features, enhancements, and other non-breaking changes likely to be of user interest. Lead each bullet with the affected component/area in bold backticks: **`Search`**.

   ## Bug Fixes

   Direct bug fixes — regressions, packaging fixes, runtime corrections, accessibility fixes.

   ## Chores

   Internal-tooling and dev-experience changes that don't alter consumer behaviour but are worth recording. Brief — usually one line each.

   ## Migrations

   Non-breaking changes that nonetheless require the user to migrate, run a script, or update configuration. State the migration step explicitly.

   ## Breaking Changes

   Anything requiring the user to change code, config, or dependencies *before* the release will run. State both the change and the required action.
   ```

   Within each section:
   - Lead each bullet with the affected component/area in bold backticks (**`Checkbox`**, **`Input`/`Label`**), or **uikit** (no backticks) for cross-cutting items.
   - Each bullet should be a substantive sentence or two, not a commit subject. Explain *what* changed in user-visible terms, *why* it matters, and any *consumer-side effect*. Name specific props, components, CSS variables, or tokens the user would search for (e.g. `--ring-noeffect`, `ariaLabel`). Past tense.
   - Skip "patch dependencies updated" noise.

   **Source priority for the prose:**
   1. The conversation context for this release cycle — usually the strongest source if the work happened in-session.
   2. `git log --oneline "@infonomic/uikit@<PREV_VERSION>..HEAD"` plus per-commit diffs (`git show <sha>`).
   3. The top of `packages/uikit/CHANGELOG.md` (the Step 2 line) — expand it with context, don't just repeat it.

   Match the tone of recent releases — open `gh release view "@infonomic/uikit@<PREV_VERSION>" --repo infonomic/uikit`. If you can't construct a confident summary, stop and ask the user rather than guessing.

4. **Confirm before any visible action.** Show the version, anchor SHA, the full proposed notes, and the steps about to run. Wait for explicit approval.
5. **Execute.** Write the notes to a temp file, then:
   - `gh release create "@infonomic/uikit@<NEXT_VERSION>" --repo infonomic/uikit --title "@infonomic/uikit@<NEXT_VERSION>" --notes-file <temp-file>`
6. **Report.** Print the release URL returned by `gh release create` (or by `gh release view` if it already existed and the user chose to leave it).

## Failure modes to handle gracefully

- `pnpm version-packages` produces no version change → no pending changeset was found; the changeset file likely wasn't written correctly. Surface and stop.
- `NEXT_VERSION` already on npm or already tagged → almost always `main` carried a release `develop` never received. Stop, point at Precondition 4, and have the user sync `develop` with `main` before retrying.
- `./publish-packages.sh` fails partway → surface its output verbatim and stop. It's idempotent, so re-running is the intended recovery once the cause is fixed.
- `git merge --ff-only <branch>` on `main` fails → `main` has diverged. Stop and ask the user how to reconcile.
- `gh release create` fails because of branch protection → surface the error verbatim and stop.

## What this command does NOT do

- It does NOT do the publish itself — `./publish-packages.sh` does the actual npm publish and tag creation/push; this orchestrator only invokes it (with `--yes`, after the Step 7 approval).
- It does NOT publish or version the `apps/*` packages directly — they are `private` and only receive the automatic internal-dependency bump.
- It does NOT create draft GitHub releases by default. If the user wants a draft, they say so at the Step 10 confirmation.
- It does NOT edit or move the per-package tag once pushed.
- It does NOT skip hooks (`--no-verify`) or signing on the release commit.
