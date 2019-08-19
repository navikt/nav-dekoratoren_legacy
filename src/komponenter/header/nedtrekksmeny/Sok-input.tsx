import React from 'react';
// import Downshift from 'downshift';

/* interface OwnProps {
    options: any[];
    onChange: (e: React.FormEvent<HTMLInputElement>) => void;
} */

// const SokInput = ({ options, onChange}: OwnProps) => {
const SokInput = () => {
    return (
        <div />
        /* <Downshift
                onChange={selectedItem => onChange(selectedItem ? selectedItem.value : '')}
                itemToString={item => (item ? item.value : '')}
            >
                {({
                      getInputProps,
                      getMenuProps,
                      getRootProps,
                      getItemProps,
                      getToggleButtonProps,
                      isOpen,
                      highlightedIndex,
                      inputValue,
                      clearSelection
                  }) => (
                    <form {...getRootProps()}>
                        <div>
                            <input {...getInputProps()} />
                            <button {...getToggleButtonProps()}>
                                {isOpen ? '-' : '+'}
                            </button>
                            // add this to clear the currently selected item
                            <button onClick={clearSelection}>x</button>
                        </div>
                        <ul {...getMenuProps()}>
                            {isOpen &&
                            options
                                .filter(item => !inputValue || item.value.includes(inputValue))
                                .map((item, index) => (
                            <li
                            {...getItemProps({
                                style: {
                                backgroundColor:
                                index === highlightedIndex ? 'lightgray' : null
                            },
                                key: item.value,
                                item,
                                index
                            })}
                                >
                            {item.value}
                                </li>
                                ))}
                        </ul>
                    </form>
                )}
            </Downshift> */
    );
    // };
};
export default SokInput;
