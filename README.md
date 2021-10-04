# Automated ⚙️

**Automated is a test framework designed to simplify testing by standardizing.**

# Installation

## `__automated.tsx`

Create a file named `__automated.tsx` with the following contents

```tsx
import Component from '.';

export default {
  dirname: __dirname,
  Component,
};
```

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
