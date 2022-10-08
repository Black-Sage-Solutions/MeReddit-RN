import { useReducer } from 'react'

import {
    FlatList, Pressable, StyleSheet,
    Text, View
} from 'react-native'

import { NativeStackScreenProps } from '@react-navigation/native-stack'

import { RootStackParamList } from '@app/navigation/root'

import { useGetSubredditQuery } from '@app/reddit/noauth-api'

import BaseScreen from '@app/screens/base'

import PostItem, { Post } from '@components/post-listing'

import NowContext from '@contexts/now'

import EmptyListComponent from '@components/empty-list'

import Loading from '@components/loading'

import PageControls from '@components/page-controls'

const style = StyleSheet.create({
  list: {
    marginHorizontal: 8,
  },
  mainControls: {
    flexDirection: 'row',
    height: 48,
    justifyContent: 'space-between',
    padding: 8,
  },
  separator: {
    height: 12,
  },
  title: {
    fontSize: 28,
  },
})

interface SubredditPagePositionState {
  markers: string[]  // are comment ids that are used in the reddit api
  count:   number
}

interface SubredditPagePositionAction {
  name?: string
  type:  'next' | 'previous'
}

const initialSubredditPagePosition: SubredditPagePositionState = {
  markers: [],
  count:   25,
}

function reducerSubredditPagePosition(state: SubredditPagePositionState, action: SubredditPagePositionAction) : SubredditPagePositionState {
  const amount = 25
  switch(action.type) {
    case 'next':
      return {
        markers: action.name ? [...state.markers, action.name] : [...state.markers],
        count:   state.count + amount,
      }
    case 'previous':
      state.markers.pop()
      return {
        markers: [...state.markers],
        count:   Math.max(state.count - amount, amount),
      }
    default:
      throw new Error(`Bad action: ${action.type}`)
  }
}

type SubredditScreenProps = NativeStackScreenProps<RootStackParamList, 'Frontpage' | 'Subreddit'>

export default function SubredditScreen({route} : SubredditScreenProps) : JSX.Element {
  const [pageState, dispatch] = useReducer(reducerSubredditPagePosition, initialSubredditPagePosition)

  const {data, isFetching, isLoading, refetch} = useGetSubredditQuery({
    after: pageState.markers[pageState.markers.length - 1] || '',
    count: pageState.count,
    subreddit: route?.params?.subreddit,
  })

  // Is there actually a performance improvement with providing a now context for PostItem?
  const nowDate = new Date()

  const posts: Array<{data: Post}> = data?.data?.children || []

  return (
    <BaseScreen>
      <NowContext.Provider value={nowDate}>
        <View style={{alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', padding: 8}}>
          <Pressable>
            <Text style={style.title}>
              {
                (route.params?.subreddit) ? `r/${route.params.subreddit}` : 'MeReddit'
              }
            </Text>
          </Pressable>

          <Pressable
            style={{
              alignItems: 'center',
              height: 32,
              justifyContent: 'center',
              width: 32,
            }}
            >
            <Icon name='ellipsis-v' size={20} />
          </Pressable>
        </View>

        {/* TODO scroll to the ends when going to the next or previous page */}
        <FlatList
          ItemSeparatorComponent={() => <View style={style.separator} />}
          ListEmptyComponent={() => (isLoading) ? <Loading /> : <EmptyListComponent />}
          data={posts}
          keyExtractor={item => item.data.id}
          onRefresh={refetch}
          refreshing={isFetching}
          renderItem={({item}) => <PostItem {...item} />}
          style={style.list}
          />

        {/* TODO need to figure out how to integrate into react-navigation's tabbar */}
        <PageControls
          disabled={isFetching}
          nextPage={() => {
            dispatch({type: 'next', name: posts[posts.length - 1].data.name})
          }}
          page={pageState.count / 25}
          previousPage={() => {
            dispatch({type: 'previous'})
          }}
          />
      </NowContext.Provider>
    </BaseScreen>
  )
}
