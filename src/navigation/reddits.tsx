import { ParamListBase } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"

import CommentsScreen from '@app/screens/comments'
import SubredditScreen from '@app/screens/subreddit'
import UserScreen from '@app/screens/user'

export interface RootStackParamList extends ParamListBase {
  Comments:  {postId: string, subreddit: string}
  Frontpage: undefined
  Subreddit: {subreddit: string}
  User:      {userName:  string}
}

const RedditsStack = createNativeStackNavigator<RootStackParamList>()

export function RedditsStackScreen() : JSX.Element {
  return (
    <RedditsStack.Navigator
      initialRouteName='Frontpage'
      // TODO figure out what would be best for the header
      screenOptions={{ headerShown: false }}
    >
      <RedditsStack.Screen name='Comments'  component={CommentsScreen} />
      <RedditsStack.Screen name='Frontpage' component={SubredditScreen} />
      <RedditsStack.Screen name='Subreddit' component={SubredditScreen} />
      <RedditsStack.Screen name='User'      component={UserScreen} />
    </RedditsStack.Navigator>
  )
}
