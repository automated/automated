# Automated ⚙️

**Automated is a test framework designed to simplify testing by standardizing.**

With a few lines of code here’s what you get out of the box:

1. Multiple viewport visual regression coverage
3. Jest unit tests (via snapshots)
4. Code coverage (can persist to CI)
6. Storybook artifacts (can persist to CI)
7. Isolated component development environment (Storybook)

# Installation

## `__automated.tsx`

### Quick start

1. Go to one of your components and let’s say the component is named “Foo”
1. Put it in a folder called “foo” with the component file named `index.tsx`
1. Make the component the default export
1. Add a sibling file named `__automated.tsx`, with the following contents

```tsx
import Component from '.';

export default {
  Component,
  dirname: __dirname,
};
```

1. Then run `yarn automated init` (You’ll see some files added).
1. Now you can run `yarn automated storybook` to see it in an isolated dev environment
1. Open another terminal and run `yarn automated jest` to generate snapshots and visual regression tests.

### Examples

1. [Least content example](example/src/components/warning/__automated.tsx)
2. [More robust](example/src/components/button/__automated.tsx)

### API

`__automated.tsx` contents

```tsx
export default {
  // [required] the subject React component
  Component,

  // [required] this supports automatic naming
  dirname: __dirname,

  // an array of use-cases
  useCases,
};
```

### Contributing

```
# in one terminal
yarn nps dev

# in another
cd example && AUTOMATED_DEVELOPMENT=true yarn automated jest
```
