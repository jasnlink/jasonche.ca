interface MarginClassProps {
    my?:number;
    mt?:number;
    mb?:number;
}

export default function useMarginClass({my=0, mt=0, mb=0}:MarginClassProps):string {

    let marginClass = ''
    if(my) {
        marginClass += `my-${my} `
    }
    if(mt) {
        marginClass += `mt-${mt} `
    }
    if(mb) {
        marginClass += `mb-${mb} `
    }
    return marginClass

}