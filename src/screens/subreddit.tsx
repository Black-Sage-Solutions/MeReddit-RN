/**
 * 
 */

import { useCallback } from 'react'

import {
    FlatList, StyleSheet,
    Text, View
} from 'react-native'

import { NativeStackScreenProps } from '@react-navigation/native-stack'

import { RootStackParamList } from '@app/navigation/root'

import { useGetFrontpageQuery, useGetSubredditQuery } from '@app/reddit/noauth-api'

import BaseScreen from '@app/screens/base'

import PostItem from '@components/post-listing'

import NowContext from '@contexts/now'

import EmptyListComponent from '@components/empty-list'

import Loading from '@components/loading'

const style = StyleSheet.create({
  list: {
    marginHorizontal: 8,
  },
  separator: {
    height: 12,
  },
})

function ItemSeparator() : JSX.Element {
  return <View style={style.separator} />
}

type SubredditScreenProps = NativeStackScreenProps<RootStackParamList, 'Frontpage' | 'Subreddit'>

export default function SubredditScreen({route} : SubredditScreenProps) : JSX.Element {
  const useSubredditListingQuery = useCallback(() => {
    if (route.params?.subreddit) {
      return useGetSubredditQuery(route.params.subreddit)
    } else {
      return useGetFrontpageQuery()
    }
  }, [route.params?.subreddit])

  const {data, isFetching, isLoading, refetch} = useSubredditListingQuery()

  // Is there actually a performance improvement with providing a now context for PostItem?
  const nowDate = new Date()

  return (
    <BaseScreen>
      <NowContext.Provider value={nowDate}>
        <FlatList
          ItemSeparatorComponent={() => <ItemSeparator />}
          ListEmptyComponent={() => (isLoading) ? <Loading /> : <EmptyListComponent />}
          ListFooterComponent={() => (isLoading) ? null : <Text>TODO pagenate</Text>}
          data={data?.data?.children || []}
          keyExtractor={item => item.data.id}
          onRefresh={refetch}
          refreshing={isFetching}
          renderItem={({item}) => <PostItem {...item} />}
          style={style.list}
          />
      </NowContext.Provider>
    </BaseScreen>
  )
}
