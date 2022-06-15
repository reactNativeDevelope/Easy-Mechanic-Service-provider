import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect } from 'react';
import {
    View, Alert,
    StyleSheet,
    Image,
    ImageBackground,
    ScrollView,
    TouchableOpacity,
    Text
} from 'react-native';
import { moderateScale, moderateVerticalScale } from 'react-native-size-matters';
import { useDispatch, useSelector } from 'react-redux';
import { logoutRequest} from '../../store/modules/login/actions';
import { deleteAccountrequest} from '../../store/modules/profile/action';


import { colors, fonts, images, screenName, validationStings } from '../../utils';

const menuArray = [
    { name: validationStings.homeText, icon: images.icHome, routeName: screenName.home },
    { name: validationStings.profileText, icon: images.icUser, routeName: screenName.profile },
    { name: validationStings.selectCategory, icon: images.icCategory, routeName: screenName.categories },
    { name: validationStings.deleteAcText, icon: images.icDelete, routeName: screenName.profile },
    { name: validationStings.logoutText, icon: images.icLogout, routeName: screenName.profile },

];

const Drawer = ({ navigation }) => {

    /******************* Hooks Functions *********************/

    const dispatch = useDispatch();

    const { user,profileData=null} = useSelector(state => ({
        user: state.loginReducer.loginData?.data,
        profileData:state.profileReducer.profileData

    }))
    console.log('user',user,profileData);
    /********************* Handled methods *********************/

    const logoutAgain = async () => {
        dispatch(logoutRequest(navigation));
    };

    const LogoutAction = () => {
        Alert.alert(
            validationStings.logoutText,
            validationStings.logoutDescText,
            [
                { text: validationStings.okText, onPress: () => logoutAgain() },
                { text: validationStings.cancelText, onPress: () => console.log('Cancel Pressed') },
            ],
            { cancelable: false },
        );
    };


    const deleteAccount=()=>{
        dispatch(deleteAccountrequest());
    }

    const DeleteUserAction = () => {
        Alert.alert(
             validationStings.deleteAcText,
            validationStings.deleteDescText,
            [
                { text: validationStings.okText, onPress: () => deleteAccount() },
                { text: validationStings.cancelText, onPress: () => console.log('Cancel Pressed') },
            ],
            { cancelable: false },
        );
    };


    const isSelected = (name) => {
        const arr = [...menuArray];
        arr.map((item => {
            if (item.name === name) {
                item.isSelected = true;
                return;
            } else {
                item.isSelected = false;
            }
        }))
    }
    return (
        <View style={{ flex: 1, backgroundColor: colors.red,borderRadius:22 }}>

            {/*********************** Profile Section  *******************/}

            <View
                style={{
                    flex: 0.40,
                    paddingHorizontal: moderateScale(12),
                    paddingTop: 24,
                    justifyContent: 'center',

                }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image source={profileData?.profileImage!='' && profileData?.profileImage!=undefined?{uri:profileData?.profileImage}:images.icMan} style={{ height: 60, width: 60, borderRadius: 12, borderWidth: 1, borderColor: colors.white }}></Image>
                    <View style={{ paddingHorizontal: 8,alignItems:'center' }}>

                        <View style={styles.ratingView}>
                        <Text style={styles.numberText}>
                               
                            </Text>
                            <Text style={styles.numberText}>
                                {profileData?.name}
                            </Text>
                            <Text style={styles.numberText}>
                                {profileData?.email}
                            </Text>
                            <Text style={styles.numberText}>
                                {profileData?.dialCode+' '+profileData?.mobileNumber}
                            </Text>
                           
                            <TouchableOpacity onPress={()=>navigation.navigate(screenName.mainProfile)}>
                            <Text style={[styles.numberText, { fontSize: fonts.FONT_SIZE_12, marginVertical: moderateVerticalScale(4) }]}>
                                {validationStings.editProfileText}
                            </Text>
                            </TouchableOpacity>

                        </View>
                    </View>
                </View>
                 
            </View>

            {/*********************** Menu Section  **************************/}

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 20 }}
                style={{
                    flex: 1,
                    paddingTop: 20,
                }}>
                {menuArray.map(menu => (
                    <TouchableOpacity
                        key={menu.name}
                        onPress={() => {
                            isSelected(menu.name),
                                menu.name == 'Logout' ? LogoutAction() :
                                menu.name == 'Delete Account' ? DeleteUserAction():
                                    menu.routeName
                                        ? navigation.reset({
                                            routes: [{ name: menu.routeName,screenType:menu.name == 'Select Category'?'App Stack':'' }]
                                        })
                                        : alert('progress')
                        }

                        }
                        style={[styles.menuRow, { backgroundColor: menu.isSelected ? colors.primaryLight : 'transparent', marginVertical: 2 }]}>
                        <View style={{ flex: 0.3 }}>
                            <Image

                                source={menu.icon}
                                style={{
                                    height: 24,
                                    width: 24,

                                    paddingHorizontal: moderateScale(24),
                                }}
                                resizeMode={'contain'}
                            />
                        </View>
                        <View style={{
                            flex: 0.9,

                        }}>
                            <Text style={[styles.menuText, { color:colors.primary }]}>
                                {menu.name}
                            </Text>
                        </View>

                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
};

export default Drawer;

const styles = StyleSheet.create({
    profileText: {
        color: colors.white,
        fontFamily: fonts.primaryRegular,
        fontSize: 16
    },
    imageStyle: {
        height: 48,
        width: 48,
        alignSelf: 'flex-start',
    },
    topContainer: {
        flex: 0.2,
        justifyContent: 'center',
        paddingHorizontal: 24,
        paddingTop: 24,
    },
    menuText: {
        fontSize: fonts.FONT_SIZE_16,
        fontFamily: fonts.primaryBold,
        fontWeight:'bold'
    },
    starIcon: {
        height: 15,
        width: 15,
        resizeMode: 'contain',
        tintColor: colors.white
    },
    menuRow: {
        paddingBottom: 12,
        paddingTop: 16,
        flexDirection: 'row',
        alignItems: 'center',
        width: '85%',
        borderRadius:30,
        marginHorizontal:moderateScale(16)
    },
    numberText: {
        color: colors.primary,
        fontSize: fonts.FONT_SIZE_16,
        fontFamily: fonts.primaryMedium,
        width:200
    },
    ratingView: {
        alignItems:'baseline'
    },
    premium:{
        height:moderateVerticalScale(50),
        backgroundColor:colors.white,
        width:moderateScale(210),
        marginTop:moderateVerticalScale(30),
        borderRadius:25,justifyContent:'center'
    }
});
