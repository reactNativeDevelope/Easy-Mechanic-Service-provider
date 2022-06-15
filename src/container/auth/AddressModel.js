import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  PermissionsAndroid,
  Platform,
  TouchableOpacity,
  ImageBackground,
  Image,
  Alert,
  TouchableHighlight,
  Keyboard,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { SmallIcon, Text, TextInput } from '../../components/atoms'
import Geolocation from 'react-native-geolocation-service';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import { colors, screenName, validation, fonts, images, validationStings } from '../../utils'
import {Typography, Colors, Mixins, AppStyles} from '../../styles';
import { Header } from '../../components/molecules';

let {padding, boxShadow, windowHeight} = Mixins;
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Geocoder from 'react-native-geocoding';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import config from '../../config';
import { LINE_HEIGHT_16, LINE_HEIGHT_80 } from '../../styles/typography';
Geocoder.init(config.GOOGLE_MAPS_APIKEY);
const GOOGLE_MAPS_APIKEY = config.GOOGLE_MAPS_APIKEY;
// Component
export const AddressModal = ({navigation, route}) => {
  let timer;
  const mapRef = useRef(null);
  const [state, setState] = useState({
    predictions: [],
    showSuggestion: false,
    sourceLocation: '',
    addressModel: false,
    modalVisible: false,
    curLatitude: 0,
    curLongitude: 0,
    address:'',
    cityState:[]
  });
  useEffect(() => {
    let address = route.params?.address ?? '';
    if (Platform.OS === 'android') {
      requestLocationPermission(address);
    } else {
      getCurrentLocation(address);
    }
  }, []);
  
  /****************************** Function Main  *************************************/
  const requestLocationPermission = async address => {
    console.log('Permission enter')
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: '',
          message: validationStings.locationPermission,
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        getCurrentLocation(address);
        //console.log('You can use the location');
      } else {
        console.log('location permission denied');
      }
    } catch (err) {
      console.warn('location error====',err);
    }
  };
  const getCurrentLocation = async address => {
    console.log('Permission enter')
    await Geolocation.getCurrentPosition(
      position => {
        setState(prevState => ({
          ...prevState,
          curLatitude: position.coords.latitude,
          curLongitude: position.coords.longitude,
          currentlocation: {
            curLatitude: position.coords.latitude,
            curLongitude: position.coords.longitude,
          },
        }));
        Geocoder.from(position.coords.latitude, position.coords.longitude)
          .then(json => {
            //   var addressComponent = json.results[0].formatted_address;
            //   let searchString = addressComponent
            //   if(addressComponent.length > 10){
            //     searchString =addressComponent.substring(0, 12);
            //   }else{
            //     searchString = addressComponent
            //   }
            //   onChangeSource(searchString)
          })
          .catch(error => console.log(error));
      },
      error => {
        setState(prevState => ({
          ...prevState,
          error: error.message,
        }));
      },
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 10000,
        // distanceFilter: 10,
      },
    );
  };

  const googleAutocomplete = async (Location, curLat, curLong) => {
    const apiUrl =
      'https://maps.googleapis.com/maps/api/place/autocomplete/json?input=' +
      Location +
      '&key=' +
      GOOGLE_MAPS_APIKEY +
      '&location=' +
      curLat +
      ',' +
      curLong +
      '&radius=' +
      1000;
    const result = await fetch(apiUrl);
    const json = await result.json();
    return json;
  };

  const onChangeSource = async sourceLocation => {
    //debugger;
    setState(prevState => ({
      ...prevState,
      tentativePrice: '',
      showSuggestionDest: false,
      sourceLocation: sourceLocation,
    }));
    var json = await googleAutocomplete(
      sourceLocation,
      state.curLatitude,
      state.curLongitude,
    );
    try {
      setState(prevState => ({
        ...prevState,
        predictions: json.predictions,
        showSuggestion: true,
        myaddress_list: json.predictions,
      }));
      if (json.predictions.length == 0) {
        setState(prevState => ({
          ...prevState,
          showSuggestion: false,
        }));
      }
    } catch (err) {
      showAlert(err.message, 300);
    }
  };

  const setSourceLocation = async (placeId, description) => {
    Keyboard.dismiss();
    try {
      let currentlocation = {};
      const json = await Geocoder.from(description);

    //  debugger;
      var location = json.results[0].geometry.location;
      currentlocation = {
        curLatitude: location.lat,
        curLongitude: location.lng,
      };

      setState(prevState => ({
        ...prevState,
        sourceLocation: description,
        showSuggestion: false,
        selSourcePlaceId: placeId,
        address:description,
        curLatitude: location.lat,
        curLongitude: location.lng,
        currentlocation: currentlocation,
        cityState:parse_place(json.results[0])
      }));
      if (route.params && route.params.setHandleAddress ) {
        let {setHandleAddress} = route.params;
        let {currentlocation, selSourcePlaceId, address,cityState} = state;
        console.log('cityState',currentlocation, selSourcePlaceId, address,cityState)
        setHandleAddress(description,location={lat:location.lat,lng:location.lng});
         navigation.goBack();
      }    } catch (error) {
      console.log('error',error)
      Alert.alert(error.message);
    }
  };
  function parse_place(place)
  {
      var location = [];
  
      for (var ac = 0; ac < place.address_components.length; ac++)
      {
          var component = place.address_components[ac];
  
          switch(component.types[0])
          {
              case 'locality':
                  location['city'] = component.long_name;
                  break;
              case 'administrative_area_level_1':
                  location['state'] = component.long_name;
                  break;
              case 'country':
                  location['country'] = component.long_name;
                  break;
          }
      };
  
      return location;
  }
  const onRegionChangeCompleteFn = region => {
    if (
      region.latitude.toFixed(6) === state.curLatitude.toFixed(6) &&
      region.longitude.toFixed(6) === state.curLongitude.toFixed(6)
    ) {
      return;
    }
    const locationLatLong = {
      latitude: region.latitude,
      longitude: region.longitude,
    };
    convertToAddress(locationLatLong);
  };

  // if(region && region.latitude){

  //   if (Platform.OS == 'ios') {
  //   mapRef.current.animateToRegion(
  //     {latitude: region.latitude, longitude: region.longitude},
  //     10,
  //   );
  // }
  //}

  const showAlert = (message, duration) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      Alert.alert(message);
    }, duration);
  };
  const logDrag = (eventName, e) => {
    if (
      e &&
      e.nativeEvent &&
      e.nativeEvent.coordinate.latitude &&
      e.nativeEvent.coordinate.longitude &&
      eventName == 'onDragend'
    ) {
      const locationLatLong = {
        latitude: e.nativeEvent.coordinate.latitude,
        longitude: e.nativeEvent.coordinate.longitude,
      };

      convertToAddress(locationLatLong);
    }
  };
  const convertToAddress = locationLatLong => {
    Geocoder.from(locationLatLong.latitude, locationLatLong.longitude)
      .then(json => {
        const currentAddress = json.results[0].formatted_address;
        const place_id = json.results[0].place_id;
        console.log(json.results[0], 'json.results[0]');
        let {lat, lng} = json.results[0].geometry.location;
        setState(prevState => ({
          ...prevState,
          curLatitude: lat,
          curLongitude: lng,
          address: currentAddress,
          sourceLocation: currentAddress,
          showSuggestion: false,
          selSourcePlaceId: place_id,
          currentlocation: {
            curLatitude: lat,
            curLongitude: lng,
          },
        }));
      })
      .catch(error => console.warn(error));
  };
  const onPressDoneAddress = () => {
    if (route.params && route.params.setHandleAddress ) {
      let {setHandleAddress} = route.params;
      let {currentlocation, selSourcePlaceId, address,cityState} = state;
      console.log('cityState',cityState)
      setHandleAddress(address, selSourcePlaceId, currentlocation,cityState);
       navigation.goBack();
    }
  };
  /****************************** Render Main  *************************************/
  const predictions =
    state &&
    state.predictions.map(prediction => (
      <TouchableHighlight
        style={{
          paddingVertical: 5,
          borderBottomWidth: 1.0,
          borderColor: colors.borderColor,
          backgroundColor: 'white',
          paddingHorizontal: moderateScale(16),
          height: 'auto',
        }}
        onPress={() =>
          setSourceLocation(prediction.place_id, prediction.description)
        }>
        <Text style={{margin: 10,fontSize:fonts.FONT_SIZE_12,color:colors.lightBlack}} key={prediction.id}>
          {prediction.description}
        </Text>
      </TouchableHighlight>
    ));
  return (
    <View style={[{flex: 1, backgroundColor: colors.white}]}>
      <Header
                left='back'
                title={validationStings.searchAddress}
            />
            <View style={{height:LINE_HEIGHT_16}}/>
      <KeyboardAwareScrollView>
         
          <TextInput
            // onTouchStart={() => openAddressModel()}
            placeholder={validationStings.searchLocation}
            placeholderTextColor={colors.primary}
            onChangeText={sourceLocation => onChangeSource(sourceLocation)}
            multiline
            value={state.sourceLocation}
            viewTextStyle={[AppStyles.plainEditTextStyle]}

            ></TextInput>
          {state.sourceLocation ? (
            <TouchableOpacity
              onPress={() => {
                onChangeSource('');
                setState({
                  ...state,
                  sourceLocation: '',
                });
              }}
              style={{flex: 0.1, justifyContent: 'flex-end'}}
              >
               <Image source={images.icClose} style={{height:20,width:20}}/>
            </TouchableOpacity>
          ) : null}
        {state.showSuggestion ? (
          <View
            style={{
              flex: 1,
              zIndex: 1000,
              top: '3.5%',
              width: '100%',
              backgroundColor: 'white',
            }}>
            {predictions}
          </View>
        ) : null}

       
        
      </KeyboardAwareScrollView>
    </View>
  );
};

export default AddressModal;

const styles = StyleSheet.create({
  tileIcon: {
    height: scale(16),
    width: scale(16),
    marginLeft: 0,
  },
  tile: {
    marginHorizontal: moderateScale(12),
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent:'center',
    borderRadius:15,
    borderWidth:1,
    borderColor:colors.lightGray
  },
  searchTextInput: {
    flex: 1,
    height: moderateScale(48),
    fontSize: Typography.normalize(16),
    borderRadius: 0,
    alignItems:'center',
  },
  mapView: {
    width: '100%',
    zIndex: 100,
    height: hp('78%'),
  },
});
