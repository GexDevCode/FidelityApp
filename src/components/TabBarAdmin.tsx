import { View, Text, Pressable, StyleSheet, Platform, } from 'react-native';
import { AppIcon } from '../assets/icons/AppIcon';
import React, { useEffect, useState } from 'react';
import { AdminTabNavigator } from '../../App';
import { Colors } from '../constants/colors';
import { TabSetType } from '../assets/icons/tabs';

export function TabBarAdmin({ state, descriptors, navigation }: any) {

  return (
    <View style={{ flexDirection: 'row' }}>
      {state.routes.map((route: any, index: number) => {
        
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;
        
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key
          });
        };

        const icon = getUserTabIcon(label);
        const [color, setColor] =useState(isFocused ? Colors.cyanDeepAqua : Colors.grey)
        
        useEffect(()=>{
          setColor(isFocused ? Colors.greenMint : Colors.grey)
        },[isFocused])

        return (
          <Pressable
            key={"TabBarAdmin_" + index}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.container}
          >
            {
              icon === 'rewardCard' ?
              <>
                <View style={[styles.qrCodeContainer, { backgroundColor: color}]}>
                  <AppIcon iconSet='navigators-tabs-icons' name={icon} width={30} height={30} fill={color}/>
                </View>
                <Text style={[styles.qrCodeLabel, { color}]}>
                  {label}
                </Text>
              </>
              :
              <>
                <AppIcon iconSet='navigators-tabs-icons' name={icon} width={24} height={24} fill={color}/>
                <Text style={[styles.defaultLabel, { color }]}>
                  {label}
                </Text>
              </>
            }
          </Pressable>
        );
      })}
    </View>
  );
}

export function getUserTabIcon(label :string) : TabSetType | null {
  switch(label) {
    case AdminTabNavigator.admin.name: return AdminTabNavigator.admin.icon;
    case AdminTabNavigator.codeScanner.name: return AdminTabNavigator.codeScanner.icon;
    case AdminTabNavigator.store.name: return AdminTabNavigator.store.icon;
    default: {
      return null;
    }
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1, 
      paddingVertical: 8, 
      paddingHorizontal: 5, 
      justifyContent:"center", 
      alignItems:"center",
      backgroundColor: Colors.white,
      borderTopWidth: 0.5,
      borderTopColor: Colors.greyLight,
    },
    qrCodeContainer: { 
      position:'absolute', 
      top: -28, 
      padding: 10, 
      borderRadius:60/2, 
      height: 60, 
      width: 60,
      justifyContent:'center',
      alignItems:"center",
      ...(Platform.select({
      ios: {
        shadowColor: Colors.black,
        shadowOffset: { width: 0, height: 2 }, // Adjust the height to control the shadow's position
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 5,
      },
    })),
    },
    qrCodeLabel :{
      fontSize: 12, 
      textAlign: "center", 
      top: 14 
    },
    defaultLabel: {
      fontSize: 12, 
      textAlign: "center"
    }
  },
)
