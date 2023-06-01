export default function useImageUrl(imageReference:string=''):string {
    if(!imageReference) {
        return imageReference
    }
    let splitRef = imageReference.split('-')
    return `https://cdn.sanity.io/images/q8h9ggfv/production/${splitRef[1]}-${splitRef[2]}.${splitRef[3]}`
}