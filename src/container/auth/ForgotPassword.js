import React, { useState, Fragment } from 'react'
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Keyboard,
  SafeAreaView
} from 'react-native'
import { moderateScale, moderateVerticalScale,verticalScale,scale } from 'react-native-size-matters'
import { colors, fonts, images, validationStings,screenName,errorToast,isEmpty } from '../../utils';
import { AppStyles, Typography,Mixins } from '../../styles';
let { windowWidth } = Mixins;

import { Text, TextInput, Button } from '../../components/atoms';
import { Header } from '../../components/molecules'
import {useDispatch} from 'react-redux';
import {forgotPasswordRequest} from '../../store/modules/login/actions';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import CountryPicker, { Flag } from 'react-native-country-picker-modal';
const ForgotPassword = ({ navigation, route }) => {
   const dispatch=useDispatch();
  const [state, setState] = useState({
    email: '',
    countryCode: '+1',
    countryName: 'US',
    phoneNumber:''
  })
  const [visible, setVisible] = useState(false);

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

  const forgotPassword=()=>{
      const {email,phoneNumber,countryCode}=state;
      if (isEmpty(email.trim()) && isEmpty(phoneNumber.trim()) ) {
        errorToast(validationStings.emailError);
        return;
  
      }else{
          const data={};
           data['email']=email;
           dispatch(forgotPasswordRequest(data,navigation));
      }
  }

  const inputView = () => {
    return (
      <View style={styles.loginWrapper}>
       
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
        <Text  style={{fontSize:fonts.FONT_SIZE_14,marginVertical:4,alignSelf:'center'}}>
              {`OR`}
            </Text>
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
        <View style={{ height: Typography.LINE_HEIGHT_24 }} />
       
         {/* Next button */}
        <Button onPress={()=>forgotPassword()} text={validationStings.next} color={colors.white} />


        

       
      </View>
    )

  }

  return (
    <Fragment>
            <SafeAreaView style={styles.main} />
            <SafeAreaView style={styles.container}>

        <Header
         left={'back'}
         title={validationStings.forgotPassword}
        /> 
      <KeyboardAwareScrollView style={{flex:1}}>

      <View style={styles.logoStyle}>
        <Image source={images.icForgotPassword} style={styles.logoImage} resizeMode={'contain'} />
        <Text h6={true} color={colors.primary} textAlign={'center'} >{validationStings.resetPassword}</Text>
        <Text h7={true} color={colors.primary} textAlign={'center'} style={{marginVertical:12,fontFamily:fonts.primaryMedium}}>{validationStings.enterEmail}</Text>
      </View> 
    {inputView()}
    </KeyboardAwareScrollView>

   </SafeAreaView>
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
   </Fragment>
  )
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: colors.white
  },
  main: {
    flex: 0,
    backgroundColor: colors.primary
},
container: {
    flex: 1,
    backgroundColor: colors.white
},
  logoStyle: {
    flex: .8,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal:moderateScale(24)
  },
  logoImage: {
    height: moderateVerticalScale(120),
    width: moderateScale(120),
    marginVertical: moderateVerticalScale(16)
  },
  loginWrapper: {
    flex: .2,
    paddingTop: '4%',
    paddingHorizontal: '5%',
  },
  forgotPassword: {
    alignSelf: 'flex-end',
     marginVertical: moderateVerticalScale(6)
  },
  phoneInput: {
    height: moderateScale(46),
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingHorizontal: verticalScale(8),
    borderBottomWidth: 2,
    borderBottomColor: colors.primary,
  },
  
})
export default ForgotPassword;