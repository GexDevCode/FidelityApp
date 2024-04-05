import { ActivityIndicator, StyleSheet, View } from "react-native"
import { Colors } from "../constants/colors";

export const Loader = (): React.ReactElement => {


  return (
    <View style={[styles.container, styles.horizontal]}>
        <ActivityIndicator size="large" />
    </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    justifyContent: 'center',
    backgroundColor: Colors.white
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
});

export default Loader;