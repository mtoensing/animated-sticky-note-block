import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	RichText,
	BlockControls,
	AlignmentToolbar,
	InspectorControls,
} from '@wordpress/block-editor';
import { PanelBody, RangeControl } from '@wordpress/components';

export default function Edit( { attributes, setAttributes } ) {
	const { content = '', textAlign, width } = attributes;

	const blockProps = useBlockProps( {
		style: {
			textAlign,
			...( width ? { width } : {} ),
		},
	} );


	return (
		<>
			<BlockControls>
				<AlignmentToolbar
					value={ textAlign }
					onChange={ ( newAlign ) =>
						setAttributes( { textAlign: newAlign } )
					}
				/>
			</BlockControls>
			<InspectorControls>
				<PanelBody
					title={ __( 'Size', 'simplestickynote' ) }
					initialOpen={ true }
				>
					<RangeControl
						label={ __( 'Width (px)', 'simplestickynote' ) }
						value={ parseInt( width, 10 ) || 300 }
						onChange={ ( newVal ) =>
							setAttributes( { width: `${ newVal }px` } )
						}
						min={ 100 }
						max={ 1400 }
						step={ 10 }
					/>
				</PanelBody>
			</InspectorControls>

			<div { ...blockProps }>
				<RichText
					tagName="p"
					value={ content }
					onChange={ ( newContent ) =>
						setAttributes( { content: newContent } )
					}
					allowedFormats={ [
						'core/bold',
						'core/italic',
						'core/link',
					] }
					placeholder={ __( 'Write your note…', 'simplestickynote' ) }
				/>
			</div>
		</>
	);
}
