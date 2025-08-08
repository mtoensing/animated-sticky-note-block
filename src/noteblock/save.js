/**
 * Save component for NoteBlock.
 * Outputs the note’s HTML with the user’s font size, colours and border.
 */
import { RichText, useBlockProps } from '@wordpress/block-editor';

/* Helper to darken a hex colour by a percentage */
function darken(hex, percent) {
  const num = parseInt(hex.replace('#', ''), 16);
  let r = (num >> 16) & 255;
  let g = (num >> 8) & 255;
  let b = num & 255;
  r = Math.max(0, Math.floor(r * (100 - percent) / 100));
  g = Math.max(0, Math.floor(g * (100 - percent) / 100));
  b = Math.max(0, Math.floor(b * (100 - percent) / 100));
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
}

/* Helper to lighten a hex colour by a percentage */
function lighten(hex, percent) {
  const num = parseInt(hex.replace('#', ''), 16);
  let r = (num >> 16) & 255;
  let g = (num >> 8) & 255;
  let b = num & 255;
  r = Math.min(255, Math.floor(r + (255 - r) * percent / 100));
  g = Math.min(255, Math.floor(g + (255 - g) * percent / 100));
  b = Math.min(255, Math.floor(b + (255 - b) * percent / 100));
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
}

export default function save({ attributes }) {
  const {
    content,
    textAlign,
    backgroundColor = '#fff9c4',
    textColor,
    fontSize,
  } = attributes;

  // Compute dynamic colours
  const borderColour = darken(backgroundColor, 10);  // darker border
  const foldColour = lighten(backgroundColor, 30);   // lighter fold colour

  // Build block props, including the user’s fontSize if set
  const blockProps = useBlockProps.save({
    style: {
      textAlign,
      backgroundColor,
      color: textColor,
      border: `1px solid ${borderColour}`,
      fontSize: fontSize, // e.g. 56 -> “56px” at runtime
      '--note-background-color': backgroundColor,
      '--note-dark-color': foldColour,
    },
  });

  return (
    <div {...blockProps}>
      <RichText.Content
        tagName="p"
        value={ content }
        style={{
          color: textColor,
          fontSize: fontSize,
        }}
      />
    </div>
  );
}