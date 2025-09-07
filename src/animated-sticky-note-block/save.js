import { RichText, useBlockProps } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const { textAlign, width } = attributes;
	const blockProps = useBlockProps.save( {
		style: {
			textAlign,
			...( width ? { width } : {} ),
		},
	} );
	return (
		<div { ...blockProps }>
			<RichText.Content tagName="p" value={ attributes.content } />
		</div>
	);
}
