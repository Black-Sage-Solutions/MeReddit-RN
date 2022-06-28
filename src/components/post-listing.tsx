import { formatDistance, fromUnixTime } from 'date-fns'

import { useCallback, useContext } from 'react'

import { StyleSheet, Text, View, useColorScheme } from 'react-native'

import { Colors } from 'react-native/Libraries/NewAppScreen'

import { NavigationProp, useNavigation, useRoute } from '@react-navigation/native'

import { RootStackParamList } from '@app/navigation/root'

import NowContext from '@contexts/now'

import LinkText from '@ui/text/link-text'

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
  const isDarkMode = useColorScheme() == 'dark'
  const {navigate} = useNavigation<NavigationProp<RootStackParamList>>()

  const route = useRoute()

  // Is using a context here instead of formatDistanceToNow, actually a performancce improvement?
  const now = useContext(NowContext)
  const timeSubmittedAgo = formatDistance(fromUnixTime(data.created), now, {addSuffix: true})

  const goToComments = useCallback(() => {
    return navigate('Comments', {postId: data.id, subreddit: data.subreddit})
  }, [data.id, data.subreddit])

  const goToSubreddit = useCallback(() => {
    return navigate('Subreddit', {subreddit: data.subreddit})
  }, [data.subreddit])

  // could stuff these things into its own components
  const goToUserProfile = useCallback(() => {
    return navigate('User', {userName: data.author})
  }, [data.author])

  const submitter = <Text> by <LinkText onPress={goToUserProfile}>{data?.author}</LinkText></Text>

  const subredditLink = (route.name == 'Frontpage') ? (
    <Text> to <LinkText onPress={goToSubreddit}>{data?.subreddit_name_prefixed}</LinkText></Text>
  ) : null

  const fgColour = {
    borderColor: (isDarkMode) ? Colors.white : Colors.black
  }

  return (
    <View style={[style.container, fgColour]}>
      <Text onPress={goToComments} style={style.postTitle}>{data?.title}</Text>
      <Text>{timeSubmittedAgo}{submitter}{subredditLink}</Text>
      <Text>{data?.score || '*'}</Text>
      <Text></Text>
    </View>
  )
}
