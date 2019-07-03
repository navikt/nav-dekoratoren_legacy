import React from 'react';
import Downshift from 'downshift';

interface OwnProps {
    items: string[];
    placeholder: string;
}

const SearchBox = ({ items, placeholder }: OwnProps) => {
    return (
        <Downshift
            onChange={onChange}
            render={({
                getInputProps,
                getItemProps,
                isOpen,
                inputValue,
                selectedItem,
                highlightedIndex,
            }) => (
                <div>
                    <input {...getInputProps({ placeholder })} />
                    {isOpen ? (
                        <div style={{ border: '1px solid #ccc' }}>
                            {items
                                .filter(
                                    i =>
                                        !inputValue ||
                                        i
                                            .toLowerCase()
                                            .includes(inputValue.toLowerCase())
                                )
                                .map((item, index) => (
                                    <div
                                        {...getItemProps({ item })}
                                        key={item}
                                        style={{
                                            backgroundColor:
                                                highlightedIndex === index
                                                    ? 'gray'
                                                    : 'white',
                                            fontWeight:
                                                selectedItem === item
                                                    ? 'bold'
                                                    : 'normal',
                                        }}
                                    >
                                        {item}
                                    </div>
                                ))}
                        </div>
                    ) : null}
                </div>
            )}
        />
    );
};

export default SearchBox;

/*
import * as React from 'react';
import Downshift from 'downshift';

export const SearchBox = ({ items: string[], placeholder: string }) => {
    return (
        <Downshift
            render={({
                         getInputProps, // Props to pass to our input
                         getItemProps,  // Props to pass into each of the suggested items
                         isOpen,        // Whether the "suggestions box" is visible or not
                         inputValue,    // Value that the user typed in the search box
                         selectedItem,  // Item that is currently selected in the list (when hovering)
                         highlightedIndex, // Index of the item currently selected in the list
                     }) => (
                <div>
                    // The search box where the user types
                    <input {...getInputProps({ placeholder })} />
                    {isOpen ? (
                        <div style=>
                            {items // Items are passed in as a prop
                            //-> so it's a list of all elements, unfiltered
                                .filter( // that's why we first filter the list
                                    i =>
                                        // show item `i` if:
                                        !inputValue || // the user didn't type anything in the box
                                        // OR item `i` contains the text from the user (`inputValue`)
                                        i.toLowerCase().includes(inputValue.toLowerCase()),
                                )
                                // then, for each filtered item ..
                                .map((item, index) => (
                                    // output a <div> ..
                                    <div
                                        {...getItemProps({item})} // .. using the props from `render`
                                        key={item}
                                        style=
                                    >
                                        {item} // .. and containing the name of the suggestion
                                    </div>
                                ))}
                        </div>
                    ) : null}
                </div>
            )}
        />
    )
} */
