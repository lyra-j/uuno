import { TOOLBAR_WIDTH } from '@/constants/editor.constant';

export const calculateToolbarPosition = ({
  x,
  y,
  width,
  height,
  zoom,
}: {
  x: number;
  y: number;
  width: number;
  height: number;
  zoom: number;
}) => {
  return {
    x: x * zoom + (width * zoom) / 2 - TOOLBAR_WIDTH / 2,
    y: y * zoom + height * zoom + 8,
  };
};
