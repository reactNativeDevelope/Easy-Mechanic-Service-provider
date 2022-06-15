import React, { useState, useEffect, Fragment, useRef } from 'react'
import {
    View,
    StyleSheet,
    SafeAreaView,
    FlatList,
    TouchableOpacity,
    Image
} from 'react-native'
import { colors, fonts, validationStings } from '../../utils'
import { useDispatch, useSelector } from 'react-redux';
import { Header } from '../../components/molecules';
import {categoriesRequest} from '../../store/modules/categories/actions';
import { moderateScale, moderateVerticalScale } from 'react-native-size-matters';
import {Mixins } from '../../styles';
import {SearchBar} from '../../components/atoms'
let {  boxShadow,windowWidth} = Mixins;
import { Text} from '../../components/atoms';

export const SpareParts = ({ navigation, route }) => {
    const dispatch = useDispatch();
    const {data}=route.params;
    const {parts=[] } = useSelector(state => ({
        parts:state.categoriesReducer.spareParts,
    }));
    const [category,setCategory]=useState([])


    useEffect(()=>{
       getCategories();
       if(parts.length > 0){
        setCategory(parts);
       }
    },[]);

    const getCategories=()=>{
           dispatch(categoriesRequest());
    }

    const selectItem = (id) => {
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

    const renderItem=({item})=>{
           return(
                <TouchableOpacity disabled onPress={()=>selectItem(item)} style={[styles.item,{backgroundColor:item.selected?colors.primary:colors.white}]}>
                   <Image source={{uri:item.image}} style={styles.image}/>
                   <Text style={[styles.text,{color:item.selected?colors.white:colors.primary}]}>{item.name}</Text>
                  
                </TouchableOpacity>  
           )
    }

    

    const searchFilterFunction = (text) => {
        if (text) {
          const newData = category.filter(function (item) {
            const itemData = item.name
              ? item.name.toUpperCase()
              : ''.toUpperCase();
            const textData = text.toUpperCase();
            return itemData.indexOf(textData) > -1;
          });
          setCategory(newData);
        } else {
          setCategory(categories);
        }
      };

      

    return (
        <Fragment>
            <SafeAreaView style={styles.main} />
            <SafeAreaView style={styles.container}>
                <Header
                    left={'back'}
                    title={validationStings.sparepart}
                />
                <View>
                 <View style={{padding:moderateScale(24)}}>
                 <Text style={[styles.text,{textAlign:'center',fontSize:fonts.FONT_SIZE_16}]}>{`You have to call on this ${data.dialCode+'\n'+data.mobileNumber} to purchase \nany spare part.`}</Text>

                     </View>   
                </View>
                <FlatList
                 data={category}
                 numColumns={2}
                 columnWrapperStyle={styles.row}
                 contentContainerStyle={{alignItems:'center'}}
                 renderItem={renderItem}
                 keyExtractor={(item, index) => `${index}_categories`}
                 />


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
        ...boxShadow('black', { height: 1, width: 1 }, 3, 0.5),
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
        flex: .3,
        justifyContent: 'space-between',
    }

})
