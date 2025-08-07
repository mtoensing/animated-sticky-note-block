/**
 * Edit component for NoteBlock.
 * Allows basic formatting (bold, italic, link) and text alignment.
 */
import { __ } from '@wordpress/i18n';
import { RichText, BlockControls, AlignmentToolbar, useBlockProps } from '@wordpress/block-editor';

export default function Edit({ attributes, setAttributes }) {
    const { content = '', textAlign } = attributes;

    // Apply block props with inline text alignment
    const blockProps = useBlockProps({ style: { textAlign } });

    return (
        <>
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
                    placeholder="Write your note…"
                />
            </div>
        </>
    );
}