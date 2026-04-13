type CssProperty =
  | 'color'
  | 'border'
  | 'margin'
  | 'fontStyle'
  | 'transform'
  | 'backgroundColor'
  | 'alignContent'
  | 'alignItems'
  | 'alignSelf'
  | 'all'
  | 'animation'
  | 'animationDelay'
  | 'animationDirection'
  | 'animationDuration'
  | 'animationFillMode'
  | 'animationIterationCount'
  | 'animationName'
  | 'animationPlayState'
  | 'animationTimingFunction'
  | 'backfaceVisibility'
  | 'background'
  | 'backgroundAttachment'
  | 'backgroundBlendMode'
  | 'backgroundClip'
  | 'backgroundColor'
  | 'backgroundImage'
  | 'backgroundOrigin'
  | 'backgroundPosition'
  | 'backgroundRepeat'
  | 'backgroundSize'
  | 'border'
  | 'borderBottom'
  | 'borderBottomColor'
  | 'borderBottomLeftRadius'
  | 'borderBottomRightRadius'
  | 'borderBottomStyle'
  | 'borderBottomWidth'
  | 'borderCollapse'
  | 'borderColor'
  | 'borderImage'
  | 'borderImageOutset'
  | 'borderImageRepeat'
  | 'borderImageSlice'
  | 'borderImageSource'
  | 'borderImageWidth'
  | 'borderLeft'
  | 'borderLeftColor'
  | 'borderLeftStyle'
  | 'borderLeftWidth'
  | 'borderRadius'
  | 'borderRight'
  | 'borderRightColor'
  | 'borderRightStyle'
  | 'borderRightWidth'
  | 'borderSpacing'
  | 'borderStyle'
  | 'borderTop'
  | 'borderTopColor'
  | 'borderTopLeftRadius'
  | 'borderTopRightRadius'
  | 'borderTopStyle'
  | 'borderTopWidth'
  | 'borderWidth'
  | 'bottom'
  | 'boxShadow'
  | 'boxSizing'
  | 'captionSide'
  | 'caretColor'
  | '@charset'
  | 'clear'
  | 'clip'
  | 'clipPath'
  | 'color'
  | 'columnCount'
  | 'columnFill'
  | 'columnGap'
  | 'columnRule'
  | 'columnRuleColor'
  | 'columnRuleStyle'
  | 'columnRuleWidth'
  | 'columnSpan'
  | 'columnWidth'
  | 'columns'
  | 'content'
  | 'counterIncrement'
  | 'counterReset'
  | 'cursor'
  | 'direction'
  | 'display'
  | 'emptyCells'
  | 'filter'
  | 'flex'
  | 'flexBasis'
  | 'flexDirection'
  | 'flexFlow'
  | 'flexGrow'
  | 'flexShrink'
  | 'flexWrap'
  | 'float'
  | 'font'
  | '@fontFace'
  | 'fontFamily'
  | 'fontKerning'
  | 'fontSize'
  | 'fontSizeAdjust'
  | 'fontStretch'
  | 'fontStyle'
  | 'fontVariant'
  | 'fontWeight'
  | 'grid'
  | 'gridArea'
  | 'gridAutoColumns'
  | 'gridAutoFlow'
  | 'gridAutoRows'
  | 'gridColumn'
  | 'gridColumnEnd'
  | 'gridColumnGap'
  | 'gridColumnStart'
  | 'gridGap'
  | 'gridRow'
  | 'gridRowEnd'
  | 'gridRowGap'
  | 'gridRowStart'
  | 'gridTemplate'
  | 'gridTemplateAreas'
  | 'gridTemplateColumns'
  | 'gridTemplateRows'
  | 'height'
  | 'hyphens'
  | '@import'
  | 'justifyContent'
  | '@keyframes'
  | 'left'
  | 'letterSpacing'
  | 'lineHeight'
  | 'listStyle'
  | 'listStyleImage'
  | 'listStylePosition'
  | 'listStyleType'
  | 'margin'
  | 'marginBottom'
  | 'marginLeft'
  | 'marginRight'
  | 'marginTop'
  | 'maxHeight'
  | 'maxWidth'
  | '@media'
  | 'minHeight'
  | 'minWidth'
  | 'objectFit'
  | 'objectPosition'
  | 'opacity'
  | 'order'
  | 'outline'
  | 'outlineColor'
  | 'outlineOffset'
  | 'outlineStyle'
  | 'outlineWidth'
  | 'overflow'
  | 'overflowX'
  | 'overflowY'
  | 'padding'
  | 'paddingBottom'
  | 'paddingLeft'
  | 'paddingRight'
  | 'paddingTop'
  | 'pageBreakAfter'
  | 'pageBreakBefore'
  | 'pageBreakInside'
  | 'perspective'
  | 'perspectiveOrigin'
  | 'pointerEvents'
  | 'position'
  | 'quotes'
  | 'right'
  | 'scrollBehavior'
  | 'tableLayout'
  | 'textAlign'
  | 'textAlignLast'
  | 'textDecoration'
  | 'textDecorationColor'
  | 'textDecorationLine'
  | 'textDecorationStyle'
  | 'textIndent'
  | 'textJustify'
  | 'textOverflow'
  | 'textShadow'
  | 'textTransform'
  | 'top'
  | 'transform'
  | 'transformOrigin'
  | 'transformStyle'
  | 'transition'
  | 'transitionDelay'
  | 'transitionDuration'
  | 'transitionProperty'
  | 'transitionTimingFunction'
  | 'userSelect'
  | 'verticalAlign'
  | 'visibility'
  | 'whiteSpace'
  | 'width'
  | 'wordBreak'
  | 'wordSpacing'
  | 'wordWrap'
  | 'writingMode'
  | 'zIndex'
  // eslint-disable-next-line @typescript-eslint/ban-types
  | (string & {});

