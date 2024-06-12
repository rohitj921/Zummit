import React from 'react'
import Author_img from "../../images/Dashboard-Author-img.png";
const Author = () => {
    return (
        <div className='mx-10 my-5'>
            <div className='w-[90%]'>
                <h1 className='text-[#00677F] mb-5 text-ellipsis whitespace-nowrap overflow-hidden text-[1.6rem]'>Resources/ Eu nulla nulla risus adipiscing mus risus non pellentesque integer.</h1>
                <div className='bg-[#FDFEF1] py-5 px-14 rounded-md'>
                    <div className='flex justify-end gap-2 text-sm mb-4'>
                        <button className='border border-[#00677F] px-4 rounded-md text-[#00677F]'>Save</button>
                        <button className='bg-[#00677F] text-white px-4 py-1 rounded-md '>Publish</button>
                    </div>
                    <div className='flex px-4 bg-white gap-40 items-center py-2 rounded-md border border-[#787579]'>
                        <h1>Author</h1>
                        <input type="text" className='rounded-md w-full bg-[#FDFEF1] px-2' value={"Nirmal"} />
                    </div>
                    <div className='bg-white mt-4 p-5 border border-[#787579] rounded-md'>
                        <div className='flex justify-end items-center'>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 6H5H21" stroke="#545859" stroke-linecap="round" stroke-linejoin="round" /><path d="M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6" stroke="#545859" stroke-linecap="round" stroke-linejoin="round" /><path d="M10 11V17" stroke="#545859" stroke-linecap="round" stroke-linejoin="round" /><path d="M14 11V17" stroke="#545859" stroke-linecap="round" stroke-linejoin="round" /></svg>
                        </div>
                        <h1 className='mt-5 mb-2 font-medium'>Eu nulla nulla risus adipiscing mus risus non pellentesque integer.</h1>
                        <div className='relative'>
                            <img src={Author_img} alt="" />
                            <div className='absolute right-0 bottom-0 rounded-full p-2 bg-white '>
                                <svg width="22" height="22" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18.3333 1L25 7.66667L7.66667 25H1V18.3333L18.3333 1Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /></svg>
                            </div>
                        </div>
                        <p className='my-4 text-sm pl-2'>Nisi maecenas massa vulputate varius sed bibendum viverra id. Hendrerit id feugiat semper congue. Ac purus eu in mauris euismod. Felis volutpat sit in tellus morbi. Ut tortor curabitur risus eu a convallis. Nisl aliquet cursus morbi tincidunt.
                            Purus adipiscing vitae nam pellentesque quis lorem vel. Interdum mattis integer lorem ut in. Facilisis volutpat tortor viverra faucibus dictum nunc. Elit iaculis mauris morbi feugiat vitae hac sagittis dignissim. Tincidunt mi massa malesuada vulputate scelerisque cursus. Consectetur imperdiet odio interdum interdum. Eu quis feugiat quisque sagittis. In sit sit eget mattis tortor. Phasellus id aliquam at auctor lacus ultricies. Amet nibh ut amet purus sed.
                            Purus odio nunc lorem viverra eget. Sed neque duis aenean suscipit posuere varius. Vitae auctor lobortis blandit est ut tortor. Ultrices arcu augue massa fusce orci. Justo tellus duis aliquam in sodales sem urna eleifend tincidunt. Feugiat sit adipiscing vestibulum euismod. Cras sed ut luctus ornare phasellus faucibus sagittis.
                            Nisi maecenas massa vulputate varius sed bibendum viverra id. Hendrerit id feugiat semper congue. Ac purus eu in mauris euismod. Felis volutpat sit in tellus morbi. Ut tortor curabitur risus eu a convallis. Nisl aliquet cursus morbi tincidunt.
                            Purus adipiscing vitae nam pellentesque quis lorem vel. Interdum mattis integer lorem ut in. Facilisis volutpat tortor viverra faucibus dictum nunc. Elit iaculis mauris morbi feugiat vitae hac sagittis dignissim. Tincidunt mi massa malesuada vulputate scelerisque cursus. Consectetur imperdiet odio interdum interdum. Eu quis feugiat quisque sagittis. In sit sit eget mattis tortor. Phasellus id aliquam at auctor lacus ultricies. Amet nibh ut amet purus sed.
                            Purus odio nunc lorem viverra eget. Sed neque duis aenean suscipit posuere varius. Vitae auctor lobortis blandit est ut tortor. Ultrices arcu augue massa fusce orci. Justo tellus duis aliquam in sodales sem urna eleifend tincidunt. Feugiat sit adipiscing vestibulum euismod. Cras sed ut luctus ornare phasellus faucibus sagittis.</p>
                    </div>
                    <div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Author