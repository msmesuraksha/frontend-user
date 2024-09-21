import { ImageIcons } from "../Invoice/uploadFilesModal";

export const pdfImgType = (item) => {
    let imgType = ''

    for (const key in ImageIcons) {
        let currentUrlArr = ''
        if (item.url) {
            currentUrlArr = item?.url?.split('.');
        } else {
            currentUrlArr = item?.fileUrl?.split('.');
        }

        if (currentUrlArr == undefined) break
        if (key === currentUrlArr[currentUrlArr?.length - 1]) {
            imgType = ImageIcons[key];
            break;
        }
    }

    return imgType

}