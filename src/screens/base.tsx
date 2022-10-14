/**
 * BaseScreen component that holds common setup.
 */

import { ReactNode } from 'react'

import { StyleSheet, useColorScheme } from 'react-native'

import { Colors } from 'react-native/Libraries/NewAppScreen'

import { SafeAreaView } from 'react-native-safe-area-context'

const style = StyleSheet.create({
  screen: {
    flex: 1,
  },
})

interface BaseScreenProps {
  children?: ReactNode
}

export default function BaseScreen({children}: BaseScreenProps) : JSX.Element {
  const isDarkMode = useColorScheme() === 'dark'

  const bgColour = {
    backgroundColor: isDarkMode ? Colors.black : Colors.white
  }

  return (
    <SafeAreaView style={[style.screen, bgColour]}>
      {children}
    </SafeAreaView>
  )
}
