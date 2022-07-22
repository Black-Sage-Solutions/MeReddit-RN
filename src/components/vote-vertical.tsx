import { Pressable, Text, View } from 'react-native'

import Icon from 'react-native-vector-icons/FontAwesome5'

import { usePalette } from '@ui/palette'

/**
 * [shorthandScore description]
 * @param  {number} score
 * @return {string}
 */
function shorthandScore(score: number): string {
  if (!score) return '*'
  if (score > 1000) return `${Math.round(score / 1000)} K`
  return `${score}`
}

interface VoteVerticalProps {
  score: number
}

export default function VoteVertical({score}: VoteVerticalProps) : JSX.Element {
  const palette = usePalette()

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Pressable style={{alignItems: 'center', justifyContent: 'center'}} >
        <Icon color={palette.upVote} name='arrow-up' size={20} />
      </Pressable>
      
      <Text style={{alignSelf: 'center', fontSize: 10, paddingVertical: 4}}>
        {shorthandScore(score)}
      </Text>
      
      <Pressable style={{alignItems: 'center', justifyContent: 'center'}}>
        <Icon color={palette.downVote} name='arrow-down' size={20} />
      </Pressable>
    </View>
  )
}
