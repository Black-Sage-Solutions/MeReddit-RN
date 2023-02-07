import { formatDistance, fromUnixTime } from 'date-fns'

import { PropsWithChildren, useContext } from 'react'

import { StyleSheet, View, Pressable } from 'react-native'

import { NavigationProp, useNavigation, useRoute } from '@react-navigation/native'

import { RootStackParamList } from '@app/navigation/reddits'

import NowContext from '@contexts/now'

import { Text } from '@components/text'
import SubredditLink from '@components/text/subreddit-link'
import UserLink from '@components/text/user-link'
import Vote from '@components/vote'

import { htmlUnescape } from '@utils/text'
import { useTypography } from '@ui/typography'


export interface Post {
  author:                  string
  created:                 number
  id:                      string
  name:                    string
  num_comments:            number
  over_18:                 boolean
  score:                   number
  subreddit:               string
  subreddit_name_prefixed: string
  title:                   string
}

interface PostItemProps {
  data: Post
}

export default function PostItem({data}: PostItemProps) : JSX.Element {
  const {navigate} = useNavigation<NavigationProp<RootStackParamList>>()
  const route = useRoute()
  const tgraphy = useTypography()
  // Is using a context here instead of formatDistanceToNow, actually a performancce improvement?
  const now = useContext(NowContext)
  const timeSubmittedAgo = formatDistance(fromUnixTime(data.created), now, {addSuffix: true})

  const LabelNSFW = ({children}: PropsWithChildren) => (
    data.over_18 ? (
      <Text style={{color: 'red'}}>NSFW </Text>
    ) : null
  )

  return (
    <View style={{flexDirection: 'row-reverse', overflow: 'hidden'}}>
      <Vote direction="column" score={data?.score} style={{paddingHorizontal: 4, alignSelf: 'center'}} />

      <Pressable
        onPress={() => {
          navigate('Comments', {postId: data.id, subreddit: data.subreddit})
        }}
        style={{flex: 1, padding: 8}} // TODO use spacing config
      >
        {
          route.name == 'Frontpage' ? (
            <SubredditLink subreddit={data?.subreddit} />
          ) : null
        }

        <Text
          style={{
            ...tgraphy.header3,
            flexShrink: 1,
            paddingVertical: 4
          }}
        >
          <LabelNSFW />{htmlUnescape(data?.title)}
        </Text>

        <Text>{timeSubmittedAgo} by <UserLink userName={data?.author} /></Text>
      </Pressable>
    </View>
  )
}
