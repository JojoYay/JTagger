import Main from './components/main'
import { SozaiFolder, PicTypeEx } from './components/types'
import { loadFiles, loadSozaiFolders} from './serverExecution';

// メインページ
export default function Home(){
  const sozaiFolders:SozaiFolder[] = loadSozaiFolders();
  // console.log(sozaiFolders);
  let picTypeExs:PicTypeEx[] = [];
  sozaiFolders.forEach((sozaiFolder) => {
    picTypeExs.push({sozaiFolder:{value: sozaiFolder.value, label:sozaiFolder.label}, picTypes:loadFiles(sozaiFolder.value)})
  })

  // const [picTypeExs, setPicTypeExs] = useState<PicTypeEx[]>(sozaiFolderPics);
  // const [indexNum, setIndexNum] = useState<number>(0);
  // const [sozaiIndex, setSozaiIndex] = useState<number>(0);

  // const testPics:picType[] = loadFiles()
  return <Main 
            picTypeExsOrg={picTypeExs}
            // setPicTypeExs={setPicTypeExs}
            // indexNum={indexNum} setIndexNum={setIndexNum} 
            // sozaiIndex={sozaiIndex} setSozaiIndex={setSozaiIndex} 
          />
}
