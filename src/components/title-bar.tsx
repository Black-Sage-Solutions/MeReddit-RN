import { Pressable, PressableProps, StyleSheet, Text } from 'react-native'

const style = StyleSheet.create({
  title: {
    fontSize: 28
  }
})

interface TitleBarProps {
  style?: PressableProps
  subreddit?: string | null | undefined
}

function TitleBar({style: inStyle={}, subreddit=null} : TitleBarProps) : JSX.Element {
  return (
    <Pressable style={inStyle}>
      <Text style={style.title}>
        {
          subreddit ? `r/${subreddit}` : 'MeReddit'
        }
      </Text>
    </Pressable>
  )
}

export default TitleBar
