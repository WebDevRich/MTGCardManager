export interface ButtonTypes {
	color: ButtonColor;
	type: ButtonType;
	variant: ButtonVariant;
}

export enum ButtonColor {
	default = 'default',
	inherit = 'inherit',
	primary = 'primary',
	secondary = 'secondary'
}

export enum ButtonType {
	button = 'button',
	reset = 'reset',
	submit = 'submit'
}

export enum ButtonVariant {
	text = 'text',
	outlined = 'outlined',
	contained = 'contained',
	fab = 'fab',
	extendedFab = 'extendedFab',
	flat = 'flat',
	raised = 'raised'
}
