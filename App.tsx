/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import { StrictMode, useEffect, useState } from 'react'

import {
  Linking,
  StatusBar,
  useColorScheme,
} from 'react-native'

import { Colors } from 'react-native/Libraries/NewAppScreen'

import { Provider as ReduxProvider } from 'react-redux'

import { SafeAreaProvider } from 'react-native-safe-area-context'

import { useKeepAwake } from '@sayem314/react-native-keep-awake'

import { RootNavigation } from '@app/navigation/root'

import { store } from '@app/store'

import { handleRedirect } from '@utils/oauth'

import { parse } from '@utils/uri/parse'

interface IntentMap {
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

  const urlData: Uri = parse(url)

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

export default function App() {
  useKeepAwake()

  const isDarkMode = useColorScheme() === 'dark'

  const initialUrl = getInitialUrl()

  console.log({initialUrl})

  useEffect(() => {
    Linking.addEventListener('url', delegateIntent)

    return () => {
      Linking.removeEventListener('url', delegateIntent)
    }
  }, [])

  return (
    <StrictMode>
      <ReduxProvider store={store}>
        <SafeAreaProvider>
          <StatusBar 
            backgroundColor={isDarkMode ? Colors.black : Colors.white}
            barStyle={isDarkMode ? 'default' : 'dark-content'}
            />

          <RootNavigation />
        </SafeAreaProvider>
      </ReduxProvider>
    </StrictMode>
  )
}
