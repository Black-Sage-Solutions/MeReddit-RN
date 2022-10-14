import { Pressable, Text, TextStyle, View, ViewStyle } from 'react-native'

import Icon from 'react-native-vector-icons/FontAwesome5'

import { usePalette } from '@ui/palette'

/**
 * [shorthandScore description]
 * @param  {number} score
 * @return {string}
 */
function shorthandScore(score: number) : string {
  if (!score) return '*'
  if (score > 1000) return `${Math.round(score / 1000)} K`
  return `${score}`
}

interface VoteProps {
  direction: 'column' | 'row'
  score:     number
  style?:    ViewStyle
}

export default function Vote({direction, score, style: inStyle={}}: VoteProps) : JSX.Element {
  const palette = usePalette()

  const layout : TextStyle = {}

  if (direction == 'column') {
    layout.paddingVertical = 4
  }

  if (direction == 'row') {
    layout.paddingHorizontal = 4
    layout.textAlign = 'center'
    layout.width = 32
  }

  // TODO account for Handedness (left or right hand settings)
  // TODO component size (icon arrows and score text)

  return (
    <View
      style={[
        inStyle,
        {
          alignItems: 'center',
          flexDirection: direction,
          justifyContent: 'space-around',
        },
      ]}
    >
      <Pressable style={{alignItems: 'center', justifyContent: 'center'}} >
        <Icon color={palette.upVote} name='arrow-up' size={20} />
      </Pressable>
      
      <Text
        style={{
          alignSelf: 'center',
          fontSize: 10,
          ...layout,
        }}
      >
        {shorthandScore(score)}
      </Text>
      
      <Pressable style={{alignItems: 'center', justifyContent: 'center'}}>
        <Icon color={palette.downVote} name='arrow-down' size={20} />
      </Pressable>
    </View>
  )
}
