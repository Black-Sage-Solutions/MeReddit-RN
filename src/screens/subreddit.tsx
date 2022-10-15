import { useEffect, useReducer, useRef, useState } from 'react'

import { Animated, FlatList, View } from 'react-native'

import { NativeStackScreenProps } from '@react-navigation/native-stack'

import { RootStackParamList } from '@app/navigation/reddits'

import { useGetSubredditQuery } from '@app/reddit/noauth-api'

import BaseScreen from '@app/screens/base'

import PostItem, { Post } from '@components/post-listing'

import NowContext from '@contexts/now'

import EmptyListComponent from '@components/empty-list'

import Loading from '@components/loading'

import PageControls from '@components/page-controls'

import TitleBar from '@components/title-bar'

import { usePalette } from '@ui/palette'
import { useTypography } from '@ui/typography'

const PAGE_AMOUNT = 25

type PageDirection = 'next' | 'previous'

interface SubredditPagePositionState {
  markers: string[]  // are comment ids that are used in the reddit api
  count:   number
}

interface SubredditPagePositionAction {
  name?: string
  type:  PageDirection
}

const initialSubredditPagePosition: SubredditPagePositionState = {
  markers: [],
  count: PAGE_AMOUNT,
}

function reducerSubredditPagePosition(state: SubredditPagePositionState, action: SubredditPagePositionAction) : SubredditPagePositionState {
  switch (action.type) {
    case 'next':
      return {
        markers: action.name ? [...state.markers, action.name] : [...state.markers],
        count: state.count + PAGE_AMOUNT,
      }
    case 'previous':
      state.markers.pop()
      return {
        markers: [...state.markers],
        count: Math.max(state.count - PAGE_AMOUNT, PAGE_AMOUNT),
      }
    default:
      throw new Error(`Bad action: ${action.type}`)
  }
}

type SubredditScreenProps = NativeStackScreenProps<RootStackParamList, 'Frontpage' | 'Subreddit'>

export default function SubredditScreen({route}: SubredditScreenProps) : JSX.Element {
  const palette = usePalette()
  const tgraphy = useTypography()

  const [pageState, dispatch] = useReducer(reducerSubredditPagePosition, initialSubredditPagePosition)

  const { data, isFetching, isLoading, refetch } = useGetSubredditQuery({
    after: pageState.markers[pageState.markers.length - 1] || '',
    count: pageState.count,
    subreddit: route?.params?.subreddit,
  })

  const headerSize = useRef<Animated.Value>(new Animated.Value(0)).current

  // Is there actually a performance improvement with providing a now context for PostItem?
  const nowDate = new Date()

  const posts: Array<{ data: Post }> = data?.data?.children || []

  const [navDir, setNavDir] = useState<PageDirection | null>(null)

  const postList = useRef<FlatList | null>(null)
  // Scrolls the post lists after the content has finished fetching
  useEffect(() => {
    if (navDir !== null && isFetching !== true) {
      const index = navDir == 'next' ? 0 : posts.length - 1
      postList.current?.scrollToIndex({ index })
      setNavDir(null)
    }
  }, [navDir, isFetching])

  return (
    <BaseScreen>
      <NowContext.Provider value={nowDate}>
        <Animated.FlatList
          ListFooterComponent={() => <View style={{height: 46 + 12}} />}
          ListHeaderComponent={() => 
            <Animated.View
              style={{
                flex: 1,
                height: 256,
                justifyContent: 'center',
                padding: 8,
                transform: [
                  {
                    translateY: headerSize.interpolate({
                      inputRange: [0, 224],
                      outputRange: [0, 100],
                      extrapolate: 'clamp',
                    })
                  }
                ]
              }}
            >
              <TitleBar subreddit={route?.params?.subreddit} />
            </Animated.View>
          }
          ItemSeparatorComponent={() => <View style={{height: 12}} />}
          ListEmptyComponent={() => (isLoading) ? <Loading /> : <EmptyListComponent />}
          data={posts}
          keyExtractor={item => item.data.id}
          onRefresh={refetch}
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: {
                    y: headerSize
                  }
                }
              }
            ],
            {
              useNativeDriver: true
            }
          )}
          scrollEventThrottle={128} // TODO how does the results look on 60hz+ screen?
          ref={postList}
          refreshing={isFetching}
          renderItem={({ item }) => <PostItem {...item} />}
        />

        <Animated.View
          style={{
            backgroundColor: palette.bgColour,
            borderTopColor: palette.border,
            borderTopWidth: 0.5,
            bottom: 0,
            left: 0,
            padding: 8,
            position: 'absolute',
            right: 0,
            transform: [
              {
                translateY: headerSize.interpolate({
                  inputRange: [224, 280],
                  outputRange: [8, -42],
                  extrapolate: 'clamp',
                })
              }
            ],
          }}
        >
          <TitleBar subreddit={route?.params?.subreddit} textStyle={{fontSize: tgraphy.header2.size}} />
        </Animated.View>

        {/* TODO need to figure out how to integrate into react-navigation's tabbar */}
        <PageControls
          disabled={isFetching}
          nextPage={() => {
            dispatch({ type: 'next', name: posts[posts.length - 1].data.name })
            setNavDir('next')
          }}
          page={pageState.count / PAGE_AMOUNT}
          previousPage={() => {
            dispatch({ type: 'previous' })
            setNavDir('previous')
          }}
        />
      </NowContext.Provider>
    </BaseScreen>
  )
}
