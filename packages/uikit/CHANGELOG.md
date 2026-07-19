# @infonomic/uikit

## 6.8.0

### Minor Changes

- `ComboButton` options now take an optional leading `icon` with labels aligned across mixed menus, and the menu anchors to the whole control so `align` measures from the button; new `MarkdownIcon`
  `Modal` overlay-click dismissal now fires reliably and no longer closes when a text-selection drag is released outside the dialog

## 6.7.7

### Patch Changes

- accessibility fixes from the a11y audit: corrected the `Search` icon-button `aria-label`s and restored their focus rings, gave `Checkbox` a keyboard focus ring when unchecked, raised `--ring-noeffect` focus-ring contrast to meet WCAG 1.4.11, and hid the `Label` required asterisk from the accessible name

## 6.7.6

### Patch Changes

- Accessability changes to help text, input and text area.

## 6.7.5

### Patch Changes

- Responsive font sizes for alerts

## 6.7.4

### Patch Changes

- Increased transparency of alerts

## 6.7.3

### Patch Changes

- Updated shimmer component.

## 6.7.2

### Patch Changes

- Checkbox props renamed, and removed outline from search widget adornments.

## 6.7.1

### Patch Changes

- 574923d: Increased stroke width of history icon.

## 6.7.0

### Minor Changes

- 8f4ba76: Updated shadcn compatibility layer (and updated deps)

## 6.6.0

### Minor Changes

- 9eab9c4: Refactored CSS design system, tokens and components.

## 6.5.1

### Patch Changes

- f673965: Correctly declare react as a peer dependency.

## 6.5.0

### Minor Changes

- 4ae31ac: Autocomplete component (and updated all deps).

## 6.4.0

### Minor Changes

- dc66aa0: Migrated all loaders to CSS Modules with global exports and DX-friendly props.

## 6.3.1

### Patch Changes

- 87ad367: correct ComboButton option select handler.

## 6.3.0

### Minor Changes

- 9945473: Accept generic value param for Select (default to string).

## 6.2.2

### Patch Changes

- ff2ecc7: added event.stopPropagation() to Hamburger menu.

## 6.2.1

### Patch Changes

- 77bbc34: Allow className prop overrides for the Drawer component.

## 6.2.0

### Minor Changes

- edb675a: Resolved all stacking context issues by migrating to Base UI Drawer and Dialog components.

## 6.1.0

### Minor Changes

- 1f42c96: Updated Select component.

## 6.0.5

### Patch Changes

- 49a5961: Changed from forms dir to inputs dir, and updated README.

## 6.0.4

### Patch Changes

- 02a5191: Flex col gap for checkbox group.

## 6.0.3

### Patch Changes

- 822abf5: Updated checkbox icon colors.

## 6.0.2

### Patch Changes

- 03a1fef: Updated README and Tailwind CSS integration example.

## 6.0.1

### Patch Changes

- ed2af65: Updated README.

## 6.0.0

### Major Changes

- 381d089: Migration from Radix UI to Base UI.

## 5.44.0

### Minor Changes

- e637d8b: Updated deps and refactored Hamburger component.

## 5.43.1

### Patch Changes

- b6a434d: Updated deps.

## 5.43.0

### Minor Changes

- cf1e19d: Checkbox icon flash, and Select sizing.

## 5.42.0

### Minor Changes

- fe1fc14: Lint and docs.

## 5.41.0

### Minor Changes

- eb947ba: Correct colors for noeffect filled.

## 5.40.0

### Minor Changes

- 5df47b1: Size options for Checkbox, HelpText and ErrorText.

## 5.39.1

### Patch Changes

- 4e80b84: Fixed label indicator for required.

## 5.39.0

### Minor Changes

- 3fc350e: Reduced top padding in modal header.

## 5.38.0

### Minor Changes

- 3960df1: Reduced default height and text sizes for md and lg inputs.

## 5.37.0

