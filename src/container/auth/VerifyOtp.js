import React, { useState, Fragment } from 'react'
import {
    View,
    StyleSheet,
    Image,
    SafeAreaView
} from 'react-native'
import { moderateScale, moderateVerticalScale } from 'react-native-size-matters'
import { colors, fonts, images, validationStings,screenName, errorToast } from '../../utils';
import { AppStyles, Typography } from '../../styles';
import { Text, TextInput, Button } from '../../components/atoms';
import { Header } from '../../components/molecules'
import SmoothPinCodeInput from 'react-native-smooth-pincode-input';
import {useSelector} from 'react-redux';
import {resendOtpFail, resendOtpRequest, verifyOtpRequest} from '../../store/modules/login/actions';
import { dispatch } from '../../store';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const VerifyOtp = ({ navigation, route }) => {
        const {params}=route;
        const screenType=params.screenType;
        console.log(params);
    const { data={}} = useSelector(state => ({
        data: state.loginReducer.forgotPasswordData,
        
    }));

    
    const [state, setState] = useState({
        email: params.data.email,
        serverOtp:''
    })
    const [code, setCode] = useState('')
    const handleChange = (value, name) => {
        setState(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

   const verifyOtp=()=>{
           const {serverOtp}=state;
           if(code===''){
              errorToast(validationStings.otpvalid)
           }else{
               const data={};
                 //data['email']= params.data.email;
                 data['mobileNumber']=params.data.mobileNumber;
                 data['dialCode']=params.data.dialCode;
                 data['OTP']=code;

                 dispatch(verifyOtpRequest(data,screenType,((cb=>{
                          if(params.screenType==='register'){
                            navigation.navigate(screenName.categories,{
                                data:params.data,
                                screenType:'register'
                            });
                          }else{
                              navigation.navigate(screenName.resetPassword);
                          }
                 })),navigation));
               
           }
   }

    const inputView = () => {
        return (
            <View style={styles.loginWrapper}>
                 <View style={{alignSelf:'center'}}>
                <SmoothPinCodeInput
                     cellStyle={{
                        borderBottomWidth: 4,
                        borderColor: colors.primary,
                      }}
                      cellStyleFocused={{
                        borderColor: colors.primary,
                      }}
                    cellSpacing={12}
                   
                    textStyleFocused={{ color: colors.white }}
                    textStyle={{ fontFamily: fonts.primaryRegular, color: colors.primary,fontSize: 24,fontWeight:'bold' }}
                    codeLength={4}
                    keyboardType="numeric"
                    returnkey="done"

                    placeholder="*"
                    value={code}
                    onTextChange={code => setCode(code)}
                />
                </View>
                <View style={{ height: Typography.LINE_HEIGHT_24 }} />
                <View style={[styles.orViewWrapper]}>
            <Text h7>{validationStings.receiveCode}</Text>
            <TouchableOpacity onPress={()=>resendOtp()}>
            <Text h7 style={{fontFamily:fonts.primaryBold}}>{validationStings.resendNow}</Text>
            </TouchableOpacity>
          </View>
          <View style={{ height: Typography.LINE_HEIGHT_48 }} />

                {/* Next button */}
                <Button onPress={()=>verifyOtp()} text={validationStings.verify} color={colors.white} />





            </View>
        )

    }

    const resendOtp=()=>{
        const data={};
       // data['email']=params.data.email;
        data['mobileNumber']=params.data.mobileNumber;
        data['dialCode']=params.data.dialCode;
        dispatch(resendOtpRequest(data,navigation))
    }

    return (
        <Fragment>
            <SafeAreaView style={styles.main} />
            <SafeAreaView style={styles.container}>
            <Header left={'back'}
                title={validationStings.verifyOtp}

            />
                  <KeyboardAwareScrollView style={{flex:1}}>
            <View style={[styles.logoStyle,{marginHorizontal:moderateScale(12)}]}>
                <Image source={images.icLock} style={styles.logoImage} resizeMode={'contain'} />
                {/* <Text h6={true} color={[colors.primary,{marginHorizontal:12}]} textAlign={'center'} >{validationStings.verifyOtp}</Text> */}
                <Text  h7={true} color={[colors.primary,{marginHorizontal:12}]} textAlign={'center'} style={{ marginVertical: 12, fontFamily: fonts.primaryMedium }}>{validationStings.enterVerifyCode} {'('+params.data?.dialCode+' '}{params.data?.mobileNumber+')'}</Text>
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
        flex: .6,
        alignItems: 'center',
        justifyContent: 'center',
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
        flex: .4,
        paddingTop: '4%',
        paddingHorizontal: '5%',
    },
    forgotPassword: {
        alignSelf: 'flex-end',
        marginVertical: moderateVerticalScale(6)
    },
    orViewWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        alignItems:'center',
        justifyContent:'center',
        marginBottom:12
      },

})
export default VerifyOtp;