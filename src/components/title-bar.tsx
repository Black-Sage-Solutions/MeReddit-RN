import { Pressable, PressableProps, Text, TextStyle } from 'react-native'

interface TitleBarProps {
  style?:     PressableProps
  subreddit?: string | null | undefined
  textStyle?: TextStyle
}

export default function TitleBar({style: inStyle={}, textStyle: inTextStyle={}, subreddit=null}: TitleBarProps) : JSX.Element {
  return (
    <Pressable style={inStyle}>
      <Text style={[{fontSize: 28}, inTextStyle]}>
        {
          subreddit ? `r/${subreddit}` : 'MeReddit'
        }
      </Text>
    </Pressable>
  )
}
