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

/**
 * This is the main class in Cardboard. Even though Cardboard is designed to not need to use this class directly, you can if you want.
 *
 * CTag contains a reference to an HTMLElement, its parent, and provides a set of methods to interact with it.
 */
declare class CTag {
    /** Reference to the HTMLElement that this @type {CTag} represents */
    el: HTMLElement & {
        remove: () => (Promise<boolean> | any);
    };
    private _visible;
    get visible(): boolean;
    set visible(newValue: boolean);
    /**
     * Any function inside this array, will be called whenever the CTag is {@link destroy}ed
     * Used to remove HTML Event Listeners and Observable listeners
     */
    private readonly _destroyers;
    /** @param parent Reference to the parent @type {CTag} of this element */
    private _parent?;
    get parent(): CTag | undefined;
    set parent(newParent: CTag);
    /** Holds the list of all children, the ones that are currently in the DOM and those that are not */
    private _children;
    private _cachedChildren;
    get children(): Node[];
    private readonly _meta;
    get value(): any;
    setValue(newValue: string): this;
    get checked(): any;
    setChecked(checked: boolean): this;
    get style(): CSSStyleDeclaration;
    get className(): string;
    get classList(): DOMTokenList;
    /** Gets the value of the element and clears the value */
    get consumeValue(): any;
    get id(): string;
    setId(id: string): this;
    constructor(arg0: TagName | HTMLElement, children?: TagChildren, mountToParent?: boolean);
    /** Sets the children, removes previous children  */
    setChildren(children: TagChildren): this;
    append(...children: TagChildren): this;
    prepend(...children: TagChildren): this;
    /**
     * If the element is currently hidden it will add this element to the page wherever it's supposed to be.
     * I will be placed exactly in the correct position, even if there are other elements hidden.
     */
    show(): Promise<boolean>;
    /** Hide this element (removed from DOM) */
    hide(): Promise<void>;
    /** Whenever the observable changes, it will call the consumer */
    consume<T>(observable: IObservable<T>, consumer: (self: CTag, newValue?: T) => void): this;
    /**
     * When the observable changes, it will call {ifTrue} when the observable is true. Or {ifFalse} when the observable is false.
     * If {invert} is set to true, the condition will be inversed, but you can also use {@link doIfNot}
     */
    doIf<T>(observable: IObservable<T>, ifTrue: (value?: T) => void, ifFalse: (value?: T) => void, invert?: boolean): this;
    /**
     * The oposite of {this.doIf}
     * When the observable changes, it will call {ifTrue} if the observable is false. Or {ifFalse} if the observable is true.
     */
    doIfNot<T>(observable: IObservable<T>, ifTrue: (value: T) => void, ifFalse: (value: T) => void): this;
    /**
     * Hide this element when the consumer is truthy. Updates whenever the observable changes.
     * If {invert} is set to true, the condition will be inversed, but you can also use {@link hideIfNot}
     */
    hideIf<T>(observable: IObservable<T>, invert?: boolean): this;
    /** Hide this element when the consumer is falsy. Updates whenever the observable changes. */
    hideIfNot<T>(observable: IObservable<T>): this;
    /**
     * Adds classes to the element when the consumer is truthy. Updates whenever the observable changes.
     * You can pass in an array of classes, or a function that returns a list of classes.
     * If {invert} is set to true, the condition will be inversed, but you can also use {@link classIfNot}
     */
    classIf<T>(observable: IObservable<T>, classes: string[] | ((self: CTag) => string[]), invert?: boolean): this;
    /**
     * Adds classes to the element when the consumer is falsy. Updates whenever the observable changes.
     * You can pass in an array of classes, or a function that returns a list of classes.
     * For the oposite you can also use {@link classIf}
     */
    classIfNot<T>(observable: IObservable<T>, classes: string[] | ((self: CTag) => string[])): this;
    /**
     * Sets {text} when the consumer is true, and sets {elseText (default='')} when the consumer is false.
     * Both {text} and {elseText} can be a string or a function that returns a string.
     * Updates whenever the observable changes.
     * If {invert} is set to true, the condition will be inversed, but you can also use {@link textIfNot}
     */
    textIf<T>(observable: IObservable<T>, text: string | ((self: CTag) => string), elseText?: string | ((self: CTag) => string), invert?: boolean): this;
    /**
     * Sets {text} when the consumer is falsy, and sets {elseText (default='')} when the consumer is truthy.
     * Both {text} and {elseText} can be a string or a function that returns a string.
     * Updates whenever the observable changes.
     */
    textIfNot<T>(observable: IObservable<T>, text: string | ((self: CTag) => string), elseText?: string | ((self: CTag) => string)): this;
    /**
     * Add attribute to the element when the consumer is truthy. Updates whenever the observable changes.
     * {value} can be a string or a function that returns a string.
     * If {invert} is set to true, the condition will be inversed, but you can also use {@link attrIfNot}
     */
    attrIf<T>(observable: IObservable<T>, attr: CommonAttributes, value?: string | ((self: CTag) => string), invert?: boolean): this;
    /**
     * Add attribute to the element when the consumer is falsy. Updates whenever the observable changes.
     * {value} can be a string or a function that returns a string.
     * If {invert} is set to true, the condition will be inversed
     */
    attrIfNot<T>(observable: IObservable<T>, attr: CommonAttributes, value?: string | ((self: CTag) => string)): this;
    /**
     * Disable this element when the consumer is truthy. Updates whenever the observable changes.
     * If {invert} is set to true, the condition will be inversed, but you can also use {@link disableIfNot}
     */
    disableIf<T>(observable: IObservable<T>, invert?: boolean): this;
    /** Disable this element when the consumer is falsy. Updates whenever the observable changes. */
    disableIfNot<T>(observable: IObservable<T>): this;
    /**
     * Add style to the element when the consumer is truthy. Updates whenever the observable changes.
     * If {invert} is set to true, the condition will be inversed, but you can also use {@link styleIfNot}
     * {value} can be a string or a function that returns a string.
     */
    styleIf<T>(observable: IObservable<T>, style: string, value?: string | ((self: CTag) => string), invert?: boolean): this;
    /**
     * Add style to the element when the consumer is falsy. Updates whenever the observable changes.
     * {value} can be a string or a function that returns a string.
     */
    styleIfNot<T>(observable: IObservable<T>, style: string, value?: string | ((self: CTag) => string)): this;
    /**
     * Add multiple styles to the element when the consumer is truthy. Updates whenever the observable changes.
     * {styles} can be a {@link StyleMap} or a function that returns a {@link StyleMap}.
     * If {invert} is set to true, the condition will be inversed, but you can also use {@link stylesIfNot}
     */
    stylesIf<T>(observable: IObservable<T>, styles: StyleMap | ((self: CTag) => StyleMap), invert?: boolean): this;
    /**
     * Add multiple styles to the element when the consumer is falsy. Updates whenever the observable changes.
     * {styles} can be a {@link StyleMap} or a function that returns a {@link StyleMap}.
     * For the oposite use  {@link stylesIf}
     */
    stylesIfNot<T>(observable: IObservable<T>, styles: StyleMap | ((self: CTag) => StyleMap)): this;
    /**
     * Listen to an event on the element. Like addEventListener.
     */
    listen<K extends keyof HTMLElementEventMap>(tag: CTag, evt: K, consumer: (self: CTag, other: CTag, evt: HTMLElementEventMap[K]) => void): CTag;
    /**
     * If {newText} is provided, it sets the `textContent` of the element.
     * If {newText} is provided, and a state is provided. It will use the {newText} as a template,
     * that will be interpolated with the values in the state, each time the state changes. It acts like {@link text}
     *
     * If no argument is provided, it returns the `textContent` of the element.
     * @see https://github.com/nombrekeff/cardboard-js/wiki/Managing-Text
     */
    text<T extends Record<string, Primitive>, K extends TextObj, J extends string>(textTemplate?: string, obj?: IObservable<T> | K): J extends string ? CTag : string;
    /**
     * Configure the element in a single call by passing @param {TagConfig} c
     * instead of having to call a method for each property you want to changes
     */
    config(c: TagConfig): this;
    /** Add classes to the elements class list */
    addClass(...classes: string[]): this;
    /** Set the elements class name */
    setClassName(className: string): this;
    /** Remove classes from class list */
    rmClass(...classes: string[]): this;
    /** Check if classes are present in this element */
    hasClass(...classes: string[]): boolean;
    /** Replace a class with another */
    replaceClass(targetClass: string, replaceClass: string): this;
    /** Toggle a class. If it's present it's removed, if it's not present its added. */
    toggleClass(targetClass: string): CTag;
    /** Add a single style */
    addStyle<K extends CssProperty>(property: K, value: PickPropertyValues<K>): this;
    /** Set multiple styles at once */
    setStyle(styles: StyleMap): this;
    /** Remove styles */
    rmStyle(...styleNames: string[]): this;
    /** Check if this element has styles */
    hasStyle(...styles: CssProperty[]): boolean;
    /** Adds a set of attributes to the element */
    setAttrs(attrs: Record<string, string | undefined>): this;
    /** Adds a single attribute to the element */
    addAttr(key: CommonAttributes, value?: string): this;
    /** Remove attributes from the element */
    rmAttr(...attrs: CommonAttributes[]): this;
    /** Check if this element has attributes */
    hasAttr(...attr: CommonAttributes[]): boolean;
    /** Get an attributes value */
    getAttr(attr: CommonAttributes): any;
    /**
     * Returns a {@link IObservable} that fires when the Event {@link evtName} is fired in this element
     *
     * The return value of {@link fn} will be passed to the listeners of the {@link IObservable}
     */
    when<K extends keyof HTMLElementEventMap>(evtName: K | string, fn: (self: CTag, evt: HTMLElementEventMap[K]) => any): IObservable<any>;
    /** Add an event listener for a particular event */
    on<K extends keyof HTMLElementEventMap>(evtName: K | string, fn: (tag: CTag, evt: HTMLElementEventMap[K]) => void): this;
    /** Add an event listener for a particular event that will only fire once */
    once<K extends keyof HTMLElementEventMap>(evtName: K & string, fn: (tag: CTag, evt: HTMLElementEventMap[K]) => void): this;
    /** Add a **click** event listener */
    clicked(fn: (tag: CTag, evt: MouseEvent) => void): this;
    /** Add a **keypress** event listener */
    keyPressed(fn: (tag: CTag, evt: KeyboardEvent) => void, key?: string): this;
    /** Add a **change** event listener */
    changed(fn: (tag: CTag, evt: Event) => void): this;
    /** Add a **submit** event listener */
    submited(fn: (tag: CTag, evt: SubmitEvent) => void): this;
    /**
     * Remove element from the DOM, but keep data as is. Can then be added again.
     * To fully remove the element use {@link destroy}
     */
    remove(): Promise<this>;
    /**
     * Destroy the element, should not be used afterwards
     */
    destroy(): void;
    /**
     * Clears the `value` of the element. If you are getting the value and then clearing, consider using {@link consumeValue}
     */
    clear(): this;
    /** Disable the element */
    disable(): this;
    /** Enable the element */
    enable(): this;
    /** Set whether the element should be disabled or not */
    setDisabled(disabled: boolean): this;
    /** Query a child in this element (in the DOM) */
    q(selector: any): CTag | undefined;
    /** Find a child in this element (in the DOM or NOT) */
    find(predicate: (el: TagChild) => boolean): string | Node | CTag | IObservable<any> | undefined;
    findTag(predicate: (el: CTag) => boolean): CTag | undefined;
    private _childrenFilterPredicate;
    private _getElementForChild;
    private _observer;
    private _getChildren;
    private _cacheChildren;
    private _mapChildren;
}
/**
 * This function can do the following based on the first argument:
 * * create a tag if you provide a tag name: (`div`, `abbr`, `custom-tag`, ...),
 * * wrap around an existing element in the page if you pass in a selector: (`'(body)'`, `'(#id)'`, `'(.class)'`), any selector is allowed.
 * * wrap around an element passed in
 *
 * Then it can receive a list of children to be added.
 * Receives a third argument for mounting this tag to the currently mounted tag ({@link context.mountPoint}).
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
type TagChildren = TagChild[];
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
  changed: (callback: (newValue: T) => void) => IObservable<T>;
  remove: (callback: (newValue: T) => void) => IObservable<T>;
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
type TagChild = string | CTag | HTMLElement | Node | IObservable<any>;
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

type PickArgType<T> = T extends 'style' ? StyleSet[] : TagChildren;
type AllTags = {
  [key in ValidTagName]: ((...children: PickArgType<key>) => CTag) & {
    /**
     * This will mount (append) this tag to the currently mounted tag if there is one.
     */
    mount: (...children: PickArgType<key>) => CTag;
  };
};

