export interface CardContent {
  canvasElements?: CanvasElements[];
  canvasBackElements?: CanvasElements[];
  backgroundColor?: string;
  backgroundColorBack?: string;
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
    | 'html'; // 추후에 작업하실 때 추가해주세요
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
  previewMode?: boolean;
  align?: 'left' | 'center' | 'right' | 'both';
  verticalAlign?: 'top' | 'middle' | 'bottom';
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

export type CanvasElements =
  | TextElement
  | UploadElement
  | QrElement
  | SocialElement
  | HtmlElement
  | ImageElement;
