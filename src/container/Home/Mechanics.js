import React, { useState, useEffect, Fragment, useRef } from 'react'
import {
    View,
    StyleSheet,
    SafeAreaView,
    FlatList,
    TouchableOpacity,
    Image,
    Button
} from 'react-native'
import { colors, fonts, images, validationStings } from '../../utils'
import { useDispatch, useSelector } from 'react-redux';
import { Header } from '../../components/molecules';
import { categoriesRequest } from '../../store/modules/categories/actions';
import { moderateScale, moderateVerticalScale } from 'react-native-size-matters';
import { Mixins, Typography } from '../../styles';
import { SearchBar } from '../../components/atoms'
let { boxShadow, windowWidth } = Mixins;
import { Text } from '../../components/atoms';
import Animated from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
export const Mechanics = ({ navigation, route }) => {
    const dispatch = useDispatch();

    const { user, categories = [], profileData = null } = useSelector(state => ({
        user: state.loginReducer.loginData,
        categories: state.categoriesReducer.categories,
        profileData: state.profileReducer.profileData
    }));

    const [supplier, setSupplier] = useState([
        { name: 'John', address: 'Mohali punjab india', distance: '12 KM' },
        { name: 'Albert', address: 'Chandigarh 123, india', distance: '2 KM' },
        { name: 'John', address: 'Zirakpur pukjab', distance: '3 KM' },
        { name: 'John', address: 'Delhi india', distance: '5 KM' }
    ])

    const renderItem = ({ item, index }) => {
        return (
            <View style={styles.item}>
                <Image source={images.icMan} style={styles.image} />
                <View style={{ width: moderateScale(150) }}>
                    <Text style={styles.text} >{item.name}</Text>
                    <Text style={styles.text}>{item.address}</Text>
                </View>
                <View style={{ flexDirection:'row' }}>
                    <Image source={images.icNav} style={styles.navigator} />
                    <Text style={styles.text} >{item.distance}</Text>
                </View>

            </View>
        )
    }

    const renderContent = () => (
        <View style={styles.content}>
            {renderHeader()}
            <FlatList
                data={supplier}
                renderItem={renderItem}
                keyExtractor={(item, index) => `${index}_categories`}
                showsVerticalScrollIndicator={false}
                ItemSeparatorComponent={() => {
                    return (
                        <View style={{ height: 3, backgroundColor: colors.white }} />
                    )
                }}
            />

        </View>
    );

    const sheetRef = React.useRef(null);

  const  renderHeader = () => {
		return (
                         
			<TouchableOpacity  onPress={() =>console.log('dd')}>
			   <View style={{height:8,width:'25%',alignSelf:'center',backgroundColor:colors.white,borderRadius:4}}/>
			</TouchableOpacity>
		);
	}


    return (
            <View style={styles.container}>
                <MapView
                    provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                    style={styles.map}
                    region={{
                        latitude: 37.78825,
                        longitude: -122.4324,
                        latitudeDelta: 0.015,
                        longitudeDelta: 0.0121,
                    }}
                >

                </MapView>
                 <BottomSheet
                    ref={sheetRef}
                    snapPoints={[450, 300, 60]}
                    renderContent={renderContent}
                    enabledContentTapInteraction

                  />
              

            </View>

    )
}

const styles = StyleSheet.create({
    main: {
        flex: 0,
        backgroundColor: colors.primary
    },
    container: {
        flex: 1,
        backgroundColor: colors.primary
    },
    search: {
        height: '24%',
        width: '100%',
        backgroundColor: colors.primary,
        borderBottomLeftRadius: 12,
        borderBottomRightRadius: 12
    },
    item: {
        height: moderateVerticalScale(100),
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row'

    },
    image: {
        height: moderateVerticalScale(60),
        width: moderateScale(80),
        marginTop: 12
    },
    text: {
        fontSize: fonts.FONT_SIZE_12,
        color: colors.white
    },
    row: {
        flex: .3,
        justifyContent: 'space-between',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    content: {
        backgroundColor: colors.primary,
        padding: 16,
        height: 450,
        borderTopLeftRadius:24,
        borderTopRightRadius:24
    },
    image: {
        height: 60,
        width: 60
    },
    navigator:{
        height:24,
        width:24,
        marginHorizontal:6
    }

})
