import {RFValue} from 'react-native-responsive-fontsize';

export const fonts = {
  primaryRegular: 'Metropolis-Regular',
  primaryMedium: 'Metropolis-Medium',
  primaryLight: 'Metropolis-Light',
  primaryBold: 'metropolis-bold',
  primarySemiBold: 'metropolis.semi-bold',

  fontWeightRegular: '400',
  fontWeightMedium: '500',
  fontWeightBold: 'bold',
  FONT_SIZE_40: RFValue(40),
  FONT_SIZE_34: RFValue(34),
  FONT_SIZE_28: RFValue(28),
  FONT_SIZE_24: RFValue(24),
  FONT_SIZE_22: RFValue(22),
  FONT_SIZE_20: RFValue(20),
  FONT_SIZE_18: RFValue(18),
  FONT_SIZE_16: RFValue(16),
  FONT_SIZE_14: RFValue(14),
  FONT_SIZE_12: RFValue(12),
  FONT_SIZE_10: RFValue(10),
};
// FONT SIZE
export function normalize(size) {
  return RFValue(size);
}
