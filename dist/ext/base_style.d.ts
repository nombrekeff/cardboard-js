import { CTag } from '../cardboard.js';
/**
 * Creates a base style for the application.
 * This style includes basic styles for buttons and inputs.
 * It can be mounted to the current mount point or used as a standalone style.
 *
 * @param mountToParent - If true, the style will be appended to the current mount point.
 * @returns A CTag representing the base style.
 */
export declare const BaseStyle: (mountToParent?: boolean) => CTag;