### Minor Changes

- 1766b9b: Classnames for ComboButton.

## 5.36.2

### Patch Changes

- a8a9ff9: Disabled options and empty options list for ComboButton.

## 5.36.1

### Patch Changes

- 1f0b405: Correct props for ComboButton.

## 5.36.0

### Minor Changes

- 9f8775d: Implemented initial version of ComboButton.

## 5.35.0

### Minor Changes

- 2567fcf: Toast position fixed. Updated deps.

## 5.34.0

### Minor Changes

- 27461b6: Eye icons and password input component.

## 5.33.0

### Minor Changes

- 2ed9a86: Removed root styling from acordion component.

## 5.32.0

### Minor Changes

- d3c6a6f: CheckboxGroup classNames props and namespaces for DatePicker.

## 5.31.0

### Minor Changes

- b6253b5: Updated README with optional reset and removed Tailwind container overrides.

## 5.30.0

### Minor Changes

- 3af0375: Updated DatePicker widget date value to respect mode property.

## 5.29.0

### Minor Changes

- 227dc07: DatePicker widget z-index fix.

## 5.28.0

### Minor Changes

- e06c605: Initial refactor to namespaced global class selectors.

## 5.27.0

### Minor Changes

- 8c109e7: Changed from fieldset to div for text area component.
- 1ffb918: Updated deps.

## 5.26.0

### Minor Changes

- 48c7e73: Correct use of ::background selector and dual dark theme attribute selector :global([data-theme="dark"])

## 5.25.0

### Minor Changes

- f74024d: Fixed global CSS selectors for dark theme in CSS modules.

## 5.24.0

### Minor Changes

- 9e3fe4d: Removed all usages of :is(:global(.dark) \*).

## 5.23.0

### Minor Changes

- 6eed8e6: Separate reset.css from styles.css

## 5.22.0

### Minor Changes

- 2131d8c: Added AI Icon.

## 5.21.0

### Minor Changes

- b92b46e: Storybook story for icons and added stop icon.

## 5.20.0

### Minor Changes

- 8e8cdc8: Loaders color defaults to currentColor.

## 5.19.0

### Minor Changes

- 2193d8b: Refactored functional colors. Updated Chip component.

## 5.18.0

### Minor Changes

- 9fd32e2: Updaded example tailwind.css, and removed console.log from check-icon.

## 5.17.0

### Minor Changes

- 4c3d0df: Code clean up / linting, and correct peer dependency for React.

## 5.16.0

### Minor Changes

- 1874439: Fixed width for alert icon.

## 5.15.0

### Minor Changes

- 429d40b: Correctly implemented weak color tokens (disabled todo).

## 5.14.0

### Minor Changes

- a21b62a: Fixups for badge weak collision with filled disabled.
- 2c0a86d: Fixups for weak color collision with fill disabled.

## 5.13.0

### Minor Changes

- 47d5305: Updated outline button and primary weak colors.

## 5.12.0

### Minor Changes

- 9d15baf: Label is optional for checkbox.

## 5.11.0

### Minor Changes

- ddfdd12: Correct border, focus, and active ring for chips.

## 5.10.0

### Minor Changes

- f77ee8e: Implemented chip component (with updates to icon-element).
- cfb0a5e: New weak variants for button-like components.

## 5.9.0

### Minor Changes

- 3a0f5fc: Made label optional for text area.

## 5.8.0

### Minor Changes

- 972c400: Updated deps.

## 5.7.0

### Minor Changes

- 6955625: Correct container / wrapper classes styles.

## 5.6.0

### Minor Changes

- 0849a88: Fixups for control wrapper and container widths.

## 5.5.0

### Minor Changes

- 9164ba5: Added text area and checkbox astro components.

## 5.4.0

### Minor Changes

- 59900b7: Modified build scripts to place astro components in dist dir.

## 5.3.0

### Minor Changes

- 5f4a079: Astro scroll-to-top component.

