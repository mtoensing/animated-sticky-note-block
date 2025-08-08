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
    style = {},
    backgroundColor = '#fff9c4', // legacy fallback
    textColor: legacyTextColor,
    fontSize: legacyFontSize,
  } = attributes;

  const DEFAULT_COLOR = '#fff9c4';
  const bgFromSupports = style?.color?.background; // may be hex or CSS var
  const textFromSupports = style?.color?.text;
  const fontSizeFromSupports = style?.typography?.fontSize;

  const background = bgFromSupports || backgroundColor || DEFAULT_COLOR;
  const textColor = textFromSupports || legacyTextColor;
  const resolvedFontSize = fontSizeFromSupports || legacyFontSize;

  const isHex = (c) => typeof c === 'string' && /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(c);
  const borderColour = isHex(background) ? darken(background, 10) : 'rgba(0,0,0,0.2)';
  const foldColour = isHex(background) ? lighten(background, 30) : background;

  // Build block props, including the user’s fontSize if set
  const blockProps = useBlockProps.save({
    style: {
      textAlign,
      backgroundColor: background,
      color: textColor,
      border: `1px solid ${ borderColour }`,
      fontSize: resolvedFontSize,
      '--note-background-color': background,
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
          fontSize: resolvedFontSize,
        }}
      />
    </div>
  );
}