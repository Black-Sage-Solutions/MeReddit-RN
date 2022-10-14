import { Pressable, StyleSheet, useColorScheme, View } from 'react-native'

const style = StyleSheet.create({
  container: {
    // backgroundColor: 'black',  // TODO color theme
    borderRadius: 100,
    height: 32,  // TODO spacing (match height in other TopBar items)
    width: 32,
  }
})

export default function ProfileBadge() : JSX.Element {
  const open = () => {
    console.log('wtf')
  }

  const isDarkMode = useColorScheme() === 'dark'

  return (
    <Pressable onPress={open}>
      <View style={[style.container, {backgroundColor: isDarkMode ? 'white' : 'black'}]}>
      </View>
    </Pressable>
  )
}
