import { NavigationProp, useNavigation } from '@react-navigation/native'

import { RootStackParamList } from '@app/navigation/root'

import LinkText from '@components/text/link-text'

interface SubredditLinkProps {
  subreddit:               string
}

export default function SubredditLink({subreddit}: SubredditLinkProps) : JSX.Element {
  const {navigate} = useNavigation<NavigationProp<RootStackParamList>>()

  return (
    <LinkText
      onPress={() => {
        navigate('Subreddit', {subreddit})
      }}
      >
      r/{subreddit}
    </LinkText>
  )
}