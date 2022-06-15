import React, { useState, Fragment, useEffect } from 'react'
import {
  StyleSheet,
  SafeAreaView,
  Dimensions,
  ScrollView
} from 'react-native'
import { moderateScale, moderateVerticalScale } from 'react-native-size-matters'
import { colors, fonts, images, validationStings,screenName, isEmpty, errorToast } from '../../utils';
import { Header } from '../../components/molecules'
import {useSelector,useDispatch} from 'react-redux';
import {termsConditionsRequest} from '../../store/modules/login/actions';
import RenderHtml from 'react-native-render-html';

const Terms = ({ navigation, route }) => {
  const dispatch=useDispatch();
  const [terms,setTerms]=useState('');

  useEffect(()=>{
        termsData();
  },[])

const termsData=()=>{
    dispatch(termsConditionsRequest((cb)=>{
         setTerms(cb.content);
    }))
}



  return (
    <Fragment>
    <SafeAreaView style={styles.main} />
    <SafeAreaView style={styles.container}>
        <Header
         left={'back'}
         title={validationStings.termsTitle}
        /> 
        <ScrollView style={{paddingBottom:100}}>
        <RenderHtml
      contentWidth={Dimensions.get('window').width}
      source={{ html: terms }}
      />
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
  logoStyle: {
    flex: .55,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal:moderateScale(24)
  },
  main: {
    flex: 0,
    backgroundColor: colors.primary
},
container: {
    flex: 1,
    backgroundColor: colors.white
},
  logoImage: {
    height: moderateVerticalScale(120),
    width: moderateScale(120),
    marginVertical: moderateVerticalScale(16)
  },
  loginWrapper: {
    flex: .45,
    paddingTop: '4%',
    paddingHorizontal: '5%',
  },
  forgotPassword: {
    alignSelf: 'flex-end',
     marginVertical: moderateVerticalScale(6)
  },
 
  
})
export default Terms;