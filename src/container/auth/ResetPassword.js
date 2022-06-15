import React, { useState, Fragment } from 'react'
import {
  View,
  StyleSheet,
  Image,
  SafeAreaView,
  Keyboard
} from 'react-native'
import { moderateScale, moderateVerticalScale } from 'react-native-size-matters'
import { colors, fonts, images, validationStings,screenName, isEmpty, errorToast } from '../../utils';
import { AppStyles, Typography } from '../../styles';
import { Text, TextInput, Button } from '../../components/atoms';
import { Header } from '../../components/molecules'
import {useSelector,useDispatch} from 'react-redux';
import {resetPasswordRequest} from '../../store/modules/login/actions';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const ResetPassword = ({ navigation, route }) => {
  const dispatch=useDispatch();
  const [state, setState] = useState({
    password: '',
    confirmPassword:''
  })
  const { forgot={}} = useSelector(state => ({
    forgot: state.loginReducer.forgotPasswordData,
    
}));


  const handleChange = (value, name) => {
    setState(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const resetPassword=()=>{
     const {password,confirmPassword}=state;
     if(isEmpty(password.trim())){
          errorToast(validationStings.newPasswordvalid)
     }else if(isEmpty(confirmPassword.trim())){
      errorToast(validationStings.confirmPasswordError)

     }else{
         const data={};
         data['email']=route.params.data?.email;
         data['password']=password;
         data['confirmPassword']=confirmPassword;
         data['OTP']=route.params.data?.OTP;
         dispatch(resetPasswordRequest(data,navigation));
        }
  }

  const inputView = () => {
    return (
      <View style={styles.loginWrapper}>
        <View style={{ height: moderateVerticalScale(50) }}>
          <TextInput
            placeholder={validationStings.newPasswordPlaceHolder}
            inputMenthod={input => {
              passwordField = input;
            }}
            placeholderTextColor={colors.primary}
            returnKeyType="done"
            keyboardType='email-address'
            autoCorrect={false}
            autoCapitalize="none"
            blurOnSubmit={false}
            leftIcon={images.icPassword}
            value={state.password}
            viewTextStyle={[AppStyles.plainEditTextStyle]}
            onChangeText={text => handleChange(text, 'password')}
            underlineColorAndroid="transparent"

            onSubmitEditing={event => {
              Keyboard.dismiss();
            }}
          />
        </View>
        <View style={{ height: Typography.LINE_HEIGHT_24 }} />

        <View style={{ height: moderateVerticalScale(50) }}>
          <TextInput
            placeholder={validationStings.confirmPasswordPlaceHolder}
            inputMenthod={input => {
              passwordField = input;
            }}
            placeholderTextColor={colors.primary}
            returnKeyType="done"
            keyboardType='email-address'
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
        <View style={{ height: Typography.LINE_HEIGHT_48 }} />
       
         {/* Next button */}
        <Button onPress={()=>resetPassword()} text={validationStings.next} color={colors.white} />


        

       
      </View>
    )

  }

  return (
    <Fragment>
    <SafeAreaView style={styles.main} />
    <SafeAreaView style={styles.container}>

        <Header
         left={'back'}
         title={validationStings.resetPasswordHeader}
        /> 
            <KeyboardAwareScrollView contentContainerStyle={{paddingTop:30}}>

      <View style={styles.logoStyle}>
        <Image source={images.icResetPassword} style={styles.logoImage} resizeMode={'contain'} />
        <Text h6={true} color={colors.primary} textAlign={'center'} >{validationStings.resetYour}</Text>
        <Text h7={true} color={colors.primary} textAlign={'center'} style={{marginVertical:12,fontFamily:fonts.primaryMedium}}>{validationStings.newPasswordDiff}</Text>
      </View> 
    {inputView()}
    </KeyboardAwareScrollView>
    </SafeAreaView>
    </Fragment>
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
    marginHorizontal:moderateScale(24)
  },
  main: {
    flex: 0,
    backgroundColor: colors.primary
},
container: {
    flex: 1,
    backgroundColor: colors.white
},
  logoImage: {
    height: moderateVerticalScale(120),
    width: moderateScale(120),
    marginVertical: moderateVerticalScale(16)
  },
  loginWrapper: {
    flex: .45,
    paddingTop: '4%',
    paddingHorizontal: '5%',
  },
  forgotPassword: {
    alignSelf: 'flex-end',
     marginVertical: moderateVerticalScale(6)
  },
 
  
})
export default ResetPassword;