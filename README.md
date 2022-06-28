# Installation

# Code Style Guide

## Adding Libraries

*Only add dependencies when absolutely necessary.*

Primarily should try and keep code in-house so to speak, such as small utilities and helper functions. Code that's not too taxing to writing and is relatively simple, should be committed instead of installing large dependencies like lodash or any other sets of libraries that would would cover a standard language library.

For more complex software, like react-native libraries that need native code, or date manipulation libraries, should be favoured instead of an in-house solution.

For libraries that change the programming paradigm or the project structure, such as RxJS or MobX, won't be allowed at this time since it's decided to keep close to functional react with redux.

For UI toolkits, in-house component style is the standard and no additional dependencies for UI components will be included, such as react-native-elements or nativebase.

## Custom Modules

## Native Modules

## React

## Testing

## Typescript

### To Semicolon or Not to Semicolon?

### Interface or Type Alias
*`type`*s are generally defined for a property or a primitive in business logic or when a type needs to be expressed with Typescript's type expressions, for example:

```tsx
type Count = number

type PageOption = 'next' | 'previous'

type SubredditScreenProps = NativeStackScreenProps<RootStackParamList, 'Frontpage' | 'Subreddit'>

```

*`interface`*s are generally defined as structured objects, for example:

```tsx
interface CoolThingProps {
  incoming: string
}

function CoolThing({incoming}: CoolThingProps) : JSX.Element {
  // ...
}
```