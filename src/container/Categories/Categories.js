import React, { useState, useEffect, Fragment } from 'react'
import {
    View,
    Image,
    StyleSheet,
    SafeAreaView,
    FlatList,
    TouchableOpacity,
} from 'react-native'
import { colors, errorToast, fonts, images, validationStings, screenName } from '../../utils'
import { Header } from '../../components/molecules';
import { moderateScale, moderateVerticalScale, } from 'react-native-size-matters';
import { useDispatch } from 'react-redux';
import { categoriesRequest, updateCategoryRequest } from '../../store/modules/categories/actions'
import { Mixins } from '../../styles';
import { Button, Text } from '../../components/atoms';
import config from '../../config';
let { boxShadow, windowWidth } = Mixins;
import {loginSuccess} from '../../store/modules/login/actions';
import { useSelector } from 'react-redux';
const Categories = ({ route, navigation }) => {
    const { params } = route;
    const dispatch = useDispatch();
    const { profileData = null } = useSelector(state => ({
        profileData: state.profileReducer?.profileData
    }));
    const [state, setState] = useState({ countryCode: '', countryName: '' });
    const [category, setCategory] = useState([])
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        getCategories();

    }, [])

    const getCategories = () => {
        dispatch(categoriesRequest((cb) => {
            if (route.params?.screenType != 'register') {
                const ids = profileData.categoryId;
                cb.map((juice) => {
                    ids.map((fruit) => {
                        if (juice._id === fruit) {
                            juice.selected = true;
                        }
                        return juice;
                    });
                });
                setCategory(cb);
            } else {
                setCategory(cb);

            }
        }))
    }


    const selectItem = (id) => {
        const select = [...category];
        select.map((item => {
            if (id._id == item._id) {
                item.selected = !item.selected;
                return item;
            } else {
            }
        }))
        setCategory(select);

    }
    const renderItem = ({ item }) => {
        return (
            <View>
                {item.type === 'SPARE_PARTS' ? null: <TouchableOpacity onPress={() => selectItem(item)} style={[styles.item, { backgroundColor: item.selected ? colors.primary : colors.white, borderWidth: 3, borderColor: item.selected ? '#411595' : colors.white }]}>

{item.selected ? <Image source={images.icVerified} style={{ height: 24, width: 24, position: 'absolute', top: -10, right: -10, zIndex: 1 }} /> : null}
<Image source={{ uri: item.image }} style={styles.image} />
<Text style={[styles.text, { color: item.selected ? colors.white : colors.primary }]}>{item.name}</Text>

</TouchableOpacity> }

            </View>
        )
    }

    const onPressSubmit = async () => {
        const services = [...category];
        const selectedServices = services.filter((item) => item.selected).map(item => item._id);
        console.log('data--', params.data);
        if (selectedServices.length > 0) {
            setIsLoading(true);
            const data = new FormData();
            let ext = /[^.]+$/.exec(params.data.profileImage);
            data.append('name', params.data.name);
            data.append('email', params.data.email);
            data.append('mobileNumber', params.data.mobileNumber);
            data.append('dialCode', params.data.dialCode);
            data.append('password', params.data.password);
            data.append('address', params.data.address);
            data.append('categoryId', JSON.stringify(selectedServices));
            data.append('latitude', params.data.latitude);
            data.append('bio', params.data.bio);
            data.append('longitude', params.data.longitude);
            if (params.data.profileImage != '') {
                data.append('profileImage', {
                    uri:
                        Platform.OS === 'android' ? params.data.profileImage : params.data.profileImage.replace('file://', ''),
                    type: 'image/jpeg',
                    name: `profileImage.${ext}`,
                });
            } else {
                data.append('profileImage', '');
            }

            if (params.data.license != '') {
                data.append('licenseImage', {
                    uri:
                        Platform.OS === 'android' ? params.data.license : params.data.license.replace('file://', ''),
                    type: 'image/jpeg',
                    name: `license.${ext}`,
                });
            } else {
                data.append('licenseImage', '');
            }

            console.log('dataaaa',data);
            try {
                await fetch(config.API_URL + 'mechanic/register', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'multipart/form-data',
                    },
                    body: data
                }).then(response => response.json())
                    .then(data => {
                        console.log('register response--',data);
                        setIsLoading(false);
                        dispatch(loginSuccess(data));
                        if (data.status == 'success') {
                            navigation.navigate(screenName.thanks, { screenType: 'register' })
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

        } else {
            errorToast(validationStings.selectServiceError)
        }
    }

    const updateServices = () => {
        const services = [...category];
        const selectedServices = services.filter((item) => item.selected).map(item => item._id);
        const data = {};
        data['categoryId'] = selectedServices;
        dispatch(updateCategoryRequest(data, navigation));
    }

    return (
        <Fragment>
            <SafeAreaView style={{ flex: 0, backgroundColor: colors.primary }} />
            <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
                <Header
                    left={route.params?.screenType != 'register' ? 'menu' : 'back'}
                    title='Categories'
                />
                <FlatList
                    data={category}
                    numColumns={2}
                    style={{ marginTop: 20, marginVertical: 12 }}
                    columnWrapperStyle={styles.row}
                    contentContainerStyle={{ alignItems: 'center', marginVertical: 12,paddingBottom:120 }}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => `${index}_categories`}
                />
                <View style={styles.bottomView}>
                    {/* <Text style={[styles.text, { color: colors.primary, textAlign: 'center', fontSize: fonts.FONT_SIZE_14 }]}>{validationStings.serviceCharges}</Text> */}

                    <Button onPress={() => route.params?.screenType != 'register' ? updateServices() : onPressSubmit()} text={route.params?.screenType != 'register' ? validationStings.updateService : validationStings.submitText} mh={12} color={colors.white} isLoading={isLoading} />
                </View>
            </SafeAreaView>
        </Fragment>
    )
}
export default Categories;
const styles = StyleSheet.create({
    item: {
        height: 'auto',
        width: moderateScale(100),
        ...boxShadow('black', { height: 1, width: 8 }, 3, 0.2),

        borderRadius: moderateScale(12),
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: colors.lightBlack,
        marginHorizontal: windowWidth / 6

    },
    image: {
        height: moderateVerticalScale(60),
        width: moderateScale(80),
        marginTop: 12
    },
    text: {
        fontSize: fonts.FONT_SIZE_12,
        marginVertical: moderateVerticalScale(6)
    },
    row: {
        height: 'auto',
        justifyContent: 'space-between',
        marginVertical: 12
    },
    bottomView: {
        height: 'auto',
        position: 'absolute',
        bottom: 12,
        width: '100%',
    }
});
