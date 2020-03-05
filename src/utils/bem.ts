export interface BEMWrapper {
    className: string;
    element: (e?: string, m?: string) => string;
    modifier: (m?: string) => string;
}

const BEMHelper = (cls: BEMWrapper['className']) => {
    const classNames = (cls && cls.split(' ')) || [];

    return {
        className: cls,
        element: (e?: string, m?: string) =>
            classNames.reduce((acc, className, index) => {
                return (
                    acc +
                    `${index === 0 ? '' : ' '}${className}__${e}${
                        m ? ` ${className}__${e}--${m}` : ''
                    }`
                );
            }, ''),
        modifier: (m?: string) =>
            classNames.reduce((acc, className, index) => {
                return acc + `${index === 0 ? '' : ' '}${className}--${m}`;
            }, ''),
    };
};

export default BEMHelper;
