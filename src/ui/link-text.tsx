import { Text, TextProps } from 'react-native'

/**
 * LinkText component that decorates children elements.
 *
 * @param {[type]} {children, style, ...props} : TextProps
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
