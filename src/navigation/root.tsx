import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer, ParamListBase } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Icon from 'react-native-vector-icons/FontAwesome5'

import SearchComponent from '@components/search'

import CommentsScreen from '@app/screens/comments'
import ProfileScreen from '@app/screens/profile'
import SubredditScreen from '@app/screens/subreddit'
import UserScreen from '@app/screens/user'

import { usePalette, usePaletteToNavTheme } from '@ui/palette'

export interface RootStackParamList extends ParamListBase {
  Comments:  {postId: string, subreddit: string}
  Frontpage: undefined
  Subreddit: {subreddit: string}
  User:      {userName:  string}
}

const RedditsStack = createNativeStackNavigator<RootStackParamList>()

function RedditsStackScreen() : JSX.Element {
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

interface RootTabParamList extends ParamListBase {
  Reddits: undefined
  Profile: undefined
}

const Tab = createBottomTabNavigator<RootTabParamList>()

export function RootNavigation() : JSX.Element {
  const palette = usePalette()
  const theme = usePaletteToNavTheme()

  return (
    <NavigationContainer theme={theme}>
      <Tab.Navigator
        initialRouteName='Reddits'
        screenOptions={{
          headerShown: false,
          tabBarHideOnKeyboard: true,
          tabBarLabelStyle: {
            fontSize: 12,
          },
          tabBarStyle: {
            backgroundColor: palette.bgColour,
          },
        }}
      >
        <Tab.Screen
          name='Reddits'
          component={RedditsStackScreen}
          options={{
            tabBarIcon: ({color, size}) => <Icon color={color} name='reddit-alien' size={size} />,
          }}
        />
        <Tab.Screen
          name='Search'
          component={SearchComponent}
          options={{
            tabBarIcon: ({color, size}) => <Icon color={color} name='search' size={size} />,
          }}
        />
        <Tab.Screen
          name='Profile'
          component={ProfileScreen}
          options={{
            tabBarIcon: ({color, size}) => <Icon color={color} name='user' size={size} />
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  )
}
