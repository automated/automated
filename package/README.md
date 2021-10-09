# Automated ⚙️

**Automated is a test framework designed to simplify testing by standardizing.**

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
