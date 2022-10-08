import {
    FlatList, Pressable, StyleSheet,
    Text, View
} from 'react-native'

import Icon from 'react-native-vector-icons/FontAwesome5'

import { usePalette } from '@ui/palette'

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
  controlText: {
    fontSize: 10,
    paddingHorizontal: 8,
  },
  listControls: {
    borderColor: '#666',
    borderTopWidth: 1,
    alignItems: 'center',
    flexDirection: 'row',
    // height: 48,
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
}

function PageControls({disabled, nextPage, page, previousPage}: PageControlsProps) : JSX.Element {
  const palette = usePalette()

  const isFirstPage = page == 1

  const nextBgColour = disabled ? palette.buttons.bg.disabled : palette.buttons.bg.default
  const nextColour = disabled ? palette.buttons.fg.disabled : palette.buttons.fg.default

  const prevBgColour = isFirstPage || disabled ? palette.buttons.bg.disabled : palette.buttons.bg.default
  const prevColour = isFirstPage || disabled ? palette.buttons.fg.disabled : palette.buttons.fg.default

  return (
    <View style={[style.listControls, {borderColor: palette.bgColour}]}>
      <Pressable
        disabled={isFirstPage || disabled}
        onPress={previousPage}
        style={[style.controlButton, {backgroundColor: prevBgColour}]}
        >
        <Icon color={prevColour} name='angle-left' size={28} />
        <Text style={[style.controlText, {color: prevColour}]}>Prev</Text>
      </Pressable>

      <Text style={{color: palette.fgColour}}>Page: {page}</Text>

      <Pressable
        disabled={disabled}
        onPress={nextPage}
        style={[style.controlButton, style.controlNext, {backgroundColor: nextBgColour}]}
        >
        <Text style={[style.controlText, {color: nextColour}]}>Next</Text>
        <Icon color={nextColour} name='angle-right' size={28} />
      </Pressable>
    </View>
  )
}

export default PageControls
