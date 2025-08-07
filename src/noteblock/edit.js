import { __ } from '@wordpress/i18n';
import {
  RichText,
  BlockControls,
  AlignmentToolbar,
  InspectorControls,
  useBlockProps,
} from '@wordpress/block-editor';
import { PanelBody, ColorPalette } from '@wordpress/components';
import { useSelect } from '@wordpress/data';

export default function Edit({ attributes, setAttributes }) {
  const { content = '', textAlign, backgroundColor } = attributes;
  const DEFAULT_COLOR = '#fff9c4';

  // Get editor settings (palette etc.) in a version-safe way
  const themeColors = useSelect( ( select ) => {
    const settings = select('core/block-editor')?.getSettings?.() || {};
    // Most WP versions expose palette as `settings.colors`
    return settings.colors || [];
  }, [] );

  const blockProps = useBlockProps({
    style: { textAlign, backgroundColor: backgroundColor || DEFAULT_COLOR },
  });

  return (
    <>
      <InspectorControls>
        <PanelBody title={ __('Color', 'noteblock') } initialOpen>
          <div className="components-base-control">
            <span className="components-base-control__label">
              { __('Background', 'noteblock') }
            </span>
            <ColorPalette
              colors={ themeColors }
              value={ backgroundColor }
              onChange={ (color) => setAttributes({ backgroundColor: color || undefined }) }
              clearable
              disableCustomColors={ false } // allow custom picker too
            />
          </div>
        </PanelBody>
      </InspectorControls>

      <BlockControls>
        <AlignmentToolbar
          value={ textAlign }
          onChange={ (newAlign) => setAttributes({ textAlign: newAlign }) }
        />
      </BlockControls>

      <div {...blockProps}>
        <RichText
          tagName="p"
          value={ content }
          onChange={ (newContent) => setAttributes({ content: newContent }) }
          allowedFormats={ ['core/bold', 'core/italic', 'core/link'] }
          placeholder={ __('Write your note…', 'noteblock') }
        />
      </div>
    </>
  );
}