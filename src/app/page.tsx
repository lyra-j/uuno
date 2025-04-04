import Pixso from './_components/Pixso';

export default function Homepage() {
  return (
    <div className='flex flex-col'>
      {/* 메인 Section */}
      <section
        className='relative flex h-screen items-center justify-center bg-cover bg-center'
        style={{ backgroundImage: 'url(/main1.png' }}
      >
        {/* 어두운 반투명 오버레이 */}
        <div className='absolute inset-0 bg-black opacity-50' />

        {/*text*/}
        <div className='z-1 relative flex flex-col'>
          <h1 className='mb-4 text-5xl font-bold text-white'>Uuno</h1>
          <p className='mb-8 text-lg text-gray-300'>
            누구나 쉽게 만들고, <br />
            간편하게 공유하는 스마트 명함
          </p>
          <div className='space-x-8'>
            <button className='t rounded-3xl bg-white px-6 py-3 text-black'>
              바로 시작하기
            </button>
            <button className='rounded-3xl bg-black px-6 py-3 text-white'>
              템플릿 보러가기
            </button>
          </div>
        </div>
      </section>

      {/* 차별점 Section */}
      <section className='bg-white py-24'>
        <div className='mx-auto max-w-6xl px-6'>
          <h1 className='text-center text-3xl font-bold text-gray-900'>
            종이 명함과 차별화된 디지털 명함
          </h1>

          {/* 비교 콘텐츠 블럭 */}
          <div className='mt-8 rounded-xl bg-gray-100 p-8 shadow-inner'>
            <div className='flex flex-col gap-8'>
              <div className='flex aspect-video w-full items-center justify-center rounded-lg bg-gray-300 text-gray-500'>
                이미지
              </div>

              <h3 className='mb-4 text-xl font-semibold text-gray-800'>
                종이 명함과 차별화된 디지털 명함
              </h3>
            </div>
          </div>
        </div>
      </section>

      {/* 기능 소개 Section */}
      <section className='h-screen bg-gray-100 py-20'>
        <div className='mx-auto flex max-w-6xl flex-col px-6'>
          {/* 왼쪽 텍스트 블럭 */}
          <div>
            <h1 className='mb-4 text-4xl font-bold'>Unno의 핵심 기능</h1>
            <p className='text-black'>
              명함 제작을 보다 빠르고 쉽게 시작하세요!
            </p>
          </div>

          <div className='relative h-[400px] w-full'>
            {/* 카드 1 */}
            <div className='absolute right-0 top-0 w-[280px] rounded-xl bg-white p-6 shadow-lg'>
              <h3 className='mb-2 text-lg font-bold'>손쉬운 공유</h3>
              <p className='text-sm'>
                QR코드, 링크, 소셜 미디어까지
                <br />
                어디서든 원클릭으로 전달하세요.
              </p>
            </div>

            {/* 카드 2 */}
            <div className='absolute left-1/4 top-1/3 w-[280px] rounded-xl bg-white p-6 shadow-lg'>
              <h3 className='mb-2 text-lg font-bold'>간편한 제작</h3>
              <p className='text-sm'>
                직관적인 인터페이스와 템플릿으로
                <br />
                디지털 명함을 쉽게 만들 수 있어요.
              </p>
            </div>

            {/* 카드 3 */}
            <div className='absolute bottom-0 right-0 w-[280px] rounded-xl bg-white p-6 shadow-lg'>
              <h3 className='mb-2 text-lg font-bold'>스마트한 분석</h3>
              <p className='text-sm'>
                통계로 더 스마트한
                <br />
                네트워킹을 경험하세요.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className='mx-auto w-full max-w-4xl py-20'>
        <h2 className='mb-8 text-center text-3xl font-semibold'>사용 방법</h2>
        <Pixso />
      </section>
    </div>
  );
}
