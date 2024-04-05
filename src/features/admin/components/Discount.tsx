import { Image, StyleSheet, Text, View } from "react-native";
import Title from "../../../components/Title";
import moment from "moment";
import { Colors } from "../../../constants/colors";

export function Discount({ imageUrl, name, datetimeCreated, points, children }: { imageUrl: string, name: string, datetimeCreated: number, points: number, children: any }): React.ReactElement {
  
  return(
        <View style={styles.container}>
          {
            imageUrl ?
            <Image source={{
              uri: imageUrl ? imageUrl : "",
            }} style={styles.image} />
            : null
          }

          <View style={styles.textContainer}>
            {name ? <Title text={name} /> : null}
            <View style={styles.descriptionContainer}>
              {datetimeCreated ? <Text style={{ color: Colors.black }}>{moment(datetimeCreated).format("MMM DD")}</Text> : null}
              {points ? <Text style={styles.points}>{points} points</Text> : null}
            </View>
          </View>
          {children}
        </View>
    )
  }

const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        flexDirection: "row", 
        backgroundColor: Colors.white, 
        paddingTop: 20, 
        paddingLeft: 10, 
        paddingBottom: 20, 
        paddingRight: 10, 
        borderRadius: 10 
    },
    image: { width: 80, height: 80, objectFit: "cover", borderRadius: 10 },
    textContainer: { marginLeft: 10, minWidth: 250 },
    descriptionContainer: { flex: 1, flexDirection: "row", justifyContent: "space-between" },
    points: { color: Colors.PRIMARY, fontSize: 16, fontWeight: "600" }
})