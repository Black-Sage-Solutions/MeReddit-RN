import { useMemo } from 'react'
import { ColorValue, useColorScheme } from 'react-native'

import { Theme } from '@react-navigation/native'

type ThemeKinds = 'dark' | 'light'

interface Palette {
  bgColour:   ColorValue
  border:     ColorValue
  buttons: {
    bg:       ColorValue
    disabled: ColorValue
  }
  downVote:   ColorValue
  fgColour:   ColorValue
  primary:    ColorValue
  scheme:     ThemeKinds
  secondary:  ColorValue
  text: {
    disabled: ColorValue
    fg:       ColorValue
  }
  upVote:     ColorValue
}

const voteIcons = {
  downVote: 'lightblue',
  upVote: 'orange',
}

const themes: {[theme in ThemeKinds]: Palette} = {
  dark: {
    ...voteIcons,
    bgColour: 'black',
    border: '#c7c7cc',
    buttons: {
      bg: '#666',
      disabled: '#333',
    },
    fgColour: 'white',
    primary: 'lightskyblue',
    scheme: 'dark',
    secondary: 'lightblue',
    text: {
      disabled: '#888',
      fg: 'white',
    },
  },
  light: {
    ...voteIcons,
    bgColour: 'white',
    border: '#c7c7cc',
    buttons: {
      bg: '#ddd',
      disabled: '#eee',
    },
    fgColour: 'black',
    primary: 'orange',
    scheme: 'light',
    secondary: 'red',
    text: {
      disabled: '#bbb',
      fg: 'black',
    },
  },
}

/**
 * [usePalette description]
 * @return {Palette} [description]
 */
export function usePalette() : Palette {
  const scheme = useColorScheme() || 'light'

  const theme = useMemo<Palette>(() => themes[scheme], [scheme])

  return theme
}

/**
 * [usePaletteToNavTheme description]
 * @return {Theme} [description]
 */
export function usePaletteToNavTheme() : Theme {
  const palette = usePalette()

  return {
    dark: palette.scheme == 'dark',
    colors: {
      primary:      palette.primary as string,
      background:   palette.bgColour as string,
      card:         palette.bgColour as string,
      text:         palette.text.fg as string,
      border:       palette.border as string,
      notification: palette.secondary as string,
    },
  }
}
