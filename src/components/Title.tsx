import { StyleSheet, Text } from "react-native"
import { Colors } from "../constants/colors";

function Title ({ text, style }: { text: string, style?: any }): React.ReactElement {
    return <Text style={{...styles.title, ...style}}>{text}</Text>
}

const styles = StyleSheet.create({
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      maxWidth: '100%',
      color: Colors.black
    }
})

export default Title;