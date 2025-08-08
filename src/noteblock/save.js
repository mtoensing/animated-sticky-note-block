/**
 * Save component for NoteBlock.
 */
import { RichText, useBlockProps } from '@wordpress/block-editor';

// Darken a hex color by a percentage (no dependencies needed)
function darken(hex, percent) {
    // Strip the '#'
    const num = parseInt(hex.replace('#', ''), 16);
    let r = (num >> 16) & 255;
    let g = (num >> 8) & 255;
    let b = num & 255;

    // Darken each channel
    r = Math.max(0, Math.floor(r * (100 - percent) / 100));
    g = Math.max(0, Math.floor(g * (100 - percent) / 100));
    b = Math.max(0, Math.floor(b * (100 - percent) / 100));

    // Reassemble
    return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
}

export default function save({ attributes }) {
    const {
        content,
        textAlign,
        backgroundColor = '#fff9c4',
        textColor,
    } = attributes;

    // Automatically compute a darker border color
    const borderColor = darken(backgroundColor, 10); // 10% darker

    const blockProps = useBlockProps.save({
        style: {
            textAlign,
            backgroundColor,
            color: textColor,
            border: `1px solid ${borderColor}`,
        },
    });

    return (
        <div {...blockProps}>
            <RichText.Content
                tagName="p"
                value={content}
                style={{ color: textColor }}
            />
        </div>
    );
}