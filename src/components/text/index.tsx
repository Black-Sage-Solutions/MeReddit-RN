import { Text as RNText, TextProps } from 'react-native'

import { usePalette } from '@ui/palette'

/**
 * Text component that provides default theme color using Palette hook.
 *
 * This uses react-native's Text component underneath and passes all the params to it, but it
 * doesn't have consistant support for light and dark mode. On iOS, only light mode is supported
 * in the native component code and android is weird but does have a way to provide color for both
 * light and dark themes on the text with the
 * `$project_root/android/app/src/main/res/{values,values-night}/colors.xml` files.
 *
 * But there's no comprehensive solution for both OSs, hence this component should be used for
 * any text within the app instead of the one provided with react-native.
 *
 * @param {[type]} {children, style, ...props}: TextProps [description]
 */
export function Text({children, style, ...props}: TextProps) : JSX.Element {
	const palette = usePalette()
	const color = palette.text.fg
	return (
		<RNText {...props} style={[{color}, style]}>{children}</RNText>
	)
}
