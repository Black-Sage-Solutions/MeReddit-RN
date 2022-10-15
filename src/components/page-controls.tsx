import {
    Pressable, StyleSheet,
    Text, View, ViewStyle
} from 'react-native'

import Icon from 'react-native-vector-icons/FontAwesome5'

import { usePalette } from '@ui/palette'
import { useTypography } from 'ui/typography'

const style = StyleSheet.create({
  controlButton: {
    alignItems: 'center',
    borderRadius: 16,
    flexDirection: 'row',
    paddingHorizontal: 8,
  },
  controlNext: {
    justifyContent: 'flex-end',
  },
  listControls: {
    borderTopWidth: 0.5,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 8,
    textAlign: 'center',
  },
})

interface PageControlsProps {
  disabled?:    boolean
  nextPage:     (event: TouchEvent) => void
  page:         number
  previousPage: (event: TouchEvent) => void
  style?:       ViewStyle
}

export default function PageControls({disabled, nextPage, page, previousPage, style: inStyle={}}: PageControlsProps) : JSX.Element {
  const palette = usePalette()
  const tgraphy = useTypography()

  const isFirstPage = page == 1

  const nextBgColour = disabled ? palette.buttons.disabled : palette.buttons.bg
  const nextColour = disabled ? palette.text.disabled : palette.text.fg

  const prevBgColour = isFirstPage || disabled ? palette.buttons.disabled : palette.buttons.bg
  const prevColour = isFirstPage || disabled ? palette.text.disabled : palette.text.fg

  const controlTextStyle = {
    fontSize: tgraphy.sub.size,
    paddingHorizontal: 8
  }

  return (
    <View
      style={[
        inStyle,
        style.listControls,
        {
          backgroundColor: palette.bgColour,
          borderColor: palette.border
        }
      ]}
    >
      <Pressable
        disabled={isFirstPage || disabled}
        onPress={previousPage}
        style={[style.controlButton, {backgroundColor: prevBgColour}]}
      >
        <Icon color={prevColour} name='angle-left' size={24} />
        <Text style={[controlTextStyle, {color: prevColour}]}>Prev</Text>
      </Pressable>

      <Text style={{color: palette.text.fg}}>Page: {page}</Text>

      <Pressable
        disabled={disabled}
        onPress={nextPage}
        style={[style.controlButton, style.controlNext, {backgroundColor: nextBgColour}]}
      >
        <Text style={[controlTextStyle, {color: nextColour}]}>Next</Text>
        <Icon color={nextColour} name='angle-right' size={24} />
      </Pressable>
    </View>
  )
}
