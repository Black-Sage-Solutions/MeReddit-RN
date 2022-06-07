import { useNavigation } from "@react-navigation/native"
import { SafeAreaView, StyleSheet, Text, useColorScheme, View } from "react-native"

import { Colors } from 'react-native/Libraries/NewAppScreen'

const style = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'space-between',
  }
})

export default function SubredditScreen() {
  const isDarkMode = useColorScheme() === 'dark'

  const bgColour = {
    backgroundColor: isDarkMode ? Colors.black : Colors.white
  }

  return (
    <SafeAreaView style={[style.screen, bgColour]}>
      <Text>Stuff</Text>
      <Text>Things</Text>
    </SafeAreaView>
  )
}
