import React, {useEffect, useRef, useState} from "react";
import {DropdownOptionBasics} from "../stores/DropdownListItemTemplate";

interface DropdownProps{
    title: string;
    isMulti?: boolean;
    titleHelper?: string;
    titleHelperPlural?: string;
    options: DropdownOptionBasics[];
}

const Dropdown = ({ title, options, isMulti, titleHelper, titleHelperPlural }: DropdownProps) => {
    isMulti = isMulti ?? false;
    titleHelper = titleHelper ?? "";
    titleHelperPlural = titleHelperPlural ?? "";
    const [isListOpen, setIsListOpen] = useState(false);
    const [headerTitle, setHeaderTitle] = useState(title);
    let count = 0;
    const ref = useRef<HTMLDivElement | null>(null);

    const toggleList = () => {
        setIsListOpen(!isListOpen);
    }
    const selectItemSingle = (item: any) => {
        let { value, id, key, selected} = item;
        options.forEach((item) => {item.selected = false})
        item.selected = !selected;
        headerTitle === value ? setHeaderTitle(title) : setHeaderTitle(value)
        setIsListOpen(false);
    }
    const selectItemMulti = (item: any) => {
        let { value, id, key, selected} = item;
        item.selected = !selected;
        count = options.filter(option => option.selected).length;
        console.log(count)
        count === 1 && titleHelper !== "" ? setHeaderTitle(`${count} ${titleHelper}`) :
            count > 1 && titleHelperPlural !== "" ? setHeaderTitle(`${count} ${titleHelperPlural}`) :
                setHeaderTitle(title);
        setIsListOpen(false);
    }
    useEffect(() => {
        window.addEventListener('click', (event) => {
            if(!ref.current?.contains(event.target as Node)) {
                setIsListOpen(false);
            }
        })
        return () => {
            window.removeEventListener('click', () => {setIsListOpen(false)})
        }
    }, [])


    return (
        <div className={`relative w-[250px] text-lg select-none`} ref={ref}>
            <button type="button" className={`flex items-center justify-between relative 
            border-2 border-solid w-full border-blue-400 rounded-sm 
            leading-9 cursor-default cursor-pointer`} onClick={toggleList}>
                <div className={`my-2 ml-5 mr-10 font-normal`}>{ headerTitle }</div>
                {isListOpen ? <i className={`fa fa-fw fa-angle-up mr-3`} /> : <i className={`fa fa-fw fa-angle-down mr-3`} />}
            </button>
            {isListOpen && (
                <div role="list" className={`absolute z-10 flex flex-col w-full max-h-56 border-2 border-solid border-blue-400
                border-t-0 rounded-t-sm shadow bg-white font-semibold text-left overflow-y-auto `}>
                    {options.map((item) => (
                        <button
                            type="button"
                            className={`inline-block overflow-hidden w-full text-left p-2 text-base leading-5
                            whitespace-nowrap text-ellipsis`}
                            key={item.id}
                            onClick={() => isMulti ? selectItemMulti(item) : selectItemSingle(item)}
                        >
                            {item.value}
                            {' '}
                            {item.selected && <i className={`fa fa-fw fa-check mr-3`} />}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Dropdown;
