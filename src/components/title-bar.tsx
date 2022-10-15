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
      <Text style={[{...tgraphy.header1}, inTextStyle]}>
        {
          subreddit ? `r/${subreddit}` : 'MeReddit'
        }
      </Text>
    </Pressable>
  )
}
