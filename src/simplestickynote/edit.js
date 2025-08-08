import { __ } from '@wordpress/i18n';
import {
  useBlockProps,
  RichText,
  BlockControls,
  AlignmentToolbar,
} from '@wordpress/block-editor';


export default function Edit({ attributes, setAttributes }) {
  const { content = '', textAlign } = attributes;


  const blockProps = useBlockProps({
    style: {
      textAlign,
    },
  });

  return (
    <>
      <BlockControls>
        <AlignmentToolbar
          value={ textAlign }
          onChange={ (newAlign) => setAttributes({ textAlign: newAlign }) }
        />
      </BlockControls>

      <div { ...blockProps }>
        <RichText
          tagName="p"
          value={ content }
          onChange={ (newContent) => setAttributes({ content: newContent }) }
          allowedFormats={[ 'core/bold', 'core/italic', 'core/link' ]}
          placeholder={ __('Write your note…', 'simplestickynote') }
        />
      </div>
    </>
  );
}