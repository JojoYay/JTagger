export type MainType = {
    picTypeExsOrg: PicTypeEx[]
    // setPicTypeExs: (picTypeExs:PicTypeEx[]) => void
    // indexNum:number
    // setIndexNum: (indexNum:number) => void
    // sozaiIndex:number
    // setSozaiIndex: (sozaiIndex:number) => void
    // updateCaption: (src:string, data:string)  => void
    // deleteFiles : (sozaiFolderPics:PicTypeEx[], sozaiIndex:number, picIndex:number, setSozaiFolderPics:(sozaiFolderPics:PicTypeEx[]) => void)  => void
}

export type PicType = {
    imageSrc: string
    tags: string
    captionSrc: string
}

export type ImagesType = {
    imageSrc: string
    prompt: string
    negative: string
    ratio: string
    width: number
    height: number
    seed: number
    steps: number
  }

export type PropertyType = {
    loading: boolean
    setLoading: (loading: boolean) => void
    picTypeExs: PicTypeEx[]
    setPicTypeExs: (picTypeExs:PicTypeEx[]) => void
    indexNum:number
    setIndexNum: (indexNum:number) => void
    sozaiIndex:number
    setSozaiIndex: (sozaiIndex:number) => void
    // sozaiIndex: number
    // setSozaiIndex: (num: number) => void
    // indexNum: number
    // setIndexNum: (num: number) => void
    // sozaiFolderPics:PicTypeEx[]
    // setSozaiFolderPics: (sozaiFolderPics:PicTypeEx[]) => void
    // updateCaption: (src:string, data:string)  => void
    // deleteFiles : (sozaiFolderPics:PicTypeEx[], sozaiIndex:number, picIndex:number, setSozaiFolderPics:(sozaiFolderPics:PicTypeEx[]) => void)  => void
}

export type GenerateType = {
    loading: boolean
    // pics: picType[] | null
    sozaiIndex: number
    indexNum: number
    sozaiFolderPics:PicTypeEx[]
    // setModalData: (data: picType) => void
    // setModalOpen: (isOpen: boolean) => void
}

export type ModalProps = {
    isOpen: boolean
    closeModal: () => void
    // modalData: imagesType
    modalData: PicType
}

export interface SozaiFolder {
    readonly value: string;
    readonly label: string;
}

export type PicTypeEx = {
    sozaiFolder : SozaiFolder
    picTypes : PicType[]
}
