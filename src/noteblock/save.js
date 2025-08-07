/**
 * Save component for NoteBlock.
 * Saves the note as HTML with preserved formatting and alignment.
 */
import { RichText } from '@wordpress/block-editor';

export default function save({ attributes }) {
    const { content, textAlign } = attributes;

    return (
        <div style={{ textAlign }}>
            <RichText.Content tagName="p" value={content} />
        </div>
    );
}