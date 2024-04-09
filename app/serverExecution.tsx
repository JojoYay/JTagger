'use server'
import { SozaiFolder,PicType, PicTypeEx } from "./components/types";

export const loadSozaiFolders = (folderPath?:string)  => {
	const glob = require('glob');
	//systemとdeleteは対象外
	let folderNames:string[] = glob.sync( "./public/[^system|delete]*/").sort();
	// console.log(folderNames)
	const sozaiFolders:SozaiFolder[] = folderNames.map((f) => {return {value:f.substring(7, f.length), label:f.substring(7, f.length)} as SozaiFolder});
	return sozaiFolders;
}

export const loadFiles = (folderPath:string)  => {
	const glob = require('glob')
	let fileNames = glob.sync( "./public/"+folderPath+"/*.{jpg,png}").sort()
	const fs = require('fs');
	const pics:PicType[] = fileNames.map((fileName:string) => {
		const data:string = fs.readFileSync(fileName.substring(0, fileName.indexOf("."))+".caption",{ encoding: 'utf8', flag: 'r' });
		let newFileName = fileName.replaceAll('\\','/').replace("public/","/")
		let captionSrc = (fileName.substring(0, fileName.indexOf("."))+".caption").replaceAll('\\','/').replace("public/","/");
		return {imageSrc:newFileName, tags:data, captionSrc:captionSrc}
	})
	return pics
}

export const updateCaption = (src:string, data:string)  => {
	const rightSrc = "./public"+src;
	const fs = require('fs');
	const old :string = fs.readFileSync(rightSrc,{ encoding: 'utf8', flag: 'r' })
	try{
		fs.writeFileSync(rightSrc, data, { encoding: 'utf8', flag: 'w+' });
	} catch (e){
		console.error(e);
	}
}

//name:no extention
// export const deleteFiles = (sozaiFolderPics:PicTypeEx[], sozaiIndex:number, picIndex:number)  => {
export const deleteFiles = (picOrg:string, capOrg:string, picToBe:string, capToBe:string, tags:string)  => {
	const fs = require('fs');
	console.log("org: "+picOrg + ", "+ capOrg);
	console.log("tobe: "+picToBe + ", "+ capToBe);
	console.log(tags)	
	try{
		fs.writeFileSync(capToBe, tags, { encoding: 'utf8', flag: 'w+' });
		fs.copyFileSync(picOrg, picToBe, 1);
		fs.unlink(picOrg, (err:Error) => {
			if (err) throw err;
			console.log(picOrg+' was deleted');
		})
		fs.unlink(capOrg, (err:Error) => {
			if (err) throw err;
			console.log(capOrg+' was deleted');
		})
	} catch (e){
		console.error(e);
	}
}