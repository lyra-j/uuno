'use client';

import ToolbarDeleteIcon from '@/components/icons/editor/toolbar-delete';
import ToolbarDuplicate from '@/components/icons/editor/toolbar-duplicate';
import ToolBarBottom from '@/components/icons/editor/toolbar-move-bottom';
import ToolbarMoveDown from '@/components/icons/editor/toolbar-move-down';
import ToolBarTop from '@/components/icons/editor/toolbar-move-top';
import ToolbarMoveUp from '@/components/icons/editor/toolbar-move-up';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useEditorStore } from '@/store/editor.store';
import Konva from 'konva';
import { MoreHorizontal } from 'lucide-react';
import { Html } from 'react-konva-utils';
import { v4 as uuidv4 } from 'uuid';

interface ElementToolbarProps {
  shapeRefs: React.MutableRefObject<Record<string, Konva.Node>>;
}

const ElementToolbar = ({ shapeRefs }: ElementToolbarProps) => {
  const canvasElements = useEditorStore((state) =>
    state.isCanvasFront ? state.canvasElements : state.canvasBackElements
  );
  const selectedElementId = useEditorStore((state) => state.selectedElementId);
  const toolbar = useEditorStore((state) => state.toolbar);
  const removeElement = useEditorStore((state) => state.removeElement);
  const setSelectedElementId = useEditorStore(
    (state) => state.setSelectedElementId
  );
  const setSelectedElementType = useEditorStore(
    (s) => s.setSelectedElementType
  );
  const setToolbar = useEditorStore((state) => state.setToolbar);
  const addElement = useEditorStore((state) => state.addElement);
  const moveElement = useEditorStore((state) => state.moveElement);

  if (!selectedElementId || !toolbar) return null;

  const handleDelete = () => {
    removeElement(selectedElementId);
    setSelectedElementId(null);
    setSelectedElementType(null);
    setToolbar(null);
  };

  const handleDuplicate = () => {
    const original = canvasElements.find((el) => el.id === selectedElementId);
    if (!original) return;

    const clone = {
      ...original,
      id: uuidv4(),
      x: original.x + 10,
      y: original.y + 10,
    };

    addElement(clone);
    setSelectedElementId(clone.id);
    setSelectedElementType(clone.type);
  };

  const handleMove = (direction: 'up' | 'down' | 'top' | 'bottom') => {
    if (!selectedElementId) return;
    moveElement(selectedElementId, direction);
  };

  return (
    <Html
      divProps={{
        style: {
          position: 'absolute',
          top: `${toolbar.y}px`,
          left: `${toolbar.x}px`,
          zIndex: 10,
        },
      }}
    >
      <div
        className='flex items-center gap-1 rounded-[6px] bg-white px-1'
        style={{ boxShadow: '1px 1px 4px rgba(0, 0, 0, 0.1)' }}
      >
        <button onClick={handleDelete} className=''>
          <ToolbarDeleteIcon className='h-3 w-3 bg-white' />
        </button>
        <div className='h-[15px] w-[0.5px] bg-gray-10' />
        <button onClick={handleDuplicate}>
          <ToolbarDuplicate className='h-3 w-3 bg-white' />
        </button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button>
              <MoreHorizontal className='h-3 w-3' />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='start'>
            <DropdownMenuItem onSelect={() => handleMove('up')}>
              위로 이동 <ToolbarMoveUp className='h-3 w-3' />
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => handleMove('down')}>
              아래로 이동 <ToolbarMoveDown className='h-3 w-3' />
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => handleMove('top')}>
              맨 위로
              <ToolBarTop className='h-3 w-3' />
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => handleMove('bottom')}>
              맨 아래로 <ToolBarBottom className='h-3 w-3' />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </Html>
  );
};

export default ElementToolbar;
