import { TextStyle } from 'react-native'

type TextBlock = 
  | 'body'
  | 'header1'
  | 'header2'
  | 'header3'
  | 'header4'
  | 'label'
  | 'sub'

interface TextDimentions {
  fontSize?:   TextStyle["fontSize"]
  fontWeight?: TextStyle["fontWeight"]
}

type Typography = {
  [key in TextBlock]: TextDimentions
}

const defaultConf: Typography = {
  body: {fontSize: 16,},
  header1: {fontSize: 28,},
  header2: {fontSize: 24,},
  header3: {fontSize: 20,},
  header4: {fontSize: 16,},
  label: {fontSize: 12,},
  sub: {fontSize: 10,},
}

export function useTypography() {
	return defaultConf
}
