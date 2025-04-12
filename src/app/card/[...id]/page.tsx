import PathAnalysisGrid from '@/components/card-detail/path-analysis-grid';
import StatCardGrid from '@/components/card-detail/stat-card-grid';
import WeeklyChart from '@/components/card-detail/weekly-chart';
import FlipCard from '@/components/card/flip-card';

interface CardDetailProps {
  params: {
    id: string[];
  };
}
const page = ({ params }: CardDetailProps) => {
  return (
    <div className='h-[calc(100vh-64px)]'>
      <div className='flex items-center border-b border-solid border-zinc-100 p-6'>
        {/* 페이지 타이틀 */}
        <div className='mx-auto flex w-full max-w-5xl items-center justify-start'>
          <button className='mr-2'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-5 w-5'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M15 19l-7-7 7-7'
              />
            </svg>
          </button>
          <h3 className='text-title-bold'>내 명함 상세</h3>
        </div>
      </div>
      <div className='mx-auto max-w-5xl'>
        <div className='flex max-h-[calc(100vh-150px)]'>
          {/* 왼쪽 컬럼 */}
          <div className='flex w-1/3 flex-col overflow-auto border-r border-gray-5 p-3.5 text-body-regular shadow-[0px_3px_18px_0px_rgba(0,0,0,0.04)]'>
            <select name='' id='' className='py-2'>
              <option value='test1'>test1</option>
              <option value='test2'>test2</option>
              <option value='test3'>test3</option>
            </select>
            {/* 명함 플립 */}
            <FlipCard />
          </div>
          {/* 오른쪽 컬럼 - 통계 정보 */}
          <div className='flex w-2/3 flex-col bg-bg'>
            {/* 통계 헤더 */}
            <div className='flex items-center justify-between bg-white p-4 shadow-[0px_4px_20px_0px_rgba(0,0,0,0.04)]'>
              <h2 className='text-heading-bold'>내 명함 통계</h2>
              <div className='flex gap-2'>
                <button className='flex gap-1 px-2 py-1 text-label2-regular text-primary-40'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='18'
                    height='18'
                    viewBox='0 0 18 18'
                    fill='none'
                  >
                    <path
                      fillRule='evenodd'
                      clipRule='evenodd'
                      d='M11.5605 0.75H2.25V17.25H15.75V4.9395L11.5605 0.75ZM3.75 15.75V2.25H9.75V6.75H14.25V15.75H3.75ZM11.25 5.25V2.5605L13.9395 5.25H11.25ZM6.89502 10.6758C6.84229 10.3242 6.56982 10.1089 6.20068 10.1089C5.7041 10.1089 5.37891 10.4912 5.37891 11.1592C5.37891 11.8447 5.7085 12.2095 6.19629 12.2095C6.56104 12.2095 6.8291 12.0073 6.89502 11.6646L7.56299 11.6689C7.48828 12.2578 6.99609 12.7939 6.1875 12.7939C5.33496 12.7939 4.70654 12.1963 4.70654 11.1592C4.70654 10.1221 5.34814 9.52441 6.1875 9.52441C6.92139 9.52441 7.4751 9.94629 7.56299 10.6758H6.89502ZM9.75146 10.478C9.7251 10.2275 9.52295 10.0781 9.20215 10.0781C8.86816 10.0781 8.68359 10.2319 8.6792 10.4429C8.6748 10.6714 8.9165 10.7769 9.18896 10.8384L9.47461 10.9087C10.0195 11.0317 10.4282 11.3086 10.4282 11.8403C10.4282 12.4248 9.97119 12.7939 9.19775 12.7939C8.42871 12.7939 7.93652 12.438 7.91895 11.7568H8.56055C8.58252 12.0776 8.8374 12.2402 9.18896 12.2402C9.53613 12.2402 9.76025 12.0776 9.76025 11.8403C9.76025 11.625 9.5625 11.5239 9.21533 11.436L8.86816 11.3525C8.33203 11.2207 8.00244 10.9526 8.00244 10.4868C8.00244 9.90674 8.51221 9.52441 9.20654 9.52441C9.90967 9.52441 10.3755 9.91553 10.3843 10.478H9.75146ZM12.1904 11.9941L11.417 9.56836H10.6787L11.7817 12.75H12.6299L13.7285 9.56836H12.999L12.2212 11.9941H12.1904Z'
                      fill='#3970D5'
                    />
                  </svg>
                  CSV
                </button>
                <button className='flex gap-1 px-2 py-1 text-label2-regular text-primary-40'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='18'
                    height='18'
                    viewBox='0 0 18 18'
                    fill='none'
                  >
                    <path
                      d='M2.25 0.75H11.5605L15.75 4.9395V17.25H2.25V0.75ZM3.75 2.25V15.75H14.25V6.75H9.75V2.25H3.75ZM11.25 2.5605V5.25H13.9395L11.25 2.5605Z'
                      fill='#3970D5'
                    />
                    <path
                      fillRule='evenodd'
                      clipRule='evenodd'
                      d='M9.34248 7.34776C9.48775 8.14594 9.34304 8.88354 9.10253 9.60936C9.34734 10.0253 9.63338 10.4481 9.9208 10.866L9.92173 10.8674L9.92173 10.8674C9.97731 10.9493 10.0316 11.0245 10.0848 11.0938C10.7745 10.9683 11.421 10.92 11.8942 10.9975C12.1453 11.0387 12.3901 11.1217 12.5564 11.2887C12.7429 11.476 12.7901 11.7257 12.7176 11.9896C12.6494 12.2387 12.423 12.3628 12.258 12.4212C12.0788 12.4846 11.8751 12.507 11.7092 12.497L11.707 12.4969L11.707 12.4969C11.3047 12.4693 10.9232 12.414 10.5495 12.2165C10.3162 12.0933 10.0961 11.9203 9.87733 11.6809C9.27036 11.8091 8.62341 11.997 8.01805 12.2221C7.60248 12.9735 7.08042 13.6122 6.40249 14.0907C6.39262 14.1001 6.38194 14.1088 6.37049 14.1168C6.21098 14.2276 6.0058 14.2634 5.8294 14.2457C5.65896 14.2287 5.43905 14.1517 5.32502 13.9472C5.19073 13.7086 5.26109 13.4521 5.34701 13.2793C5.43705 13.0983 5.57785 12.9356 5.70969 12.8268L5.71234 12.8246L5.71235 12.8246C6.17936 12.4491 6.86311 12.0982 7.60495 11.8063C7.61677 11.8017 7.6286 11.797 7.64045 11.7924C7.79241 11.4993 7.93031 11.1857 8.05677 10.853L8.05726 10.8517L8.05727 10.8517C8.11227 10.7092 8.16697 10.5704 8.22046 10.4346C8.32585 10.1672 8.42657 9.91157 8.51579 9.66306C8.50908 9.651 8.50241 9.63895 8.49578 9.6269C8.21143 9.11054 7.98446 8.58122 7.91338 8.07533C7.88626 7.88798 7.85525 7.5952 7.92172 7.33515C7.95611 7.20062 8.02074 7.05755 8.14138 6.94423C8.26439 6.82869 8.42451 6.76396 8.6122 6.75175C8.70867 6.74281 8.79791 6.76965 8.86207 6.79681C8.93335 6.82698 9.00241 6.8698 9.06364 6.91872C9.17566 7.00822 9.30998 7.15811 9.34248 7.34776ZM8.74279 8.93133C8.58965 8.59994 8.48414 8.28745 8.44385 8.00021L8.44368 7.99902C8.41723 7.81646 8.40284 7.6164 8.44077 7.46797C8.45863 7.39813 8.48373 7.35793 8.50808 7.33506C8.52827 7.31609 8.565 7.29252 8.644 7.28689C8.6464 7.28772 8.64949 7.28889 8.65331 7.2905C8.67345 7.29903 8.70082 7.31484 8.72933 7.33762C8.75769 7.36027 8.78106 7.38494 8.79685 7.40718C8.81091 7.42697 8.81414 7.4379 8.81447 7.43878L8.81512 7.44234C8.90891 7.95626 8.86485 8.43879 8.74279 8.93133ZM8.63764 7.28502C8.63764 7.28501 8.63801 7.28507 8.63876 7.28526C8.63802 7.28514 8.63765 7.28504 8.63764 7.28502ZM8.86836 10.2532C8.81958 10.379 8.76965 10.505 8.71959 10.6312C8.66521 10.7684 8.61067 10.9059 8.55729 11.0442C8.4935 11.212 8.42651 11.3763 8.35593 11.5367C8.73893 11.4117 9.12907 11.3024 9.5094 11.2136C9.49927 11.199 9.48913 11.1842 9.47897 11.1692C9.2741 10.8713 9.0647 10.5635 8.86836 10.2532ZM7.1591 12.5814C6.71266 12.792 6.32896 13.0168 6.04938 13.2413C5.96727 13.3094 5.87834 13.4143 5.82666 13.5182C5.77296 13.6261 5.78632 13.6728 5.79134 13.6832C5.79134 13.6832 5.79134 13.6832 5.79134 13.6832C5.79186 13.6827 5.812 13.7052 5.88271 13.7123C5.94676 13.7187 6.00586 13.7061 6.04346 13.6885C6.04881 13.6842 6.05436 13.68 6.06011 13.6761C6.4845 13.3828 6.84639 13.0151 7.1591 12.5814ZM5.79235 13.6851L5.79288 13.686L5.79288 13.686M10.5307 11.5641C10.622 11.6377 10.7113 11.6958 10.7996 11.7425C11.0725 11.8866 11.363 11.9359 11.7424 11.962C11.8442 11.9679 11.9749 11.9527 12.0793 11.9158C12.1823 11.8793 12.2008 11.8449 12.2015 11.8453C12.2016 11.8453 12.2016 11.8453 12.2016 11.8454C12.2313 11.7356 12.2049 11.6952 12.1769 11.6671C12.1285 11.6185 12.0176 11.5609 11.8076 11.5265C11.4922 11.4748 11.0481 11.4901 10.5307 11.5641Z'
                      fill='#3970D5'
                    />
                  </svg>
                  PDF
                </button>
              </div>
            </div>
            <div className='flex-1 overflow-auto p-5'>
              {/* 통계 카드 그리드 */}
              <StatCardGrid />

              {/* 주간 통계 차트 */}
              <WeeklyChart title={'포트폴리오'} card_id={params.id[0]} />

              {/* 경로 분석 차트 그리드 */}
              <PathAnalysisGrid />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
