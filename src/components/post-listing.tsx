/**
 * 
 */

import { formatDistance, fromUnixTime } from 'date-fns'

import { useCallback, useContext } from 'react'

import { StyleSheet, Text, TextProps, View } from 'react-native'

import { NavigationProp, useNavigation, useRoute } from '@react-navigation/native'

import NowContext from '@contexts/now'
import { RootStackParamList } from 'navigation/root'

const style = StyleSheet.create({
  container: {
    borderColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  postTitle: {
    fontSize: 20,
    paddingVertical: 2,
  }
})

function LinkText({children, ...props}: TextProps) : JSX.Element {
  return (
    <Text {...props} style={[props?.style, {textDecorationLine: 'underline'}]}>{children}</Text>
  )
}

interface Post {
  author:                  string
  created:                 number
  id:                      string
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

  // Is using a context here instead of formatDistanceToNow, actually a performancce improvement?
  const nowDate = useContext(NowContext)
  const timeSubmittedAgo = formatDistance(fromUnixTime(data.created), nowDate)

  const goToComments = useCallback(() => {
    return navigate('Comments', {postId: data.id, subreddit: data.subreddit})
  }, [data.id, data.subreddit])

  const goToSubreddit = useCallback(() => {
    return navigate('Subreddit', {subreddit: data.subreddit})
  }, [data.subreddit])

  const goToUserProfile = useCallback(() => {
    return navigate('User', {userName: data.author})
  }, [data.author])

  const submitter = <Text> by <LinkText onPress={goToUserProfile}>{data?.author}</LinkText></Text>

  const subredditLink = (route.name == 'Frontpage') ? (
    <Text> to <LinkText onPress={goToSubreddit}>{data?.subreddit_name_prefixed}</LinkText></Text>
  ) : null

  return (
    <View style={style.container}>
      <Text>{data?.score || '*'}</Text>
      <Text onPress={goToComments} style={style.postTitle}>{data?.title}</Text>
      <Text>{timeSubmittedAgo} ago{submitter}{subredditLink}</Text>
    </View>
  )
}
