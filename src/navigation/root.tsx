import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer, ParamListBase } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Icon from 'react-native-vector-icons/FontAwesome5'

import ProfileScreen from '@app/screens/profile'
import SearchComponent from '@components/search'

import { usePalette, usePaletteToNavTheme } from '@ui/palette'
import { useTypography } from '@ui/typography'

import { RedditsStackScreen } from './reddits'


interface RootTabParamList extends ParamListBase {
  Reddits: undefined
  Profile: undefined
}

const Tab = createBottomTabNavigator<RootTabParamList>()

export function RootNavigation() : JSX.Element {
  const palette = usePalette()
  const tgraphy = useTypography()
  const theme = usePaletteToNavTheme()

  return (
    <NavigationContainer theme={theme}>
      <Tab.Navigator
        initialRouteName='Reddits'
        screenOptions={{
          headerShown: false,
          tabBarHideOnKeyboard: true,
          tabBarLabelStyle: {
            fontSize: tgraphy.label.size,
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
            tabBarIcon: ({color}) => <Icon color={color} name='reddit-alien' size={20} />,
          }}
        />
        <Tab.Screen
          name='Search'
          component={SearchComponent}
          options={{
            tabBarIcon: ({color}) => <Icon color={color} name='search' size={20} />,
          }}
        />
        <Tab.Screen
          name='Profile'
          component={ProfileScreen}
          options={{
            tabBarIcon: ({color}) => <Icon color={color} name='user' size={20} />
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  )
}
