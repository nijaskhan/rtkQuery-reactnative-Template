import React from 'react';
import {Appearance, StyleSheet, TouchableOpacity, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Colors from '../../constants/Colors';
import HStack from '../HStack';
import Screens from '../../navigators';
import Icon from '../Icon';
import {isIOS, scaleFont, scaleSize} from '../../utils';
import NormalText from '../Text/NormalText';
import {Family, FontSize} from '../../constants/Fonts';
import {Spacing} from '../../constants/Layout';

export default function BottomNavigator({state, descriptors, navigation}) {
  const focusedOptions = descriptors[state.routes[state.index].key].options;
  const insets = useSafeAreaInsets();
  const colorMode = Appearance.getColorScheme();

  if (focusedOptions.tabBarVisible === false) {
    return null;
  }
  return (
    <View
      style={[
        {
          flexDirection: 'row',
          position: 'absolute',
          justifyContent: 'center',
          // bottom: isIOS ? 40 : 10,
          bottom: 0,
          left: 0,
          right: 0,
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
          paddingBottom: isIOS ? 30 : 10,
          paddingTop: 10,
          elevation: 5,
          backgroundColor:
            colorMode == 'light' ? 'white' : Colors.backgroundColor,
        },
        styles.shadowProp,
      ]}>
      <HStack
        props={{
          backgroundColor:
            colorMode == 'light' ? 'white' : Colors.backgroundColor,
          width: '100%',
        }}
        justifyContent="space-between">
        {state.routes.map((route, index) => {
          const {options} = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          let iconName;

          if (route.name == Screens.HOME_NAV) {
            iconName = 'home';
          }

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          return (
            <TouchableOpacity
              activeOpacity={0.7}
              accessibilityRole="button"
              accessibilityState={isFocused ? {selected: true} : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              onPress={onPress}
              onLongPress={onLongPress}
              style={styles.tabItem}
              key={'Nav-' + label}>
              {/* <View
                style={[styles.dotView, isFocused && styles.dotViewActive]}
              /> */}
              <View style={{marginTop: scaleSize(1)}}>
                <Icon
                  name={label == 'HomeNav' ? 'home' : label}
                  size={scaleFont(26)}
                  color={
                    isFocused ? Colors.primaryColor : Colors.backgroundColor
                  }
                />
              </View>
              <NormalText
                text={label == 'HomeNav' ? 'Home' : label}
                fontSize={FontSize.smallVariant}
                colorLight={
                  isFocused ? Colors.primaryColor : Colors.backgroundColor
                }
                letterSpacing={0}
                fontWeight={400}
                styles={{textAlign: 'center', marginTop: scaleSize(1)}}
              />
            </TouchableOpacity>
          );
        })}
      </HStack>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: Colors.primaryBg,
  },
  tabItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: Spacing.tiny,
  },
  dotView: {
    width: scaleSize(5),
    aspectRatio: 1,
    borderRadius: scaleSize(5),
    marginBottom: scaleSize(3),
  },
  dotViewActive: {
    backgroundColor: Colors.white,
  },
  tabLabel: {
    fontSize: FontSize.xs,
    fontFamily: Family.regular,
    textAlign: 'center',
    marginTop: Spacing.tinyVariant,
  },
  shadowProp: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
});
