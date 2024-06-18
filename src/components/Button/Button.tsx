import { memo } from 'react';
import { ButtonProps } from './Button.props';
import './Button.css';
import cn from 'classnames'

function Button({ children,className, ...props }: ButtonProps) {
    console.log('Button');
    return (
        <button
            className={cn('button accent',className)}
            {...props}
        >
            {children}
        </button>
    );
}

export default memo(Button);