type NamedColor = 'black' |
    'silver' |
    'gray' |
    'white' |
    'maroon' |
    'red' |
    'purple' |
    'fuchsia' |
    'green' |
    'lime' |
    'olive' |
    'yellow' |
    'navy' |
    'blue' |
    'teal' |
    'aqua' |
    'aliceblue' |
    'antiquewhite' |
    'aqua' |
    'aquamarine' |
    'azure' |
    'beige' |
    'bisque' |
    'black' |
    'blanchedalmond' |
    'blue' |
    'blueviolet' |
    'brown' |
    'burlywood' |
    'cadetblue' |
    'chartreuse' |
    'chocolate' |
    'coral' |
    'cornflowerblue' |
    'cornsilk' |
    'crimson' |
    'cyan' |
    'darkblue' |
    'darkcyan' |
    'darkgoldenrod' |
    'darkgray' |
    'darkgreen' |
    'darkgrey' |
    'darkkhaki' |
    'darkmagenta' |
    'darkolivegreen' |
    'darkorange' |
    'darkorchid' |
    'darkred' |
    'darksalmon' |
    'darkseagreen' |
    'darkslateblue' |
    'darkslategray' |
    'darkslategrey' |
    'darkturquoise' |
    'darkviolet' |
    'deeppink' |
    'deepskyblue' |
    'dimgray' |
    'dimgrey' |
    'dodgerblue' |
    'firebrick' |
    'floralwhite' |
    'forestgreen' |
    'fuchsia' |
    'gainsboro' |
    'ghostwhite' |
    'gold' |
    'goldenrod' |
    'gray' |
    'green' |
    'greenyellow' |
    'grey' |
    'honeydew' |
    'hotpink' |
    'indianred' |
    'indigo' |
    'ivory' |
    'khaki' |
    'lavender' |
    'lavenderblush' |
    'lawngreen' |
    'lemonchiffon' |
    'lightblue' |
    'lightcoral' |
    'lightcyan' |
    'lightgoldenrodyellow' |
    'lightgray' |
    'lightgreen' |
    'lightgrey' |
    'lightpink' |
    'lightsalmon' |
    'lightseagreen' |
    'lightskyblue' |
    'lightslategray' |
    'lightslategrey' |
    'lightsteelblue' |
    'lightyellow' |
    'lime' |
    'limegreen' |
    'linen' |
    'magenta' |
    'maroon' |
    'mediumaquamarine' |
    'mediumblue' |
    'mediumorchid' |
    'mediumpurple' |
    'mediumseagreen' |
    'mediumslateblue' |
    'mediumspringgreen' |
    'mediumturquoise' |
    'mediumvioletred' |
    'midnightblue' |
    'mintcream' |
    'mistyrose' |
    'moccasin' |
    'navajowhite' |
    'navy' |
    'oldlace' |
    'olive' |
    'olivedrab' |
    'orange' |
    'orangered' |
    'orchid' |
    'palegoldenrod' |
    'palegreen' |
    'paleturquoise' |
    'palevioletred' |
    'papayawhip' |
    'peachpuff' |
    'peru' |
    'pink' |
    'plum' |
    'powderblue' |
    'purple' |
    'rebeccapurple' |
    'red' |
    'rosybrown' |
    'royalblue' |
    'saddlebrown' |
    'salmon' |
    'sandybrown' |
    'seagreen' |
    'seashell' |
    'sienna' |
    'silver' |
    'skyblue' |
    'slateblue' |
    'slategray' |
    'slategrey' |
    'snow' |
    'springgreen' |
    'steelblue' |
    'tan' |
    'teal' |
    'thistle' |
    'tomato' |
    'turquoise' |
    'violet' |
    'wheat' |
    'white' |
    'whitesmoke' |
    'yellow' |
    'yellowgreen';

/* eslint-disable @typescript-eslint/ban-types */


// Create script to collect all the values, wherever posible.
// Scrap https://dofactory.com/css/properties#list or other site, and get all single word options

type PickPropertyValues<T> = T extends 'color'
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

type CommonOptions = 'initial' | 'inherit' | (string & {});
type ColorOptions = NamedColor | (string & {});
type AlignContentOptions =
  | 'flex-wrap'
  | 'stretch'
  | 'center'
  | 'flex-start'
  | 'flex-end'
  | 'space-between'
  | 'space-around'
  | CommonOptions;
type AlignItemsOptions = 'stretch' | 'center' | 'flex-start' | 'flex-end' | 'baseline' | CommonOptions;
type DisplayOptions =
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
type BackgroundImageOptions =
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
type PPositionOptions = 'static' | 'fixed' | 'absolute' | 'relative' | 'sticky' | CommonOptions;
type TransformOptions =
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
type FontWeightOptions =
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
type FontStyleOptions = 'normal' | 'italic' | 'oblique' | CommonOptions;
type FlexDirectionOptions = 'row' | 'column' | 'row-reverse' | 'column-reverse' | CommonOptions;

/** @export @type {TagName} */
// eslint-disable-next-line @typescript-eslint/ban-types
type TagName = ValidTagName | (string & {});
/** @type {ValidTagName} */
type ValidTagName =
  | 'a'
  | 'abbr'
  | 'acronym'
  | 'address'
  | 'area'
  | 'article'
  | 'aside'
  | 'audio'
  | 'b'
  | 'base'
  | 'basefont'
  | 'bdi'
  | 'bdo'
  | 'big'
  | 'blockquote'
  | 'body'
  | 'br'
  | 'button'
  | 'canvas'
  | 'caption'
  | 'center'
  | 'cite'
  | 'code'
  | 'col'
  | 'colgroup'
  | 'data'
  | 'datalist'
  | 'dd'
  | 'del'
  | 'details'
  | 'dfn'
  | 'dialog'
  | 'div'
  | 'dl'
  | 'dt'
  | 'em'
  | 'embed'
  | 'fieldset'
  | 'figcaption'
  | 'figure'
  | 'footer'
  | 'form'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'head'
  | 'header'
  | 'hr'
  | 'html'
  | 'i'
  | 'iframe'
  | 'img'
  | 'input'
  | 'ins'
  | 'kbd'
  | 'label'
  | 'legend'
  | 'li'
  | 'link'
  | 'main'
  | 'map'
  | 'mark'
  | 'meta'
  | 'meter'
  | 'nav'
  | 'noscript'
  | 'object'
  | 'ol'
  | 'optgroup'
  | 'option'
  | 'output'
  | 'p'
  | 'param'
  | 'picture'
  | 'pre'
  | 'progress'
  | 'q'
  | 'rp'
  | 'rt'
  | 'ruby'
  | 's'
  | 'samp'
  | 'script'
  | 'section'
  | 'select'
  | 'selfClosingTagName'
  | 'small'
  | 'span'
  | 'strong'
  | 'style'
  | 'sub'
  | 'summary'
  | 'sup'
  | 'svg'
  | 'table'
  | 'tbody'
  | 'td'
  | 'template'
  | 'textarea'
  | 'tfoot'
  | 'th'
  | 'thead'
  | 'time'
  | 'title'
  | 'track'
  | 'tr'
  | 'u'
  | 'ul'
  | 'var'
  | 'video'
  | 'wbr';

type CommonAttributes = 
     | 'accept'
     | 'accept'
     | 'accesskey'
     | 'action'
     | 'align'
     | 'allow'
     | 'alt'
     | 'as'
     | 'async'
     | 'autocapitalize'
     | 'autocomplete'
     | 'autoplay'
     | 'background'
     | 'bgcolor'
     | 'border'
     | 'capture'
     | 'charset'
     | 'checked'
     | 'cite'
     | 'class'
     | 'color'
     | 'cols'
     | 'colspan'
     | 'content'
     | 'contenteditable'
     | 'controls'
     | 'coords'
     | 'crossorigin'
     | 'csp'
     | 'data'
     | 'data'
     | 'datetime'
     | 'decoding'
     | 'default'
     | 'defer'
     | 'dir'
     | 'dirname'
     | 'disabled'
     | 'download'
     | 'draggable'
     | 'enctype'
     | 'enterkeyhint'
     | 'elementtiming'
     | 'for'
     | 'form'
     | 'formaction'
     | 'formenctype'
     | 'formmethod'
     | 'formnovalidate'
     | 'formtarget'
     | 'headers'
     | 'height'
     | 'hidden'
     | 'high'
     | 'href'
     | 'hreflang'
     | 'http'
     | 'id'
     | 'integrity'
     | 'intrinsicsize'
     | 'inputmode'
     | 'ismap'
     | 'itemprop'
     | 'kind'
     | 'label'
     | 'lang'
     | 'language'
     | 'loading'
     | 'list'
     | 'loop'
     | 'low'
     | 'max'
     | 'maxlength'
     | 'minlength'
     | 'media'
     | 'method'
     | 'min'
     | 'multiple'
     | 'muted'
     | 'name'
     | 'novalidate'
     | 'open'
     | 'optimum'
     | 'pattern'
     | 'ping'
     | 'placeholder'
     | 'playsinline'
     | 'poster'
     | 'preload'
     | 'readonly'
     | 'referrerpolicy'
     | 'rel'
     | 'required'
     | 'reversed'
     | 'role'
     | 'rows'
     | 'rowspan'
     | 'sandbox'
     | 'scope'
     | 'scoped'
     | 'selected'
     | 'shape'
     | 'size'
     | 'sizes'
     | 'slot'
     | 'span'
     | 'spellcheck'
     | 'src'
     | 'srcdoc'
     | 'srclang'
     | 'srcset'
     | 'start'
     | 'step'
     | 'style'
     | 'summary'
     | 'tabindex'
     | 'target'
     | 'title'
     | 'translate'
     | 'type'
     | 'usemap'
     | 'value'
     | 'width'
     | 'wrap' 
     | (string & {});

