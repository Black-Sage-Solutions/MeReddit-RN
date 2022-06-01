/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, { useEffect, useState } from 'react'

import {
  Button,
  Linking,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  useColorScheme,
} from 'react-native'

import { Provider as ReduxProvider, useSelector } from 'react-redux'

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen'

import { RootState, store } from '@app/store'

import ScopesList from '@app/reddit/scopes'

import {
  handleRedirect,
  startAuthRequest,
} from '@utils/oauth'

import { parse } from '@utils/uri/parse'

type IntentMap = {
  [key: string]: Function
}

function delegateIntent({url} : {url: string}) {
  const routes: IntentMap = {
    'oauth2redirect': handleRedirect,
    'reddit.com':     () => {},
    'old.reddit.com': () => {},
    'www.reddit.com': () => {},
  }

  console.warn('Received Intent:', url)

  const urlData: IUri = parse(url)

  console.log({urlData})

  const handler: Function | undefined = routes[urlData.host] || undefined

  handler != undefined && handler(urlData)
}

function getInitialUrl() : string | null {
  const [url, setUrl] = useState<string | null>(null)

  useEffect(() => {
    const getUrlAsync = async () => {
      const initialUrl = await Linking.getInitialURL();
      setUrl(initialUrl)
    }

    getUrlAsync()
  }, [])

  return url
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  title: {
    fontSize: 32,
    fontWeight: '600'
  }
})

// TODO: create theme provider component
const TopBar: React.FC = () => {
  return (
    <View>
      <Text style={styles.title}>MeReddit</Text>
    </View>
  )
}

const App: React.FC = () => {
  const isDarkMode = useColorScheme() === 'dark'

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  }

  const initialUrl = getInitialUrl()

  console.log({initialUrl})

  useEffect(() => {
    Linking.addEventListener('url', delegateIntent)

    return () => {
      Linking.removeEventListener('url', delegateIntent)
    }
  }, [])

  return (
    <ReduxProvider store={store}>
      <SafeAreaView style={backgroundStyle}>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />

        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
            display: 'flex',
            height: '100%',
          }}>
          <TopBar />

          <Button
            color='orangered'
            onPress={startAuthRequest}
            title='Reddit'
            />

          <ScopesList />
        </View>
      </SafeAreaView>
    </ReduxProvider>
  )
}

export default App
