import { NavigationProp, useNavigation } from '@react-navigation/native'

import { RootStackParamList } from '@app/navigation/root'

import LinkText from '@components/text/link-text'

interface UserLinkProps {
  userName: string
}

export default function UserLink({userName}: UserLinkProps) : JSX.Element {
  const {navigate} = useNavigation<NavigationProp<RootStackParamList>>()

  return (
    <LinkText
      onPress={() => {
        navigate('User', {userName})}
      }
      >
      u/{userName}
    </LinkText>
  )
}
