import { Appearance } from "react-native";

export const Colors = {
    PRIMARY: "#49beaa",
    white: Appearance.getColorScheme() === "light" ? "white" : "#0f0f0f",
    whitePaper: "#F6F6F6",
    black: Appearance.getColorScheme() === "light" ? "#0f0f0f" : "white",
    blackPipe: '#3E3E3E',
    cyanDeepAqua: '#0088B3',
    greenMint: '#00978D',
    greenForest: '#02514C',
    greyLight: Appearance.getColorScheme() === "light" ? '#D2D2D2' : "#232D3F",
    grey: '#656565',
    greyInput: Appearance.getColorScheme() === "light" ? "#ECECEC" : "#0f0f0f",
    redDarky: '#750000',
    rgba: {
        black: Appearance.getColorScheme() === "light" ? "rgba(0,0,0,1)" : "rgba(255,255,255,1)"
    }
}