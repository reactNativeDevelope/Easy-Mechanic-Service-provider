import React, { useState, useEffect } from 'react'
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Platform,
  Keyboard,
  Alert
} from 'react-native'
import { moderateScale, moderateVerticalScale, scale, verticalScale } from 'react-native-size-matters'
import { colors, fonts, images, validationStings, screenName, errorToast, successToast, isEmpty, showLoader, hideLoader } from '../../utils';
import { AppStyles, Typography, Mixins } from '../../styles';
import { Text, TextInput, Button } from '../../components/atoms';
import { Header } from '../../components/molecules'
let { windowWidth } = Mixins;
import { ScrollView } from 'react-native-gesture-handler';
import Modal from 'react-native-modal';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker'
import ImageResizer from 'react-native-image-resizer';
import CountryPicker, { Flag } from 'react-native-country-picker-modal';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import {resendOtpRequest} from '../../store/modules/login/actions';
const Register = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const [state, setState] = useState({
    name: route.params?.payload?.firstName != undefined ? route.params?.payload?.firstName + ' ' + route.params?.payload?.lastName : '',
    email: route.params?.payload?.email != undefined ? route.params?.payload?.email : '',
    location: {},
    address: '',
    phoneNumber: '',
    dob: '',
    password: '',
    confirmPassword: '',
    profileImage: '',
    countryCode: '+1',
    countryName: 'US',
    license:'',
    bio:''
  })
  const [isActionsRequired, setIsActionsRequired] = useState(false);
  const [visible, setVisible] = useState(false);
  const [startingDate, setStartingDate] = useState(new Date());
  const [finishingDate, setFinishingDate] = useState(new Date());
  const [dateType, setDateType] = useState('');
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [showIos, setShowIos] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [fileType, setFileType] = useState('profile');
  const [check, setCheck] = useState(false);
  const [eye, setEye] = useState(true);
  const [eye1, setEye1] = useState(true);


  /**********Select Country */
  const onSelect = country => {
    setState(prevState => ({
      ...prevState,
      ['countryCode']: '+' + country.callingCode,
      ['countryName']: country.cca2,
    }));
    setVisible(false);
  };

  const handleChange = (value, name) => {
    setState(prevState => ({
      ...prevState,
      [name]: value
    }));
  };


  /* Date time picker */
  const onChange = (event, selectedDate) => {
    console.log(dateType, selectedDate)
    const currentDate = selectedDate;
    if (Platform.OS === 'android') { setShow(false) }
    // Set date time
    dateType === 'start'
      ? handleChange(moment(currentDate).format('MM/DD/YYYY'), 'dob')
      : setFinishingDate(currentDate);
  };


  const showDatePicker = () => {
    setShow(true);
  };

  const hideDatePicker = () => {
    setShow(false);
  };

  const handleConfirm = (date) => {
  handleChange(moment(date).format('YYYY-MM-DD'), 'dob')
  hideDatePicker();
  };
  

  const pickFromGallery = () => {
    try {
      launchImageLibrary({ mediaType: 'photo', cameraType: 'back' }, (response) => {
        if (response.didCancel) {
          // console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
          // console.log('User tapped custom button: ', response.customButton);
        } else {
          setIsActionsRequired(false);
          resize(response.assets[0].uri);
          // this.saveImage(source);
        }
      });
    } catch (error) {
      console.log(error);
    }

  };
  const pickFromCamera = () => {

    try {
      launchCamera({ mediaType: 'photo', cameraType: 'back' }, (response) => {
        if (response.didCancel) {
          // console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
          // console.log('User tapped custom button: ', response.customButton);
        } else {
          setIsActionsRequired(false)
          resize(response.assets[0].uri);
          // this.saveImage(source);
        }
      });
    } catch (error) {
      console.log(error);
    }
  }
  //Resize Image
  const resize = sourceURI => {
    ImageResizer.createResizedImage(sourceURI, 300, 300, 'PNG', 80)
      .then(({ uri }) => {
        const source = {
          uri: uri,
          imageName: 'profile',
        };
        if(fileType =='profile'){
          setState(prevState => ({
            ...prevState,
            profileImage: uri
          }));
        }else{
          setState(prevState => ({
            ...prevState,
            license: uri
          }));
        }
      
      })
      .catch(err => {
        console.log(err);
        return Alert.alert(
          'Unable to upload photo',
          // 'Check the console for full the error message',
        );
      });
  };

  /******************Address Picker ************** */
  const setHandleAddress = (address, location) => {
    console.log(location);
    setState(prevState => ({
      ...prevState,
      ['address']: address,
      ['location']: location,
    }));
  };

  const Register = async () => {
    const {bio, name, email, phoneNumber, password, confirmPassword, address, location, countryCode, profileImage, dob,license } = state;

    // if (isEmpty(profileImage.trim())) {
    //   errorToast(validationStings.profileImageError);
    //   return;
    // }
    
     if (isEmpty(name.trim())) {
      errorToast(validationStings.nameError);
      return;
    } 
    // else if (isEmpty(email.trim())) {
    //   errorToast(validationStings.emailError);
    //   return;
    // } 
    else if (isEmpty(phoneNumber.trim())) {
      errorToast(validationStings.phoneNumberError);
      return;
    } else if (isEmpty(password.trim())) {
      errorToast(validationStings.passwordError);
      return;
    } else if (isEmpty(confirmPassword.trim())) {
      errorToast(validationStings.confirmPasswordError);
      return;
    } else if (password != confirmPassword) {
      errorToast(validationStings.passwordMismatchError);
      return;
    }
    else if (password != confirmPassword) {
      errorToast(validationStings.passwordMismatchError);
      return;
    } else if (isEmpty(address)) {
      errorToast(validationStings.locationError);
      return;
    } else if (isEmpty(dob)) {
      errorToast(validationStings.dobError);
      return;
    }else if (!check) {
      errorToast(validationStings.termsValid);
      return;
    }
    // if (isEmpty(license.trim())) {
    //   errorToast(validationStings.licenseImageError);
    //   return;
    // } 
    
    else {
      setIsLoading(true);
      const data = {
        name:name,
        email:email,
        mobileNumber:phoneNumber,
        dialCode:countryCode,
        password:password,
        address:address,
        latitude:location.lat,
        longitude:location.lng,
        profileImage:profileImage,
        license:license,
        bio:bio
      };
      const data1={};
      data1['mobileNumber']=phoneNumber;
      data1['dialCode']=countryCode;
      dispatch(resendOtpRequest(data1,((cb=>{
        console.log('sebd otp--',cb);
        navigation.navigate(screenName.verifyOtp, { screenType: 'register',data:data })

      })),navigation))
      

    }
  }

  const onPressTerms=()=>{
    navigation.navigate(screenName.terms);
  }

  const inputView = () => {
    let ext = /[^.]+$/.exec(state.license);
    return (
      <View style={styles.loginWrapper}>
        <View style={styles.profileImageView}>
          <TouchableOpacity
            onPress={() => setIsActionsRequired(true)}
            activeOpacity={.7}
            hitSlop={{ bottom: 10 }}
          >
            <Image
              style={styles.profileImage}
              source={state?.profileImage != null && state?.profileImage != undefined && state?.profileImage != '' ? { uri: state.profileImage } : images.icMan}
            />
            <Image
              style={styles.editprofilePic}
              source={images.icCamera}
              resizeMode='contain'
            />
          </TouchableOpacity>
        </View>
         <View style={{height:30}}/>
        <View style={{ height: moderateVerticalScale(50) }}>
          <TextInput
            placeholder={validationStings.fullNamePlaceholder}
            inputMenthod={input => {
              passwordField = input;
            }}
            placeholderTextColor={colors.primary}
            returnKeyType="done"
            keyboardType='default'
            autoCorrect={false}
            autoCapitalize="none"
            blurOnSubmit={false}
            leftIcon={images.icUser}
            value={state.name}
            viewTextStyle={[AppStyles.plainEditTextStyle]}
            onChangeText={text => handleChange(text, 'name')}
            underlineColorAndroid="transparent"

            onSubmitEditing={event => {
              Keyboard.dismiss();
            }}
          />
        </View>
        <View style={{ height: Typography.LINE_HEIGHT_16 }} />

        <View style={{ height: moderateVerticalScale(50) }}>
          <TextInput
            placeholder={validationStings.emailPlaceholder}
            inputMenthod={input => {
              passwordField = input;
            }}
            placeholderTextColor={colors.primary}
            returnKeyType="done"
            keyboardType='email-address'
            autoCorrect={false}
            autoCapitalize="none"
            blurOnSubmit={false}
            leftIcon={images.icEmail}
            value={state.email}
            viewTextStyle={[AppStyles.plainEditTextStyle]}
            onChangeText={text => handleChange(text, 'email')}
            underlineColorAndroid="transparent"
            onSubmitEditing={event => {
              Keyboard.dismiss();
            }}
          />
        </View>
        <View style={{ height: Typography.LINE_HEIGHT_16 }} />

        <View
          style={styles.phoneInput}>
          <TouchableOpacity
            onPress={() => setVisible(true)}
            style={{
              flex: windowWidth > 360 ? 0.35 : 0.3,
              flexDirection: 'row',
            }}>
            <Flag
              countryCode={state.countryName}
              flagSize={18}
              style={{ marginTop: -10 }}
              resizeMode='cover'
            />
            <Text style={[AppStyles.signUpcountryText, { color: colors.primary }]}>
              {state.countryCode}{' '}
            </Text>
            <Image
              source={images.selectnumber}
              style={[AppStyles.signUpselectnumber, {}]}
            />
          </TouchableOpacity>

          <View
            style={[
              AppStyles.signUpphoneInput,
              {
                bottom: 0,
                height: '100%',
              },
            ]}></View>

          <TextInput
            inputMenthod={input => {
              phoneRef = input;
            }}

            initialCountry={state.countryName}
            returnKeyType={'done'}
            value={state.phoneNumber}
            placeholder={validationStings.phoneNumberPlaceholder}
            keyboardType={'numeric'}
            viewTextStyle={[AppStyles.plainEditTextStyle, { borderBottomWidth: 0 }]}
            placeholderTextColor={colors.primary}

            onChangeText={text => handleChange(text, 'phoneNumber')}
            offset={scale(28)}
          />
        </View>

        <View style={{ height: Typography.LINE_HEIGHT_16 }} />

        <View style={{ height: moderateVerticalScale(50) }}>
          <TextInput
            placeholder={validationStings.passwordPlaceholder}
            inputMenthod={input => {
              passwordField = input;
            }}
            placeholderTextColor={colors.primary}
            returnKeyType="done"
            autoCorrect={false}
            autoCapitalize="none"
            blurOnSubmit={false}
            leftIcon={images.icPassword}
            secureTextEntry={eye1}
            rightIcon={eye1? images.icHide:images.icShow}
            rightIconPress={()=>setEye1(!eye1)}
            value={state.password}
            viewTextStyle={[AppStyles.plainEditTextStyle]}
            onChangeText={text => handleChange(text, 'password')}
            underlineColorAndroid="transparent"

            onSubmitEditing={event => {
              Keyboard.dismiss();
            }}
          />
        </View>
        <View style={{ height: Typography.LINE_HEIGHT_16 }} />

        <View style={{ height: moderateVerticalScale(50) }}>
          <TextInput
            placeholder={validationStings.confirmPasswordPlaceHolder}
            inputMenthod={input => {
              passwordField = input;
            }}
            placeholderTextColor={colors.primary}
            returnKeyType="done"
            secureTextEntry={eye}
            rightIcon={eye? images.icHide:images.icShow}
            rightIconPress={()=>setEye(!eye)}
            autoCorrect={false}
            autoCapitalize="none"
            blurOnSubmit={false}
            leftIcon={images.icPassword}
            value={state.confirmPassword}
            viewTextStyle={[AppStyles.plainEditTextStyle]}
            onChangeText={text => handleChange(text, 'confirmPassword')}
            underlineColorAndroid="transparent"

            onSubmitEditing={event => {
              Keyboard.dismiss();
            }}
          />
        </View>
        <View style={{ height: Typography.LINE_HEIGHT_16 }} />

        <View style={{ height: moderateVerticalScale(50) }}>
          <TextInput
            placeholder={validationStings.locationPlaceHolder}
            inputMenthod={input => {
              passwordField = input;
            }}
            returnKeyType="next"
            onPress={() =>
              navigation.navigate(screenName.addressModel, {
                address: state.location,
                setHandleAddress: (address, placeId, location, city) =>
                  setHandleAddress(address, placeId, location, city),
              })
            }
            //leftIcon={images.iclocation}
            multiline
            keyboardType="default"
            autoCorrect={false}
            value={state.address}
            onTouchStart={() =>
              navigation.navigate(screenName.addressModel, {
                address: state.location,
                setHandleAddress: (address, placeId, location, city) =>
                  setHandleAddress(address, placeId, location, city),
              })
            }
            autoCapitalize="none"
            placeholderTextColor={colors.primary}
            blurOnSubmit={false}
            leftIcon={images.icNavigation}
            viewTextStyle={[AppStyles.plainEditTextStyle]}
            onChangeText={text => handleChange(text, 'address')}
            underlineColorAndroid="transparent"

            onSubmitEditing={event => {
              Keyboard.dismiss();
            }}
          />
        </View>
        <View style={{ height: Typography.LINE_HEIGHT_16 }} />

        <View style={{ height: moderateVerticalScale(50) }}>
          <TextInput
            placeholder={validationStings.dobPlaceholder}
            inputMenthod={input => {
              passwordField = input;
            }}
            onTouchStart={()=>showDatePicker()}
            onPress={()=>showDatePicker()}
            placeholderTextColor={colors.primary}
            returnKeyType="done"
            editable={false}
            autoCorrect={false}
            autoCapitalize="none"
            blurOnSubmit={false}
            leftIcon={images.icdob}
            value={state.dob}
            viewTextStyle={[AppStyles.plainEditTextStyle]}
            onChangeText={text => handleChange(text, 'dob')}
            underlineColorAndroid="transparent"

            onSubmitEditing={event => {
              Keyboard.dismiss();
            }}
          />
          
        </View>
        <View style={{ height: moderateVerticalScale(50) }}>
          <TextInput
            placeholder={`Bio`}
            inputMenthod={input => {
              passwordField = input;
            }}
            placeholderTextColor={colors.primary}
            returnKeyType="done"
           // secureTextEntry={true}
            autoCorrect={false}
            //autoCapitalize="none"
            blurOnSubmit={false}
            leftIcon={images.icAboutus}
            value={state.bio}
            viewTextStyle={[AppStyles.plainEditTextStyle]}
            onChangeText={text => handleChange(text, 'bio')}
            underlineColorAndroid="transparent"

            onSubmitEditing={event => {
              Keyboard.dismiss();
            }}
          />
        </View>
        <View style={{ height: Typography.LINE_HEIGHT_16 }} />

        <View style={{ height: moderateVerticalScale(50) }}>
          <TextInput
            placeholder={validationStings.updateLicensePlaceholder}
            inputMenthod={input => {
              passwordField = input;
            }}
            // onTouchStart={() => {
            //   setIsActionsRequired(true);
            //   setFileType('license')
            // }}
            onPress={() => {
              setIsActionsRequired(true);
              setFileType('license')
            }}
            placeholderTextColor={colors.primary}
            returnKeyType="done"
            editable={false}
            autoCorrect={false}
            autoCapitalize="none"
            blurOnSubmit={false}
            leftIcon={images.icFile}
            value={state.license!=''?`license.${ext}`:state.license}
            viewTextStyle={[AppStyles.plainEditTextStyle]}
            onChangeText={text => handleChange(text, 'license')}
            underlineColorAndroid="transparent"

            onSubmitEditing={event => {
              Keyboard.dismiss();
            }}
          />
        </View>
        <View style={{ height: Typography.LINE_HEIGHT_48 }} />

        {/* Next button */}
        <View style={styles.terms}>
          <TouchableOpacity onPress={() => setCheck(!check)}>
            <Image source={check ? images.icCheck : images.icUncheck} style={styles.checkUncheck} resizeMode={'contain'} />
          </TouchableOpacity>
          <Text style={styles.baseText}>
            {validationStings.terms}
            <Text onPress={()=>onPressTerms()} style={styles.innerText}>{validationStings.conditions}</Text>
          </Text>
          
        </View>
        <View style={{ height: Typography.LINE_HEIGHT_16 }} />
        <Button onPress={() => Register()} text={validationStings.next} color={colors.white}  />
      </View>
    )
  }



  const openImagePicker = () => {
    return (
      <Modal isVisible={isActionsRequired} animationIn='fadeIn'>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

          <View style={{ justifyContent: 'center', width: '100%', height: '20%', width: '90%', backgroundColor: 'white', paddingVertical: moderateVerticalScale(14), borderRadius: 6 }}>
            <TouchableOpacity onPress={() => setIsActionsRequired(false)} hitSlop={{ left: 24, right: 24, top: 24, bottom: 24 }} style={{ position: 'absolute', top: 12, left: 12 }}>
              <Image source={images.icRemove} style={{ height: 24, width: 24 }} />
            </TouchableOpacity>
            <View style={{ height: 24 }} />
            <View style={{ alignItems: 'center', justifyContent: 'space-evenly', flexDirection: 'row', width: '100%' }}>
              <TouchableOpacity onPress={() => pickFromCamera()}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                  <Image source={images.icCam} style={{ height: 24, width: 24 }} />
                  <Text style={[styles.msgText, { marginHorizontal: 9 }]}>{validationStings.camera}</Text>
                </View>
              </TouchableOpacity>

              <View style={{ height: 40, width: 1, backgroundColor: colors.primary }} />
              <TouchableOpacity onPress={() => pickFromGallery()} >
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                  <Image source={images.icGallery} style={{ height: 24, width: 24 }} />
                  <Text style={[styles.msgText, { marginHorizontal: 9 }]}>{validationStings.gallery}</Text>
                </View>
              </TouchableOpacity>
            </View>

          </View>
        </View>
      </Modal>
    )
  }

  const renderDateTimeModal = () => {
    return (
      <Modal
        isVisible={true}
        onBackdropPress={() => setShowIos(false)}
      >
        <DateTimePicker
          style={{
            backgroundColor: colors.white,
          }}
          testID="dateTimePicker"
          value={dateType === 'start' ? startingDate : finishingDate}
          mode={mode}
          //is24Hour={true}
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={onChange}
        />
      </Modal>
    )
  }


  return (
    <View style={styles.mainView}>
      <Header
        title={validationStings.signup}
      />
      {/* {showIos && renderDateTimeModal()}
      {show && (<DateTimePicker
        testID="dateTimePicker"
        value={date}
        mode={mode}
        // is24Hour={true}
        display="default"
        onChange={onChange}
      />)} */}
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }} showsVerticalScrollIndicator={false}>
        {inputView()}
      </ScrollView>
      {isActionsRequired ? openImagePicker() : null}
      {visible && (
        <CountryPicker
          {...{
            onSelect,
          }}
          withFilter
          ref={ref => (countryRef = ref)}
          onClose={() => setVisible(false)}
          containerButtonStyle={{ marginTop: 8 }}
          visible={visible}
        />
      )}
      <DateTimePickerModal
        isVisible={show}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        maximumDate={new Date()}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: colors.white
  },
  logoStyle: {
    flex: .55,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: moderateScale(24)
  },
  logoImage: {
    height: moderateVerticalScale(120),
    width: moderateScale(120),
    marginVertical: moderateVerticalScale(16)
  },
  loginWrapper: {
    height: 'auto',
    paddingTop: '4%',
    paddingHorizontal: '5%',
    zIndex: 100
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginVertical: moderateVerticalScale(6)
  },
  profileImage: {
    height: 100,
    width: 100,
    borderRadius: 50,
    borderColor: colors.itemBackground,
    borderWidth: 5,
  },
  editprofilePic: {
    height: 20,
    width: 20,
    position: 'absolute',
    zIndex: 100,
    bottom: 40,
    right: Platform.OS === 'ios' ? -5 : 0
  },
  profileImageView: {
    marginTop: moderateVerticalScale(25),
    alignSelf: 'center',
    zIndex: 1000
  },
  phoneInput: {
    height: moderateScale(55),
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingHorizontal: verticalScale(8),
    borderBottomWidth: 2,
    borderBottomColor: colors.primary,
  },
  baseText: {
    fontFamily: fonts.primaryMedium,
    fontSize: fonts.FONT_SIZE_14,
    color: colors.black,
    paddingLeft:12
  },
  innerText: {
    fontFamily: fonts.primaryMedium,
    fontSize: fonts.FONT_SIZE_14,
    color: colors.primary,
  },
  terms: {
    flexDirection: 'row',
    alignItems: 'center',

  },
  checkUncheck: {
    height: 18,
    width: 18
  },
})
export default Register;