import { RichText, useBlockProps } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const blockProps = useBlockProps.save( {
		style: { textAlign: attributes.textAlign },
	} );
	return (
		<div { ...blockProps }>
			<RichText.Content tagName="p" value={ attributes.content } />
		</div>
	);
}
