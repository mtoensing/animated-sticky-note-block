/**
 * Block registration for NoteBlock.
 */
import { registerBlockType } from '@wordpress/blocks';
import metadata from './block.json';
import Edit from './edit';
import save from './save';

registerBlockType(metadata.name, {
    edit: Edit,
    save,
});