type StyleMap = { [key in CssProperty]?: PickPropertyValues<key> };
type NoOp = () => void;
// eslint-disable-next-line @typescript-eslint/array-type, @typescript-eslint/ban-types
type KeysOf<T extends Record<string, unknown>> = keyof T;

type Suffix<K extends string, T extends string> = `${T}${K}`;
type Suffixer<K, T extends string> = {
  [P in keyof K as Suffix<T, string & P>]: K[P];
};
type Primitive = number | string | boolean | symbol | bigint;
type NestedStyleMap = {
  [key in CssProperty]?: PickPropertyValues<key> | NestedStyleMap | StyleMap;
};
type StyleSet = Record<string, NestedStyleMap>;
type EventCallback<T extends EventName> = (
  tag: CTag,
  evt: HTMLElementEventMap[T],
) => void;
type EventName = keyof HTMLElementEventMap;
type EventMap = {
  [k in EventName]?: EventCallback<k>;
};
type TagBuilder = (children: TagChildren, silent: boolean) => CTag;
interface IObservable<T = any> {
  changed: (callback: (newValue: T | undefined) => void) => IObservable<T>;
  remove: (callback: (newValue: T | undefined) => void) => IObservable<T>;
  dispatch: (newValue: T) => IObservable<T>;
  destroy: () => void;
  computed: <K>(transform: (val: T) => K) => IObservable<K>;
  greaterThan: (val: IObservableOr<number> | number) => IObservable<boolean>;
  greaterThanOr: (val: IObservableOr<number>) => IObservable<boolean>;
  lessThan: (val: IObservableOr<number>) => IObservable<boolean>;
  lessThanOr: (val: IObservableOr<number>) => IObservable<boolean>;
  equalTo: <K>(val: IObservableOr<K>) => IObservable<boolean>;
  notEqualTo: <K>(val: IObservableOr<K>) => IObservable<boolean>;
  isEmpty: () => IObservable<boolean>;
  notEmpty: () => IObservable<boolean>;
  grab: <K extends keyof T>(key: K, defaultVal?: T[K]) => IObservable;
  value: T;
  prev?: T;
}
type State<T> = IObservable<T>;
type IObservableOr<T = any> = IObservable<T> | T;
interface WithLength {
  length: number;
}
type TextObj<T extends IObservable<Primitive> = any> = Record<string, T>;

/**
 * The Global Registry for Tag Children.
 * Plugins can use module augmentation on this interface to add new supported types.
 */
interface TagChildRegistry {
  string: string;
  number: number;
  node: Node;
  ctag: CTag;
  // NOTE: IObservable is explicitly removed from core!
}

/**
 * Evaluates to: string | number | Node | CTag | ...anything injected later
 */
type TagChild = TagChildRegistry[keyof TagChildRegistry];

/**
 * If you support nested arrays like tag('div', [[child1], child2])
 * you can define it recursively, otherwise just:
 */
type TagChildren = TagChild[];

type ChildTransformer = (child: any) => TagChild | Node | null | undefined;

interface TagConfig {
  style?: StyleMap;
  attr?: Record<CommonAttributes & {}, string | undefined>;
  classList?: string[];
  text?: string;
  children?: TagChildren;
  on?: EventMap;
  value?: string;
  className?: string;
}

type PickArgType<T> = T extends "style" ? StyleSet[] : TagChildren;
type AllTags = {
  [key in ValidTagName]: ((...children: PickArgType<key>) => CTag) & {
    /**
     * This will mount (append) this tag to the currently mounted tag if there is one.
     */
    mount: (...children: PickArgType<key>) => CTag;
  };
};

type AtLeastOne<T> = {
  [K in keyof T]-?: Partial<Pick<T, K>> & Partial<Pick<T, Exclude<keyof T, K>>>;
}[keyof T];

type StyleManager = {
  add: (
    styleSheet:
      | Record<string, NestedStyleMap>
      | Array<Record<string, NestedStyleMap>>,
  ) => void;
};

/**
 * This is the main class in Cardboard. Even though Cardboard is designed to not need to use this class directly, you can if you want.
 *
 * CTag contains a reference to an HTMLElement, its parent, and provides a set of methods to interact with it.
 */
