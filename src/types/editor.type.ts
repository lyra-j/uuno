export interface CardContent {
  canvasElements?: CanvasElements[];
  canvasBackElements?: CanvasElements[];
  backgroundColor?: string;
  backgroundColorBack?: string;
  isTemplate?: boolean;
}

export interface EditorElement {
  id: string;
  type:
    | 'text'
    | 'image'
    | 'element'
    | 'upload'
    | 'background'
    | 'social'
    | 'qr'
    | 'html';
  x: number;
  y: number;
  rotation: number;
}

// 텍스트 요소 인터페이스
export interface TextElement extends EditorElement {
  type: 'text';
  text: string;
  fontSize: number;
  fill: string;
  fontFamily: string;
  isBold?: boolean;
  isItalic?: boolean;
  isUnderline?: boolean;
  isStrike?: boolean;
  width: number;
  padding: number;
  previewMode?: boolean;
  align?: 'left' | 'center' | 'right' | 'justify';
  verticalAlign?: 'top' | 'middle' | 'bottom';
  shadowOpacity: number;
  shadowBlur: number;
  shadowOffsetX: number;
  shadowOffsetY: number;
  shadowColor: string;
  opacity: number;
  stroke: string;
  strokeWidth: number;
}

// 업로드(이미지) 요소 인터페이스
export interface UploadElement extends EditorElement {
  type: 'upload';
  previewUrl: string;
  width: number;
  height: number;
  previewMode?: boolean;
}

//이미지(unsplash) 요소 인터페이스
export interface ImageElement extends EditorElement {
  type: 'image';
  previewUrl: string;
  width: number;
  height: number;
  authorName: string;
  imageLink: string;
  previewMode?: boolean;
}

// qr 요소 인터페이스
export interface QrElement extends EditorElement {
  type: 'qr';
  url: string;
  previewUrl: string;
  width: number;
  height: number;
  previewMode?: boolean;
}
// social 요소 인터페이스
export interface SocialElement extends EditorElement {
  type: 'social';
  icon: string;
  social: string;
  fullUrl: string;
  width: number;
  height: number;
  previewMode?: boolean;
}
export interface HtmlElement extends Omit<EditorElement, 'rotation'> {
  type: 'html';
  social: string;
  previewMode?: boolean;
}

export type LineEndType = 'arrow' | 'circle' | 'rectangle' | 'none';
export type ElementType =
  | 'line'
  | 'arrow'
  | 'circle'
  | 'rectangle'
  | 'regularPolygon'
  | 'star';
export interface ElementsElement extends Omit<EditorElement, 'rotation'> {
  type: 'element';
  points: number[];
  width: number;
  height: number;
  fill?: string;
  elementType: ElementType;
  dash: number[];
  sides?: number;
  radius?: number;
  numPoint?: number;
  innerRadius?: number;
  outerRadius?: number;
  stroke: string;
  strokeWidth: number;
  startDecoration?: LineEndType;
  endDecoration?: LineEndType;
  rotation: number;
}

/**
 * zod 타입
 */
export interface GeneratedQR {
  id: string;
  url: string;
  previewUrl: string;
}

export interface SocialPreview {
  icon: string;
  url: string;
}

export interface FormValues {
  slug: string;
}

export type CanvasElements =
  | TextElement
  | UploadElement
  | QrElement
  | SocialElement
  | HtmlElement
  | ImageElement
  | ElementsElement;

export type ShadowProp =
  | 'shadowOffsetX'
  | 'shadowOffsetY'
  | 'shadowBlur'
  | 'shadowOpacity';
