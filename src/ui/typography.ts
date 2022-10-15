type TextBlock = 
  | 'body'
  | 'header1'
  | 'header2'
  | 'header3'
  | 'header4'
  | 'label'
  | 'sub'

interface TextDimentions {
  size:    number
  weight?: number
}

type Typography = {
  [key in TextBlock]: TextDimentions
}

const defaultConf: Typography = {
  body: {size: 16,},
  header1: {size: 28,},
  header2: {size: 24,},
  header3: {size: 20,},
  header4: {size: 16,},
  label: {size: 12,},
  sub: {size: 10,},
}

export function useTypography() {
	return defaultConf
}
