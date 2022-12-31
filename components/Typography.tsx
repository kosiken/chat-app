import React, {Component} from 'react';
import {Text, StyleSheet, Animated, TextProps, StyleProp, TextStyle} from 'react-native';
import PropTypes from 'prop-types';
import {theme} from '../constants';

interface TypographyProps extends TextProps {
    red?: boolean;
    h1?: boolean;
    h2?: boolean;
    h3?: boolean;
    title?: boolean;
    body?: boolean;
    caption?: boolean;
    small?: boolean;
    size?: number;
    transform?: string;
    align?: string;
    animated?: boolean;
    // styling
    regular?: boolean;
    bold?: boolean;
    semibold?: boolean;
    medium?: boolean;
    weight?: number;
    light?: boolean;
    center?: boolean;
    right?: boolean;
    spacing?: number; // letter-spacing
    height?: number; // line-height
    // colors
    color?:  string;
    accent?: boolean;
    primary?: boolean;
    secondary?: boolean;
    tertiary?: boolean;
    black?: boolean;
    white?: boolean;
    gray?: boolean;
    gray2?: boolean;
    style?: StyleProp<TextStyle>;
    children?: string | string[];
}

const Typography: React.FC<TypographyProps> = (props) => {
  
    

    const {
      red,
      h1,
      h2,
      h3,
      title,
      body,
      caption,
      small,
      size,
      transform,
      align,
      // styling
      regular,
      bold,
      semibold,
      medium,
      weight,
      light,
      center,
      right,
      spacing, // letter-spacing
      height, // line-height
      // colors
      color,
      accent,
      primary,
      secondary,
      tertiary,
      black,
      white,
      gray,
      animated,
      gray2,
      style,
      children,
      ...others
    } = props;

    const textStyles = [
      styles.text,
      h1 && styles.h1,
      h2 && styles.h2,
      h3 && styles.h3,
      title && styles.title,
      body && styles.body,
      caption && styles.caption,
      small && styles.small,
      size && {fontSize: size},
      transform && {textTransform: transform},
      align && {textAlign: align},
      height && {lineHeight: height},
      spacing && {letterSpacing: spacing},
      weight && {fontWeight: weight},
      regular && styles.regular,
      bold && styles.bold,
      semibold && styles.semibold,
      medium && styles.medium,
      light && styles.light,
      center && styles.center,
      right && styles.right,
      color && styles[color],
      color && !styles[color] && {color},
      // color shortcut
      black && styles.black,
      white && styles.white,
      gray && styles.gray,
      gray2 && styles.gray2,
      red && styles.red,

      style, // rewrite predefined styles
    ];
    if (animated) {
      return (
        <Animated.Text style={textStyles} {...others}>
          {children}
        </Animated.Text>
      );
    }

    return (
      <Text style={textStyles} {...others}>
        {children}
      </Text>
    );

}

export default Typography;

const styles = StyleSheet.create({
  // default style
  text: {
    fontSize: theme.sizes.font,
    color: theme.colors.black,
  },
  // variations
  regular: {
    fontWeight: 'normal',
  },
  bold: {
    fontWeight: 'bold',
  },
  semibold: {
    fontWeight: '500',
  },
  medium: {
    fontWeight: '500',
  },
  light: {
    fontWeight: '200',
  },
  // position
  center: {textAlign: 'center'},
  right: {textAlign: 'right'},
  // colors

  black: {color: theme.colors.black},
  white: {color: theme.colors.white},
  gray: {color: theme.colors.grey},
  gray2: {color: theme.colors.gray2},
  red: {color: theme.colors.red},
  // fonts
  h1: theme.fonts.h1,
  h2: theme.fonts.h2,
  h3: theme.fonts.h3,
  title: theme.fonts.title,
  body: theme.fonts.body,
  caption: theme.fonts.caption,
  small: theme.fonts.small,
});

