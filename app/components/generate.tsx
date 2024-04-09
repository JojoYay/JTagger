'use client'

import { GenerateType } from './types'
import Image from 'next/image'

// 画像表示
const Generate = ({ loading, sozaiIndex, indexNum, sozaiFolderPics }: GenerateType) => {
  return (
    <>
      {loading ? (
        <div className="flex items-center justify-center h-full">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-700 border-t-transparent" />
        </div>
      ) : (sozaiFolderPics &&  sozaiFolderPics[sozaiIndex])? (
        <>
            <div className="grid grid-cols-1 gap-1">
              <Image
                src={sozaiFolderPics[sozaiIndex].picTypes[indexNum].imageSrc}
                alt="image"
                width={512}
                height={512}
                blurDataURL={'/loading.svg'}
              />
            </div>
        </>
      ) : (
        <></>
      )}
    </>
  )
}

export default Generate