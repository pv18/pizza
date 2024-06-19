import { FC, memo } from 'react';
import { ButtonProps } from './Button.props';
import cn from 'classnames';
import s from './Button.module.scss';

const Button: FC<ButtonProps> = (props) => {
	const { children, className, appearence = 'small', ...restProps } = props;

	return (
		<button
			className={cn(s['button'], s['accent'], className, {
				[s['small']]: appearence === 'small',
				[s['big']]: appearence === 'big'
			})}
			{...restProps}>
			{children}
		</button>
	);
};

export default memo(Button);
