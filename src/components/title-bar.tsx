import { Pressable, PressableProps, StyleSheet, Text, TextStyle } from 'react-native'

const style = StyleSheet.create({
  title: {
    fontSize: 28
  }
})

interface TitleBarProps {
  style?:     PressableProps
  subreddit?: string | null | undefined
  textStyle?: TextStyle
}

function TitleBar({style: inStyle={}, textStyle: inTextStyle={}, subreddit=null}: TitleBarProps) : JSX.Element {
  return (
    <Pressable style={inStyle}>
      <Text style={[style.title, inTextStyle]}>
        {
          subreddit ? `r/${subreddit}` : 'MeReddit'
        }
      </Text>
    </Pressable>
  )
}

export default TitleBar
