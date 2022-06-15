import React, { useState, useEffect } from 'react'
import {
    View,
    Image,
    TextInput,
    TouchableOpacity,
    StyleSheet
} from 'react-native'
import { colors, images, validationStings } from '../../utils'

export const SearchBar = ({
    onSubmitEditing,
}) => {

    const [value, setValue] = useState('')

    const handleChangeText = txt => {
        setValue(txt)
        onSubmitEditing(txt)
    }

    return (
        <View style={styles.mainView}>
            <TextInput
                style={styles.inputStyle}
                placeholder={validationStings.searchCategory}
                placeholderTextColor={colors.primary}
                value={value}
                onChangeText={txt => handleChangeText(txt)}
            />
            <Image
                style={styles.searchIcon}
                source={images.icSearch}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    mainView: {
        height: 50,
        borderRadius: 12,
        // borderWidth: .5,
        width: '85%',
        alignSelf: 'center',
        marginVertical: 20,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        justifyContent: 'space-between',
        backgroundColor:'#E5E5E5'
    },
    inputStyle: {
        //fontFamily: fonts.primaryRegular,
        width: '85%'
    },
    searchIcon: {
        height: 20,
        width: 20,
        resizeMode: 'contain'
    }
})