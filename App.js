import { Button, ScrollView, Searchbar, Text, TextInput, View } from 'react-native';
import React, { useEffect, useState } from 'react';

import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import { NavigationContainer } from '@react-navigation/native';
import ProgressCircle from 'react-native-progress-circle';
import countryScreen from './src/countryScreen';
import { createDrawerNavigator } from '@react-navigation/drawer';

function HomeScreen({ navigation }) {
  const [lastupdate, setlastupdate] = useState('');
  const [confirmedCases, setconfirmedCases] = useState();
  const [criticalCases, setcriticalCases] = useState();
  const [deaths, setdeaths] = useState();
  const [recoveredCases, setrecoveredCases] = useState();
  const [lastUpdate, setlastUpdate] = useState();
  const [confirmedCasesperc, setconfirmedCasesperc] = useState();
  const [criticalCasesperc, setcriticalCasesperc] = useState();
  const [deathsperc, setdeathsperc] = useState();
  const [recoveredCasesperc, setrecoveredCasesperc] = useState();
  const [Country, setCountry] = useState();
  useEffect(() => {
    fetch('https://covid-19-data.p.rapidapi.com/totals', {
      method: 'GET',
      headers: {
        'x-rapidapi-key': '7efef65467mshef4b04d726f3bd8p1989a2jsn80f2cb6dd7fa',
        'x-rapidapi-host': 'covid-19-data.p.rapidapi.com',
        "useQueryString": true,
        Accept: '*/*',
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((res) => {
        console.log(res);
        setconfirmedCases(res[0].confirmed);
        setcriticalCases(res[0].critical);
        setdeaths(res[0].deaths);
        setrecoveredCases(res[0].recovered);
        setlastupdate(res[0].lastUpdate);
        var cperc= Math.floor((res[0].confirmed / 7800000000) * 100 )
        setconfirmedCasesperc(cperc);
        var crperc=Math.ceil((res[0].critical / res[0].confirmed) * 100);
        setcriticalCasesperc(crperc);
        var dperc = Math.floor((res[0].deaths / res[0].confirmed) * 100);
        setdeathsperc(dperc);
        var rperc = Math.floor((res[0].recovered / res[0].confirmed) * 100);
        setrecoveredCasesperc(rperc);
      });
  });
  const  CountySearch = () => {
    fetch("https://covid-19-data.p.rapidapi.com/country?name=" + Country,  {
      method: 'GET',
      headers: {
        'x-rapidapi-key': '7efef65467mshef4b04d726f3bd8p1989a2jsn80f2cb6dd7fa',
        'x-rapidapi-host': 'covid-19-data.p.rapidapi.com',
        "useQueryString": true,
        Accept: '*/*',
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((res) => {
      console.log(res);
      navigation.navigate('Notifications', {
      res: res,
      Country:Country
      });
      }
      )
  }
  return (
    <View style={{flex: 1, backgroundColor: 'black'}}>
      <Text
        style={{
          textAlign: 'center',
          padding: 20,
          fontSize: 25,
          fontStyle: 'italic',
          color: 'white',
        }}>
        Coid-19 World Statistics
      </Text>
      <View style={{ width: '15%',
          height: '10%',
          marginTop:-50}}>
      <Button title=" fav " onPress={() => navigation.navigate('Fav')} />
      </View>
      <View
        style={{
          flexDirection: 'row',
        }}>
        <ProgressCircle
          percent={confirmedCasesperc}
          radius={55}
          borderWidth={6}
          color="red"
          shadowColor="#999"
          bgColor="#fff">
          <Text
            style={{
              fontSize: 20,
              textAlign: 'center',
              fontStyle: 'italic',
              color: 'red',
            }}>
            Confirmed {confirmedCasesperc}%
          </Text>
        </ProgressCircle>
        <TextInput
          style={{
            borderWidth: 1,
            borderColor: 'red',
            width: '50%',
            height: '30%',
            marginLeft: 10,
            backgroundColor: 'white',
          }}
          Value={Country}
          onChangeText={(text) => setCountry(text)}
          placeholder="Search Country"></TextInput>
      </View>
      <View
        style={{
          width: '20%',
          height: '20%',
          marginLeft:300,
          marginTop:-110
        }}>
        <Button title="Search" onPress={() => CountySearch()}></Button>
      </View>
      <View
        style={{
          backgroundColor: '',
          width: '100%',
          height: '7%',
          backgroundColor: '#170001',
        }}>
        <Text
          style={{
            paddingLeft: 90,
            padding: 10,
            fontStyle: 'italic',
            color: 'white',
          }}>
          World Statistics Percentage
        </Text>
      </View>
      <View style={{flexDirection: 'row', padding: 10}}>
        <ProgressCircle
          percent={criticalCasesperc}
          radius={50}
          borderWidth={6}
          color="brown"
          shadowColor="#999"
          bgColor="#fff">
          <Text
            style={{
              fontSize: 20,
              fontStyle: 'italic',
              color: 'brown',
              textAlign: 'center',
            }}>
            Critical {criticalCasesperc}%
          </Text>
        </ProgressCircle>
        <ProgressCircle
          percent={deathsperc}
          radius={50}
          borderWidth={6}
          color="red"
          shadowColor="#999"
          bgColor="#fff">
          <Text
            style={{
              fontSize: 20,
              fontStyle: 'italic',
              color: 'red',
              textAlign: 'center',
            }}>
            {' '}
            Deaths {deathsperc}%
          </Text>
        </ProgressCircle>
        <ProgressCircle
          percent={recoveredCasesperc}
          radius={50}
          borderWidth={6}
          color="green"
          shadowColor="#999"
          bgColor="#fff">
          <Text
            style={{
              fontSize: 18,
              fontStyle: 'italic',
              color: 'green',
              textAlign: 'center',
            }}>
            Recovered {recoveredCasesperc}%
          </Text>
        </ProgressCircle>
      </View>
      <View
        style={{
          width: '100%',
          height: '7%',
          backgroundColor: '#170001',
        }}>
        <Text
          style={{
            paddingLeft: 90,
            padding: 10,
            fontStyle: 'italic',
            color: 'white',
          }}>
          World Statistics Number
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          padding: 15,
          justifyContent: 'space-between',
        }}>
        <Text style={{fontStyle: 'italic', fontSize: 20, color: 'red'}}>
          Confirmed :{confirmedCases}
        </Text>
        <Text style={{fontStyle: 'italic', fontSize: 20, color: 'brown'}}>
          Critical :{criticalCases}
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          padding: 15,
          justifyContent: 'space-between',
        }}>
        <Text style={{fontStyle: 'italic', fontSize: 20, color: 'green'}}>
          Recovered :{recoveredCases}
        </Text>
        <Text style={{fontStyle: 'italic', fontSize: 20, color: 'red'}}>
          Deaths: {deaths}
        </Text>
      </View>
      <View
        style={{
          backgroundColor: '#170001',
          width: '100%',
          height: '7%',
          padding: 13,
          paddingLeft: 80,
        }}>
        <Text style={{fontStyle: 'italic', color: 'white'}}>Last Update</Text>
      </View>
      <Text
        style={{
          fontStyle: 'italic',
          fontSize: 20,
          paddingLeft: 30,
          padding: 15,
          color: 'white',
        }}>
        {lastupdate}
      </Text>
    </View>
  );
};
function NotificationsScreen({ navigation ,route}) {
   const [lastupdate, setlastupdate] = useState();
   const [deaths, setdeaths] = useState();
   const [confirmedCases, setconfirmedCases] =useState();
   const [criticalCases, setcriticalCases] = useState();
   const [recoveredCases, setrecoveredCases] = useState();
   const [confirmedCasesperc, setconfirmedCasesperc] = useState();
   const [criticalCasesperc, setcriticalCasesperc] = useState();
   const [deathsperc, setdeathsperc] = useState();
   const [recoveredCasesperc, setrecoveredCasesperc] = useState();
   const [Country, setCountry] = useState();
   const [Colored, setColored] = useState(false);
   
    useEffect(() => {
          setCountry(route.params.Country);
          setconfirmedCases(route.params.res[0].confirmed);
          setcriticalCases(route.params.res[0].critical);
          setdeaths(route.params.res[0].deaths);
          setrecoveredCases(route.params.res[0].recovered);
          setlastupdate(route.params.res[0].lastUpdate);
          var cperc = Math.ceil((route.params.res[0].confirmed / 7800000000) * 100);
          setconfirmedCasesperc(cperc);
          var crperc = Math.ceil((route.params.res[0].critical / route.params.res[0].confirmed) * 100);
          setcriticalCasesperc(crperc);
          var dperc = Math.floor((route.params.res[0].deaths / route.params.res[0].confirmed) * 100);
          setdeathsperc(dperc);
          var rperc = Math.floor((route.params.res[0].recovered /route.params.res[0].confirmed) * 100);
          setrecoveredCasesperc(rperc);
          
    });
    const FillColor = async () => {
      setColored(true);
      await AsyncStorage.setItem('objec', JSON.stringify(route.params.res[0]));
    }
  return (
    <View style={{flex: 1, backgroundColor: 'black'}}>
      <Button onPress={() => navigation.goBack()} title="Go back home" />
      <Text
        style={{
          textAlign: 'center',
          padding: 20,
          fontSize: 25,
          fontStyle: 'italic',
          color: 'white',
        }}>
        Coid-19 {Country} Statistics
      </Text>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <ProgressCircle
          percent={confirmedCasesperc}
          radius={55}
          borderWidth={6}
          color="red"
          shadowColor="#999"
          bgColor="#fff">
          <Text
            style={{
              fontSize: 20,
              textAlign: 'center',
              fontStyle: 'italic',
              color: 'red',
            }}>
            Confirmed {confirmedCasesperc}%
          </Text>
        </ProgressCircle>
        <View>
          <Icon
            name="heart"
            size={30}
            onPress={() => FillColor()}
            color={Colored ? 'red' : 'yellow'}
          />
        </View>
      </View>
      <View
        style={{
          backgroundColor: '',
          width: '100%',
          height: '7%',
          backgroundColor: '#170001',
        }}>
        <Text
          style={{
            paddingLeft: 90,
            padding: 10,
            fontStyle: 'italic',
            color: 'white',
          }}>
          {Country} Statistics Percentage
        </Text>
      </View>
      <View style={{flexDirection: 'row', padding: 10}}>
        <ProgressCircle
          percent={criticalCasesperc}
          radius={50}
          borderWidth={6}
          color="brown"
          shadowColor="#999"
          bgColor="#fff">
          <Text
            style={{
              fontSize: 20,
              fontStyle: 'italic',
              color: 'brown',
              textAlign: 'center',
            }}>
            Critical {criticalCasesperc}%
          </Text>
        </ProgressCircle>
        <ProgressCircle
          percent={deathsperc}
          radius={50}
          borderWidth={6}
          color="red"
          shadowColor="#999"
          bgColor="#fff">
          <Text
            style={{
              fontSize: 20,
              fontStyle: 'italic',
              color: 'red',
              textAlign: 'center',
            }}>
            {' '}
            Deaths {deathsperc}%
          </Text>
        </ProgressCircle>
        <ProgressCircle
          percent={recoveredCasesperc}
          radius={50}
          borderWidth={6}
          color="green"
          shadowColor="#999"
          bgColor="#fff">
          <Text
            style={{
              fontSize: 18,
              fontStyle: 'italic',
              color: 'green',
              textAlign: 'center',
            }}>
            Recovered {recoveredCasesperc}%
          </Text>
        </ProgressCircle>
      </View>
      <View
        style={{
          width: '100%',
          height: '7%',
          backgroundColor: '#170001',
        }}>
        <Text
          style={{
            paddingLeft: 90,
            padding: 10,
            fontStyle: 'italic',
            color: 'white',
          }}>
          {Country} Statistics Number
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          padding: 15,
          justifyContent: 'space-between',
        }}>
        <Text style={{fontStyle: 'italic', fontSize: 20, color: 'red'}}>
          Confirmed :{confirmedCases}
        </Text>
        <Text style={{fontStyle: 'italic', fontSize: 20, color: 'brown'}}>
          Critical :{criticalCases}
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          padding: 15,
          justifyContent: 'space-between',
        }}>
        <Text style={{fontStyle: 'italic', fontSize: 20, color: 'green'}}>
          Recovered :{recoveredCases}
        </Text>
        <Text style={{fontStyle: 'italic', fontSize: 20, color: 'red'}}>
          Deaths: {deaths}
        </Text>
      </View>
      <View
        style={{
          backgroundColor: '#170001',
          width: '100%',
          height: '7%',
          padding: 13,
          paddingLeft: 80,
        }}>
        <Text style={{fontStyle: 'italic', color: 'white'}}>Last Update</Text>
      </View>
      <Text
        style={{
          fontStyle: 'italic',
          fontSize: 20,
          paddingLeft: 30,
          padding: 15,
          color: 'white',
        }}>
        {lastupdate}
      </Text>
    </View>
  );
}
function FavScreen({ navigation ,route}) {
   const [lastupdate, setlastupdate] = useState();
   const [deaths, setdeaths] = useState();
   const [confirmedCases, setconfirmedCases] =useState();
   const [criticalCases, setcriticalCases] = useState();
   const [recoveredCases, setrecoveredCases] = useState();
   const [confirmedCasesperc, setconfirmedCasesperc] = useState();
   const [criticalCasesperc, setcriticalCasesperc] = useState();
   const [deathsperc, setdeathsperc] = useState();
   const [recoveredCasesperc, setrecoveredCasesperc] = useState();
   const [Country, setCountry] = useState();
  useEffect(() => {
  readData();
})
const readData = async () => {
        let ab = await AsyncStorage.getItem('objec');
        let parsed = JSON.parse(ab);
        console.log(' now cr  data is ', parsed.deaths);
        setCountry(parsed.country);
        setconfirmedCases(parsed.confirmed);
        setcriticalCases(parsed.critical);
        setdeaths(parsed.deaths);
        setrecoveredCases(parsed.recovered);
        setlastupdate(parsed.lastUpdate);
        var cperc = Math.ceil(
          (parsed.confirmed / 7800000000) * 100,
        );
        setconfirmedCasesperc(cperc);
        var crperc = Math.ceil(
          (parsed.critical / parsed.confirmed) * 100,
        );
        setcriticalCasesperc(crperc);
        var dperc = Math.floor(
          (parsed.deaths / parsed.confirmed) * 100,
        );
        setdeathsperc(dperc);
        var rperc = Math.floor(
          (parsed.recovered / parsed.confirmed) * 100,
        );
        setrecoveredCasesperc(rperc);
}
     return (
       <View style={{flex: 1, backgroundColor: 'black'}}>
         <View style={{width: '35%', height: '10%', }}>
           <Button onPress={() => navigation.goBack()} title=" World Screen" />
         </View>
         <Text
           style={{
             textAlign: 'center',
             padding: 15,
             marginTop:-20,
             fontSize: 25,
             fontStyle: 'italic',
             color: 'white',
           }}>
           Coid-19 {Country} Statistics
         </Text>
         <View
           style={{
             flexDirection: 'row',
             justifyContent: 'space-between',
           }}>
           <ProgressCircle
             percent={confirmedCasesperc}
             radius={55}
             borderWidth={6}
             color="red"
             shadowColor="#999"
             bgColor="#fff">
             <Text
               style={{
                 fontSize: 20,
                 textAlign: 'center',
                 fontStyle: 'italic',
                 color: 'red',
               }}>
               Confirmed {confirmedCasesperc}%
             </Text>
           </ProgressCircle>
         </View>
         <View
           style={{
             backgroundColor: '',
             width: '100%',
             height: '7%',
             backgroundColor: '#170001',
           }}>
           <Text
             style={{
               paddingLeft: 90,
               padding: 10,
               fontStyle: 'italic',
               color: 'white',
             }}>
             {Country} Statistics Percentage
           </Text>
         </View>
         <View style={{flexDirection: 'row', padding: 10}}>
           <ProgressCircle
             percent={criticalCasesperc}
             radius={50}
             borderWidth={6}
             color="brown"
             shadowColor="#999"
             bgColor="#fff">
             <Text
               style={{
                 fontSize: 20,
                 fontStyle: 'italic',
                 color: 'brown',
                 textAlign: 'center',
               }}>
               Critical {criticalCasesperc}%
             </Text>
           </ProgressCircle>
           <ProgressCircle
             percent={deathsperc}
             radius={50}
             borderWidth={6}
             color="red"
             shadowColor="#999"
             bgColor="#fff">
             <Text
               style={{
                 fontSize: 20,
                 fontStyle: 'italic',
                 color: 'red',
                 textAlign: 'center',
               }}>
               {' '}
               Deaths {deathsperc}%
             </Text>
           </ProgressCircle>
           <ProgressCircle
             percent={recoveredCasesperc}
             radius={50}
             borderWidth={6}
             color="green"
             shadowColor="#999"
             bgColor="#fff">
             <Text
               style={{
                 fontSize: 18,
                 fontStyle: 'italic',
                 color: 'green',
                 textAlign: 'center',
               }}>
               Recovered {recoveredCasesperc}%
             </Text>
           </ProgressCircle>
         </View>
         <View
           style={{
             width: '100%',
             height: '7%',
             backgroundColor: '#170001',
           }}>
           <Text
             style={{
               paddingLeft: 90,
               padding: 10,
               fontStyle: 'italic',
               color: 'white',
             }}>
             {Country} Statistics Number
           </Text>
         </View>
         <View
           style={{
             flexDirection: 'row',
             padding: 15,
             justifyContent: 'space-between',
           }}>
           <Text style={{fontStyle: 'italic', fontSize: 20, color: 'red'}}>
             Confirmed :{confirmedCases}
           </Text>
           <Text style={{fontStyle: 'italic', fontSize: 20, color: 'brown'}}>
             Critical :{criticalCases}
           </Text>
         </View>
         <View
           style={{
             flexDirection: 'row',
             padding: 15,
             justifyContent: 'space-between',
           }}>
           <Text style={{fontStyle: 'italic', fontSize: 20, color: 'green'}}>
             Recovered :{recoveredCases}
           </Text>
           <Text style={{fontStyle: 'italic', fontSize: 20, color: 'red'}}>
             Deaths: {deaths}
           </Text>
         </View>
         <View
           style={{
             backgroundColor: '#170001',
             width: '100%',
             height: '7%',
             padding: 13,
             paddingLeft: 80,
           }}>
           <Text style={{fontStyle: 'italic', color: 'white'}}>
             Last Update
           </Text>
         </View>
         <Text
           style={{
             fontStyle: 'italic',
             fontSize: 20,
             paddingLeft: 30,
             padding: 15,
             color: 'white',
           }}>
           {lastupdate}
         </Text>
       </View>
     );

     
    }

const Drawer = createDrawerNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Notifications" component={NotificationsScreen} />
        <Drawer.Screen name="Fav" component={FavScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
