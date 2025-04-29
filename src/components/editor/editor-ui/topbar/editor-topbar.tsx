import MinusIcon from '@/components/icons/editor/topbar-minus';
import PlusIcon from '@/components/icons/editor/topbar-plus';
import RedoIcon from '@/components/icons/editor/topbar-redo';
import ResetIcon from '@/components/icons/editor/topbar-reset';
import SwitchIcon from '@/components/icons/editor/topbar-switch';
import UndoIcon from '@/components/icons/editor/topbar-undo';
import { MAX_ZOOM, MIN_ZOOM, ZOOM_RATION } from '@/constants/editor.constant';
import { sideBarStore } from '@/store/editor.sidebar.store';
import { useEditorStore } from '@/store/editor.store';
import ToolTip from '@/components/common/tooltip';
import { handleReset } from '@/utils/editor/editor-reset-alert.util';
import { handleSwitchCard } from '@/utils/editor/warn-sweet-alert';
import { useShallow } from 'zustand/react/shallow';
import BottomTabDownIcon from '@/components/icons/editor/bottomtab-down';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Image from 'next/image';

const EditorTopbar = () => {
  const {
    undo,
    redo,
    histories,
    historyIdx,
    reset,
    backHistories,
    backHistoriesIdx,
    isCanvasFront: isFront,
    title,
    setTitle,
  } = useEditorStore(
    useShallow((state) => ({
      undo: state.undo,
      redo: state.redo,
      histories: state.histories,
      historyIdx: state.historyIdx,
      reset: state.reset,
      backHistories: state.backHistories,
      backHistoriesIdx: state.backHistoryIdx,
      isCanvasFront: state.isCanvasFront,
      title: state.title,
      setTitle: state.setTitle,
    }))
  );

  const isHorizontal = sideBarStore((state) => state.isHorizontal);
  const zoom = sideBarStore((state) => state.zoom);
  const setZoom = sideBarStore((state) => state.setZoom);

  const currentHistories = isFront ? histories : backHistories;
  const currentHistoriesIdx = isFront ? historyIdx : backHistoriesIdx;

  return (
    <div className='relative flex h-[45px] items-center justify-between border-b border-gray-10 bg-white'>
      <div className='flex flex-row items-center space-x-[20px] px-5'>
        <ToolTip text={isHorizontal ? '세로변환' : '가로변환'}>
          <SwitchIcon className='cursor-pointer' onClick={handleSwitchCard} />
        </ToolTip>
        <div className='h-6 border-l border-[#D1D1D1]' />

        <ResetIcon onClick={reset} className='cursor-pointer' />
        <div className='h-6 border-l border-[#D1D1D1]' />
        <div className='flex items-center space-x-[14px] pt-2'>
          <ToolTip text='되돌리기'>
            <button onClick={undo} disabled={currentHistoriesIdx < 1}>
              <UndoIcon />
            </button>
          </ToolTip>
          <ToolTip text='다시실행'>
            <button
              onClick={redo}
              disabled={currentHistoriesIdx === currentHistories.length - 1}
            >
              <RedoIcon />
            </button>
          </ToolTip>
        </div>
      </div>

      {/* 줌 입력 칸 */}
      <div className='mr-5 flex items-center gap-5'>
        <div className='relative flex items-center gap-1'>
          <MinusIcon
            className='flex h-6 w-6 cursor-pointer items-center justify-center'
            onClick={() => setZoom(Math.max(MIN_ZOOM, zoom - ZOOM_RATION))}
          />
          <input
            type='text'
            pattern='[0-9]*'
            inputMode='numeric'
            max={MAX_ZOOM}
            min={MIN_ZOOM}
            value={Math.floor(zoom * 100)}
            onChange={(e) => {
              const { value } = e.target;
              const num = Number(value);
              if (value !== '' && !isNaN(num)) {
                setZoom(num * 0.01);
              }
            }}
            className='h-6 w-[60px] rounded-[6px] border pr-3 text-center text-caption-medium text-gray-90'
          />
          <span className='absolute right-9 text-caption-regular text-gray-70'>
            %
          </span>
          <PlusIcon
            className='flex h-6 w-6 cursor-pointer items-center justify-center'
            onClick={() => setZoom(Math.min(MAX_ZOOM, zoom + ZOOM_RATION))}
          />
        </div>

        <div className='h-6 border-l border-[#D1D1D1]' />

        {/* 사이즈 드롭다운 메뉴 */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className='flex w-[74px] cursor-pointer flex-col items-start rounded-[6px] border border-gray-20 px-2 py-1'>
              <div className='flex items-center gap-1 self-stretch'>
                <p className='text-caption-medium text-gray-90'>
                  {isHorizontal ? '50x90' : '90x50'}
                </p>
                <BottomTabDownIcon />
              </div>
            </div>
          </DropdownMenuTrigger>

          <DropdownMenuContent className='mr-5 flex flex-col items-start gap-2 self-stretch p-3'>
            <div className='flex items-center gap-[6px]'>
              <Image
                src={'/icons/business_card.svg'}
                width={16}
                height={16}
                alt='명함 이미지'
              />
              <span className='text-caption-bold text-gray-80'>명함</span>
            </div>
            <div className='w-[150px] border-b' />
            <div className='flex flex-col items-start gap-[14px] self-stretch'>
              <DropdownMenuItem
                className='flex items-start gap-3 self-stretch'
                onClick={handleSwitchCard}
              >
                <span className='pl-[22px] text-caption-medium text-gray-70'>
                  세로형태
                </span>
                <span className='text-caption-medium text-gray-50'>
                  50 x 90px
                </span>
              </DropdownMenuItem>
              <DropdownMenuItem
                className='flex items-start gap-3 self-stretch'
                onClick={handleSwitchCard}
              >
                <span className='pl-[22px] text-caption-medium text-gray-70'>
                  가로형태
                </span>
                <span className='text-caption-medium text-gray-50'>
                  90 x 50px
                </span>
              </DropdownMenuItem>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* 제목 입력 칸 */}
      <p className='absolute left-1/2 -translate-x-1/2 whitespace-nowrap text-sm text-gray-700'>
        <input
          type='text'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder='제목을 입력하세요'
          maxLength={20}
          className='w-full border-none text-center font-medium outline-none'
        />
      </p>
    </div>
  );
};
export default EditorTopbar;
