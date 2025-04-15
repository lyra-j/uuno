import { CommonModal } from '@/components/common/common-modal';
import SaveShareIconItem from '@/components/card/save-share-icon-item';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CommonButton } from '@/components/common/common-button';

const SaveShareModal = () => {
  return (
    <CommonModal title='저장 및 공유하기' maxWidth='lg' ctnClassName='p-10'>
      <div className='flex flex-col gap-7'>
        <div className='flex gap-12'>
          <div className='flex gap-5'>
            <SaveShareIconItem
              src={'/icons/tag-copy.svg'}
              alt='태그 복사'
              imgWidth={54}
              imgHeight={54}
              text='태그 복사'
            />
            <SaveShareIconItem
              src={'/icons/qr-copy.svg'}
              alt='QR 복사'
              imgWidth={54}
              imgHeight={54}
              text='QR 복사'
            />
            <SaveShareIconItem
              src={'/icons/img-save.svg'}
              alt='이미지 저장'
              imgWidth={54}
              imgHeight={54}
              text='이미지 저장'
            />
          </div>
          <div>
            <SaveShareIconItem
              src={'/icons/kakao-share.svg'}
              alt='카카오톡 공유'
              imgWidth={54}
              imgHeight={54}
              text='카카오톡 공유'
            />
          </div>
        </div>
        <div className='flex items-center space-x-2'>
          <div className='relative grid h-[48px] flex-1 gap-2'>
            <Label htmlFor='link' className='sr-only'>
              Link
            </Label>
            <Input
              id='link'
              defaultValue='https://ui.shadcn.com/docs/installation'
              className='h-[48px] rounded-lg border-gray-10 bg-gray-5 px-[14px] py-3 text-label2-medium focus-visible:ring-0'
              readOnly
            />
            <CommonButton
              variant='primary'
              size='small'
              borderRadius='6px'
              width='75px'
              className='absolute right-[14px] top-1/2 -translate-y-1/2'
            >
              복사
            </CommonButton>
          </div>
        </div>
      </div>
    </CommonModal>
  );
};

export default SaveShareModal;