declare class CTag {
    static childTransformers: ChildTransformer[];
    /** Reference to the HTMLElement that this @type {CTag} represents */
    el: HTMLElement & {
        remove: () => Promise<boolean> | any;
    };
    parent: CTag | null;
    private _visible;
    get visible(): boolean;
    set visible(newValue: boolean);
    /** Holds the list of all children, the ones that are currently in the DOM and those that are not. */
    private _children;
    get children(): TagChild[];
    private readonly _meta;
    /**
     * Gets the value of the `HTMLElement` that this CTag represents, if it has a value.
     */
    get value(): any;
    /**
     * Sets the value of the `HTMLElement` that this CTag represents.
     */
    setValue(newValue?: string): this;
    /**
     * Gets the checked state of the `HTMLElement` that this CTag represents,
     * if it is a checkbox or radio button.
     */
    get checked(): any;
    /**
     * Sets the checked state of the element, if it is a checkbox or radio button.
     */
    setChecked(checked: boolean): this;
    /**
     * Gets the style of the `HTMLElement` that this CTag represents.
     */
    get style(): CSSStyleDeclaration;
    /**
     * Gets the classname of the `HTMLElement` that this CTag represents.
     */
    get className(): string;
    /**
     * Gets the classlist of the `HTMLElement` that this CTag represents.
     */
    get classList(): DOMTokenList;
    /** Gets the value of the element and clears the value */
    get consumeValue(): any;
    /**
     * Get's the id of the `HTMLElement` that this CTag represents.
     */
    get id(): string;
    /**
     * Set's the id of the `HTMLElement` that this CTag represents.
     */
    setId(id: string): this;
    constructor(arg0: TagName | HTMLElement, children?: TagChildren, mountToParent?: boolean);
    /**
     * Sets the children, removes previous children
     */
    setChildren(children: TagChildren): this;
    /**
     * Appends the given `children` to the element.
     *
     * @param {...TagChildren} children - The children to append to the element.
     * @return {CTag} - The current CTag instance, allowing for method chaining.
     * @example
     * ```ts
     * const tag = new CTag('div');
     * tag.append(
     *   new CTag('span', ['Child 1']),
     *   new CTag('span', ['Child 2']),
     * );
     * ```
     */
    append(...children: TagChildren): this;
    /**
     * Prepends the given `children` to the element.
     *
     * @param {...TagChildren} children - The children to append to the element.
     * @return {CTag} - The current CTag instance, allowing for method chaining.
     * @example
     * ```ts
     * const tag = new CTag('div');
     * tag.prepend(
     *   new CTag('span', ['Child 1']),
     *   new CTag('span', ['Child 2']),
     * );
     * ```
     */
    prepend(...children: TagChildren): this;
    /**
     * If the element is currently hidden it will add this element to the page wherever it's supposed to be.
     * I will be placed exactly in the correct position, even if there are other elements hidden.
     */
    hide(): this;
    /**
     * Shows a hidden element. Can be called even if the element is not yet in the DOM.
     */
    show(): this;
    /**
     * Applies a plugin function to this tag and continues the chain.
     */
    use<T extends CTag>(this: T, plugin: (tag: T) => void): T;
    /**
     * Configure the element in a single call by passing @param {TagConfig} c
     * instead of having to call a method for each property you want to change
     *
     * @param {TagConfig} c - The configuration object containing properties to set on the element.
     * @returns {CTag} - The current CTag instance, allowing for method chaining
     *
     * @example
     * ```ts
     * const tag = new CTag('div');
     * tag.config({
     *   attr: { id: 'my-div', 'data-custom': 'value' },
     *   classList: ['class1', 'class2'],
     *   className: 'my-class',
     *   style: { color: 'red', backgroundColor: 'blue' },
     *   text: 'Hello World',
     *   value: 'Initial Value',
     *   children: [new CTag('span', ['Child Text'])],
     *   on: {
     *     click: (self, evt) => console.log('Clicked!', self),
     *   },
     * });
     * ```
     */
    config(c: TagConfig): this;
    /** Adds a set of attributes to the element */
    setAttrs(attrs: Record<string, string | undefined>): this;
    /** Adds a single attribute to the element */
    addAttr(key: CommonAttributes, value?: string): this;
    /** Remove attributes from the element */
    rmAttr(...attrs: CommonAttributes[]): this;
    /** Check if this element has attributes */
    hasAttr(...attr: CommonAttributes[]): boolean;
    /** Get an attributes value */
    getAttr(attr: CommonAttributes): string | null;
    /**
     * Listen to an event on the element. Like addEventListener.
     */
    listen<K extends keyof HTMLElementEventMap>(tag: CTag, evt: K, consumer: (self: CTag, other: CTag, evt: HTMLElementEventMap[K]) => void): CTag;
    /**
     * Add an event listener for a particular HTMLElement event
     *
     * @param {K} evtName - The name of the event to listen for. For a list of valid event names, see {@link HTMLElementEventMap "available event names"}.
     * @param {fn} fn - The callback function to execute when the event is triggered.
     * @returns {CTag} - The current CTag instance, allowing for method chaining
     */
    on<K extends keyof HTMLElementEventMap>(evtName: K | string, fn: (tag: CTag, evt: HTMLElementEventMap[K]) => void): CTag;
    /**
     * Add an event listener for a particular event that will only fire once
     * @param {K} evtName - The name of the event to listen for. For a list of valid event names, see {@link HTMLElementEventMap "available event names"}.
     * @param {fn} fn - The callback function to execute when the event is triggered.
     * @returns {CTag} - The current CTag instance, allowing for method chaining
     */
    once<K extends keyof HTMLElementEventMap>(evtName: K & string, fn: (tag: CTag, evt: HTMLElementEventMap[K]) => void): CTag;
    /**
     * Registers a hook that runs when the element is attached to the DOM.
     * This is useful for running code that depends on the element being in the document, such as measuring its size or position.
     */
    onAttached(fn: () => void): this;
    /**
     * Registers a hook that runs when the element is detached from the DOM.
     * This is useful for running cleanup code that depends on the element being in the document, such as clearing timers or intervals.
     * Note that this is not the same as `destroy()`, which is a more comprehensive teardown method. `onDetached` is specifically for handling DOM detachment events.
     */
    onDetached(fn: () => void): this;
    /**
     * Registers a hook that runs before the element is removed from the DOM.
     * This is useful for running cleanup code or preventing removal by returning false.
     */
    onBeforeRemove(fn: () => boolean | Promise<boolean>): this;
    /**
     * Registers a teardown function (e.g., for clearing observables or event listeners).
     * These are fired during `destroy()`.
     */
    onTeardown(fn: () => void): this;
    /** Add a **click** event listener */
    clicked(fn: (tag: CTag, evt: MouseEvent) => void): CTag;
    /** Add a **keypress** event listener */
    keyPressed(fn: (tag: CTag, evt: KeyboardEvent) => void, key?: string): CTag;
    /** Add a **change** event listener */
    changed(fn: (tag: CTag, evt: Event) => void): CTag;
    /** Add a **submit** event listener */
    submited(fn: (tag: CTag, evt: SubmitEvent) => void): CTag;
    /**
     * Remove this tag from the DOM and unlink it from its parent children list.
     * The tag instance remains reusable and can be appended again later.
     * To fully teardown the element use {@link destroy}.
     */
    remove(): this;
    /**
     * Performs a full recursive destruction of the component and its logical children.
     * This calls remove() to handle DOM detachment and then severs all internal
     * references to ensure memory is reclaimed.
     */
    destroy(): void;
    /**
     * Clears the `value` of the element. If you are getting the value and then clearing, consider using {@link consumeValue}
     */
    clear(): CTag;
    /** Disable the element */
    disable(): CTag;
    /** Enable the element */
    enable(): CTag;
    /**
     * Set whether the element should be disabled or not. It sets the `disabled` attribute.
     */
    setDisabled(disabled: boolean): CTag;
    /**
     * Query a child in this element (in the DOM)
     *
     * @param {string} selector - The CSS selector to query the child element.
     * @returns {CTag | undefined} - Returns a CTag instance if the element is found, or undefined if not found.
     *
     * @example
     * ```ts
     * const childTag = parentTag.q('.child-class');
     * ```
     */
    q(selector: any): CTag | undefined;
    /**
     * Find a child in this element (in the DOM or NOT)
     * @param {function} predicate - A function that takes a TagChild and returns true if it matches the condition.
     * @returns {TagChild | undefined} - Returns the first TagChild that matches the predicate, or undefined if no match is found.
     */
    find(predicate: (el: TagChild) => boolean): TagChild | undefined;
    /**
     * Find a CTag child in this element (in the DOM or NOT)
     * @param {function} predicate - A function that takes a CTag and returns true if it matches the condition.
     * @returns {CTag | undefined} - Returns the first CTag that matches the predicate, or undefined if no match is found.
     */
    findTag(predicate: (el: CTag) => boolean): CTag | undefined;
    private _resolveChild;
    private _getElementForChild;
    private _mapChildren;
}
/**
 * This function can do the following based on the first argument:
 * * create a tag if you provide a tag name: (`div`, `abbr`, `custom-tag`, ...),
 * * wrap around an existing element in the page if you pass in a selector: (`'(body)'`, `'(#id)'`, `'(.class)'`), any selector is allowed.
 * * wrap around an element passed in
 *
 * Then it can receive a list of children to be added.
 * Receives a third argument for mounting this tag to the currently mounted tag ({@link context.mp}).
 *
 * @example
 * ```ts
 * tag('div');
 * tag('(body)');
 * tag('(.someclass)');
 * tag(document.querySelector('#something'));
 * ```
 */
declare const tag: (arg0: string | HTMLElement, children?: TagChildren, mountToParent?: boolean) => CTag;

/**
 * Single event listener/emitter, listen to, and trigger events. (for mapped events use {@link CMappedEvent}).
 *
 * @example
 * ```ts
 * const evt = new CEvent<bool>();
 * evt.listen(listener);
 * evt.dispatch(true);
 * evt.remove(listener);
 * ```
 */
declare class CEvent<T> {
    protected _lstrs: Array<(data: T | undefined) => void>;
    listen(fn: (data?: T) => void): void;
    remove(fn: (data?: T) => void): void;
    dispatch(data?: T): void;
    destroy(): void;
}
/**
 * Mapped event listener/emitter, listen to, and trigger events. (for single events use {@link CEvent}).
 *
 * @example
 * ```ts
 * const evt = new CMappedEvent<bool>();
 * evt.listen('evt', listener);
 * evt.dispatch('evt', true);
 * evt.remove('evt', listener);
 * ```
 */
