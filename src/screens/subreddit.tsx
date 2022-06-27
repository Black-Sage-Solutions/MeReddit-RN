import { useCallback, useReducer } from 'react'

import {
    FlatList, Pressable, StyleSheet,
    Text, View
} from 'react-native'

import { NativeStackScreenProps } from '@react-navigation/native-stack'

import { RootStackParamList } from '@app/navigation/root'

import { useGetFrontpageQuery, useGetSubredditQuery } from '@app/reddit/noauth-api'

import BaseScreen from '@app/screens/base'

import PostItem, { Post } from '@components/post-listing'

import NowContext from '@contexts/now'

import EmptyListComponent from '@components/empty-list'

import Loading from '@components/loading'

const style = StyleSheet.create({
  controlButton: {
    backgroundColor: '#999',
    padding: 8,
    width: 80,
  },
  controlNext: {
    textAlign: 'right',
  },
  controlPrevious: {

  },
  list: {
    marginHorizontal: 8,
  },
  listControls: {
    alignItems: 'center',
    flexDirection: 'row',
    height: 48,
    justifyContent: 'space-between',
    padding: 8,
    textAlign: 'center',
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
    margin: 8,
  },
})

export interface SubredditPagePositionState {
  markers: Array<string>
  count:   number
}

interface SubredditPagePositionAction {
  name?:  string
  type: 'next' | 'previous'
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

interface ListControlsProps {
  nextPage:     (event: TouchEvent) => void
  page:         number
  previousPage: (event: TouchEvent) => void
}

function ListControls({nextPage, page, previousPage}: ListControlsProps) : JSX.Element {
  return (
    <View style={style.listControls}>
      <Pressable onPress={previousPage}>
        <Text style={[style.controlButton, style.controlPrevious]}>{'< Previous'}</Text>
      </Pressable>

      <Text>{page}</Text>

      <Pressable onPress={nextPage}>
        <Text style={[style.controlButton, style.controlNext]}>{'Next >'}</Text>
      </Pressable>
    </View>
  )
}

type SubredditScreenProps = NativeStackScreenProps<RootStackParamList, 'Frontpage' | 'Subreddit'>

export default function SubredditScreen({route} : SubredditScreenProps) : JSX.Element {
  const [pageState, dispatch] = useReducer(reducerSubredditPagePosition, initialSubredditPagePosition)

  const useSubredditListingQuery = useCallback(
    () => {
      const after = pageState.markers[pageState.markers.length - 1] || ''
      const count = pageState.count

      if (route.params?.subreddit) {
        return useGetSubredditQuery({after, count, subreddit: route.params.subreddit})
      } else {
        return useGetFrontpageQuery({after, count})
      }
    },
    [route.params?.subreddit, pageState.count]
  )

  const {data, isFetching, isLoading, refetch} = useSubredditListingQuery()

  // Is there actually a performance improvement with providing a now context for PostItem?
  const nowDate = new Date()

  const posts: Array<{data: Post}> = data?.data?.children

  return (
    <BaseScreen>
      <NowContext.Provider value={nowDate}>
        <Text style={style.title}>
          {
            (route.params?.subreddit) ? 'r/' + route.params.subreddit : 'MeReddit'
          }
        </Text>

        <FlatList
          ItemSeparatorComponent={() => <View style={style.separator} />}
          ListEmptyComponent={() => (isLoading) ? <Loading /> : <EmptyListComponent />}
          data={data?.data?.children || []}
          keyExtractor={item => item.data.id}
          onRefresh={refetch}
          refreshing={isFetching}
          renderItem={({item}) => <PostItem {...item} />}
          style={style.list}
          />

        <ListControls
          nextPage={() => {
            dispatch({type: 'next', name: posts[posts.length - 1].data.name})
          }}
          page={pageState.count}
          previousPage={() => {
            dispatch({type: 'previous'})
          }}
          />
      </NowContext.Provider>
    </BaseScreen>
  )
}
