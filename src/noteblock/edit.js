import { __ } from '@wordpress/i18n';
import metadata from './block.json';
import {
  RichText,
  BlockControls,
  AlignmentToolbar,
  InspectorControls,
  FontSizePicker,
  useBlockProps,
} from '@wordpress/block-editor';
import { PanelBody, ColorPalette } from '@wordpress/components';
import { useSelect } from '@wordpress/data';

export default function Edit({ attributes, setAttributes }) {
  const {
    content = '',
    textAlign,
    backgroundColor,
    textColor,
    fontSize,
  } = attributes;
  const DEFAULT_COLOR = '#fff9c4';

  // Pull the default size from block.json
  const defaultFontSize = metadata.attributes.fontSize.default;

  // Get theme colors and font sizes
  const { colors: themeColors = [], fontSizes: themeFontSizes = [] } =
    useSelect((select) => {
      const settings = select('core/block-editor')?.getSettings?.() || {};
      return {
        colors: settings.colors || [],
        fontSizes: settings.fontSizes || [],
      };
    }, []);

  const blockProps = useBlockProps({
    style: {
      textAlign,
      backgroundColor: backgroundColor || DEFAULT_COLOR,
      color: textColor,
      fontSize, // apply the chosen size
    },
  });

  return (
    <>
      <InspectorControls>
        <PanelBody title={__('Color', 'noteblock')} initialOpen>
          <div className="components-base-control">
            <span className="components-base-control__label">
              {__('Background', 'noteblock')}
            </span>
            <ColorPalette
              colors={themeColors}
              value={backgroundColor}
              onChange={(color) => setAttributes({ backgroundColor: color || undefined })}
              clearable
              disableCustomColors={false} // allow custom picker too
            />
          </div>
          <div className="components-base-control">
            <span className="components-base-control__label">
              {__('Text', 'noteblock')}
            </span>
            <ColorPalette
              colors={themeColors}
              value={textColor}
              onChange={(color) => setAttributes({ textColor: color || undefined })}
              clearable
              disableCustomColors={false}
            />
          </div>
        </PanelBody>
        <PanelBody title={__('Typography', 'noteblock')} initialOpen={false}>
          <FontSizePicker
            fontSizes={themeFontSizes}
            value={fontSize}
            onChange={(size) => {
              // When reset is clicked, onChange receives undefined – treat that as “revert to default”
              if (size === undefined) {
                setAttributes({ fontSize: defaultFontSize });
              } else {
                setAttributes({ fontSize: size });
              }
            }}
            fallbackFontSize={defaultFontSize}
            withSlider
            withReset  // show the reset button
          />
        </PanelBody>
      </InspectorControls>

      <BlockControls>
        {/* existing alignment toolbar */}
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