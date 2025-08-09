# Package Changset and Release Instructions

## I: Auto flow with GitHub action:

1. `pnpm changeset`

Choose packages to version with major, minor or patch releases.
Write a summary for the change set.

2. Git commit the change set to main and push.

3. The github action will create a pull request for the changeset

4. Accept the PR - the github action will then publish to npm.

## II Manual flow:

1. `pnpm changeset`

Choose packages to version with major, minor or patch releases.
Write a summary for the change set.

2. `pnpm version-packages`

This will call changeset version, updating all package.json versions and updating release notes. It will also clear / remove the pending changeset from the .changeset directory.

3. `pnpm publish:npm`

This will build the uikit package, and then call changeset publish. NOTE: If published via the Infonomic2 account, it will require an OTP entered into the command line.