declare class CMappedEvent<T> {
    private _lstrs;
    listen(evt: string, fn: (data?: T) => void): void;
    remove(evt: string, fn: (data?: T) => void): void;
    dispatch(evt: string, data?: T): void;
    destroy(): void;
}
declare const singleEvent: <T>() => CEvent<T>;
declare const mappedEvent: <T>() => CMappedEvent<T>;

type CardboardContext = {
    intObs?: IntersectionObserver;
    styleManager?: StyleManager;
    mp?: CTag;
    mpHistory: CTag[];
    obs?: {
        onAdded: CEvent<Node>;
        onRemoved: CEvent<Node>;
    };
    init?: boolean;
};
declare const context: CardboardContext;
declare const isInitialized: () => boolean;
declare const checkInitialized: () => void;
/**
 * Returns the current mountPoint {@link CTag}. See {@link mountPoint} for more information.
 */
declare const getMountPoint: () => CTag | undefined;
/**
 * Makes the given tag the mount point. This means that when other tags are created with "mountToParent" or  (using `<tag_name>.mount()`, `tag('<tag_name>', [], true)`),
 * they will be added as children of this tag.
 * You can call mountPoint multiple times, and the last mount point tag will be used.
 * Then when you've finished, you can call {@link restoreMountPoint} to go back to the previously mounted tag if there is one.
 * You can clear all mount points using {@link clearMountPoints}.
 *
 * @example
 * ```ts
 * mountPoint(div()); // Div 1
 * div.mount();  // added as child of div
 * p.mount();    // added as child of div
 *
 * mountPoint(div()); // Div 2
 * div.mount();  // added as child of new div
 * p.mount();    // added as child of new div
 *
 * restoreMountPoint();      // Back to div 1
 * clearMountPoints();       // Clears all mount points, no mount point after this call
 * ```
 */
declare const mountPoint: (tag: CTag) => CTag;
/**
 * Restore the currently mounted tag ({@link mountPoint}).
 * Goes back in the stack of mount points tags.
 * If there is no previous mount point tag, it will not do anything.
 */
declare const restoreMountPoint: () => void;
/**
 * Restores all mount points. There will be no mount points tag after calling this function.
 */
declare const clearMountPoints: () => void;
/**
 * Clears the mount point history and resets the mount point to the first one.
 * This means that the mount point will be the first tag that was mounted,
 * and all other mount points will be cleared.
 */
declare const resetMountPoints: () => void;
type ScopedCallback = (tag: CTag) => void;
/**
 * Sets the mount point to the given tag, calls the scoped callback, and then restores the mount point.
 * Useful for creating a temporary mount point for a specific tag, and then restoring the previous mount point.
 *
 * @param tag
 * @param scopedCallback
 */
declare const withMountPoint: (tag: CTag, scopedCallback: ScopedCallback) => void;
declare const createGlobalObserver: () => {
    onAdded: CEvent<Node>;
    onRemoved: CEvent<Node>;
};

/**
 * `state` creates a reactive value that can the be used with tags to create dinamic and reactive apps.
 *
 * @see https://github.com/nombrekeff/cardboard-js/wiki/State
 *
 * @example
 * ```ts
 * const count = state(0);
 * count.changed(() => { ... });
 * count.dispatch(2);
 * count.value++;
 *
 * div().hideIf(count);
 * div().disableIf(count);
 * div(template('Count is: $count', { count: count }));
 * ```
 */
declare const state: <T>(initialValue: T) => State<T>;
/**
 * `listState` creates a reactive list of values that can be used with tags to manage dynamic and reactive apps.
 * It wraps each item with a {@link State} (aka. {@link IObservable}) to allow for individual item reactivity.
 * @see https://github.com/nombrekeff/cardboard-js/wiki/ListState
 *
 * @example
 * ```javascript
 * const myList = listState([1, 2, 3]);
 *
 * myList.add(4);
 * myList.addAt(0, 0);
 * myList.remove(2);
 * myList.removeWhere(item => item === 3);
 * const listValues = myList.listValue;
 * const listLength = myList.length;
 *
 * // Listen to changes in the list
 * myList.list.changed(() => {
 *   // List has changed
 * });
 * ```
 */
declare const listState: <T>(initialData: T[]) => {
    /**
     * The reactive list of items.
     * Each item is wrapped in a {@link State} to allow for individual reactivity.
     */
    readonly list: State<State<T>[]>;
    /**
     * The raw list of items.
     */
    readonly listValue: State<T>[];
    add: (item: T) => void;
    addAt: (item: T, index: number) => void;
    remove: (item: IObservableOr<T>) => void;
    removeWhere: (cb: (item: T, index: number) => boolean) => void;
    length: IObservable<number>;
};
/**
 * `stateAdd` adds an item to a reactive list.
 * It creates a new array with the existing items and the new item, then updates the state.
 *
 * @example
 * ```typescript
 * const myList = state([]);
 * stateAdd(myList, 'new item');
 * ```
 */
declare const stateAdd: <T>(state: State<T[]>, item: T) => void;
/**
 * `stateAddAt` adds an item to a reactive list at a specific index.
 * It creates a new array with the existing items and the new item at the specified index, then updates the state.
 *
 * @example
 * ```typescript
 * const myList = state([]);
 * stateAddAt(myList, 'new item', 0);
 * ```
 */
declare const stateAddAt: <T>(state: State<T[]>, item: T, index: number) => void;
/**
 * `stateRemoveWhere` removes items from a reactive list based on a callback function.
 * It filters the list and updates the state with the remaining items.
 *
 * @example
 * ```typescript
 * const myList = state([1, 2, 3, 4]);
 * stateRemoveWhere(myList, (item) => item % 2 === 0); // Removes even numbers
 * ```
 */
declare const stateRemoveWhere: <T>(state: State<T[]>, cb: (item: T, index: number) => boolean) => void;
/**
 * `stateRemove` removes a specific item from a reactive list.
 * It finds the index of the item in the list and calls `stateRemoveWhere` to remove it.
 *
 * @example
 * ```typescript
 * const myList = state([1, 2, 3, 4]);
 * stateRemove(myList, 2); // Removes the item with value 2
 * ```
 */
declare const stateRemove: <T>(state: State<T[]>, item: T) => void;

declare const genCss: (styleSheet: Record<string, NestedStyleMap> | Array<Record<string, NestedStyleMap>>) => string;
declare const genBlock: (selector: string, style: NestedStyleMap) => string;
declare const genBlockContent: (selector: string, style: NestedStyleMap) => string[];

/** Removes an item from an array if it exists. It returns whether it was removed or not */
declare const removeFromList: <T>(item: T, list?: T[]) => boolean;
declare const camelToDash: (str: any) => any;
declare const isObject: (obj: any) => boolean;
declare const isArray: (obj: any) => boolean;
declare const val: <T>(val: T | ((...args: any) => T), ...args: any[]) => T;
declare const swapItems: (array: any[], from: number, to: number) => any[];
declare const arraysEqual: (a?: any[], b?: any[]) => boolean;
declare const deepEquals: (a: any, b: any) => boolean;
/**
 * Generates a unique ID for a Cardboard tag.
 * If an `idNumber` is provided, it will return a string in the format `c_<idNumber>`.
 * If no `idNumber` is provided, it will generate a random UUID in the format `c_xxxxxxxxxx`.
 *
 * @returns A unique ID string for a Cardboard tag.
 */
declare function generateUID(idNumber?: number): string;
declare function uuidv4(): string;

