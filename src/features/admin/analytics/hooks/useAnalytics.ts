import axios from 'axios';
import { useEffect, useState } from 'react'
import { useRESTAPI } from '../../../../hooks/useRESTAPI';
import { Alert } from 'react-native';
import { Auth } from '../../../../hooks/useAuth';
import storage from '../../../../storage/Storage';
import { formatInteger } from '../../../../utils/formatterInteger';

export const useAnalytics = (): any => {
  const [analytics, setAnalytics] = useState<any>()
  const config = useRESTAPI();
  
  const getAnalytics = async () => {
    try {
        const auth: Auth = await storage
          .load({
            key: 'auth',
            autoSync: true,
            syncInBackground: true,
          });
          const headers = {
              headers: {
                  Authorization: "Bearer " + auth.accessToken
              }
          }
          const allPromises = Promise.all([
            axios.get(config.HOST + "/store/analytics/overview", headers),
            axios.get(config.HOST + "/store/analytics/weeklyPageViews", headers),
            axios.get(config.HOST + "/store/analytics/activityTime", headers),
            axios.get(config.HOST + "/store/analytics/recentDiscountRedeemed?limit=5&skip=0", headers),
          ]);

          try {
            const [overview, weeklyPageViews, activityTime, recentDiscountRedeemed] = await allPromises;

            const data = {
              overview: [
                {
                  title: "Utenti attivi",
                  value: formatInteger(overview.data.data.totalUsersActive)
                },
                {
                  title: "Utenti registrati",
                  value: overview.data.data.totalRegisteredUsers.total,
                  subValue: overview.data.data.totalRegisteredUsers.percentage,
                },
                {
                  title: "Visite nella pagina",
                  value: formatInteger(overview.data.data.pageViews),
                },
                {
                  title: "Totale sconti presi",
                  value: formatInteger(overview.data.data.totalRewardsClaimed)
                },
                {
                  title: "Totale punti generati",
                  value: formatInteger(overview.data.data.totalPointsAvailableByUser)
                }
              ],
              weeklyPageViews: {
                labels: ["Lun", "Mar", "Mer", "Gio", "Ven", "Sab", "Dom"],
                dataset: [{
                  data: weeklyPageViews.data.data.map((day: any) => day.total)
                }]
              },
              activityTime: [
                {
                  name: "Mattina",
                  value: activityTime.data.data[0].count,
                  color: "#49beaa",
                  legendFontColor: "#7F7F7F",
                  legendFontSize: 15
                },
                {
                  name: "Pomeriggio",
                  value: activityTime.data.data[1].count,
                  color: "#456990",
                  legendFontColor: "#7F7F7F",
                  legendFontSize: 15
                },
                {
                  name: "Sera",
                  value: activityTime.data.data[2].count,
                  color: "#ef767a",
                  legendFontColor: "#7F7F7F",
                  legendFontSize: 15
                }
              ],
              recentRewards: recentDiscountRedeemed.data.data
            }

            setAnalytics(data);
          } catch (error) {
            console.log(error)
          }
        
    } catch (error) {
        //show error boundary
    }
  }

  return [analytics, getAnalytics];
}