## 5.2.1

### Patch Changes

- 9803e52: Removed console output in scroll-to-top component.

## 5.2.0

### Minor Changes

- f1064a2: Migrated scroll-to-top component to our dual CSS Module system.

## 5.1.0

### Minor Changes

- 2c71b1e: Accidental major bump below. YOLO changeset and commit ;-).

## 5.0.0

### Major Changes

- a5f9c05: Added width 100% to section component. Added HTML/CSS demo app.

## 4.0.0

### Major Changes

- 8619efd: Refactored selected component CSS files to include global selectors for vanilla HTML / CSS support.

## 3.11.0

### Minor Changes

- a9ab1f1: Improved typography of default blockquote and article story.

## 3.10.0

### Minor Changes

- 9adaa58: More functional style refactoring. Primary buttons 500. Storybook clean up.

## 3.9.0

### Minor Changes

- 8dea16d: Utility class fixups and continued migration to functional tokens

## 3.8.0

### Minor Changes

- f246a29: Refactored base files and breakpoints to rem.

## 3.7.0

### Minor Changes

- 6cebdfa: Initial refactor to functional tokens

## 3.6.0

### Minor Changes

- bcba54f: Updated README

## 3.5.0

### Minor Changes

- da3b24a: Updated README and Docs.

## 3.4.0

### Minor Changes

- b5df50f: Chore: Updated depenencies.

## 3.3.0

### Minor Changes

- a5d4198: Updated README

## 3.2.0

### Minor Changes

- 1194825: Continued refactor to tokens, forms, and icons current color.

## 3.1.0

### Minor Changes

- f46790b: Completed main refactor to CSS tokens

## 3.0.0

### Major Changes

- a3d7cab: Initial refactor to semantic tokens in tokens.css

## 2.15.0

### Minor Changes

- 4c2407f: Fixed overlay.tsx css remove tokens

## 2.14.0

### Minor Changes

- 1128407: Updated breakpoints in vars and container css

## 2.13.0

### Minor Changes

- 199943b: Classnames for container and section

## 2.12.0

### Minor Changes

- 596cafb: removed deprecated motion()

## 2.11.0

### Minor Changes

- 49135aa: complete implementation of badge component

## 2.10.0

### Minor Changes

- 9d1004d: complete implementation of badge component

## 2.9.0

### Minor Changes

- 15a879a: badge component

## 2.8.0

### Minor Changes

- 2ab62d0: fix for responsive svg elements inside icon-element

## 2.7.0

### Minor Changes

- 3727a1d: correct overlay body class attribute helpers

## 2.6.0

### Minor Changes

- fa44cb2: expandable avatar

## 2.5.0

### Minor Changes

- 460d33d: removed uppercase from table headings, and table header cell font size

## 2.4.0

### Minor Changes

- 82024fc: feat: additional case (fix) dropdown.item on [data-highlighted]

## 2.3.0

### Minor Changes

- 6015e81: correctly apply checkbox className to class list

## 2.2.0

### Minor Changes

- b0cf8c6: updated meta head astro, and guard for className in checkbox

## 2.1.1

### Patch Changes

- cfe9fd1: chore: updated deps

## 2.1.0

### Minor Changes

- b84395f: Correct exports of astro components and types

## 2.0.0

### Major Changes

- 3b819e3: Class names for overrides

## 1.5.0

### Minor Changes

- 96d8115: "Updated uikit package.json sideEffects": ["**/*.css"]

## 1.4.0

### Minor Changes

- c2f8b74: Minor update with release notes (className slots for Checkbox)

## 1.3.0

### Minor Changes

- Updated classname slots for checkbox

## 1.2.0

### Minor Changes

- 382c63a: Added history icon to icons collection

## 1.1.1

### Patch Changes

- 8edee19: Test patch for github workflow

## 1.1.0

### Minor Changes

- Minor version bump to test changesets