/**
 * Create a **TextNode** from text, and optionally reacts to a {@link IObservable}, interpolating the defined variables in the text each time the state changes.
 *
 * If you provide a {@link IObservable} as the second argument, the text will act as a template
 * and can reference properties in the state: `$count`, `$someValue`.
 *
 * When the state properties changes, the text node will be automatically updated with the new text.
 * Only the properties that are referenced in the template will be listened to.
 *
 * **NOTE** If you're not interpolating, and dont need to change the text, you can directly pass in a string ('string') instead of (`text('string')`).
 *
 * @see https://github.com/nombrekeff/cardboard-js/wiki/Managing-Text
 *
 * @example
 * ```ts
 * const st = state({ count: 0 });
 *
 * p(text('Raw text!'));
 * p(text(`Count: $count`, st));
 * ```
 */
declare const text: <T extends Record<string, Primitive>, K extends TextObj>(textTemplate: string, obj?: IObservable<T> | K) => Node;

/**
 * @enum {string}
 * @property {string} unchanged - The entry is unchanged.
 * @property {string} added - The entry was added.
 * @property {string} removed - The entry was removed.
 * @property {string} swap - The entry was swapped with another entry.
 */
declare enum DiffState {
    unchanged = "unchanged",
    added = "added",
    removed = "removed",
    swap = "swap"
}
/**
 * Represents a single entry in the diff process.
 * This interface is used to describe the state of an entry in the diff process,
 * including its index, the entry itself, and optionally the target entry and target index if it was swapped.
 * @property {DiffState} state - The state of the entry in the diff process.
 * @property {number} index - The index of the entry in the old data.
 * @property {T} entry - The entry itself.
 * @property {T} targetEntry - The target entry if the entry was swapped
 * @property {number} targetIndex - The index of the target entry if the entry was swapped.
 */
interface DiffEntry<T = unknown> {
    state: DiffState;
    index: number;
    entry: T;
    targetEntry?: T;
    targetIndex?: number;
}
/**
 * Render a {@link CTag} for each item in the provided list.
 *
 * `each` can work with a goold old array, or with a {@link IObservable}.
 * If you provide a `Observable`, the list will update whenever the `Observable` changes.
 *
 * @param observable - An array or an {@link IObservable} that contains the list of items to render.
 * @param builder - A function that takes an item from the list and returns a {@link CTag} to render.
 * @param key - An optional function that returns a unique key for each item in the list. This is used to optimize the rendering process.
 *
 * @see https://github.com/nombrekeff/cardboard-js/wiki/Logic
 *
 * @example
 * Static list
 * ```ts
 * const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'];
 * div(
 *     each(colors, (color) =>
 *        button(color).addStyle('color', color)
 *     )
 * );
 * ```
 *
 * @example
 * Dynamic list
 * ```ts
 *  const colors = state(['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet']);
 *  const selectedColor = state('red');
 *  div(
 *    each(colors, (color) =>
 *        button(color)
 *         .addStyle('color', color)
 *         .stylesIf(equalTo(selectedColor, color), { fontWeight: 'bold' });
 *    )
 *  );
 * ```
 */
declare function each<T>(observable: IObservableOr<T[]>, builder: (val: T, index: number) => CTag, key?: (val: T, index: number) => any): Node;
/**
 * Compares 2 lists, returns an array of {@link DiffEntry} with the operations needed to make in the `oldData` to create the new list.
 * It only returns the actions that are needed, if an element does not need to move, then it's not returned
 *
 * @param newData - The new data to compare against the old data.
 * @param oldData - The old data to compare against the new data.
 * @param key - A function that returns a unique key for each item in the list. This is used to optimize the rendering process.
 * @returns An array of {@link DiffEntry} objects that describe the differences between the two lists.
 */
declare function diffList<T>(newData: T[], oldData: T[], key?: (item: T, index: number) => any): Array<DiffEntry<T>>;

interface LifecycleHooks {
    attached?: Set<() => void>;
    /**
     * Returning a Promise defers physical removal until it resolves.
     * Returning false cancels the removal.
     */
    beforeRemove?: Set<() => boolean | Promise<boolean>>;
    detached?: Set<() => void>;
    teardowns?: Set<() => void>;
    _fired?: {
        attached: boolean;
        detached: boolean;
    };
}
/**
 * Registers a hook for a specific tag.
 * Automatically "upgrades" the tag instance if an interception hook (beforeRemove) is added.
 */
declare function onLifecycle(tag: CTag, type: keyof LifecycleHooks, fn: any): void;
/**
 * Orchestrates the removal process, awaiting any promises returned by beforeRemove hooks.
 */
declare function orchestrateRemoval(tag: CTag, physicalRemoval: () => void): void;
/**
 * Synchronously triggers attached events. Resets detached state for re-attachment.
 */
declare function triggerAttached(el: HTMLElement): void;
/**
 * Synchronously triggers detached events. Resets attached state for re-attachment.
 */
declare function triggerDetached(el: HTMLElement): void;
/**
 * Triggers teardown hooks for final cleanup (for example during destroy).
 */
declare function triggerTeardown(el: HTMLElement): void;

type ExtractValue<T extends Array<IObservable<any>>> = {
    [K in keyof T]: T[K] extends IObservable<infer V> ? V : never;
};
interface ObserveContext {
    tag?: CTag;
}
type ObservationSetup<T> = (dispatch: (newValue: T) => void) => () => void;
type Blueprint<T> = (ctx: ObserveContext) => ObservationSetup<T>;
/**
 * A class that holds a value and notifies whenever the value changes.
 * @see https://github.com/nombrekeff/cardboard-js/wiki/Observers
 */
declare class Observable<T = any> extends CEvent<T> implements IObservable<T> {
    private _value;
    private readonly _destroyer?;
    get value(): T;
    /** Set the value, and dispatch to all listeners. */
    set value(val: T);
    constructor(val: T, destroyer?: () => void);
    valueOf(): T;
    toString(): any;
    /**
     * Add a listener for when this Observable changes.
     */
    changed(callback: (val: T | undefined) => void): this;
    /**
     * Remove a listener for when this Observable changes.
     */
    remove(callback: (val: T | undefined) => void): this;
    /**
     * Set's the new value, and calls all the listeners.
     * You can additionaly set the {@link value} directly.
     */
    dispatch(val: T): this;
    destroy(): void;
    /**
     * Creates a new {@link Observable} whose value is derived from another {@link Observable}.
     * The new {@link Observable} automatically updates and notifies listeners whenever the source {@link Observable} changes.
     *
     * @example
     * ```ts
     * const value = createObservable(2);
     * const isGreater = value.computed((value) => value > 5);
     * // > isGreater == false;
     * value.dispatch(6);
     * // > isGreater == true;
     * ```
     */
    computed: <K>(transform: (val: T) => K) => IObservable<K>;
    /** @see {@link greaterThan} */
    greaterThan: (val?: IObservableOr<number> | number) => IObservable<boolean>;
    /** @see {@link greaterThanOr} */
    greaterThanOr: (val?: IObservableOr<number>) => IObservable<boolean>;
    /** @see {@link lessThan} */
    lessThan: (val?: IObservableOr<number>) => IObservable<boolean>;
    /** @see {@link lessThanOr} */
    lessThanOr: (val?: IObservableOr<number>) => IObservable<boolean>;
    /** @see {@link equalTo} */
    equalTo: <K>(val: IObservableOr<K>) => IObservable<boolean>;
    /** @see {@link notEqualTo} */
    notEqualTo: <K>(val: IObservableOr<K>) => IObservable<boolean>;
    /** @see {@link isEmpty} */
    isEmpty: <K extends WithLength>() => IObservable<boolean>;
    /** @see {@link notEmpty} */
    notEmpty: <K extends WithLength>() => IObservable<boolean>;
    /** @see {@link grab} */
    grab: <K extends keyof T>(key: K, defaultVal?: T[K]) => IObservable<T[K] | undefined>;
}
/**
 * Check if a given object `obj` is a {@link Observable}
 * * @param obj - The object to check.
 * @returns `true` if the object is an {@link Observable}, `false` otherwise
 */
