function countryScreen({navigation, route}) {
  const [lastupdate, setlastupdate] = useState();
  const [deaths, setdeaths] = useState();
  const [confirmedCases, setconfirmedCases] = useState();
  const [criticalCases, setcriticalCases] = useState();
  const [recoveredCases, setrecoveredCases] = useState();
  const [confirmedCasesperc, setconfirmedCasesperc] = useState();
  const [criticalCasesperc, setcriticalCasesperc] = useState();
  const [deathsperc, setdeathsperc] = useState();
  const [recoveredCasesperc, setrecoveredCasesperc] = useState();
  const [Country, setCountry] = useState();
  useEffect(() => {
    setCountry(route.params.Country);
    setconfirmedCases(route.params.res[0].confirmed);
    setcriticalCases(route.params.res[0].critical);
    setdeaths(route.params.res[0].deaths);
    setrecoveredCases(route.params.res[0].recovered);
    setlastupdate(route.params.res[0].lastUpdate);
    var cperc = Math.ceil((route.params.res[0].confirmed / 7800000000) * 100);
    setconfirmedCasesperc(cperc);
    var crperc = Math.ceil(
      (route.params.res[0].critical / route.params.res[0].confirmed) * 100,
    );
    setcriticalCasesperc(crperc);
    var dperc = Math.floor(
      (route.params.res[0].deaths / route.params.res[0].confirmed) * 100,
    );
    setdeathsperc(dperc);
    var rperc = Math.floor(
      (route.params.res[0].recovered / route.params.res[0].confirmed) * 100,
    );
    setrecoveredCasesperc(rperc);
  });
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
