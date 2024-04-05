import { StyleProp, ViewStyle } from "react-native";
import { SvgProps } from "react-native-svg";
import React from "react";
import { NavigatorHeadersSet } from "./navigators/header";
import { TabsSet } from "./tabs";
import { IconAppSet } from "./icons";

type IconProps = {
  name: Icons;
  iconSet?: IconSet;
  style?: StyleProp<ViewStyle>;
  testName?: string;
} & SvgProps;

export const AppIcon = ({name, iconSet, style, ...rest}: IconProps) => {
    let Icon: React.FC<SvgProps> | null = null;
    
    switch (iconSet) {
        case 'navigators-tabs-icons':{
          Icon = TabsSet[name as keyof typeof TabsSet];
          break;
        }
        case 'navigators-header-icons':{
          Icon = NavigatorHeadersSet[name as keyof typeof NavigatorHeadersSet];
          break;
        }
        case 'icon-app':{
          Icon = IconAppSet[name as keyof typeof IconAppSet];
          break;
        }
    };

    if(!Icon){
      throw new Error("Icon not found");
    }

    return <Icon style={style} {...rest}/>
}

export type IconSet = 
'navigators-tabs-icons' | 'navigators-header-icons' | 'icon-app'

export type Icons =
  | keyof typeof TabsSet
  | keyof typeof NavigatorHeadersSet
  | keyof typeof IconAppSet;