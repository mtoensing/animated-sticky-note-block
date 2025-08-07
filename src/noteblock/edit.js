/**
 * Edit component for NoteBlock with background colour picker.
 */
import { __ } from '@wordpress/i18n';
import {
    RichText,
    BlockControls,
    AlignmentToolbar,
    InspectorControls,
    useBlockProps
} from '@wordpress/block-editor';
import { PanelBody, ColorPicker } from '@wordpress/components';

export default function Edit({ attributes, setAttributes }) {
    const { content = '', textAlign, backgroundColor = '#fff9c4' } = attributes;

    const blockProps = useBlockProps({
        style: { textAlign, backgroundColor }
    });

    return (
        <>
            <InspectorControls>
                <PanelBody title={__('Background colour', 'noteblock')} initialOpen={true}>
                    <ColorPicker
                        color={backgroundColor}
                        onChangeComplete={(value) =>
                            setAttributes({ backgroundColor: value.hex || value })
                        }
                        disableAlpha
                    />
                </PanelBody>
            </InspectorControls>
            <BlockControls>
                <AlignmentToolbar
                    value={textAlign}
                    onChange={(newAlign) => setAttributes({ textAlign: newAlign })}
                />
            </BlockControls>
            <div {...blockProps}>
                <RichText
                    tagName="p"
                    value={content}
                    onChange={(newContent) => setAttributes({ content: newContent })}
                    allowedFormats={['core/bold', 'core/italic', 'core/link']}
                    placeholder={__('Write your note…', 'noteblock')}
                />
            </div>
        </>
    );
}