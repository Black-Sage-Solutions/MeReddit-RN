import { formatDistance, fromUnixTime } from 'date-fns'

import { useContext } from 'react'

import { StyleSheet, Text, View, Pressable } from 'react-native'

import { NavigationProp, useNavigation, useRoute } from '@react-navigation/native'

import { RootStackParamList } from '@app/navigation/root'

import NowContext from '@contexts/now'

import VoteVertical from '@components/vote-vertical'

import SubredditLink from '@components/text/subreddit-link'
import UserLink from '@components/text/user-link'

import { usePalette } from '@ui/palette'

const style = StyleSheet.create({
  container: {
    flexDirection: 'row-reverse',
    overflow: 'hidden',
  },
  postTitle: {
    flexShrink: 1,
    fontSize: 20,
    paddingVertical: 4,
  }
})

export interface Post {
  author:                  string
  created:                 number
  id:                      string
  name:                    string
  score:                   number
  subreddit:               string
  subreddit_name_prefixed: string
  title:                   string
}

interface PostItemProps {
  data: Post
}

export default function PostItem({data}: PostItemProps) : JSX.Element {
  const palette = usePalette()
  const {navigate} = useNavigation<NavigationProp<RootStackParamList>>()

  const route = useRoute()

  // Is using a context here instead of formatDistanceToNow, actually a performancce improvement?
  const now = useContext(NowContext)
  const timeSubmittedAgo = formatDistance(fromUnixTime(data.created), now, {addSuffix: true})

  return (
    <View style={[style.container]}>
      <View style={{paddingRight: 8}}>
        <VoteVertical score={data?.score} />
      </View>

      <Pressable
        onPress={() => {
          navigate('Comments', {postId: data.id, subreddit: data.subreddit})
        }}
        style={{flex: 1, padding: 8}}
        >

        {
          route.name == 'Frontpage' ? (
            <SubredditLink subreddit={data?.subreddit} />
          ) : null
        }

        <Text style={style.postTitle}>{data?.title}</Text>

        <Text>{timeSubmittedAgo} by <UserLink userName={data?.author} /></Text>
      </Pressable>
    </View>
  )
}
