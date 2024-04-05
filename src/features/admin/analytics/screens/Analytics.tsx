import React, { useEffect } from 'react'
import { StyleSheet, View, Text, Dimensions} from 'react-native'
import { SAFE_AREA_PADDING } from '../../../../Constants'
import { LineChart, PieChart } from 'react-native-chart-kit'
import { ScrollView } from 'react-native-gesture-handler'
import { useAnalytics } from '../hooks/useAnalytics'
import Loader from '../../../../views/Loader'
import Title from '../../../../components/Title'
import { Colors } from '../../../../constants/colors'
import { Discount } from '../../components/Discount'
import { useHandleErrors } from '../../../../hooks/useHandleError'
import SubmitButton from '../../../../components/SubmitButton'

function AnalyticBox({ title, value, subValue }: { title: string, value: number, subValue?: number }): React.ReactElement {

  const color = (subValue && subValue > 0) ? "#bce784" : "#a50104";
  return(
    <View style={{ flex: 1, flexDirection: "column", backgroundColor: Colors.white, padding: 10, borderRadius: 18, marginRight: 10 }}>
      <Text style={{ fontWeight: "500", fontSize: 12 }}>{title}</Text>
      <View style={{ marginTop: 10, flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={{ fontWeight: "bold", fontSize: 20 }}>{value}</Text>
        {subValue ? <Text style={{ fontWeight: "600", color: color }}>{subValue + "%"}</Text> : null}
      </View>
    </View>
  )
}



export function AdminPage({ navigation }: any): React.ReactElement {

  const [renderError, showError] = useHandleErrors()
  const [analytics, getAnalytics] = useAnalytics();

  useEffect(() => {
    getAnalytics()
  }, [])


  const CHART_WIDTH = Dimensions.get("window").width - SAFE_AREA_PADDING.paddingRight*2;

  if(!analytics) return <Loader />
      
  return (
    <>
    {renderError}
          <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.headerContainer}>
                <Title text="Sommario" />
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{ marginTop: 20}}>
                  {
                    analytics.overview.map((data: any, i: number) => <AnalyticBox key={"AnalyticBox_" + i} {...data}/>)
                  }
                </ScrollView>
                <View style={{ marginTop: 20 }}>
                  <Title text="Visite nella settimana" />
                  <LineChart
                      data={{
                        labels: analytics.weeklyPageViews.labels,
                        datasets: analytics.weeklyPageViews.dataset
                      }}
                      width={CHART_WIDTH} // from react-native
                      height={220}
                      yAxisLabel=""
                      yAxisSuffix=""
                      yAxisInterval={1} // optional, defaults to 1
                      chartConfig={{
                      backgroundColor: Colors.greyLight,
                      backgroundGradientFrom: Colors.greyLight,
                      backgroundGradientTo: Colors.greyLight,
                      decimalPlaces: 2, // optional, defaults to 2dp
                      color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                      labelColor: (opacity = 1) => Colors.rgba.black,
                      propsForDots: {
                          r: "6",
                          strokeWidth: "2",
                          stroke: Colors.PRIMARY
                      }
                      }}
                      bezier
                      withInnerLines={false}
                      withVerticalLines={false}
                      withHorizontalLines={false}
                      style={{
                        borderRadius: 16,
                        marginTop: 20
                      }}
                  />
                </View>
                <View style={{ marginTop: 20 }}>
                  <Title text="Attività giornaliera" />
                  <PieChart
                    data={analytics.activityTime}
                    width={CHART_WIDTH}
                    height={250}
                    chartConfig={{
                      backgroundColor: "#1b998b",
                      backgroundGradientFrom: "#1b998b",
                      backgroundGradientTo: "#292f36",
                      decimalPlaces: 2, // optional, defaults to 2dp
                      color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                      labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                      style: {
                          borderRadius: 16
                      },
                      propsForDots: {
                          r: "6",
                          strokeWidth: "2",
                          stroke: "#292f36"
                      }
                    }}
                    accessor={"value"}
                    backgroundColor={"transparent"}
                    paddingLeft={"15"}
                    center={[10, 20]}
                    style={{ padding: 0, height: 300 }}
                  />
                </View>
                <View style={{ marginTop: 20, paddingRight: SAFE_AREA_PADDING.paddingLeft }}>
                  <Title text="Sconti Recenti" />
                  {
                    (analytics.recentRewards && analytics.recentRewards.length > 0) ? analytics.recentRewards.map((data: any, i: number) => 
                    <View style={{ marginTop: 20 }}>
                      <Discount key={"Discount_" + i} {...data}/>
                    </View>
                    ) : <View style={{
                      backgroundColor: Colors.white, 
                      paddingTop: 20, 
                      paddingLeft: 10, 
                      paddingBottom: 20, 
                      paddingRight: 10, 
                      borderRadius: 10,
                      alignItems: "center",
                      marginTop: 20 
                    }}>
                          <Text style={{ textAlign: "center" }}>Nessun Sconto</Text>
                        </View>
                  }
                </View>
          </View>
      </ScrollView>
    </>
  )
}

const styles = StyleSheet.create({
  headerContainer: {
    paddingTop: SAFE_AREA_PADDING.paddingTop,
    paddingLeft: SAFE_AREA_PADDING.paddingLeft,
    paddingBottom: SAFE_AREA_PADDING.paddingBottom + 100,
    backgroundColor: Colors.greyLight
  }
})