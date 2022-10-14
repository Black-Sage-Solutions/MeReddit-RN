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
Only when necessary, meaning when the Typescript has a problem ***without*** a `;` character, then should use one. Otherwise, without is the default.

### Explicit Typing
Function arguments should suffix the `:` character on the argument name.

```ts
function test(hello: string) {}
function testing({hi: string, there: incomingThere=null}: TestingArgs) {}
````

Function return types should have the `:` spaced between the function parameters and the return type.

```ts
function reTest() : string {}
```

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

### JSX
For formatting JSX, general rule is try to keep the indent for parent components in the same column for the tag (`<`, `>`) characters.

Components can be kept on a single line, but should be split up if its longer than 80 characters or it makes more sense to visually see the structure.

Children/sibling components should have an empty line between.

```tsx
<Text style={{}}>Hi</Text>

<View><Text>Hey <UserLink userName="me" /></Text></View>

<FlatList
  ListEmptyComponent={...}
  data={[]}
/>

<View
  style={{
    width: 100
  }}
>
  <Text>Hello there!</Text>
</View>

<View>
  <Text>How</Text>

  <Text>are</Text>

  <Text>you?</Text>
</View>
```
