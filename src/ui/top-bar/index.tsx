import { StyleSheet, Text, View } from "react-native"

import ProfileBadge from '@app/reddit/profile/badge'

const style = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    height: 48,
    justifyContent: 'space-between',
    paddingHorizontal: 8,
  },
  title: {
    fontSize: 32,
    fontWeight: '600',
  }
})

export default function TopBar() {
  return (
    <View style={style.container}>
      <Text style={style.title}>MeReddit</Text>

      <ProfileBadge />
    </View>
  )
}
