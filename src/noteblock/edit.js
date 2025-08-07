/**
 * Edit component for NoteBlock.
 * Allows basic formatting (bold, italic, link) and text alignment.
 */
import { __ } from '@wordpress/i18n';
import { RichText, BlockControls, AlignmentToolbar } from '@wordpress/block-editor';

export default function Edit({ attributes, setAttributes, className }) {
    const { content = '', textAlign } = attributes;

    return (
        <>
            {/* Alignment controls */}
            <BlockControls>
                <AlignmentToolbar
                    value={textAlign}
                    onChange={(newAlign) => setAttributes({ textAlign: newAlign })}
                />
            </BlockControls>

            {/* Note container with sticky-note look */}
            <div className={className} style={{ textAlign }}>
                <RichText
                    tagName="p"
                    value={content}
                    onChange={(newContent) => setAttributes({ content: newContent })}
                    placeholder={__('Write your note…', 'noteblock')}
                    allowedFormats={['core/bold', 'core/italic', 'core/link']}
                    // Disallow tables and images by not including their format types
                />
            </div>
        </>
    );
}