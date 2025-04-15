import { MAX_ZOOM, MIN_ZOOM } from '@/constants/editor.constant';
import { sideBarStore } from '@/store/editor.sidebar.store';
import Konva from 'konva';

export const handleWheel = (e: Konva.KonvaEventObject<WheelEvent>) => {
  if (!e.evt.ctrlKey) return;
  e.evt.preventDefault();

  const { zoom, setZoom } = sideBarStore.getState();

  const scaleBy = 1.1;
  const direction = e.evt.deltaY > 0 ? -1 : 1;
  const newZoom = zoom * (direction > 0 ? scaleBy : 1 / scaleBy);

  const clampedZoom = Math.min(Math.max(newZoom, MIN_ZOOM), MAX_ZOOM);
  setZoom(clampedZoom);
};
