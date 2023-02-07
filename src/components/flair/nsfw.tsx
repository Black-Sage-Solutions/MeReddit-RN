import { TextStyle, View } from 'react-native'

import { Text } from '@components/text'

import { useTypography } from '@ui/typography'

export default function NSFWFlair({style: inStyle={}}: {style?: TextStyle}) : JSX.Element {
  const tgraphy = useTypography()

  return (
    <Text
      style={[
        tgraphy.sub,
        {
          // alignItems: 'center',
          // alignContent: 'center',
          borderColor: 'red',
          borderRadius: 6,
          borderWidth: 0.5,
          color: 'red',
          flexGrow: 0,
          paddingHorizontal: 5,
          textAlign: 'center',
          textAlignVertical: 'center',
        },
        inStyle
      ]}
    >
      NSFW
    </Text>
  )
}
