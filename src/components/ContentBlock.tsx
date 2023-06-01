import useMarginClass from "../hooks/useMarginClass";
import Text from "./Text";
import List from "./List";
import LightboxImage from "./LightboxImage";
import { Image, CrossDatasetReference } from "../generated/graphql";

interface ContentBlockProps {
    mt?:number;
    mb?:number;
    my?:number;
    gap?:number;
    content:Array<ContentItem>;
}

export interface ContentItem {
    _key:string;
    _type:string;
    level:number;
    listItem:string;
    style:string;
    markDefs:Array<string>;
    marks:Array<string>;
    text:string;
    children:Array<ContentItemChild>;
    verticalImageGallery:Array<Image>;
    asset:CrossDatasetReference;
}

export interface ContentItemChild {
    _key:string;
    _type:string;
    marks:Array<string>;
    text:string;
}

export default function ContentBlock({mt=0, mb=0, my=0, gap=0, content}:ContentBlockProps):JSX.Element {

    const marginClass:string = useMarginClass({my, mt, mb})

    interface TextBlockProps {
        blockMarks:Array<string>;
        content:string;
    }
    function TextBlock({blockMarks, content}:TextBlockProps):JSX.Element {
        let styleClass = ''
        if(blockMarks.length) {
            for(let i = 0; i < blockMarks.length; i++) {
                let mark = blockMarks[i]
                if(i !== 0) {
                    styleClass += ' '
                }
                if(mark === 'strong') {
                    styleClass += 'font-bold'
                } else if(mark === 'em') {
                    styleClass += 'italic'
                } else if(mark === 'underline') {
                    styleClass += 'underline'
                } else if(mark === 'strike-through') {
                    styleClass += 'line-through'
                } else if(mark === 'code') {
                    styleClass += 'bg-gray-400'
                }
            }
        }
        return <span className={styleClass}>{content}</span>
    }

    let isInList = false
    let listContent:Array<JSX.Element> = []

    return (
        <div className={`${marginClass}`}>
            {content?.map((contentItem:ContentItem, index:number, contentItemArray:Array<ContentItem>) => {
                if(contentItem._type === 'block') {
                    if(contentItem.style === 'normal' && !contentItem.listItem) {
                        return (
                            <div key={contentItem._key} className={gap ? `mt-${gap}`: ``}>
                                {contentItem?.children.map((childrenBlock, index) => {
                                    if(childrenBlock._type === 'span') {
                                        return <TextBlock key={childrenBlock._key} blockMarks={childrenBlock.marks} content={childrenBlock.text} />
                                    }
                                })}
                            </div>
                        )
                    } else if(contentItem.style === 'h2') {
                        return (
                            <Text key={contentItem._key} mt={gap ? gap * 2 : 0} variant="subheading">
                                {contentItem?.children.map((childrenBlock, index) => {
                                    if(childrenBlock._type === 'span') {
                                        return <TextBlock key={childrenBlock._key} blockMarks={childrenBlock.marks} content={childrenBlock.text} />
                                    }
                                })}
                            </Text>
                        )
                    } else if(contentItem.listItem === 'bullet') {
                        let nextContentItem = contentItemArray[index+1]
                        
                        if(!isInList) {
                            isInList = true
                            listContent = []
                        }
                        listContent.push(
                            <li key={contentItem._key}>
                                {contentItem.children.map((childrenBlock) => (
                                    <TextBlock key={childrenBlock._key} blockMarks={childrenBlock.marks} content={childrenBlock.text} />
                                ))}
                            </li>
                        )
                        if(!nextContentItem?.listItem) {
                            isInList = false
                            return <List key={contentItem._key}>{listContent}</List>
                        }

                    
                    }
                } else if(contentItem._type === 'verticalImageGallery') {
                    return (
                        <div key={contentItem._key} className="flex gap-2 aspect-video justify-center my-8">
                            {contentItem.verticalImageGallery.map((verticalImage, index) => {
                                return <LightboxImage key={verticalImage._key} sanityRef={verticalImage?.asset?._ref} alt={verticalImage.alt} title={verticalImage.alt} direction="vertical" />
                            })}
                        </div>
                    )
                } else if(contentItem._type === 'horizontalImage') {
                    return <LightboxImage key={contentItem._key} sanityRef={contentItem.asset._ref} alt={contentItem.alt} title={contentItem.alt} direction="horizontal" />
                } else {
                    return <></>
                }

            })}
        </div>
    )

    // else if(content.style === 'h2') {
    //     return (
    //         <Text key={content._key} variant="subheading">
    //             {content?.children.map((childrenBlock, index) => {
    //                 if(childrenBlock._type === 'span') {
    //                     return <TextBlock key={childrenBlock._key} blockMarks={childrenBlock.marks} content={childrenBlock.text} />
    //                 }
    //             })}
    //         </Text>
    //     )
    // } else if(content.listItem === 'bullet') {

    //     let isInList = false
    //     let listContent:Array<JSX.Element> = []

    //     if(!isInList) {
    //         isInList = true
    //         {content?.children.map((childrenBlock, index) => {
    //             listContent.push(
    //                 <li key={block._key}>
    //                     {block.children.map((childrenBlock) => (
    //                         <TextBlock key={childrenBlock._key} blockMarks={childrenBlock.marks} content={childrenBlock.text} />
    //                     ))}
    //                 </li>
    //             )
    //         })}
    //     }

    // }

    // return (
    //     <div className={`${marginClass}`}>
    //         {content?.map((block, index) => {
    //             if(block._type === 'span') {
    //                 return <TextBlock key={block._key} blockMarks={block.marks} content={block.text} />
    //             } else if(block._type === 'block') {
    //                 if(block.listItem === 'bullet') {
    //                     if(!isInList) {
    //                         isInList = true
    //                         listContent.push(
    //                             <li key={block._key}>
    //                                 {block.children.map((childrenBlock) => (
    //                                     <TextBlock key={childrenBlock._key} blockMarks={childrenBlock.marks} content={childrenBlock.text} />
    //                                 ))}
    //                             </li>
    //                         )
    //                     }
    //                 }
    //             } else {
    //                 return null
    //             }
    //         })}
    //     </div>
    // )
}