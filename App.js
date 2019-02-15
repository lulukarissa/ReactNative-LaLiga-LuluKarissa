import {createStackNavigator, createAppContainer} from 'react-navigation'
import KomponenSatu from './komponen/ScreenSatu'
import KomponenDua from './komponen/ScreenDua'
import KomponenTiga from './komponen/ScreenTiga'

var AppNavigator = createStackNavigator(
  {
    HalSatu: KomponenSatu,
    HalDua: KomponenDua,
    HalTiga: KomponenTiga
  },
  {
    initialRouteName: 'HalSatu',
    defaultNavigationOptions: {
      headerTransitionPreset: 'fade-in-place',
      headerMode: 'float'
    }
  }
)

export default createAppContainer(AppNavigator)