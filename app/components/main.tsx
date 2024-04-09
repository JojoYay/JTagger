'use client'

import { useState } from 'react'
import { SozaiFolder, PicTypeEx, MainType } from './types'

import Properties from './properties'
import Generate from './generate'
import { loadFiles, loadSozaiFolders} from '../serverExecution';

// メイン
const Main = ({picTypeExsOrg}:MainType) => {
  const [picTypeExs, setPicTypeExs] = useState<PicTypeEx[]>(picTypeExsOrg);
  const [indexNum, setIndexNum] = useState<number>(0);
  const [sozaiIndex, setSozaiIndex] = useState<number>(0);

  const [loading, setLoading] = useState(false);

  return (
    <div className="grid grid-cols-5 gap-4">
      <div className="col-span-2">
        {/* 画面生成フォーム */}
        <Properties 
          loading={loading}
          setLoading={setLoading}
          picTypeExs={picTypeExs}
          setPicTypeExs={setPicTypeExs}
          indexNum={indexNum}
          setIndexNum={setIndexNum}
          sozaiIndex={sozaiIndex}
          setSozaiIndex={setSozaiIndex}
        />
      </div>

      <div className="col-span-3">
        {/* 生成画像 */}
        <Generate
          loading={loading}
          sozaiIndex={sozaiIndex}
          indexNum={indexNum}
          sozaiFolderPics={picTypeExs}
        />
      </div>
    </div>
  )
}

export default Main