import React, { useState, useEffect, Fragment } from 'react'
import {
    View,
    Image,
    StyleSheet,
    SafeAreaView,
    FlatList,
    Alert,
    Keyboard,
    ScrollView, TouchableOpacity} from 'react-native'
import { colors, screenName, validation, fonts, images, errorToast, isEmpty, validationStings, successToast } from '../../utils'
import { Header } from '../../components/molecules';
import { SmallIcon, Text, TextInput, Button } from '../../components/atoms'
import { Typography, Colors, Mixins, AppStyles } from '../../styles';
let { windowWidth, windowHeight, boxShadow, padding } = Mixins;
import { moderateScale, moderateVerticalScale, scale, verticalScale } from 'react-native-size-matters';
import CountryPicker, { Flag } from 'react-native-country-picker-modal';
import SmoothPinCodeInput from 'react-native-smooth-pincode-input';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker'
import { editProfilePicRequest, editProfileRequest,profilerequest } from '../../store/modules/profile/action'
import Modal from 'react-native-modal';
import ImageResizer from 'react-native-image-resizer';
import { useDispatch, useSelector } from 'react-redux';
import config from '../../config';

export const EditProfile = ({ navigation, route }) => {
    let emailField, phoneRef, passwordField, nameField, lastNameField, addressField
    const dispatch = useDispatch();
    const { user,profileData=null } = useSelector(state => ({
        user: state.loginReducer.loginData,
        profileData:state.profileReducer.profileData
    }));
    const [isActionsRequired, setIsActionsRequired] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [state, setState] = useState({
        name: profileData?.name,
        phone: profileData?.mobileNumber,
        email: profileData?.email,
        address: profileData?.address,
        latitude: profileData?.latitude,
        longitude: profileData?.longitude,
        birthDate: profileData?.dateofbirth,
        profileImage: profileData?.profileImage,
        location: {},
        bio:profileData?.bio,
        license:profileData?.licenseImage
    });
    const [picType, setPick] = useState('profile');

    //Add   image
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
                if(picType =='profile'){
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
                saveImage(source)
                
            })
            .catch(err => {
                console.log(err);
                return Alert.alert(
                    'Unable to upload photo',
                    // 'Check the console for full the error message',
                );
            });
    };

    //Save Image
    const saveImage =async  data => {
        const profiledata = new FormData();
        let ext = /[^.]+$/.exec(data.uri);

        // profiledata.append('image', {
        //     uri:
        //         Platform.OS === 'android' ? data.uri : data.uri.replace('file://', ''),
        //     type: `image/${ext}`,
        //     name: `document.${ext}`,
        // });
        // dispatch(editProfilePicRequest(profiledata,((callBack) => {
        //     console.log('callback===', callBack);
        //     setState(prevState => ({
        //         ...prevState,
        //         ['profileImage']: callBack.profileImage
        //     }));

        // })))
        if(picType=='profile'){
            profiledata.append('image', {
                uri:
                  Platform.OS === 'android' ? data.uri : data.uri.replace('file://', ''),
                type: 'image/jpeg',
                name: `profileImage.${ext}`,
              });
        }else{
            profiledata.append('image', {
                uri:
                  Platform.OS === 'android' ? data.uri : data.uri.replace('file://', ''),
                type: 'image/jpeg',
                name: `license.${ext}`,
              });
        }
        const url =picType =='profile'?config.API_URL + 'mechanic/updateProfileImage':config.API_URL + 'mechanic/updateLicenseImage';
        console.log('profiledata',profiledata);
          try {
      await fetch(url, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
          'token':user?.token
        },
        body: profiledata
      }).then(response => response.json())
        .then(data => {
          setIsLoading(false);
          if (data.status == 'success') {
            console.log('image uploaded---',data);
            successToast(data.message);
            dispatch(profilerequest());
          } else {
            errorToast(data.message)
          }
        }).catch((error) => {
          // Your error is here!
         setIsLoading(false);
          console.log(error)
          errorToast(error.message)
        });
    } catch (error) {
      setIsLoading(false);
      errorToast(error.message)
    }

    };
    const openImagePicker = () => {
        return (
          <Modal isVisible={isActionsRequired} animationIn='fadeIn'>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    
              <View style={{ justifyContent: 'center', width: '100%', height: '16%', width: '90%', backgroundColor: colors.white, paddingVertical: moderateVerticalScale(14), borderRadius: 6 }}>
                <TouchableOpacity onPress={() => setIsActionsRequired(false)} hitSlop={{ left: 24, right: 24, top: 24, bottom: 24 }} >
                  <Image source={images.icRemove} style={{ height: 24, width: 24,marginLeft:12 }} />
                </TouchableOpacity>
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

    const handleChange = (value, name) => {
        setState(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    /********************** get Address*************************/

    const setHandleAddress = (address, location) => {
        setState(prevState => ({
          ...prevState,
          ['address']: address,
          ['latitude']: location.lat,
          ['longitude']: location.lng,
        }));
      };

    const updateProfile = () => {
        const { name, email, countryCode, phone, latitude, longitude, address,bio} = state;
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (isEmpty(name.trim())) {
            errorToast(validationStings.nameError);
        }else if (isEmpty(phone.trim())) {
            errorToast(validationStings.phoneNumberError);
            return false;
        } else if (isEmpty(address.trim())) {
            errorToast(validationStings.locationError);
            return false;
        }else {

            const data = {};
            data['email'] = email;
            data['mobileNumber'] = phone;
            data['dialCode'] = countryCode;
            data['name'] = name;
            data['address'] = address;
            data['longitude'] = latitude;
            data['longitude'] = longitude;
            data['bio'] = bio;
            dispatch(editProfileRequest(data, navigation))
        }
    }

    return (
            <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
                            <SafeAreaView style={{ flex: 0, backgroundColor: colors.primary }} />

                <Header
                    left='back'
                    title={validationStings.editProfile} />

                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.profileImageView}>
                        <TouchableOpacity
                            onPress={() => {
                                setPick('profile')
                                setIsActionsRequired(true)
                            }}
                            activeOpacity={.7}
                            hitSlop={{ bottom: 50 }}
                        >
                            <Image
                                style={styles.profileImage}
                                source={state?.profileImage != null && state?.profileImage != undefined && state?.profileImage != '' ? { uri: state.profileImage } : images.icMan}
                            />
                            <Image
                                style={styles.editprofilePic}
                                source={images.icCamera}
                            />
                        </TouchableOpacity>
                    </View>

                    <TextInput
                        placeholder={'Name'}
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
                        value={state.name}
                        leftIcon={images.icUser}
                        viewTextStyle={[AppStyles.plainEditTextStyle, { marginHorizontal: moderateScale(12), marginVertical: moderateVerticalScale(8) }]}
                        onFocus={() => handleChange(true, 'emailFieldFocus')}
                        onBlur={() => handleChange(false, 'emailFieldFocus')}
                        onChangeText={text => handleChange(text, 'name')}
                        underlineColorAndroid="transparent"
                        onSubmitEditing={event => {
                            Keyboard.dismiss();
                        }}
                    />


                    <TextInput
                        placeholder={'Email'}
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
                        //editable={false}
                        value={state.email}
                        leftIcon={images.icEmail}
                        viewTextStyle={[AppStyles.plainEditTextStyle, { marginHorizontal: moderateScale(12), marginVertical: moderateVerticalScale(8) }]}
                        onFocus={() => handleChange(true, 'emailFieldFocus')}
                        onBlur={() => handleChange(false, 'emailFieldFocus')}
                        onChangeText={text => handleChange(text, 'email')}
                        underlineColorAndroid="transparent"
                        onSubmitEditing={event => {
                            Keyboard.dismiss();
                        }}
                    />
                    <TextInput
                        placeholder={'Phone Number'}
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
                        value={state.phone}
                        leftIcon={images.icPhone}
                        //editable={false}
                        viewTextStyle={[AppStyles.plainEditTextStyle, { marginHorizontal: moderateScale(12), marginVertical: moderateVerticalScale(8) }]}
                        onFocus={() => handleChange(true, 'emailFieldFocus')}
                        onBlur={() => handleChange(false, 'emailFieldFocus')}
                        onChangeText={text => handleChange(text, 'phone')}
                        underlineColorAndroid="transparent"
                        onSubmitEditing={event => {
                            Keyboard.dismiss();
                        }}
                    />



                    <TextInput
                        label={''}
                        inputMenthod={input => {
                            addressField = input;
                        }}
                        placeholder={validationStings.addressText}
                        placeholderTextColor={colors.primary}
                        returnKeyType="next"
                        onPress={() =>
                            navigation.navigate(screenName.addressModel, {
                                address: state.address,
                                setHandleAddress: (address, placeId, location, city) =>
                                    setHandleAddress(address, placeId, location, city),
                            })
                        }
                        leftIcon={images.icNavigation}

                        keyboardType="default"
                        autoCorrect={false}
                        value={state.address}
                        onTouchStart={() =>
                            navigation.navigate(screenName.addressModel, {
                                address: state.address,
                                setHandleAddress: (address, placeId, location, city) =>
                                    setHandleAddress(address, placeId, location, city),
                            })
                        }
                        autoCapitalize="none"
                        editable={false}
                        blurOnSubmit={false}

                        isFocused={state.addressFieldFocus}
                        multiline
                        viewTextStyle={[AppStyles.plainEditTextStyle, { marginHorizontal: moderateScale(12), paddingVertical: moderateVerticalScale(8),height:'auto' }]}
                        underlineColorAndroid="transparent"
                    />
                    <TextInput
                        placeholder={'Bio'}
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
                        value={state.bio}
                        leftIcon={images.icAboutus}
                        viewTextStyle={[AppStyles.plainEditTextStyle, { marginHorizontal: moderateScale(12), marginVertical: moderateVerticalScale(8) }]}
                        onFocus={() => handleChange(true, 'emailFieldFocus')}
                        onBlur={() => handleChange(false, 'emailFieldFocus')}
                        onChangeText={text => handleChange(text, 'bio')}
                        underlineColorAndroid="transparent"
                        onSubmitEditing={event => {
                            Keyboard.dismiss();
                        }}
                    />
                     <Text style={[styles.itemValue,{marginVertical:12,fontFamily:fonts.primaryBold,marginHorizontal:16}]}>
                    {`Update License:`}
                </Text>
                <TouchableOpacity onPress={()=>{
                      setPick('license')
                      setIsActionsRequired(true)
                }}>
                  {state.license!=''?<Image source={{uri:state.license}} style={[styles.license,{marginHorizontal:16}]} />
                  :
                  <Image source={images.icLicense} style={[styles.license,{marginHorizontal:16}]} />}
                </TouchableOpacity>
                    <View style={{marginTop:'12%'}}/>
                    <Button mh={16} onPress={() => updateProfile()} text={validationStings.updateText} color={colors.white} bottom={12}/>

                </ScrollView>
                
                {isActionsRequired ? openImagePicker() : null}

            </SafeAreaView>
        // <SafeAreaView style={styles.mainView}>

        // </SafeAreaView>
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
        marginHorizontal: moderateScale(10),
    },
    item: {

        justifyContent: 'center',
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
        fontFamily: fonts.primaryMedium,
        fontSize: fonts.FONT_SIZE_12,
        marginHorizontal: moderateScale(12),
        color: colors.red
    },
    image: {
        height: 24, width: 24,
        resizeMode: 'contain'
    },
    line: {
        height: .5,
        marginLeft: moderateScale(45),
        marginRight: moderateScale(12),
        backgroundColor: colors.lightBlack
    },
    button: {
        height: moderateVerticalScale(50),
        borderRadius: moderateVerticalScale(25),
        backgroundColor: colors.primary,
        marginHorizontal: moderateScale(24),
        alignItems: 'center',
        justifyContent: 'center'
    },
    docs: {
        flexDirection: 'row',
        marginHorizontal: moderateScale(24),
        marginVertical: moderateVerticalScale(16),

    },
    profileImageView: {
        marginTop: moderateVerticalScale(50),
        alignSelf: 'center',
        zIndex: 1000
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
        resizeMode: 'contain',
        position: 'absolute',
        zIndex: 2,
        bottom: 40,
        right: -5
    },
    welcomeText: {
        fontSize: fonts.FONT_SIZE_18,
        fontFamily: fonts.primaryMedium,
        color: colors.lightBlack,
        padding: moderateScale(14)
    },
    button: {
        height: moderateVerticalScale(50),
        borderRadius: moderateVerticalScale(25),
        backgroundColor: colors.primary,
        marginHorizontal: moderateScale(24),
        alignItems: 'center',
        justifyContent: 'center'
    },
    itemValue: {
        fontFamily: fonts.primaryRegular,
        fontSize: fonts.FONT_SIZE_14,
        marginHorizontal: moderateScale(12),
        color: colors.lightBlack
    },
    license:{
        height:100,
        width:100,
        borderRadius:16
    }
})