declare const isObservable: (obj: any) => obj is Observable<any>;
/**
 * Create a new {@link Observable}
 * > Consider using `state(...)` instead.
 * @see https://github.com/nombrekeff/cardboard-js/wiki/Observers
 *
 * @param val - The initial value of the observable.
 * @param destroyer - An optional function to call when the observable is destroyed.
 * @returns A new {@link Observable} instance.
 */
declare const createObservable: <T>(val: T, destroyer?: () => void) => IObservable<T>;
/**
 * Creates a new {@link Observable} whose value is derived from another {@link Observable}.
 * The new {@link Observable} automatically updates and notifies listeners whenever the source {@link Observable} changes.
 *
 * @param other - The source {@link Observable} to derive the value from.
 * @param transform - A function that takes the value of the source {@link Observable} and returns the derived value.
 * @return A new {@link Observable} that will contain the derived value.
 *
 * @example
 * ```ts
 * const value = createObservable(2);
 * // Create a derived observable that is true if value > 5
 * const isGreater = compute(value, (v) => v > 5);
 * // isGreater.value == false
 * value.dispatch(6);
 * // isGreater.value == true
 * ```
 */
declare const compute: <T, K>(other: IObservable<T>, transform: (val: T) => K) => IObservable<K>;
/**
 * Computes a new {@link Observable} from multiple observables.
 * The new {@link Observable} will automatically update and notify listeners whenever any of the source observables change.
 *
 * @param observables - An array of source {@link Observable}s to derive the value from.
 * @param transform - A function that takes the values of the source observables and returns the derived value.
 * @returns A new {@link Observable} that will contain the derived value.
 */
declare const computeMultiple: <T extends IObservable[], K>(observables: [...T], transform: (...v: [...ExtractValue<T>]) => K) => IObservable<K>;
/**
 * Creates an IObservable from any observation blueprint (events, timers, etc.)
 */
declare const observe: <T>(blueprint: Blueprint<T>, initialValue?: T, context?: ObserveContext) => IObservable<T>;
/** Returns the value from an observable. Convenience method if you prefer it instead of `observable.value` */
declare const getValue: <T>(val: IObservableOr<T>) => T;
/** {@link compute} an observable and return a new {@link Observable} indicating if the value is greater than `val` */
declare const greaterThan: (observable: IObservable<number>, val?: IObservable<number> | number) => IObservable<boolean>;
/** {@link compute} an observable and return a new {@link Observable} indicating if the value is greater than or equal `val` */
declare const greaterThanOr: (observable: IObservable<number>, val?: IObservableOr<number>) => IObservable<boolean>;
/** {@link compute} an observable and return a new {@link Observable} indicating if the value is less than `val` */
declare const lessThan: (observable: IObservable<number>, val?: IObservableOr<number>) => IObservable<boolean>;
/** {@link compute} an observable and return a new {@link Observable} indicating if the value is less than or equal `val` */
declare const lessThanOr: (observable: IObservable<number>, val?: IObservableOr<number>) => IObservable<boolean>;
/** {@link compute} an observable and return a new {@link Observable} indicating if the value is equal to `val` */
declare const equalTo: <T>(observable: IObservable<T>, val: IObservableOr<T>) => IObservable<boolean>;
/** {@link compute} an observable and return a new {@link Observable} indicating if the value is NOT equal to `val` */
declare const notEqualTo: <T>(observable: IObservable<T>, val: IObservableOr<T>) => IObservable<boolean>;
/** {@link compute} an observable and return a new {@link Observable} indicating if the value is NOT empty */
declare const isEmpty: <T extends WithLength>(observable: IObservable<T>) => IObservable<boolean>;
/** {@link compute} an observable and return a new {@link Observable} indicating if the value is NOT empty */
declare const notEmpty: <T extends WithLength>(observable: IObservable<T>) => IObservable<boolean>;
/** {@link compute} an observable and return a new {@link Observable} that is equal to some property of the original {@link Observable} */
declare const grab: <T, K extends keyof T>(observable: IObservable<T>, key: K, defaultVal?: T[K]) => IObservable<T[K] | undefined>;

/**
 * List of all HTML tag functions. From `div` to `abbr` :)
 * If you want to create any other tag, use the {@link tag} function.
 *
 * @type {AllTags}
 * @example
 * ```ts
 * const { div, p, abbr, img, style, ... } = allTags;
 * ```
 */
declare const allTags: AllTags;

/**
 * It initializes the framework & makes the body tag the mount point ({@link mountPoint}).
 * You can pass in a selector for an element you want to be the default tag ("body" by default).
 */
declare const init: (options?: {
    selector: string;
}) => CTag;
declare const version = "0.1.0";

/**
 * Chaining Extensions for CTag
 *
 * This module adds methods to CTag's prototype to enable chaining of reactive utilities.
 * Each method is implemented as a wrapper around the core logic defined in ext/reactivity.ts.
 *
 * The process involves:
 * 1. Module Augmentation: We declare new methods on the CTag interface so that TypeScript recognizes them.
 * 2. Prototype Injection: We assign the actual implementations to CTag's prototype, allowing for chaining.
 * 3. Core Logic Extraction: The core logic for each method is defined in ext/reactivity.ts, and we simply call those functions here.
 *
 * This separation of concerns allows us to keep the core logic of our reactive utilities in one place (ext/reactivity.ts) while still providing a clean and intuitive API for users through method chaining on CTag instances.
 */
declare module '../../tag.js' {
    interface CTag {
        /** Observes changes on the CTag using the provided Blueprint and returns an IObservable. */
        observe<T>(setup: Blueprint<T>, initialValue?: T): IObservable<T>;
        /** Consumes an observable and executes the provided callback on changes. */
        consume<T>(observable: IObservable<T>, onChange: (self: CTag, val?: T) => void): this;
        /** Conditionally applies CSS classes to the CTag based on the value of an observable. */
        classIf<T>(obs: IObservable<T>, classes: string[] | ((self: CTag) => string[]), invert?: boolean): this;
        /** Conditionally removes CSS classes from the CTag based on the value of an observable. */
        classIfNot<T>(obs: IObservable<T>, classes: string[] | ((self: CTag) => string[])): this;
        /** Executes callbacks based on the value of an observable. */
        doIf<T>(observable: IObservable<T>, ifTrue: (value?: T) => void, ifFalse: (value?: T) => void, invert?: boolean): this;
        doIfNot<T>(observable: IObservable<T>, ifTrue: (value?: T) => void, ifFalse: (value?: T) => void): this;
        hideIf<T>(observable: IObservable<T>, invert?: boolean): this;
        hideIfNot<T>(observable: IObservable<T>): this;
        textIf<T>(observable: IObservable<T>, text: string | ((self: CTag) => string), elseText?: string | ((self: CTag) => string), invert?: boolean): this;
        textIfNot<T>(observable: IObservable<T>, text: string | ((self: CTag) => string), elseText?: string | ((self: CTag) => string)): this;
        attrIf<T>(observable: IObservable<T>, attr: CommonAttributes, value?: string | ((self: CTag) => string), invert?: boolean): this;
        attrIfNot<T>(observable: IObservable<T>, attr: CommonAttributes, value?: string | ((self: CTag) => string)): this;
        disableIf<T>(observable: IObservable<T>, invert?: boolean): this;
        disableIfNot<T>(observable: IObservable<T>): this;
        styleIf<T>(observable: IObservable<T>, style: string, value?: string | ((self: CTag) => string), invert?: boolean): this;
        styleIfNot<T>(observable: IObservable<T>, style: string, value?: string | ((self: CTag) => string)): this;
        stylesIf<T>(observable: IObservable<T>, styles: StyleMap | ((self: CTag) => StyleMap), invert?: boolean): this;
        stylesIfNot<T>(observable: IObservable<T>, styles: StyleMap | ((self: CTag) => StyleMap)): this;
        text<T extends Record<string, Primitive>, K extends TextObj, J extends string>(textTemplate?: string, obj?: IObservable<T> | K): J extends string ? this : string;
    }
}

