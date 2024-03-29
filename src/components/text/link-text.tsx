import { TextProps } from 'react-native'

import { Text } from '@components/text'

/**
 * LinkText component that decorates children elements.
 *
 * @param {[type]} {children, style, ...props} : TextProps [description]
 */
export default function LinkText({children, style, ...props} : TextProps) : JSX.Element {
  return (
    <Text
      {...props}
      style={[style, {textDecorationLine: 'underline'}]}
    >
      {children}
    </Text>
  )
}
