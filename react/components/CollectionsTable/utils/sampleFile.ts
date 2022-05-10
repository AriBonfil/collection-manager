// import XLSX from "xlsx";

// export const DownloadSampleFile = ()=>{
//   const data = [
//     ["SKU", "PRODUCT", "SKUREFID", "PRODUCTREFID",""],
//     [1,"","","","Product with skuId example"],
//     ["","","SKUREFID01","Product with skuRefId example"],
//     ["",10,"","","Product with productId example"],
//     ["","","","PRODUCTREFID01","Product with productRefId example"],
//   ];
//   const ws = XLSX.utils.aoa_to_sheet(data);

//   const wb = XLSX.utils.book_new();
//   XLSX.utils.book_append_sheet(wb, ws);
//   const wbrite = XLSX.writeFile(wb, "templante.xls");
//   return wbrite;
// }

export function downloadBase64File(contentType:String, base64Data:string, fileName:string) {
  const linkSource = `data:${contentType};base64,${base64Data}`;
  const downloadLink = document.createElement("a");
  downloadLink.href = linkSource;
  downloadLink.download = fileName;
  downloadLink.click();
}
