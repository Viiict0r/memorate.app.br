import { useSafeAreaInsets } from "react-native-safe-area-context";
import { View, Text } from "./Themed";
import { Pressable, StyleProp, StyleSheet, ViewStyle } from "react-native";
import { BlurView } from 'expo-blur'
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from "@expo/vector-icons";

type TabBarProps = {
  state: any,
  descriptors: any,
  navigation: any
}

export const TabBar = ({ state, descriptors, navigation }: TabBarProps) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={{
      ...TabBarStyles.wrapper,
      marginBottom: insets.bottom,
      paddingLeft: insets.left,
      paddingRight: insets.right
    }}>
      <Pressable style={{ zIndex: 2 }}>
        {({ pressed }) => (
          <LinearGradient colors={['#FFB950', '#FF3A3A']} style={{
            ...TabBarStyles.plus_button,
            opacity: pressed ? 0.8 : 1
          }}>
            <Feather
              name="plus"
              color="#fff"
              size={24}
            />
          </LinearGradient>
        )}
      </Pressable>
      
      <View style={TabBarStyles.border}>
        <BlurView intensity={10} style={TabBarStyles.container}>

        </BlurView>
      </View>
    </View>
  )
}

const TabBarStyles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    flex: 1,
    bottom: 0,
    width: `${100}%`,
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  border: {
    borderRadius: 999,
    overflow: 'hidden',
    width: '100%',
    maxWidth: 216,
    backgroundColor: 'null',
    borderWidth: 1,
    borderColor: '#272727',
    zIndex: 1,
    flex: 1
  },
  container: {
    width: `${100}%`,
    height: 54,
    maxWidth: 216,
    backgroundColor: 'rgba(25, 25, 25, 0.50)'
  },
  plus_button: {
    width: 48,
    height: 48,
    borderRadius: 999,
    alignSelf: 'center',
    position: 'absolute',
    marginTop: -10,
    zIndex: 2,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})