import PropTypes from 'prop-types';
import React from 'react';
import { Text, StyleSheet, Platform } from 'react-native';
import { Typography, Spacing, Colors, Mixins,AppStyles} from '../../styles';
import { colors, fonts } from '../../utils';

const TextElement = props => {
  const { style, color,children, h7,h1, h2, h3, h4,h5,h6,p, textAlign,fontFamily, ...rest } = props;
  return (
    <Text
      style={[
        AppStyles.text,
        h1 && { fontSize:fonts.FONT_SIZE_40},
        h2 && { fontSize: fonts.FONT_SIZE_34 },
        h3 && { fontSize:fonts.FONT_SIZE_28 },
        h4 && { fontSize: fonts.FONT_SIZE_24 },
        h5 && { fontSize:  fonts.FONT_SIZE_22  },
        h6 && { fontSize:  fonts.FONT_SIZE_18  },
        p && { fontSize: fonts.FONT_SIZE_24  ,color:colors.textColor},
        h1 && AppStyles.bold,
        h2 && AppStyles.bold,
        h3 && AppStyles.bold,
        h4 && AppStyles.bold,
        h5 && AppStyles.bold,
        h6 && AppStyles.medium,
        h7 && AppStyles.regular,
        textAlign && {textAlign : 'center'},
        color && {color:color},
        // h6 && styles.bold,
        fontFamily && { fontFamily },
        style && style,
      ]}
      {...rest}
      
    >
      {children}
    </Text>
  );
};

TextElement.propTypes = {
  style: PropTypes.any,
  h1: PropTypes.bool,
  h2: PropTypes.bool,
  h3: PropTypes.bool,
  h4: PropTypes.bool,
  h5: PropTypes.bool,
  h6: PropTypes.bool,
  p: PropTypes.bool,
  textAlign:PropTypes.bool,
  fontFamily: PropTypes.string,
  children: PropTypes.any,
};

export default TextElement;
