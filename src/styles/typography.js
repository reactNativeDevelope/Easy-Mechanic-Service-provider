 // Fonts types and sizes

 import { scaleFont } from './mixins';
 import { RFValue } from 'react-native-responsive-fontsize';

// FONT FAMILY
export const FONT_FAMILY_REGULAR = 'metropolis-Regular';
export const FONT_FAMILY_BOLD = 'metropolis-bold';
export const FONT_FAMILY_MEDIUM = 'metropolis-Semibold';
export const FONT_FAMILY_THIN = 'metropolis-Light';
export const FONT_FAMILY_LIGHT = 'metropolis-Light';
export const FONT_FAMILY_ULTRA_BOLD = 'metropolis-bold';


// FONT WEIGHT
export const FONT_WEIGHT_REGULAR = '400';
export const FONT_WEIGHT_MEDIUM= '500';

export const FONT_WEIGHT_BOLD = '700';


// FONT SIZE
export function normalize(size){
  return RFValue(size)
}

export const FONT_SIZE_24 = RFValue(24);
export const FONT_SIZE_22 = RFValue(22);
export const FONT_SIZE_20 = RFValue(18);
export const FONT_SIZE_16 = RFValue(16);
export const FONT_SIZE_14 = RFValue(14);
export const FONT_SIZE_12 = RFValue(12);

// LINE HEIGHT
export const LINE_HEIGHT_24 = RFValue(24);
export const LINE_HEIGHT_20 = RFValue(20);
export const LINE_HEIGHT_16 = RFValue(16);
export const LINE_HEIGHT_48 = RFValue(48);
export const LINE_HEIGHT_80 = RFValue(80);

// FONT STYLE
export const FONT_REGULAR = {
  fontFamily: FONT_FAMILY_REGULAR,
  // fontWeight: FONT_WEIGHT_REGULAR,
};

export const FONT_BOLD = {
  fontFamily: FONT_FAMILY_BOLD,
 // fontWeight: FONT_WEIGHT_BOLD,
};

export const FONT_MEDIUM = {
  fontFamily: FONT_FAMILY_MEDIUM,
//  fontWeight: FONT_WEIGHT_MEDIUM,
};

export const FONT_LIGHT = {
  fontFamily: FONT_FAMILY_LIGHT,
//  fontWeight: FONT_WEIGHT_MEDIUM,
};