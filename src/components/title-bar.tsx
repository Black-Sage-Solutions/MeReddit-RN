import { Pressable, PressableProps, Text, TextStyle } from 'react-native'
import { useTypography } from '@ui/typography'

interface TitleBarProps {
  style?:     PressableProps
  subreddit?: string | null | undefined
  textStyle?: TextStyle
}

export default function TitleBar({style: inStyle={}, textStyle: inTextStyle={}, subreddit=null}: TitleBarProps) : JSX.Element {
  const tgraphy = useTypography()
  return (
    <Pressable style={inStyle}>
      <Text style={[{fontSize: tgraphy.header1.size}, inTextStyle]}>
        {
          subreddit ? `r/${subreddit}` : 'MeReddit'
        }
      </Text>
    </Pressable>
  )
}
