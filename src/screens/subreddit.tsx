import { useReducer } from 'react'

import {
    FlatList, Pressable, StyleSheet,
    Text, View
} from 'react-native'

import Icon from 'react-native-vector-icons/FontAwesome5'

import { NativeStackScreenProps } from '@react-navigation/native-stack'

import { RootStackParamList } from '@app/navigation/root'

import { useGetSubredditQuery } from '@app/reddit/noauth-api'

import BaseScreen from '@app/screens/base'

import PostItem, { Post } from '@components/post-listing'

import NowContext from '@contexts/now'

import EmptyListComponent from '@components/empty-list'

import Loading from '@components/loading'

import { usePalette } from '@ui/palette'

const style = StyleSheet.create({
  controlButton: {
    alignItems: 'center',
    borderRadius: 16,
    flexDirection: 'row',
    paddingHorizontal: 8,
  },
  controlNext: {
    justifyContent: 'flex-end',
  },
  controlText: {
    fontSize: 10,
    paddingHorizontal: 8,
  },
  list: {
    marginHorizontal: 8,
  },
  listControls: {
    borderColor: '#666',
    borderTopWidth: 1,
    alignItems: 'center',
    flexDirection: 'row',
    // height: 48,
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

interface PageControlsProps {
  disabled?:    boolean
  nextPage:     (event: TouchEvent) => void
  page:         number
  previousPage: (event: TouchEvent) => void
}

function PageControls({disabled, nextPage, page, previousPage}: PageControlsProps) : JSX.Element {
  const palette = usePalette()

  const isFirstPage = page == 1

  const nextBgColour = disabled ? palette.buttons.bg.disabled : palette.buttons.bg.default
  const nextColour = disabled ? palette.buttons.fg.disabled : palette.buttons.fg.default

  const prevBgColour = isFirstPage || disabled ? palette.buttons.bg.disabled : palette.buttons.bg.default
  const prevColour = isFirstPage || disabled ? palette.buttons.fg.disabled : palette.buttons.fg.default

  return (
    <View style={[style.listControls, {borderColor: palette.bgColour}]}>
      <Pressable
        disabled={isFirstPage || disabled}
        onPress={previousPage}
        style={[style.controlButton, {backgroundColor: prevBgColour}]}
        >
        <Icon color={prevColour} name='angle-left' size={28} />
        <Text style={[style.controlText, {color: prevColour}]}>Prev</Text>
      </Pressable>

      <Text style={{color: palette.fgColour}}>Page: {page}</Text>

      <Pressable
        disabled={disabled}
        onPress={nextPage}
        style={[style.controlButton, style.controlNext, {backgroundColor: nextBgColour}]}
        >
        <Text style={[style.controlText, {color: nextColour}]}>Next</Text>
        <Icon color={nextColour} name='angle-right' size={28} />
      </Pressable>
    </View>
  )
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
