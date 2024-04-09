'use client'

import { useState } from 'react'
import { PropertyType, PicTypeEx, PicType, SozaiFolder } from './types'
// import Select from 'react-select'
import CreatableSelect from 'react-select/creatable';
import Select from 'react-select';
import { PromptOption, promptOptions } from './prompts'
import { Button } from './button'
import { ActionMeta } from 'react-select/dist/declarations/src/types'; 
import { updateCaption, deleteFiles } from '../serverExecution';
import { confirmAlert } from 'react-confirm-alert';
import "react-confirm-alert/src/react-confirm-alert.css";

// 画像生成フォーム
const Properties = ({ loading, setLoading, picTypeExs, setPicTypeExs, indexNum, setIndexNum, sozaiIndex, setSozaiIndex }: PropertyType) => {
  const [picTypeEx, setPicTypeEx] = useState<PicTypeEx>(picTypeExs[sozaiIndex]);
  const sozaiSelection:SozaiFolder[] = picTypeExs.map((i) => i.sozaiFolder);
  const [picName, setPicName] = useState<string>(picTypeEx.picTypes[indexNum].imageSrc);

  const reloadPage = () => {
    setLoading(true);
    setSozaiIndex(sozaiIndex);
    setIndexNum(indexNum);
    setPicTypeExs(
      picTypeExs.map((picTypeEx) => {
        return {
          sozaiFolder : picTypeEx.sozaiFolder,
          picTypes : picTypeEx.picTypes
        } as PicTypeEx
      })
    );
    setPicTypeEx(
      {
        sozaiFolder : picTypeExs[sozaiIndex].sozaiFolder,
        picTypes : picTypeExs[sozaiIndex].picTypes
      }
    );
    setPicName(picTypeEx.picTypes[indexNum].imageSrc);
    setLoading(false);
  }

  const getNewSelections = (newInd:number) => {
    if(!!picTypeEx){
      // console.log(sozaiFolderPic)
      const pics:PicType[] = picTypeEx.picTypes;
      const newPic:PicType = pics[newInd]
      const captions = newPic.tags.split(",")
      let selection:PromptOption[] = promptOptions.filter((item) => item.isSelected);
      if(newPic.tags){
        captions.forEach((item) => {
          if(!isExistsInDefault(item)){
            selection.push({ value: item.trim(), label: item.trim() } as PromptOption)
          }
        })
      }
      return selection;
    }
    return [];
  }

  const handleCreate = (inputValue: string) => {
    if(!!picTypeEx){
      const pics = picTypeEx.picTypes;
      setSelectedValues((prev) => [...prev, { value: inputValue, label: inputValue } as PromptOption]);
    }
  };

  const handleChange = (newValue:any, actionMeta: ActionMeta<PromptOption>) => {
    setSelectedValues(newValue);
  }

  const sozaiChangeHandler = (newValue:any) => {
    let s = 0;
    picTypeExs.forEach((sfp, index) => {
      if(sfp.sozaiFolder.value == newValue.value){
        s = index;
      }
    })
    console.log("sozai: "+s);
    setSozaiIndex(s);
    setPicTypeEx(picTypeExs[s]);
    setIndexNum(0);
    setPicName(picTypeExs[s].picTypes[0].imageSrc);
    // reloadPage();
  }

  const next = () => {
    setLoading(true);
    if (indexNum != picTypeEx.picTypes.length-1){
      updateCaptionFile(indexNum, indexNum+1);
      setIndexNum(++indexNum);
      setPicName(picTypeEx.picTypes[indexNum].imageSrc);
      // setCurrentPics(sozaiFolderPic)
      setSelectedValues(getNewSelections(indexNum));
    }
    setLoading(false);
  }

  const prev = () => {
    setLoading(true)
    if (indexNum != 0){
      updateCaptionFile(indexNum, indexNum-1);
      setIndexNum(--indexNum);
      setPicName(picTypeEx.picTypes[indexNum].imageSrc);
      // setCurrentPics(sozaiFolderPic)
      setSelectedValues(getNewSelections(indexNum));
    }
    setLoading(false);
  }

  const deletePic = () => {
    // console.log("aaaa");
    // console.log(indexNum);
    // console.log(picTypeExs[sozaiIndex]);
    // console.log("aaaa");

    confirmAlert({
      title: 'Delete Picture '+picTypeExs[sozaiIndex].picTypes[indexNum].imageSrc,
      message: 'マジで消しちゃうよ？',
      buttons: [
        {
          label: 'はい',
          onClick: () => {
            const picType:PicType = picTypeExs[sozaiIndex].picTypes[indexNum];
            const picOrg = "./public"+picType.imageSrc;
            const capOrg = "./public"+picType.captionSrc;
            console.log("org: "+picOrg + ", "+ capOrg);
            const picToBe = "./public/delete"+picType.imageSrc;
            const capToBe = "./public/delete"+picType.captionSrc;
            console.log("tobe: "+picToBe + ", "+ capToBe);
            // deleteFiles(picTypeExs, sozaiIndex, indexNum)
            //サーバーにオブジェクト送る時はSerialized的なのされないとダメだからオブジェクト送るとなんか狂う？
            deleteFiles(picOrg, capOrg, picToBe, capToBe, picType.tags);
            picTypeExs[sozaiIndex].picTypes.splice(indexNum,1)
            reloadPage();
          }
        },
        {
          label: 'いいえ',
          onClick: () => {}
        }
      ]
    });
  }

  const isExistsInDefault = (tag:string) => {
    if(tag && tag.trim()){
      // console.log("tag:::::"+tag.trim())
      let data = '';
      promptOptions.filter((item) => item.isSelected).forEach((cap) => { data = data + cap.value + ","});
      data = data.substring(0,data.length-1);
      // console.log("data:::::::"+data)
      // console.log(data.indexOf(tag.trim()) >= 0)
      return (data.indexOf(tag.trim()) >= 0);
    } else {
      return false;
    }
  }

  const updateCaptionFile = (beforeInd:number, afterInd:number) => {
    if(!!picTypeEx){
      const pics = picTypeEx.picTypes;
      console.log("index:"+beforeInd+" -> "+afterInd+" total:"+picTypeEx.picTypes.length);
      const prevPic:PicType = pics[beforeInd];
      let data:string = "";
      //カンマ区切りのスペースが要るのか謎
      selectedValues.forEach((cap) => { data = data + cap.value + ","});
      data = data.substring(0,data.length-1);
      prevPic.tags = data;
      updateCaption(prevPic.captionSrc,data);
    }
  }
  const [selectedValues, setSelectedValues] = useState(getNewSelections(0))
  const [error, setError] = useState<string | null>(null)

  return (
    <div className="p-4 rounded-lg bg-[#E6F2FF] shadow">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-700 border-t-transparent" />
          </div>
        ) : !!picTypeEx ? (
          <>
            <div className="font-bold mb-5 text-m">
              {picName}
            </div>
            <div className="font-bold mb-5 text-m">
            <Select
              className="basic-single"
              name="sozai"
              defaultValue={sozaiSelection[0]}
              options={sozaiSelection}
              onChange={sozaiChangeHandler}
            />
            </div>
            <div className="grid grid-cols-2 gap-x-6 py-2.5">
              <Button tag="button" className="btn btn--primary text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none" onClick={() => prev()}>
                Prev
              </Button>
              <Button tag="button" className="btn btn--secondary text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none" onClick={() => next()}>
                Next
              </Button>
            </div>
            <div className="font-bold mb-5 text-sm">image index: {indexNum+1} / {picTypeEx.picTypes.length}</div>
            <div className="mb-5">
              <CreatableSelect
                isMulti
                isSearchable
                onChange={handleChange}
                onCreateOption={handleCreate}
                value={selectedValues}
                options={promptOptions}
                />
            </div>
            <div className="font-bold mb-5 text-sm"> {selectedValues.length} prompts</div>
            <div className="grid grid-cols-2 gap-x-6 py-2.5">
              <Button tag="button" className="btn btn--primary text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none" onClick={() => setSelectedValues(getNewSelections(indexNum))}>
                Reload
              </Button>
              <Button tag="button" className="btn btn--secondary text-white bg-red-700 hover:bg-red-800 font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none" onClick={() => deletePic()}>
                Delete Picture
              </Button>
            </div>

            {/* エラーメッセージ */}
            {error && <div className="text-red-500 text-center mb-5">{error}</div>}
          </>
        ) : (
          <div className="flex items-center justify-center h-full">
            failed to load Caption
          </div>
        )}
    </div>
  )
}

export default Properties