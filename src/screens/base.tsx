/**
 * BaseScreen component that holds common setup.
 */

import { ReactNode } from 'react'

import { SafeAreaView } from 'react-native-safe-area-context'

import { usePalette } from '@ui/palette'

interface BaseScreenProps {
  children?: ReactNode
}

export default function BaseScreen({children}: BaseScreenProps) : JSX.Element {
  const palette = usePalette()

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: palette.bgColour}}>
      {children}
    </SafeAreaView>
  )
}
