import { CanvasElements } from './editor.type';
import { Database } from './supabase';

// 카드 콘텐츠의 구조 정의
export interface CardContent {
  canvasElements: CanvasElements[];
  backgroundColor: string | null;
  canvasBackElements: CanvasElements[];
  backgroundColorBack: string | null;
}

// 카드 데이터의 전체 구조 정의
export interface CardData {
  backImgURL: string | null;
  content: CardContent;
  created_at: string;
  frontImgURL: string | null;
  id: string;
  isHorizontal: boolean;
  slug: string;
  status: Database['public']['Enums']['cards_status'] | null;
  template_id: string | null;
  title: string;
  updated_at: string | null;
  user_id: string | null;
}