type AtLeastOne<T> = {
  [K in keyof T]-?: Partial<Pick<T, K>> & Partial<Pick<T, Exclude<keyof T, K>>>
}[keyof T]

type StyleManager$1 = {
  add: (styleSheet: Record<string, NestedStyleMap> | Array<Record<string, NestedStyleMap>>) => void;
}

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
    protected _listeners: Array<(data: T | undefined) => void>;
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
    private _listeners;
    listen(evt: string, fn: (data?: T) => void): void;
    remove(evt: string, fn: (data?: T) => void): void;
    dispatch(evt: string, data?: T): void;
    destroy(): void;
}
declare const singleEvent: <T>() => CEvent<T>;
declare const mappedEvent: <T>() => CMappedEvent<T>;

type CardboardContext = {
    intersectionObserver?: IntersectionObserver;
    styleManager?: StyleManager$1;
    mountPoint?: CTag;
    mountPointHistory: CTag[];
    observer?: {
        onAdded: CEvent<Node>;
        onRemoved: CEvent<Node>;
    };
    initialized?: boolean;
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
    changed(callback: (val: T) => void): this;
    /**
    * Remove a listener for when this Observable changes.
    */
    remove(callback: (val: T) => void): this;
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
    computed: <K>(transform: (val: T) => K) => any;
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
/** Check if a given object {@link obj} is a {@link Observable}  */
declare const isObservable: (obj: any) => obj is Observable<any>;
/**
 * Create a new {@link Observable}
 * > Consider using `state(...)` instead.
 * @see https://github.com/nombrekeff/cardboard-js/wiki/Observers
 */
declare const createObservable: <T>(val: T, destroyer?: () => void) => IObservable<T>;
/**
 * Creates a new {@link Observable} whose value is derived from another {@link Observable}.
 * The new {@link Observable} automatically updates and notifies listeners whenever the source {@link Observable} changes.
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
type ExtractValue<T extends Array<IObservable<any>>> = {
    [K in keyof T]: T[K] extends IObservable<infer V> ? V : never;
};
declare const computeMultiple: <T extends IObservable[], K>(observables: [...T], transform: (...v: [...ExtractValue<T>]) => K) => IObservable<K>;
declare const getValue: <T>(val: IObservableOr<T>) => T;
/** {@link compute} an observable and return a new {@link Observable} indicating if the value is greater than {@link val} */
declare const greaterThan: (observable: IObservable<number>, val?: IObservable<number> | number) => IObservable<boolean>;
/** {@link compute} an observable and return a new {@link Observable} indicating if the value is greater than or equal {@link val} */
declare const greaterThanOr: (observable: IObservable<number>, val?: IObservableOr<number>) => IObservable<boolean>;
/** {@link compute} an observable and return a new {@link Observable} indicating if the value is less than {@link val} */
declare const lessThan: (observable: IObservable<number>, val?: IObservableOr<number>) => IObservable<boolean>;
/** {@link compute} an observable and return a new {@link Observable} indicating if the value is less than or equal {@link val} */
declare const lessThanOr: (observable: IObservable<number>, val?: IObservableOr<number>) => IObservable<boolean>;
/** {@link compute} an observable and return a new {@link Observable} indicating if the value is equal to {@link val} */
declare const equalTo: <T>(observable: IObservable<T>, val: IObservableOr<T>) => IObservable<boolean>;
/** {@link compute} an observable and return a new {@link Observable} indicating if the value is NOT equal to {@link val} */
declare const notEqualTo: <T>(observable: IObservable<T>, val: IObservableOr<T>) => IObservable<boolean>;
/** {@link compute} an observable and return a new {@link Observable} indicating if the value is NOT empty */
declare const isEmpty: <T extends WithLength>(observable: IObservable<T>) => IObservable<boolean>;
/** {@link compute} an observable and return a new {@link Observable} indicating if the value is NOT empty */
declare const notEmpty: <T extends WithLength>(observable: IObservable<T>) => IObservable<boolean>;
/** {@link compute} an observable and return a new {@link Observable} that is equal to some property of the original {@link Observable} */
declare const grab: <T, K extends keyof T>(observable: IObservable<T>, key: K, defaultVal?: T[K]) => IObservable<T[K] | undefined>;

declare class StyleManager {
    styleTag: CTag;
    rules: Set<string>;
    generatedIdsCount: number;
    constructor();
    add(styleSheet: Record<string, NestedStyleMap> | Array<Record<string, NestedStyleMap>>): void;
}

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
    remove: any;
    removeWhere: any;
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

declare enum DiffState {
    unchanged = "unchanged",
    added = "added",
    removed = "removed",
    swap = "swap"
}
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
declare function each<T>(observable: IObservableOr<T[]>, builder: (val: T) => CTag, key?: (val: T) => any): Node;
/**
 * Compares 2 lists, returns an array of {@link DiffEntry} with the operations needed to make in the {@link oldData} to create the new list.
 * It only returns the actions that are needed, if an element does not need to move, then it's not returned
 *
 * @param newData - The new data to compare against the old data.
 * @param oldData - The old data to compare against the new data.
 * @param key - A function that returns a unique key for each item in the list. This is used to optimize the rendering process.
 */
declare function diffList<T>(newData: T[], oldData: T[], key?: (item: T) => any): Array<DiffEntry<T>>;

/**
 * Will call {mounted} when the element is added to the DOM.
 * And will call {beforeUnmounted} before the element is removed from the DOM.
 * Finally will call {onUnmounted} when the element is removed from the DOM.
 */
declare function onLifecycle(tag: CTag, onMounted?: (tag: CTag) => Promise<boolean> | boolean, onUnmounted?: (tag: CTag) => void, beforeUnmounted?: (tag: CTag) => Promise<boolean> | boolean): void;
/**
 * `withLifecycle` is a utility function that adds lifecycle hooks to a Cardboard tag.
 *
 * Will call `handler.mounted` when the element is added to the DOM.
 * Then call `handler.beforeUnmount` **before** the element is removed from the DOM.
 * Finally call `handler.unmounted` **when** the element is removed from the DOM.
 *
 * @example
 * ```typescript
 * const myTag = withLifecycle(
 *   div('Hello World'),
 *   {
 *     mounted: (tag) => {
 *       console.log('Mounted:', tag);
 *       return true; // or false to prevent mounting
 *     },
 *     unmounted: (tag) => {
 *       console.log('Unmounted:', tag);
 *     },
 *     beforeUnmount: (tag) => {
 *       console.log('Before Unmount:', tag);
 *       return true; // or false to prevent unmounting
 *     },
 *    }
 *  );
 */
declare const withLifecycle: (tag: CTag, handler: AtLeastOne<{
    mounted?: (tag: CTag) => Promise<boolean> | boolean;
    unmounted?: (tag: CTag) => void;
    beforeUnmounted?: (tag: CTag) => Promise<boolean> | boolean;
}>) => CTag;

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
declare const Cardboard: {
    init: (options?: {
        selector: string;
    }) => CTag;
    version: string;
    StyleManager: typeof StyleManager;
    allTags: AllTags;
    context: CardboardContext;
    isInitialized: () => boolean;
    checkInitialized: () => void;
    getMountPoint: () => CTag | undefined;
    mountPoint: (tag: CTag) => CTag;
    restoreMountPoint: () => void;
    clearMountPoints: () => void;
    resetMountPoints: () => void;
    withMountPoint: (tag: CTag, scopedCallback: ScopedCallback) => void;
    createGlobalObserver: () => {
        onAdded: CEvent<Node>;
        onRemoved: CEvent<Node>;
    };
    onLifecycle(tag: CTag, onMounted?: (tag: CTag) => Promise<boolean> | boolean, onUnmounted?: (tag: CTag) => void, beforeUnmounted?: (tag: CTag) => Promise<boolean> | boolean): void;
    withLifecycle: (tag: CTag, handler: AtLeastOne<{
        mounted?: (tag: CTag) => Promise<boolean> | boolean;
        unmounted?: (tag: CTag) => void;
        beforeUnmounted?: (tag: CTag) => Promise<boolean> | boolean;
    }>) => CTag;
    Observable: typeof Observable;
    isObservable: (obj: any) => obj is Observable<any>;
    createObservable: <T>(val: T, destroyer?: () => void) => IObservable<T>;
    compute: <T, K>(other: IObservable<T>, transform: (val: T) => K) => IObservable<K>;
    computeMultiple: <T extends IObservable[], K>(observables: [...T], transform: (...v: [...ExtractValue<T>]) => K) => IObservable<K>;
    getValue: <T>(val: IObservableOr<T>) => T;
    greaterThan: (observable: IObservable<number>, val?: IObservable<number> | number) => IObservable<boolean>;
    greaterThanOr: (observable: IObservable<number>, val?: IObservableOr<number>) => IObservable<boolean>;
    lessThan: (observable: IObservable<number>, val?: IObservableOr<number>) => IObservable<boolean>;
    lessThanOr: (observable: IObservable<number>, val?: IObservableOr<number>) => IObservable<boolean>;
    equalTo: <T>(observable: IObservable<T>, val: IObservableOr<T>) => IObservable<boolean>;
    notEqualTo: <T>(observable: IObservable<T>, val: IObservableOr<T>) => IObservable<boolean>;
    isEmpty: <T extends WithLength>(observable: IObservable<T>) => IObservable<boolean>;
    notEmpty: <T extends WithLength>(observable: IObservable<T>) => IObservable<boolean>;
    grab: <T, K extends keyof T>(observable: IObservable<T>, key: K, defaultVal?: T[K]) => IObservable<T[K] | undefined>;
    CEvent: typeof CEvent;
    CMappedEvent: typeof CMappedEvent;
    singleEvent: <T>() => CEvent<T>;
    mappedEvent: <T>() => CMappedEvent<T>;
    text: <T extends Record<string, Primitive>, K extends TextObj>(textTemplate: string, obj?: IObservable<T> | K) => Node;
    generateUID(idNumber?: number): string;
    uuidv4(): string;
    removeFromList: <T>(item: T, list?: T[]) => boolean;
    camelToDash: (str: any) => any;
    isObject: (obj: any) => boolean;
    isArray: (obj: any) => boolean;
    val: <T>(val: T | ((...args: any) => T), ...args: any[]) => T;
    swapItems: (array: any[], from: number, to: number) => any[];
    arraysEqual: (a?: any[], b?: any[]) => boolean;
    deepEquals: (a: any, b: any) => boolean;
    genCss: (styleSheet: Record<string, NestedStyleMap> | Array<Record<string, NestedStyleMap>>) => string;
    genBlock: (selector: string, style: NestedStyleMap) => string;
    genBlockContent: (selector: string, style: NestedStyleMap) => string[];
    state: <T>(initialValue: T) => State<T>;
    listState: <T>(initialData: T[]) => {
        readonly list: State<State<T>[]>;
        readonly listValue: State<T>[];
        add: (item: T) => void;
        addAt: (item: T, index: number) => void;
        remove: any;
        removeWhere: any;
        length: IObservable<number>;
    };
    stateAdd: <T>(state: State<T[]>, item: T) => void;
    stateAddAt: <T>(state: State<T[]>, item: T, index: number) => void;
    stateRemoveWhere: <T>(state: State<T[]>, cb: (item: T, index: number) => boolean) => void;
    stateRemove: <T>(state: State<T[]>, item: T) => void;
    CTag: typeof CTag;
    tag: (arg0: string | HTMLElement, children?: TagChildren, mountToParent?: boolean) => CTag;
};

export { type AllTags, type AtLeastOne, CEvent, CMappedEvent, CTag, Cardboard, type CardboardContext, type DiffEntry, DiffState, type EventCallback, type EventMap, type EventName, type ExtractValue, type IObservable, type IObservableOr, type KeysOf, type NestedStyleMap, type NoOp, Observable, type PickArgType, type Primitive, type ScopedCallback, type State, type StyleManager$1 as StyleManager, type StyleMap, type StyleSet, type Suffix, type Suffixer, type TagBuilder, type TagChild, type TagChildren, type TagConfig, type TextObj, type WithLength, allTags, arraysEqual, camelToDash, checkInitialized, clearMountPoints, compute, computeMultiple, context, createGlobalObserver, createObservable, deepEquals, diffList, each, equalTo, genBlock, genBlockContent, genCss, generateUID, getMountPoint, getValue, grab, greaterThan, greaterThanOr, init, isArray, isEmpty, isInitialized, isObject, isObservable, lessThan, lessThanOr, listState, mappedEvent, mountPoint, notEmpty, notEqualTo, onLifecycle, removeFromList, resetMountPoints, restoreMountPoint, singleEvent, state, stateAdd, stateAddAt, stateRemove, stateRemoveWhere, swapItems, tag, text, uuidv4, val, withLifecycle, withMountPoint };
