import React, { useState, Fragment } from 'react'
import {
    View,
    Image,
    StyleSheet,
    SafeAreaView,
    FlatList,
    Keyboard,
    ImageBackground
} from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import { colors, screenName, validation, fonts, images,isEmpty,errorToast, validationStings } from '../../utils'
import { Header } from '../../components/molecules';
import { Text, TextInput,Button } from '../../components/atoms'
import { Mixins, AppStyles } from '../../styles';
let { windowWidth, windowHeight, boxShadow, } = Mixins;
import { moderateScale, moderateVerticalScale, scale, verticalScale } from 'react-native-size-matters';
import { changePasswordRequest } from '../../store/modules/profile/action'
import { useDispatch } from 'react-redux';

export const ChangePassword = ({navigation,route}) => {
    let emailField, phoneRef, passwordField, nameField, lastNameField
    const dispatch = useDispatch();

    const [state, setState] = useState({
        oldPassword: '',
        newPassword: '',
        confirmPassword:''
    });
   

    const onSubmit = () => {
      const {oldPassword,newPassword,confirmPassword}=state;
      if(isEmpty(oldPassword.trim())){
          errorToast(validationStings.oldPasswordvalid)
          return false;
      }else if(isEmpty(newPassword.trim())){
        errorToast(validationStings.newPasswordvalid)
        return false;
      }else if(newPassword.length < 8){
        errorToast(validationStings.passwordLengthError)
        return false;
      }
      else if(isEmpty(confirmPassword.trim())){
        errorToast(validationStings.confirmPasswordError)
        return false;
      }else if(newPassword!=confirmPassword){
        errorToast(validationStings.passwordMismatchError)
        return false;
      }else{
        const data={};
         data['oldPassword']=oldPassword;
         data['password']=newPassword;
         data['confirmPassword']=newPassword;
        dispatch(changePasswordRequest(data, navigation))
      }
      }
      
  /********************** Form Functions *************************/

  const handleChange = (value, name) => {
    setState(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

    return (
        <Fragment>
        <SafeAreaView style={{ flex:0, backgroundColor:colors.primary }} />
        <SafeAreaView style={{ flex:1, backgroundColor: colors.white }}>
            <Header
                left='back'
                title={validationStings.changePassword} />
                {/***************Email *********/}
            <ScrollView>
            <Image source={images.icResetPass} style={styles.logoImage} resizeMode={'contain'} />

        <TextInput
          placeholder={validationStings.oldPasswordPlaceholder}
          inputMenthod={input => {
            passwordField = input;
          }}

          placeholderTextColor={colors.primary}
          selectionColor="#96C50F"
          returnKeyType="next"
          keyboardType="default"
          autoCorrect={false}
          secureTextEntry={true}  
          autoCapitalize="none"
          blurOnSubmit={false}
          value={state.oldPassword}
          leftIcon={images.icPassword}

          viewTextStyle={[AppStyles.plainTextStyle, { marginHorizontal: moderateScale(12)}]}
          onFocus={() => handleChange(true, 'emailFieldFocus')}
          onBlur={() => handleChange(false, 'emailFieldFocus')}
          onChangeText={text => handleChange(text, 'oldPassword')}
          underlineColorAndroid="transparent"
          onSubmitEditing={event => {
            Keyboard.dismiss();
          }}
        />
         <TextInput
          placeholder={validationStings.newPasswordPlaceholder}
          inputMenthod={input => {
            passwordField = input;
          }}

          placeholderTextColor={colors.primary}
          selectionColor="#96C50F"
          returnKeyType="next"
          keyboardType="default"
          autoCorrect={false}
          autoCapitalize="none"
          blurOnSubmit={false}
          value={state.newPassword}
          leftIcon={images.icPassword}
          secureTextEntry={true}  

          viewTextStyle={[AppStyles.plainTextStyle, { marginHorizontal: moderateScale(12) }]}
          onFocus={() => handleChange(true, 'emailFieldFocus')}
          onBlur={() => handleChange(false, 'emailFieldFocus')}
          onChangeText={text => handleChange(text, 'newPassword')}
          underlineColorAndroid="transparent"
          onSubmitEditing={event => {
            Keyboard.dismiss();
          }}
        />
         <TextInput
          placeholder={validationStings.confirmPasswordPlaceHolder}
          inputMenthod={input => {
            passwordField = input;
          }}

          placeholderTextColor={colors.primary}
          selectionColor="#96C50F"
          returnKeyType="next"
          keyboardType="default"
          autoCorrect={false}
          autoCapitalize="none"
          blurOnSubmit={false}
          value={state.confirmPassword}
          leftIcon={images.icPassword}
          secureTextEntry={true}  

          viewTextStyle={[AppStyles.plainTextStyle, { marginHorizontal: moderateScale(12) }]}
          onFocus={() => handleChange(true, 'emailFieldFocus')}
          onBlur={() => handleChange(false, 'emailFieldFocus')}
          onChangeText={text => handleChange(text, 'confirmPassword')}
          underlineColorAndroid="transparent"
          onSubmitEditing={event => {
            Keyboard.dismiss();
          }}
        />
              </ScrollView>
              <Button mh={16} text={validationStings.changePassword} color={colors.white} onPress={()=>onSubmit()} bottom={12} />

            
             
        </SafeAreaView>
        </Fragment>
    )
}

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        backgroundColor: colors.white
    },
    contentContainer: {
        flex: 1,
        backgroundColor: colors.white,
    },
    instructionText: {
        color: colors.black,
        fontFamily: fonts.primaryRegular,
        fontSize: 16,
        marginBottom: '2%'
    },
    numberText: {
        color: colors.black,
        fontFamily: fonts.primarySemibold,
        fontSize: 16,
        marginBottom: '5%'
    },
    resend: {
        fontSize: 18,
        fontFamily: fonts.primarySemibold,
        color: colors.red,
        marginTop: '5%'
    },
    scrollWrapper: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: '10%'
    },
    floatingButton: {
        position: 'absolute',
        bottom: 40,
        right: 20
    },
    submitStyle: {
        height: 50,
        width: 50,
        resizeMode: 'contain'
    },
    nextButton: {
      height: moderateVerticalScale(50),
      alignItems: 'center',
      justifyContent: 'center',
      marginVertical: moderateVerticalScale(12),
      marginHorizontal: moderateScale(12)

  },
    signUpText: {
        fontSize: fonts.FONT_SIZE_14,
        fontFamily: fonts.primaryMedium,
        color: colors.lightGray1,
        marginHorizontal: moderateScale(10)
    },
    item: {
       
        justifyContent:'center',
        width: 'auto',
        borderRadius: 12,
        ...boxShadow('black', { height: 1, width: 0 }, 3, 0.2),
        height: 'auto',
        backgroundColor: colors.white,
        marginVertical: 12,
        marginHorizontal: 30,
    },
    itemWrapper: {
        width: '100%',
        paddingHorizontal: '5%',
       
        paddingVertical: '4%'
    },
    itemSubPart: {
        width: '50%'
    },
    itemHeading: {
        fontFamily: fonts.primaryRegular,
        color: colors.shadyText
    },
    itemValue: {
        fontFamily: fonts.primaryRegular,
        fontSize: fonts.FONT_SIZE_14,
        marginHorizontal:moderateScale(12),
        color:colors.lightBlack
    },
    image:{
        height:24,width:24,
        resizeMode:'contain'
    },
    line:{
        height:.5,
        marginLeft:moderateScale(45),
        marginRight:moderateScale(12),
        backgroundColor:colors.lightBlack
    },
    button:{
        height:moderateVerticalScale(50),
        borderRadius:moderateVerticalScale(25),
        backgroundColor:colors.primary,
        marginHorizontal:moderateScale(24),
        alignItems:'center',
        justifyContent:'center'
    },
    welcomeText: {
      fontSize: fonts.FONT_SIZE_18,
      fontFamily: fonts.primaryMedium,
      color: colors.lightBlack,
      padding: moderateScale(14)
  },
  logoImage: {
    height: moderateVerticalScale(120),
    width: moderateScale(120),
    marginVertical: moderateVerticalScale(16),
    alignSelf:'center'
},
})
