import { CanvasElements } from './editor.type';

export interface TemplateContent {
  canvasElements: CanvasElements[];
  backgroundColor: string | null;
  canvasBackElements: CanvasElements[];
  backgroundColorBack: string | null;
  isTemplate: boolean;
}

export interface TemplateData {
  content: TemplateContent;
  name: string;
  thumbnail: string;
  id: string;
  isHorizontal: boolean;
  style: 'trendy' | 'simple';
}
