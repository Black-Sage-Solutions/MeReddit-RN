/**
 * BaseScreen component that holds common setup.
 */

import { ReactNode } from 'react'
import { View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { usePalette } from '@ui/palette'

interface BaseScreenProps {
  children?: ReactNode
}

export default function BaseScreen({children}: BaseScreenProps) : JSX.Element {
  const insets = useSafeAreaInsets()
  const palette = usePalette()

  return (
    <View style={{
      backgroundColor: palette.bgColour,
      flex: 1,
      paddingTop: insets.top,
      paddingLeft: insets.left,
      paddingRight: insets.right,
    }}>
      {children}
    </View>
  )
}
