import 'styled-components';
import theme from '../global/styles.d.ts/theme';
declare module 'styled-components' {
  type MyTheme = typeof theme;

  export interface DefaultTheme extends MyTheme { }
}