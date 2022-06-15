import React, { Component } from "react";
import { View, Image, StyleSheet, TouchableOpacity, ActivityIndicator } from "react-native";
import { moderateScale, moderateVerticalScale, scale } from "react-native-size-matters";
import { colors } from "../../utils";
import Text from './text'

export default Button = ({ color, text, onPress, style, mh = 0,isLoading=false,bottom=0 }) => {
    return (
        <TouchableOpacity onPress={onPress} style={[styles.main, { marginHorizontal: mh,bottom:bottom }]}>
            {isLoading?<ActivityIndicator color={colors.white} size='small'/>: <Text h6={true} color={color} style={{
                fontWeight: 'bold'
            }}>{text}</Text>}
           
        </TouchableOpacity>

    );
};
const styles = StyleSheet.create({
    main: {
        height: moderateVerticalScale(55),
        backgroundColor: colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: moderateScale(12),
        
    }
})
