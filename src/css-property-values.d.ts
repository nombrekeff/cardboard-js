/* eslint-disable @typescript-eslint/ban-types */
import type { NamedColor } from './colors';

// Create script to collect all the values, wherever posible.
// Scrap https://dofactory.com/css/properties#list or other site, and get all single word options

export type PickPropertyValues<T> = T extends 'color'
  ? ColorOptions
  : T extends 'alignContent'
  ? AlignContentOptions
  : T extends 'alignItems'
  ? AlignItemsOptions
  : T extends 'alignSelf'
  ? AlignSelfOptions
  : T extends 'all'
  ? AllOptions
  : T extends 'accentColor'
  ? ColorOptions
  : T extends 'animationDirection'
  ? AnimationDirectionOptions
  : T extends 'animationFillMode'
  ? AnimationFillModeOptions
  : T extends 'animationPlayState'
  ? AnimationPlayStateOptions
  : T extends 'animationPlayState'
  ? AnimationPlayStateOptions
  : T extends 'borderStyle'
  ? BorderStyleOptions
  : T extends 'background'
  ? ColorOptions
  : T extends 'backgroundColor'
  ? ColorOptions
  : T extends 'backgroundImage'
  ? BackgroundImageOptions
  : T extends 'backgroundRepeat'
  ? BackgroundRepeatOptions
  : T extends 'backgroundAttachment'
  ? BackgroundAttachmentOptions
  : T extends 'backgroundPosition'
  ? BackgroundPositionOptions
  : T extends 'position'
  ? PPositionOptions
  : T extends 'transform'
  ? TransformOptions
  : T extends 'fontStyle'
  ? FontStyleOptions
  : T extends 'fontWeight'
  ? FontWeightOptions
  : T extends 'flexDirection'
  ? FlexDirectionOptions
  : T extends 'zIndex'
  ? string
  : T extends 'top'
  ? string
  : T extends 'display'
  ? DisplayOptions
  : T extends 'bottom'
  ? string
  : T extends 'left'
  ? string
  : T extends 'right'
  ? string
  : string & {};

export type CommonOptions = 'initial' | 'inherit' | (string & {});
export type ColorOptions = NamedColor | (string & {});
export type AlignContentOptions =
  | 'flex-wrap'
  | 'stretch'
  | 'center'
  | 'flex-start'
  | 'flex-end'
  | 'space-between'
  | 'space-around'
  | CommonOptions;
export type AlignItemsOptions = 'stretch' | 'center' | 'flex-start' | 'flex-end' | 'baseline' | CommonOptions;
export type DisplayOptions =
  | 'inline'
  | 'block'
  | 'contents'
  | 'flex'
  | 'grid'
  | 'inline-block'
  | 'inline-flex'
  | 'inline-grid'
  | 'inline-table'
  | 'list-item'
  | 'run-in'
  | 'table'
  | 'table-caption'
  | 'table-column-group'
  | 'table-header-group'
  | 'table-footer-group'
  | 'table-row-group'
  | 'table-cell'
  | 'table-column'
  | 'table-row'
  | 'none'
  | CommonOptions;
type AlignSelfOptions = 'auto' | 'stretch' | 'center' | 'flex-start' | 'flex-end' | 'baseline' | CommonOptions;
type AllOptions = CommonOptions | 'unset';
type AnimationDirectionOptions =
  | 'normal'
  | 'reverse'
  | 'alternate'
  | 'alternate-reverse'
  | 'initial'
  | 'inherit'
  | (string & {});
type AnimationFillModeOptions = 'none' | 'forwards' | 'backwards' | 'both' | CommonOptions;
type AnimationPlayStateOptions = 'paused' | 'running' | CommonOptions;
type BorderStyleOptions =
  | 'none'
  | 'no'
  | 'none'
  | 'hidden'
  | 'dotted'
  | 'dashed'
  | 'solid'
  | 'double'
  | 'groove'
  | 'ridge'
  | 'inset'
  | 'outset'
  | CommonOptions;
export type BackgroundImageOptions =
  | 'url()'
  | 'none'
  | 'conic-gradient()'
  | 'linear-gradient()'
  | 'radial-gradient()'
  | 'repeating-conic-gradient()'
  | 'repeating-linear-gradient()'
  | 'repeating-radial-gradient()'
  | 'initial'
  | 'inherit';
type BackgroundRepeatOptions =
  | 'repeat'
  | 'no'
  | 'repeat'
  | 'repeat-x'
  | 'repeat-y'
  | 'no-repeat'
  | 'space'
  | 'round'
  | CommonOptions;
type BackgroundAttachmentOptions = 'scroll' | 'no' | 'scroll' | 'fixed' | 'local' | CommonOptions;
type BackgroundPositionOptions =
  | 'left top'
  | 'left center'
  | 'left bottom'
  | 'right top'
  | 'right center'
  | 'right bottom'
  | 'center top'
  | 'center center'
  | 'center bottom'
  | 'inherit'
  | 'initial'
  | (string & {});
export type PPositionOptions = 'static' | 'fixed' | 'absolute' | 'relative' | 'sticky' | CommonOptions;
export type TransformOptions =
  | 'none'
  | 'matrix(n,n,n,n,n,n)'
  | 'matrix3d(n,n,n,n,n,n,n,n,n,n,n,n,n,n,n,n)'
  | 'translate(x,y)'
  | 'translate3d(x,y,z)'
  | 'translateX(x)'
  | 'translateY(y)'
  | 'translateZ(z)'
  | 'scale(x,y)'
  | 'scale3d(x,y,z)'
  | 'scaleX(x)'
  | 'scaleY(y)'
  | 'scaleZ(z)'
  | 'rotate(angle)'
  | 'rotate3d(x,y,z,angle)'
  | 'rotateX(angle)'
  | 'rotateY(angle)'
  | 'rotateZ(angle)'
  | 'skew(x-angle,y-angle)'
  | 'skewX(angle)'
  | 'skewY(angle)'
  | 'perspective(n)'
  | CommonOptions;
export type FontWeightOptions =
  | 'normal'
  | 'bold'
  | 'bolder'
  | 'lighter'
  | '100'
  | '200'
  | '300'
  | '400'
  | '500'
  | '600'
  | '700'
  | '800'
  | '900'
  | CommonOptions;
export type FontStyleOptions = 'normal' | 'italic' | 'oblique' | CommonOptions;
export type FlexDirectionOptions = 'row' | 'column' | 'row-reverse' | 'column-reverse' | CommonOptions;
