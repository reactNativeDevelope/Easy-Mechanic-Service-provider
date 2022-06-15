import React, { useState, useEffect,Fragment } from 'react'
import {
    View,
    Image,
    StyleSheet,
    SafeAreaView,
    FlatList
} from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import { colors, screenName, validation, fonts, images, validationStings } from '../../utils'
import { Header } from '../../components/molecules';
import {Text,Button } from '../../components/atoms'
import { moderateScale, moderateVerticalScale, } from 'react-native-size-matters';
import { useDispatch, useSelector } from 'react-redux';

export const Profile = (props) => {
    const [state, setState] = useState({
        countryCode: '',
        countryName: '',
    });

    const dispatch = useDispatch();

    const { user,profileData=null } = useSelector(state => ({
        user: state.loginReducer.loginData?.data,
        profileData:state.profileReducer.profileData

    }));

    /************** Render renderInfoRepeatItem **************/

    const renderInfoRepeatItem = (item) => {

        return (
            <View style={[styles.itemWrapper, {
                flexDirection: 'row'
            }]}>
                <Image source={item.image} style={styles.image} />
                <Text style={styles.itemValue}>
                    {item.value}
                </Text>

                <View>
                </View>
            </View>
        )

    }

    useEffect(() => {
    }, [])


    return (
        <Fragment>
        <SafeAreaView style={{ flex:0, backgroundColor:colors.primary }} />
        <SafeAreaView style={{ flex:1, backgroundColor: colors.white }}>
            <Header
                left='menu'
                title='Profile'
                right='right'
                rightImage={images.icEdit}
                handleRightPress={()=>props.navigation.navigate(screenName.editProfile)}
                />
            <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
                <View style={{ alignItems: 'flex-end', marginVertical: moderateVerticalScale(20) }}>
                    <TouchableOpacity onPress={() => props.navigation.navigate(screenName.editProfileScreen)} >
                        <Image source={images.icEditProfile} style={{ height: 24, width: 24, resizeMode: 'contain', marginRight: 16, tintColor: colors.primary }} />
                    </TouchableOpacity>
                </View>
                <Image source={profileData?.profileImage !=''&&profileData?.profileImage != null && profileData?.profileImage != undefined ? { uri: profileData.profileImage } : images.icMan} style={{ height: 100, width: 100, alignSelf: 'center', borderRadius: 50 }} />


                <View style={styles.item}>
                    {renderInfoRepeatItem({
                        image: images.icUser,
                        value: profileData?.name
                    })}
                     <View style={styles.line} />
                    {renderInfoRepeatItem({
                        image: images.icEmail,
                        value: `${profileData?.email}`
                    })}
                    <View style={styles.line} />
                    {renderInfoRepeatItem({
                        image: images.icPhone,
                        value: `${profileData?.dialCode + ' ' + profileData?.mobileNumber}`
                    })}
                   
                    <View style={styles.line} />
                    {renderInfoRepeatItem({
                        image: images.icNavigation,
                        value: `${profileData?.address != null && profileData?.address != undefined ? profileData?.address : 'N/A'}`
                    })}
                     <View style={styles.line} />
                    {renderInfoRepeatItem({
                        image: images.icAboutus,
                        value: `${profileData?.bio != null && profileData?.bio != undefined ? profileData?.bio : 'N/A'}`
                    })}
                    <View style={styles.line} />
                    {/* {renderInfoRepeatItem({
                        image: images.icdob,
                        value: `${profileData.DOB != null && profileData.DOB != undefined ? profileData.DOB : 'N/A'}`
                    })} */}
                   
                   <Text style={[styles.itemValue,{marginVertical:12,fontFamily:fonts.primaryBold}]}>
                    {`License:`}
                </Text>
                {}
                {profileData?.licenseImage !=''&&profileData?.licenseImage != null && profileData?.licenseImage != undefined ?
                 <Image source={{uri:profileData.licenseImage}} style={styles.license} />:<Image source={images.icLicense} style={styles.license}/>}
               

                </View>
                <Button mh={16} text={validationStings.changePassword} color={colors.white} onPress={() => props.navigation.navigate(screenName.changePassword)}/>
                    
            </ScrollView>
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
        backgroundColor: colors.primary,
        alignItems: 'center',
        justifyContent: 'center'
    },
    signUpText: {
        fontSize: fonts.FONT_SIZE_14,
        fontFamily: fonts.primaryMedium,
        color: colors.lightGray1,
        marginHorizontal: moderateScale(10)
    },
    item: {

        justifyContent: 'center',
        width: 'auto',
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
        marginHorizontal: moderateScale(12),
        color: colors.lightBlack
    },
    image: {
        height: 24, width: 24,
        resizeMode: 'contain'
    },
    line: {
        height: 2,
        marginRight: moderateScale(12),
        backgroundColor: colors.primary
    },
    button: {
        height: moderateVerticalScale(50),
        borderRadius: moderateVerticalScale(25),
        backgroundColor: colors.primary,
        marginHorizontal: moderateScale(24),
        alignItems: 'center',
        justifyContent: 'center'
    },
    license:{
        height:100,
        width:100,
        borderRadius:16
    }
})
