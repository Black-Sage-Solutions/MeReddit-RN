/**
 * 
 */
import { StyleSheet, Text, View } from 'react-native'

import { useGetUserQuery } from '@app/reddit/noauth-api'

import BaseScreen from '@app/screens/base'

import Loading from '@components/loading'

const style = StyleSheet.create({
  container: {
    alignItems: 'center',
  }
})

export default function UserScreen({route}: any) : JSX.Element {
  const {data, error, isLoading, isFetching} = useGetUserQuery(route.params.userName)

  console.log({data, error, isLoading, isFetching})

  return (
    <BaseScreen>
      {
        (isLoading || isFetching)
        ? <Loading />
        : null
      }
      <View style={style.container}>
        <Text>TODO</Text>
      </View>
    </BaseScreen>
  )
}
