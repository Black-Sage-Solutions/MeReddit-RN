import { formatDistance, fromUnixTime } from 'date-fns'

import { useCallback, useContext } from 'react'

import { FlatList, Image, StyleSheet, Text, View, useColorScheme } from 'react-native'

import { Colors } from 'react-native/Libraries/NewAppScreen'

import { NavigationProp, useNavigation } from '@react-navigation/native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'

import NowContext from '@app/contexts/now'
import { useGetPostCommentsQuery } from '@app/reddit/noauth-api'
import { RootStackParamList } from '@app/navigation/root'
import BaseScreen from '@app/screens/base'
import { htmlUnescape } from '@app/utils/text'

import EmptyListComponent from '@components/empty-list'
import Loading from '@components/loading'

import LinkText from '@ui/link-text'

const style = StyleSheet.create({
  commentBody: {
    fontSize: 16,
  },
  container: {
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  imagePreview: {
    alignSelf: 'center',
    marginTop: 8,
  },
  list: {
    marginHorizontal: 8,
  },
  separator: {
    height: 12,
  },
  title: {
    fontSize: 24,
  },
  titleContainer: {
    marginHorizontal: 8+8,
    paddingVertical: 8,
  },
})

function ItemSeparator() : JSX.Element {
  return (
    <View style={style.separator} />
  )
}

type CommentsScreenProps = NativeStackScreenProps<RootStackParamList, 'Comments'>

interface Comment {
  author:  string
  body:    string
  created: number
  score:   number
}

function CommentView({data} : {data: Comment}) : JSX.Element {
  const isDarkMode = useColorScheme() == 'dark'
  const fgColour = {
    borderColor: (isDarkMode) ? Colors.white : Colors.black
  }
  const now = useContext(NowContext)
  const timeSubmittedAgo = formatDistance(fromUnixTime(data.created), now, {addSuffix: true})
  return (
    <View style={[style.container, fgColour]}>
      <Text><LinkText>u/{data.author}</LinkText> {data.score} points {timeSubmittedAgo}</Text>
      <Text style={style.commentBody}>{htmlUnescape(data.body)}</Text>
    </View>
  )
}

interface ImageMedia {
  height: number
  url:    string
  width:  number
}

interface Preview {
  id:          string
  resolutions: Array<ImageMedia>
  source:      object
  variants:    object
}

interface Post {
  author: string
  preview?: {
    enabled: boolean
    images:  Array<Preview>
  }
  subreddit_name_prefixed: string
  title: string
}

type PostPreviewProps = {
  post: Post
}

function PostPreview({post}: PostPreviewProps) : JSX.Element {
  const img = post?.preview?.images[0]?.resolutions[0] || null
  return (
    <>
      {
        (img)
        ? (
          <Image
            source={{
              height: img.height,
              uri: htmlUnescape(img.url),
              width: img.width
            }}
            style={style.imagePreview}
            />
        ) : null
      }
    </>
  )
}

type PostViewProps = {
  post: Post,
}

function PostView({post}: PostViewProps) : JSX.Element {
  const isDarkMode = useColorScheme() === 'dark'

  const bgColour = {
    backgroundColor: (isDarkMode) ? Colors.black : Colors.white
  }

  const {navigate} = useNavigation<NavigationProp<RootStackParamList>>()

  const goToUserProfile = useCallback(() => {
    return navigate('User', {userName: post.author})
  }, [post.author])

  const submitter = <LinkText onPress={goToUserProfile}>u/{post.author}</LinkText>

  return (
    <View style={[style.titleContainer, bgColour]}>
      <Text>{post.subreddit_name_prefixed}</Text>
      <Text style={style.title}>{post.title}</Text>
      <Text>Submitted by {submitter}</Text>
    </View>
  )
}

export default function CommentsScreen({route} : CommentsScreenProps) : JSX.Element {
  const {postId, subreddit} = route.params

  const {data, isFetching, isLoading, refetch} = useGetPostCommentsQuery({postId, subreddit})

  const {post, comments, moreComments} = data || {post: null, comments: null, moreComments: null}

  const nowDate = new Date()

  return (
    <BaseScreen>
      <NowContext.Provider value={nowDate}>
        {
          (!isLoading && post) ? (
            <PostView post={post} />
          ) : null
        }

        <FlatList
          ItemSeparatorComponent={() => <ItemSeparator />}
          ListEmptyComponent={() => (isLoading) ? <Loading /> : <EmptyListComponent />}
          ListHeaderComponent={() => <PostPreview post={post} />}
          ListHeaderComponentStyle={{paddingVertical: 8}}
          data={comments}
          keyExtractor={item => item.data.id}
          onRefresh={refetch}
          refreshing={isFetching}
          renderItem={({item}) => <CommentView {...item} />}
          style={style.list}
          stickyHeaderIndices={[0]}
          />
      </NowContext.Provider>
    </BaseScreen>
  )
}
