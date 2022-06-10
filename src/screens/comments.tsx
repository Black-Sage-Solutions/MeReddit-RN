/**
 * 
 */

import { useCallback } from 'react'

import { FlatList, StyleSheet, Text, TextProps, View } from 'react-native'

import { NavigationProp, useNavigation } from '@react-navigation/native'

import { NativeStackScreenProps } from '@react-navigation/native-stack'

import { RootStackParamList } from '@app/navigation/root'

import { useGetPostCommentsQuery } from '@app/reddit/noauth-api'

import BaseScreen from '@app/screens/base'

import EmptyListComponent from '@components/empty-list'

import Loading from '@components/loading'

import LinkText from '@ui/link-text'

const style = StyleSheet.create({
  container: {
    borderColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: 8,
    paddingVertical: 4,
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
    backgroundColor: 'black',
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
  body: string
}

function CommentView({data} : {data: Comment}) : JSX.Element {
  return (
    <View style={style.container}>
      <Text>{data.body}</Text>
    </View>
  )
}

interface Post {
  author: string
  preview: object
  title: string
}

function PostView(post : Post) : JSX.Element {
  console.log(post.preview)

  const {navigate} = useNavigation<NavigationProp<RootStackParamList>>()

  const goToUserProfile = useCallback(() => {
    return navigate('User', {userName: post.author})
  }, [post.author])

  const submitter = <LinkText onPress={goToUserProfile}>{post.author}</LinkText>

  return (
    <View style={style.titleContainer}>
      <Text style={style.title}>{post.title}</Text>
      <Text>Submitted by {submitter}</Text>
    </View>
  )
}

export default function CommentsScreen({route} : CommentsScreenProps) : JSX.Element {
  const {postId, subreddit} = route.params

  const {data, isFetching, isLoading, refetch} = useGetPostCommentsQuery({postId, subreddit})

  const {post, comments} = data || {post: {}, comments: []}

  return (
    <BaseScreen>
      <FlatList
        ItemSeparatorComponent={() => <ItemSeparator />}
        ListEmptyComponent={() => (isLoading) ? <Loading /> : <EmptyListComponent />}
        ListHeaderComponent={() => (isLoading) ? null : <PostView {...post} />}
        data={comments}
        keyExtractor={item => item.data.id}
        onRefresh={refetch}
        refreshing={isFetching}
        renderItem={({item}) => <CommentView {...item} />}
        stickyHeaderIndices={[0]}
        style={style.list}
       />
    </BaseScreen>
  )
}
