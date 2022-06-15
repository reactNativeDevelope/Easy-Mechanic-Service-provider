import React, { useState, useEffect } from 'react'
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Keyboard
} from 'react-native'
import { moderateScale, moderateVerticalScale,verticalScale,scale } from 'react-native-size-matters'
import { colors, images, screenName, validationStings, errorToast, isEmpty, fonts, } from '../../utils';
import { AppStyles, Typography,Mixins } from '../../styles';
import { Text, TextInput, Button } from '../../components/atoms';
import { useDispatch } from 'react-redux';
let { windowWidth } = Mixins;

import { loginRequest } from '../../store/modules/login/actions';
import CountryPicker, { Flag } from 'react-native-country-picker-modal';
// import { LoginManager,GraphRequest,GraphRequestManager } from "react-native-fbsdk-next";
// import { GoogleSignin } from '@react-native-google-signin/google-signin';
// import { appleAuth } from '@invertase/react-native-apple-authentication';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const Login = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const [state, setState] = useState({
    email: '',
    password: '',
    countryCode: '+1',
    countryName: 'US',
    phoneNumber:''
  })
  const [check, setCheck] = useState(false);
  const [eye,setEye]=useState(true)
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // GoogleSignin.configure({
    //   webClientId: '885690304552-581jhticuf2vba8ojbgkd9bu2b75v5n4.apps.googleusercontent.com'
    // });

  }, [])


  /**********Select Country */
  const onSelect = country => {
    setState(prevState => ({
      ...prevState,
      ['countryCode']: '+' + country.callingCode,
      ['countryName']: country.cca2,
    }));
    setVisible(false);
  };

  //   const googleLogin = async () => {
  //     try {
  //         await GoogleSignin.hasPlayServices();
  //         const userInfo = await GoogleSignin.signIn();
  //         const payload = {
  //           googleId: userInfo.user.id,
  //           firstName:userInfo.user.givenName,
  //           lastName:userInfo.user.familyName,
  //           email:userInfo.user.email,
  //           socialLogin:true
  //       }
  //       const data={};
  //       data['email']=userInfo.user.email;
  //       // data['phoneNo']='';
  //       // data['countryCode']='';
  //  //dispatch(existUserRequest(data,payload,navigation));
  //       navigation.navigate(screenName.register,{payload})
  //     } catch (error) {
  //       console.log(error);
  //         if (error.code === statusCodes.SIGN_IN_CANCELLED) {
  //             // user cancelled the login flow
  //         } else if (error.code === statusCodes.IN_PROGRESS) {
  //             // operation (e.g. sign in) is in progress already
  //         } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
  //             // play services not available or outdated
  //         } else {
  //             // some other error happened
  //         }
  //     }
  // };

  const handleChange = (value, name) => {
    setState(prevState => ({
      ...prevState,
      [name]: value
    }));
  };


  // /********************** Social login ********************/

  //    const facebookLogin = () => {
  //     LoginManager.logInWithPermissions([
  //         'email',
  //         'public_profile',
  //         // 'user_friends',
  //     ]).then(
  //         (result) => {
  //             if (result.isCancelled) {
  //             } else {
  //                 const responseInfoCallback = async (error, result) => {
  //                     if (error) {
  //                         console.log(error);
  //                     } else {
  //                         console.log('FB user data====', result);
  //                         const payload = {
  //                             facebookId: result.id,
  //                             firstName:result.first_name,
  //                             lastName:result.last_name,
  //                             email:result.email,
  //                             socialLogin:true
  //                         }
  //                         const data={};
  //                         data['email']=result.email;
  //                         // data['phoneNo']='000000000';
  //                         // data['countryCode']='+01';
  //                        // dispatch(existUserRequest(data,payload,navigation));
  //                         navigation.navigate(screenName.register,{payload})
  //                     }
  //                 };
  //                 const request = new GraphRequest(
  //                     '/me',
  //                     {
  //                         parameters: {
  //                             fields: {
  //                                 string: 'email,name,first_name,last_name,id',
  //                             },
  //                         },
  //                     },
  //                     responseInfoCallback,
  //                 );
  //                 new GraphRequestManager().addRequest(request).start();
  //             }
  //         },
  //         (error) => {
  //             console.log('Login fail with error: ' + error);
  //         },
  //     );
  // };



  // const appleLogin = async () => {
  //   try {
  //     const appleAuthRequestResponse = await appleAuth.performRequest({
  //       requestedOperation: appleAuth.Operation.LOGIN,
  //       requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
  //     });

  //     console.log("appleAuthRequestResponse", appleAuthRequestResponse);
  //     const {
  //       user,
  //       fullName: { givenName, familyName },
  //     } = appleAuthRequestResponse;
  //     const payload = {
  //       appleId:user,
  //       firstName:givenName,
  //       lastName:familyName,
  //       email:appleAuthRequestResponse?.email,
  //       socialLogin:true
  //   }
  //    const data={};
  //         data['email']=appleAuthRequestResponse?.email;
  //         // data['phoneNo']='000000000';
  //         // data['countryCode']='+01';
  //    //dispatch(existUserRequest(data,navigation));
  //  navigation.navigate(screenName.signUp,{payload})
  //     // const payload = {
  //     //   aid: user,
  //     //   name: `${givenName ?? ""} ${familyName ?? ""}`,
  //     //   email: appleAuthRequestResponse?.email ?? "",
  //     //   firebaseToken: "none",
  //     // };
  //     //dispatch(socialLoginRequest(payload, props.navigation));
  //   } catch (error) {
  //     console.log("Apple Auth Error", error);
  //   }
  // };

  const onPressTerms=()=>{
    navigation.navigate(screenName.terms);
  }


  const login = () => {
    const { email, password ,phoneNumber,countryCode} = state;
    if (isEmpty(email.trim())) {
      errorToast(`Email or phone number is required`);
      return;

    } else if (isEmpty(password.trim())) {
      errorToast(validationStings.passwordError);
      return;
    }else if (!check) {
      errorToast(validationStings.termsValid);
      return;
    }
     else {
      const data = {};
      data['email'] = email!=''?email:phoneNumber;
      data['dialCode'] = countryCode;
      data['password'] = password;
      dispatch(loginRequest(data, navigation));
    }
  }
  const inputView = () => {
    return (
      <View style={styles.loginWrapper}>
        {/* <Text  style={{fontSize:fonts.FONT_SIZE_14,marginVertical:4}}>
              {`Email:`}
            </Text> */}
        <View style={{ height: moderateVerticalScale(30) }}>
        
          <TextInput
            placeholder={`Email or Phone number`}
            inputMenthod={input => {
              passwordField = input;
            }}
            placeholderTextColor={colors.primary}
            returnKeyType="done"
            keyboardType='default'
            autoCorrect={false}
            autoCapitalize="none"
            blurOnSubmit={false}
            leftIcon={images.icContact}
            value={state.email}
            viewTextStyle={[AppStyles.plainEditTextStyle]}
            onChangeText={text => handleChange(text, 'email')}
            underlineColorAndroid="transparent"

            onSubmitEditing={event => {
              Keyboard.dismiss();
            }}
          />
        </View>
        <View style={{ height: Typography.LINE_HEIGHT_20 }} />
        {/* <Text  style={{fontSize:fonts.FONT_SIZE_14,marginVertical:4,alignSelf:'center'}}>
              {`OR`}
            </Text> */}
        {/* <View
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
        </View> */}
        <View style={{ height: Typography.LINE_HEIGHT_16 }} />

        {/***************Password*********/}
        <View style={{ height: moderateVerticalScale(50) }}>
          <TextInput
            inputMenthod={input => {
              passwordField = input;
            }}
            placeholder={validationStings.passwordPlaceholder}
            secureTextEntry={eye}
            placeholderTextColor={colors.primary}
            returnKeyType="done"
            keyboardType="default"
            autoCorrect={false}
            autoCapitalize="none"
            blurOnSubmit={false}
            leftIcon={images.icPassword}
            value={state.password}
            rightIcon={eye? images.icHide:images.icShow}
            rightIconPress={()=>setEye(!eye)}
            viewTextStyle={[AppStyles.plainEditTextStyle]}
            onChangeText={text => handleChange(text, 'password')}
            underlineColorAndroid="transparent"
            onSubmitEditing={event => {
              Keyboard.dismiss();
            }}
          />
        </View>
        <View style={{ height: Typography.LINE_HEIGHT_16 }} />

        <TouchableOpacity onPress={() => navigation.navigate(screenName.forgotPassword)} style={styles.forgotPassword}>
          <Text h7={true} style={{ fontWeight: 'bold' }}>
            {validationStings.forgotPasswordLogin}
          </Text>
        </TouchableOpacity>
        <View style={{ height: Typography.LINE_HEIGHT_16 }} />

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
        {/* Login button */}
        <Button onPress={() => login()} text={validationStings.login} color={colors.white} />


      

        <View style={[styles.orViewWrapper]}>
          <Text h7>{validationStings.dontAc}</Text>
          <Text onPress={() => navigation.navigate(screenName.register)}  h7={true} style={{ fontWeight: 'bold' }}>{validationStings.signup}</Text>

        </View>
      </View>
    )

  }

  return (

    <View style={styles.mainView}>
          <KeyboardAwareScrollView contentContainerStyle={{paddingTop:30,paddingBottom:60}}>
          <View style={{ height: Typography.LINE_HEIGHT_20 }} />
          <View style={{ height: Typography.LINE_HEIGHT_20 }} />

      <View style={styles.logoStyle}>
        <Image source={images.icLogo} style={styles.logoImage} resizeMode={'contain'} />
        <Text h3={true} color={colors.primary} style={{ marginVertical: 12, fontWeight: 'bold' }}>{validationStings.easyMech}</Text>
        <Text h6={true} color={colors.primary} style={{ marginVertical: 12, fontWeight: 'bold' }}>{validationStings.loginContinue}</Text>
      </View>
      {inputView()}
      </KeyboardAwareScrollView>
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
    </View>
  )
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: colors.white
  },
  logoStyle: {
    flex: .41,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoImage: {
    height: moderateVerticalScale(120),
    width: moderateScale(120),
    marginVertical: moderateVerticalScale(16)
  },
  loginWrapper: {
    flex: .51,
    paddingTop: '4%',
    paddingHorizontal: '5%',
  },
  forgotPassword: {
    alignSelf: 'flex-end', marginVertical: moderateVerticalScale(6),
    fontWeight: 'bold'
  },
  buttonView: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginVertical: moderateVerticalScale(24),
  },
  socialbutton: {
    height: 50,
    width: 50,
    resizeMode: 'contain',
  },
  orViewWrapper: {
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'center',
    top: 1,
    marginVertical:6
  },
  terms: {
    flexDirection: 'row',
    alignItems: 'center',

  },
  checkUncheck: {
    height: 18,
    width: 18
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
  }, phoneInput: {
    height: moderateScale(46),
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingHorizontal: verticalScale(8),
    borderBottomWidth: 2,
    borderBottomColor: colors.primary,
  },
})
export default Login;