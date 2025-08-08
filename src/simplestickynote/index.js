/**
 * Block registration for simplestickynote.
 */
import { registerBlockType } from '@wordpress/blocks';
import metadata from './block.json';
import Edit from './edit';
import save from './save';
import './style.scss';   // front‑end styles
import './editor.scss';  // editor styles

registerBlockType(metadata.name, {
    edit: Edit,
    save,
});