import { CanvasElements } from '@/store/editor.store';

export interface TemplateContent {
  canvasElements?: CanvasElements[];
  canvasBackElements?: CanvasElements[];
  backgroundColor?: string;
  backgroundColorBack?: string;
}
