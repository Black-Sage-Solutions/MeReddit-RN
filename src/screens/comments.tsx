import { formatDistance, fromUnixTime } from 'date-fns'

import { useContext } from 'react'

import { FlatList, Image, StyleSheet, Text, View } from 'react-native'

import { NativeStackScreenProps } from '@react-navigation/native-stack'

import NowContext from '@app/contexts/now'
import { useGetPostCommentsQuery } from '@app/reddit/noauth-api'
import { RootStackParamList } from '@app/navigation/root'
import BaseScreen from '@app/screens/base'
import { htmlUnescape } from '@app/utils/text'

import EmptyListComponent from '@components/empty-list'
import Loading from '@components/loading'

import UserLink from 'components/text/user-link'

import { usePalette } from '@ui/palette'

const style = StyleSheet.create({
  commentBody: {
    fontSize: 16,
  },
  container: {
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

interface Comment {
  author:  string
  body:    string
  created: number
  score:   number
}

function CommentView({data} : {data: Comment}) : JSX.Element {
  const palette = usePalette()

  const now = useContext(NowContext)

  const timeSubmittedAgo = formatDistance(fromUnixTime(data.created), now, {addSuffix: true})

  return (
    <View style={[style.container, {borderColor: palette.fgColour}]}>
      <Text><UserLink userName={data.author} /> {data.score} points {timeSubmittedAgo}</Text>
      <Text
        selectable={true}
        style={style.commentBody}
        >
        {htmlUnescape(data.body)}
      </Text>
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

interface PostPreviewProps {
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

interface PostViewProps {
  post: Post
}

function PostView({post}: PostViewProps) : JSX.Element {
  const palette = usePalette()

  return (
    <View style={[style.titleContainer, {backgroundColor: palette.bgColour}]}>
      <Text>{post.subreddit_name_prefixed}</Text>
      <Text style={style.title}>{htmlUnescape(post.title)}</Text>
      <Text>Submitted by <UserLink userName={post.author} /></Text>
    </View>
  )
}

type CommentsScreenProps = NativeStackScreenProps<RootStackParamList, 'Comments'>

export default function CommentsScreen({route}: CommentsScreenProps) : JSX.Element {
  const {postId, subreddit} = route.params

  const {data, isFetching, isLoading, refetch} = useGetPostCommentsQuery({postId, subreddit})

  const {post, comments} = data || {post: null, comments: null}

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
          removeClippedSubviews={false}
          renderItem={({item}) => <CommentView {...item} />}
          style={style.list}
          />
      </NowContext.Provider>
    </BaseScreen>
  )
}
