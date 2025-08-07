/**
 * Save component for NoteBlock.
 * Saves the note as HTML with preserved formatting and alignment.
 */
import { RichText, useBlockProps } from '@wordpress/block-editor';

export default function save({ attributes }) {
    const { content, textAlign } = attributes;

    // Get default block props, including the wrapper class
    const blockProps = useBlockProps.save({
        style: { textAlign },
    });

    return (
        <div {...blockProps}>
            <RichText.Content tagName="p" value={content} />
        </div>
    );
}