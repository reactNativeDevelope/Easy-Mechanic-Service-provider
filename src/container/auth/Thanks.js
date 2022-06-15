import React, { useState, useEffect } from 'react'
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity
} from 'react-native'
import { moderateScale, moderateVerticalScale } from 'react-native-size-matters'
import { colors, fonts, images, validationStings,screenName } from '../../utils';
import { AppStyles, Typography } from '../../styles';
import { Text, TextInput, Button } from '../../components/atoms';
import { Header } from '../../components/molecules'

const Thanks = ({ navigation, route }) => {
  console.log(route);
       const {params}=route;
  const [state, setState] = useState({
    password: '',
    confirmPassword:''
  })



  const handleChange = (value, name) => {
    setState(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const inputView = () => {
    return (
      <View style={styles.loginWrapper}>
       
         {/* Next button */}
        <Button onPress={()=>navigation.navigate(screenName.login)} text={params.screenType!='register'?validationStings.login:validationStings.gotToLogin} color={colors.white} />
      </View>
    )

  }

  return (
    <View style={styles.mainView}>
         {params.screenType!='register'?<Header
         left={'back'}
         title={validationStings.congratulation}
        /> :null}
  {params.screenType=='register'?<View style={{height:Typography.LINE_HEIGHT_80}}/>:null} 
  {params.screenType=='register'?<View style={{height:Typography.LINE_HEIGHT_80}}/>:null} 

      <View style={styles.logoStyle}>
        <Image source={params.screenType!='register'?images.icResetPassword:images.icRegister} style={styles.logoImage} resizeMode={'contain'} />
         <Text h6={true} color={colors.primary} textAlign={'center'} style={{fontWeight:'bold'}} >{params.screenType!='register'? validationStings.whoo:validationStings.registerSuccess}</Text>
        {params.screenType!='register'? <Text h7={true} color={colors.primary} textAlign={'center'} style={{marginVertical:12,fontFamily:fonts.primaryMedium}}>{validationStings.resetSuccess}</Text>:
        <Text h7={true} color={colors.primary} textAlign={'center'} style={{marginVertical:12,fontFamily:fonts.primaryMedium}}>{validationStings.adminApproval}</Text>}
      </View> 
    {inputView()}

    </View>
  )
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: colors.white,
  },
  logoStyle: {
    flex:.9,
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
    height:'auto',
    paddingTop: '4%',
    paddingHorizontal: '5%',
    width:'100%'
  },
  forgotPassword: {
    alignSelf: 'flex-end',
     marginVertical: moderateVerticalScale(6)
  },
 
  
})
export default Thanks;