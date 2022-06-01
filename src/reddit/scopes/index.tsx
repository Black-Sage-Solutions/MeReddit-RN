import React from "react"

import { FlatList, StyleSheet, Text, View } from "react-native"

import { useGetScopesQuery } from '@app/reddit/noauth-api'

const style = StyleSheet.create({
  itemContainer: {
    marginVertical: 8,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: '600',
  }
})

type ScopeData = {
  description: string,
  id:          string,
  name:        string,  
}

type FlatListItemProps = {item: ScopeData}

const ScopeItem = ({item} : FlatListItemProps) => {
  return (
    <View style={style.itemContainer}>
      <Text style={style.itemTitle}>{item.name} ({item.id})</Text>
      <Text>{item.description}</Text>
    </View>
  )
}

const ScopesList: React.FC = () => {
  const { data, error, isLoading }  = useGetScopesQuery()

	return (
    <FlatList
      data={data && Object.values(data) || []}
      keyExtractor={item => item.id}
      renderItem={ScopeItem}
      />
  )
}

export default ScopesList
