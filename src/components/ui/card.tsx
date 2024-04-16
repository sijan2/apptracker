import React from 'react'

function Card() {
  return (
    <div className='rounded-md  m-1 mb-6  shadow h-[200px] lg:h-[120px] '>
      <button className=' h-full w-full rounded-md hover:bg-sky-50'>
        <div className='p-4 flex flex-col space-y-4 lg:space-y-0 lg:flex-row justify-start '>
          <div className='flex space-x-4'>
            <div className='size-20 bg-red-50 rounded-md text-xl flex font-bold items-center justify-center'>
              OK
            </div>
            <div className='text-gray-600 flex flex-col justify-start items-start'>
              <h1 className='font-semibold'>Software Engineer</h1>
              <span>Netflix</span>
              <span>New York</span>
            </div>
          </div>
          <div className='lg:mx-8 w-full flex-1 items-center'>
            <div className=''>
              <div className='flex grow'>
                <div className='z-10 flex shrink-0 flex-col items-center'>
                  <div className='mb-2 text-xs' data-testid='applied'>
                    Applied
                  </div>
                  <div
                    className='bg-sky-200 mx-auto flex h-6 w-6 items-center rounded-full text-lg text-white'
                    data-testid='background-circle-applied'
                  >
                    <span
                      className='text-primary-base w-full text-center'
                      data-testid='text-circle-applied'
                    >
                      <svg
                        stroke='currentColor'
                        fill='currentColor'
                        strokeWidth='0'
                        viewBox='0 0 16 16'
                        className='w-full fill-blue-400'
                        data-testid='circle-applied'
                        height='1em'
                        width='1em'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <circle cx='8' cy='8' r='8'></circle>
                      </svg>
                    </span>
                  </div>
                  <div className='mt-2 h-4 text-xs'>4/12/24</div>
                </div>
                <div className='flex grow content-center items-center align-middle'>
                  <div className='-mx-4 w-full flex-1 items-center rounded bg-primary-base align-middle'>
                    <div
                      className='bg-sky-200 rounded py-0.5 text-center text-xs leading-none'
                      data-testid='background-line-screen'
                    ></div>
                  </div>
                </div>
                <div className='z-10 flex shrink-0 flex-col items-center'>
                  <div className='mb-2 text-xs' data-testid='screen'>
                    Screen
                  </div>
                  <div
                    className='bg-white border-2 border-gray-300 mx-auto flex h-6 w-6 items-center rounded-full text-lg text-white'
                    data-testid='background-circle-screen'
                  >
                    <span
                      className='text-primary-base w-full text-center'
                      data-testid='text-circle-screen'
                    ></span>
                  </div>
                  <div
                    className='mt-2 h-4 text-xs'
                    data-testid='date-screen'
                  ></div>
                </div>
                <div className='flex grow content-center items-center align-middle'>
                  <div className='-mx-4 w-full flex-1 items-center rounded bg-primary-base align-middle'>
                    <div
                      className='bg-sky-200 rounded py-0.5 text-center text-xs leading-none'
                      data-testid='background-line-interview'
                    ></div>
                  </div>
                </div>
                <div className='z-10 flex shrink-0 flex-col items-center'>
                  <div className='mb-2 text-xs' data-testid='interview'>
                    Interview
                  </div>
                  <div
                    className='bg-white border-2 border-gray-300 mx-auto flex h-6 w-6 items-center rounded-full text-lg text-white'
                    data-testid='background-circle-interview'
                  >
                    <span
                      className='text-primary-base w-full text-center'
                      data-testid='text-circle-interview'
                    ></span>
                  </div>
                  <div
                    className='mt-2 h-4 text-xs'
                    data-testid='date-interview'
                  ></div>
                </div>
                <div className='flex grow content-center items-center align-middle'>
                  <div className='-mx-4 w-full flex-1 items-center rounded bg-primary-base align-middle'>
                    <div
                      className='bg-sky-200 rounded py-0.5 text-center text-xs leading-none'
                      data-testid='background-line-offer'
                    ></div>
                  </div>
                </div>
                <div className='z-10 flex shrink-0 flex-col items-center'>
                  <div className='mb-2 text-xs' data-testid='offer'>
                    Offer
                  </div>
                  <div
                    className='border-2 border-gray-300 bg-white mx-auto flex h-6 w-6 items-center rounded-full text-lg text-white'
                    data-testid='background-circle-offer'
                  >
                    <span
                      className='w-full text-center text-green-300'
                      data-testid='text-circle-offer'
                    ></span>
                  </div>
                  <div
                    className='mt-2 h-4 text-xs'
                    data-testid='date-offer'
                  ></div>
                </div>
              </div>
            </div>
          </div>
          <div></div>
        </div>
      </button>
    </div>
  )
}

export default Card
