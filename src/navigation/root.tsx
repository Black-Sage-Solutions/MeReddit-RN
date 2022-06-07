/**
 * 
 */

import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import SubredditScreen from '@app/screens/subreddit'

const Stack = createNativeStackNavigator()

export default function RootNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName='frontpage'
        screenOptions={{ headerShown: false }}
        >
        <Stack.Screen name='frontpage' component={SubredditScreen} />
        <Stack.Screen name='subreddit' component={SubredditScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
