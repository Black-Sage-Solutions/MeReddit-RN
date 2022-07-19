import { useMemo } from 'react'
import { useColorScheme } from 'react-native'

type ThemeKinds = 'dark' | 'light'

interface Palette {
  bgColour: string
  buttons: {
    bg: {
      accent:   string
      default:  string
      disabled: string
    }
    fg: {
      default:  string
      disabled: string
    }
  }
  downVote: string
  fgColour: string
  scheme:   ThemeKinds
  upVote:   string
}

const common = {
  downVote: 'lightblue',
  upVote: 'orange'
}

const themes: {[theme in ThemeKinds]: Palette} = {
  dark: {
    ...common,
    bgColour: 'black',
    buttons: {
      bg: {
        accent: 'blue',
        default: '#333',
        disabled: '#111',
      },
      fg: {
        default: 'white',
        disabled: '#999',
      }
    },
    fgColour: 'white',
    scheme: 'dark',
  },
  light: {
    ...common,
    bgColour: 'white',
    buttons: {
      bg: {
        accent: 'blue',
        default: '#ddd',
        disabled: '#eee',
      },
      fg: {
        default: 'black',
        disabled: '#aaa',
      }
    },
    fgColour: 'black',
    scheme: 'light',
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
