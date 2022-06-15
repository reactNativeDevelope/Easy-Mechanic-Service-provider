import React, { useState, useEffect, Fragment, useRef } from 'react'
import {
    View,
    StyleSheet,
    SafeAreaView,
    FlatList,
    TouchableOpacity,
    Image
} from 'react-native'
import { colors, fonts, images, validationStings } from '../../utils'
import { useDispatch, useSelector } from 'react-redux';
import { Header } from '../../components/molecules';
import {categoriesRequest,supplierRequest,onlineRequest} from '../../store/modules/categories/actions';
import { moderateScale, moderateVerticalScale } from 'react-native-size-matters';
import {Mixins } from '../../styles';
import {SearchBar} from '../../components/atoms'
let {  boxShadow,windowWidth} = Mixins;
import { Text} from '../../components/atoms';
import {profilerequest } from '../../store/modules/profile/action'

export const Home = ({ navigation, route }) => {
    const dispatch = useDispatch();
     
    const { user,categories=[],profileData=null } = useSelector(state => ({
        user: state.loginReducer.loginData,
        categories:state.categoriesReducer.categories,
        profileData:state.profileReducer.profileData
    }));
    const [category,setCategory]=useState([])
    const [onlineStatus,setOnlineStatus]=useState(false)


    useEffect(()=>{
       dispatch(profilerequest());
       if(profileData?.userAppStatus =='online'){
        setOnlineStatus(true);
       }else{
        setOnlineStatus(false);

       }
    },[]);


    const selectItem = (id) => {
        dispatch(supplierRequest(id,navigation));
        const select = [...category];
        select.map((item => {
            if (id._id == item._id) {
                item.selected = true;
                return item;
            } else {
                item.selected = false;
                return item;
            }
        }))
        setCategory(select);

    }

     const onPressRight=()=>{
           const data={};
           data['userAppStatus']=onlineStatus?'offline':'online'
           dispatch(onlineRequest(data,((cb)=>{
              console.log(cb)
                if(cb.userAppStatus =='online'){
                    setOnlineStatus(true)
                }else{
                    setOnlineStatus(false)

                }
        })));
     } 

    return (
        <Fragment>
            <SafeAreaView style={styles.main} />
            <SafeAreaView style={styles.container}>
                <Header
                    left={'menu'}
                    title={validationStings.dashboardText}
                    right={'right'}
                    rightImage={onlineStatus?images.icOnline:images.icOffline}
                    handleRightPress={()=>onPressRight()}
                />
                <View style={[styles.container,{alignItems:'center',justifyContent:'center'}]}>
                <Image source={images.icPositive} style={styles.logoImage} resizeMode={'contain'} />
                <Text h6={true} color={colors.primary} textAlign={'center'} style={{fontWeight:'bold'}} >{validationStings.connectingText}</Text>


                </View>
              


            </SafeAreaView>
        </Fragment>
    )
}

const styles = StyleSheet.create({
    main: {
        flex: 0,
        backgroundColor: colors.primary
    },
    container: {
        flex: 1,
        backgroundColor: colors.white
    },
    search:{
        height:'24%',
        width:'100%',
        backgroundColor:colors.primary,
        borderBottomLeftRadius:12,
        borderBottomRightRadius:12
    },
    item:{
        height:moderateVerticalScale(100),
        width:moderateScale(100),
        ...boxShadow('black', { height: 1, width: 8 }, 3, 0.2),
        borderRadius:moderateScale(12),
        alignItems:'center',
        justifyContent:'space-between',
        backgroundColor:colors.white,
        marginHorizontal:windowWidth/6

    },
    image:{
        height:moderateVerticalScale(60),
        width:moderateScale(80),
        marginTop:12
    },
    text:{
        fontSize:fonts.FONT_SIZE_12,
        marginVertical:moderateVerticalScale(6)
    },
    row: {
        height: 'auto',
        justifyContent: 'space-between',
        marginVertical:12
    },
    logoImage: {
        height: moderateVerticalScale(120),
        width: moderateScale(120),
        marginVertical: moderateVerticalScale(16)
      },

})
