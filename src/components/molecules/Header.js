import React, { useState, useEffect } from 'react';
import {
    View,
    TouchableOpacity,
    Image,
    Text,
    StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native'
import { colors, fonts, images } from '../../utils';
import { moderateScale, moderateVerticalScale } from 'react-native-size-matters';


export const Header = ({
    title,
    left,
    right,
    headerColor,
    handleRightPress,
    rightImage,
    textColor=false,
}) => {

    const navigation = useNavigation();


    return (
        <View style={[styles.mainView, {
            backgroundColor: colors.primary
        }]}>

            {/* left side management */}

            {left === 'back' && <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={styles.HeaderLeft}>
                <Image
                    style={[styles.backIcon,]}
                    source={images.icBack}
                    resizeMode= 'contain'

                />
            </TouchableOpacity>}

            {
                left === 'menu' && <TouchableOpacity
                    onPress={() => navigation.openDrawer()}
                    style={styles.HeaderLeft}>
                    <Image
                        style={styles.backIcon}
                        source={images.icMenu}
                    />
                </TouchableOpacity>
            }

            {/* center Management */}
            <Text style={[styles.heading,{color:colors.white}]}>
                {title}
            </Text>

            {/* Right Side Management */}
            {
                right === 'right' && <TouchableOpacity
                    onPress={handleRightPress}
                    style={styles.HeaderRight}>
                    <Image
                        style={styles.right}
                        source={rightImage}
                    />
                </TouchableOpacity>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    mainView: {
        height: moderateVerticalScale(65),
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        top:0
    },
    HeaderLeft: {
        height: 60,
        width: 60,
        position: 'absolute',
        left: 0,
        justifyContent: 'center',
        paddingLeft: 10,
        zIndex: 2,
    },
    backIcon: {
        height: 24,
        width: 24,
        marginTop:moderateVerticalScale(12)
    },
    heading: {
        color: colors.lightBlack,
        fontSize: fonts.FONT_SIZE_16,
        fontFamily: fonts.primaryBold,
        marginTop:moderateVerticalScale(12),
        fontWeight:'bold'


    },
    right:{
        height: 30,
        width: 30,
        marginTop:moderateVerticalScale(12)
    },
    HeaderRight: {
        height: 34,
        width: 34,
        position: 'absolute',
        right: 0,
        justifyContent: 'center',
        alignItems: 'flex-end',
        paddingRight: 10,
        zIndex: 2,
    },
})