declare module "../../types.js" {
    interface TagChildRegistry {
        observable: IObservable<any>;
    }
}
/**
 * Contextual Event Blueprint
 */
declare const event: <K extends keyof HTMLElementEventMap, R>(evtName: K | string, mapFn: (evt: HTMLElementEventMap[K]) => R) => Blueprint<R>;
/**
 * Standard Timer Blueprint
 */
declare const timer: (ms: number, mapFn?: (tick: number) => any) => Blueprint<number>;
/**
 * Creates a TagObservationSetup that uses the IntersectionObserver API to observe the visibility of the CTag and dispatches a boolean indicating whether it's intersecting or not.
 * The `options` parameter allows you to customize the IntersectionObserver behavior (e.g., root, rootMargin, threshold).
 */
declare const intersection: (options?: IntersectionObserverInit) => Blueprint<boolean>;
declare const consume: <T>(observable: IObservable<T>, onChange: (self: CTag, newValue?: T) => void) => (tag: CTag) => void;
declare const classIf: <T>(observable: IObservable<T>, classes: string[] | ((self: CTag) => string[]), invert?: boolean) => (tag: CTag) => void;
declare const classIfNot: <T>(observable: IObservable<T>, classes: string[] | ((self: CTag) => string[])) => (tag: CTag) => void;
declare const doIf: <T>(observable: IObservable<T>, ifTrue: (value?: T) => void, ifFalse: (value?: T) => void, invert?: boolean) => (tag: CTag) => void;
declare const doIfNot: <T>(observable: IObservable<T>, ifTrue: (value?: T) => void, ifFalse: (value?: T) => void) => (tag: CTag) => void;
declare const hideIf: <T>(observable: IObservable<T>, invert?: boolean) => (tag: CTag) => void;
declare const hideIfNot: <T>(observable: IObservable<T>) => (tag: CTag) => void;
declare const textIf: <T>(observable: IObservable<T>, textValue: string | ((self: CTag) => string), elseText?: string | ((self: CTag) => string), invert?: boolean) => (tag: CTag) => void;
declare const textIfNot: <T>(observable: IObservable<T>, textValue: string | ((self: CTag) => string), elseText?: string | ((self: CTag) => string)) => (tag: CTag) => void;
declare const attrIf: <T>(observable: IObservable<T>, attr: CommonAttributes, value?: string | ((self: CTag) => string), invert?: boolean) => (tag: CTag) => void;
declare const attrIfNot: <T>(observable: IObservable<T>, attr: CommonAttributes, value?: string | ((self: CTag) => string)) => (tag: CTag) => void;
declare const disableIf: <T>(observable: IObservable<T>, invert?: boolean) => (tag: CTag) => void;
declare const disableIfNot: <T>(observable: IObservable<T>) => (tag: CTag) => void;
declare const styleIf: <T>(observable: IObservable<T>, style: string, value?: string | ((self: CTag) => string), invert?: boolean) => (tag: CTag) => void;
declare const styleIfNot: <T>(observable: IObservable<T>, style: string, value?: string | ((self: CTag) => string)) => (tag: CTag) => void;
declare const stylesIf: <T>(observable: IObservable<T>, styles: StyleMap | ((self: CTag) => StyleMap), invert?: boolean) => (tag: CTag) => void;
declare const stylesIfNot: <T>(observable: IObservable<T>, styles: StyleMap | ((self: CTag) => StyleMap)) => (tag: CTag) => void;
/**
 * Binds a reactive text template to the tag.
 * Overwrites all current children/text in the tag.
 */
declare const template: <T extends Record<string, Primitive>, K extends TextObj>(textTemplate: string, obj: IObservable<T> | K) => (tag: CTag) => void;

declare function addClass(this: CTag, ...classes: string[]): CTag;
declare function setClassName(this: CTag, className: string): CTag;
declare function rmClass(this: CTag, ...classes: string[]): CTag;
declare function hasClass(this: CTag, ...classes: string[]): boolean;
declare function replaceClass(this: CTag, targetClass: string, replaceClass: string): CTag;
declare function toggleClass(this: CTag, targetClass: string): CTag;
declare function addStyle(this: CTag, styleName: string, value: string): CTag;
declare function rmStyle(this: CTag, ...styleNames: string[]): CTag;
declare function hasStyle(this: CTag, styleName: string): boolean;
declare function setStyle(this: CTag, styles: StyleMap): CTag;
declare function styled(this: CTag, stylesheet: NestedStyleMap | undefined, className?: string): CTag;

declare module "../../tag.js" {
    interface CTag {
        addClass: typeof addClass;
        setClassName: typeof setClassName;
        rmClass: typeof rmClass;
        toggleClass: typeof toggleClass;
        hasClass: typeof hasClass;
        replaceClass: typeof replaceClass;
        addStyle: typeof addStyle;
        rmStyle: typeof rmStyle;
        setStyle: typeof setStyle;
        styled: typeof styled;
        hasStyle: typeof hasStyle;
    }
}

export { type AlignContentOptions, type AlignItemsOptions, type AllTags, type AtLeastOne, type BackgroundImageOptions, type Blueprint, CEvent, CMappedEvent, CTag, type CardboardContext, type ChildTransformer, type ColorOptions, type CommonAttributes, type CommonOptions, type DiffEntry, DiffState, type DisplayOptions, type EventCallback, type EventMap, type EventName, type ExtractValue, type FlexDirectionOptions, type FontStyleOptions, type FontWeightOptions, type IObservable, type IObservableOr, type KeysOf, type LifecycleHooks, type NamedColor, type NestedStyleMap, type NoOp, Observable, type ObservationSetup, type ObserveContext, type PPositionOptions, type PickArgType, type PickPropertyValues, type Primitive, type ScopedCallback, type State, type StyleManager, type StyleMap, type StyleSet, type Suffix, type Suffixer, type TagBuilder, type TagChild, type TagChildRegistry, type TagChildren, type TagConfig, type TagName, type TextObj, type TransformOptions, type ValidTagName, type WithLength, addClass, addStyle, allTags, arraysEqual, attrIf, attrIfNot, camelToDash, checkInitialized, classIf, classIfNot, clearMountPoints, compute, computeMultiple, consume, context, createGlobalObserver, createObservable, deepEquals, diffList, disableIf, disableIfNot, doIf, doIfNot, each, equalTo, event, genBlock, genBlockContent, genCss, generateUID, getMountPoint, getValue, grab, greaterThan, greaterThanOr, hasClass, hasStyle, hideIf, hideIfNot, init, intersection, isArray, isEmpty, isInitialized, isObject, isObservable, lessThan, lessThanOr, listState, mappedEvent, mountPoint, notEmpty, notEqualTo, observe, onLifecycle, orchestrateRemoval, removeFromList, replaceClass, resetMountPoints, restoreMountPoint, rmClass, rmStyle, setClassName, setStyle, singleEvent, state, stateAdd, stateAddAt, stateRemove, stateRemoveWhere, styleIf, styleIfNot, styled, stylesIf, stylesIfNot, swapItems, tag, template, text, textIf, textIfNot, timer, toggleClass, triggerAttached, triggerDetached, triggerTeardown, uuidv4, val, version, withMountPoint };
