/**
 * Save component for NoteBlock.
 * Saves the note as HTML with preserved formatting and alignment.
 */
import { RichText, useBlockProps } from '@wordpress/block-editor';

export default function save({ attributes }) {
  const {
    content,
    textAlign,
    backgroundColor = '#fff9c4',
    textColor,
  } = attributes;

  const blockProps = useBlockProps.save({
    style: {
      textAlign,
      backgroundColor,
      color: textColor, // apply text color on wrapper
    },
  });

  return (
    <div {...blockProps}>
      <RichText.Content
        tagName="p"
        value={content}
        style={{ color: textColor }}  // reinforce it on the paragraph
      />
    </div>
  );
}