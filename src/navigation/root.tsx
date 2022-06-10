/**
 * 
 */

import { NavigationContainer, ParamListBase } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import CommentsScreen from '@app/screens/comments'
import SubredditScreen from '@app/screens/subreddit'
import UserScreen from '@app/screens/user'

export interface RootStackParamList extends ParamListBase {
  Comments:  {postId: string, subreddit: string}
  Frontpage: undefined
  Subreddit: {subreddit: string}
  User:      {userName:  string}
}

const Stack = createNativeStackNavigator<RootStackParamList>()

export function RootNavigation() : JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName='Frontpage'
        screenOptions={{ headerShown: false }}
        >
        <Stack.Screen name='Comments'  component={CommentsScreen} />
        <Stack.Screen name='Frontpage' component={SubredditScreen} />
        <Stack.Screen name='Subreddit' component={SubredditScreen} />
        <Stack.Screen name='User'      component={UserScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
