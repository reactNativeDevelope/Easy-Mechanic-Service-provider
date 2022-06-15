import React, { Component } from "react";
import {
  TextInput,
  View,
  TouchableOpacity,
  Image,
  I18nManager
} from "react-native";
import Text from "./text";
import SmallIcon from './smallIcon'
import { Typography} from '../../styles';
import { AppStyles } from "../../styles";
import { moderateScale, scale } from 'react-native-size-matters'
import { colors } from "../../utils";


export default  TextInputLabel =  (props) =>  {
    let { isFocused, fromNotes,leftIcon, mainContainer,placeholderTextColor, darkLabel, customeLabelStyle, fromPhone, isdropDown,rightIconPress} =props;
    let labelStyle = {
      fontSize: !isFocused ? Typography.normalize(16) : Typography.normalize(16),
      color: !isFocused ? "#3E4958" : "#3E4958",
      
    };

    //Border Style
    let borderColor = {
      borderColor: !isFocused ? "rgba(0,0,0,0.0)" : "rgba(0,0,0,0.0)"
    };
    let isRTL = I18nManager.isRTL
      return (
      <View style={[{flex:1,backgroundColor:'white' },
       mainContainer && mainContainer]}>

        {/********************* Label Textinput ************/}
        {
         props.label ? <View style={{ alignItems: 'flex-start',marginVertical:9 }}>
            <Text p style={[labelStyle, 
               
              !isFocused ? AppStyles.text : AppStyles.medium, 
              darkLabel && darkLabel, 
              customeLabelStyle && customeLabelStyle]}>
              {props.label}
            </Text></View>
            : null
        }
        <TouchableOpacity
          onPress={() => (props.onPress ? props.onPress() : null)}
          style={[
            {
              // borderRadius:15,
              // borderWidth:isFocused? 0.5:0 ,
              // borderColor: Colors.borderColor,
              paddingHorizontal:moderateScale(12),
              flexDirection: "row",
              backgroundColor:'#F8F9FD'
            },
           //boxShadow('black',{height:1,width:0},1,0.1),
            props.viewTextStyle,

          ]}
          disabled={props.editable}
        >
        {/********************* Left Icon  ************/}
          {props && props.leftIcon ? (
            <View
              style={{
                flex: 0.03,
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              {
                <Image source={props.leftIcon}
                resizeMode={'contain'}
                style={[{ height: scale(22), width: scale(22),
                 alignSelf: 'center' }]}
                />
              }
            </View>
          ) : null}

          {/*********************  Textinput  ************/}
          <View style={{flex:1,marginHorizontal:leftIcon ? moderateScale(18) :0}}>
            <TextInput
              
              style={[{
                height: moderateScale(52),
                fontSize: Typography.normalize(16),
                textAlign: isRTL ? "right" : "left",
                color: colors.primary,
                ...props.textInputStyle,
              }, AppStyles.text,
               props.textInputStyle,
              ]}
              {...props}
              selectionColor={colors.primary}
              ref={ref =>
                props.inputMenthod ? props.inputMenthod(ref) : null
              }
              placeholderTextColor={placeholderTextColor ? placeholderTextColor :'#172B4D'}

            />
          </View>
          {/*********************  Right Icon  ************/}
          {props && props.rightIcon ? (
            <TouchableOpacity 
             onPress={()=>rightIconPress()}
            style={{
              flex: 0.05,
              justifyContent: "center",
              alignItems: "flex-end"
            }}>
           
              {
                <SmallIcon source={props.rightIcon} resizeMode={'contain'} style={{height:12,width:12,tintColor:colors.placeholder}}/>
              }
           
            </TouchableOpacity>
          ) : null}
        </TouchableOpacity>

      </View>
    );
  }
