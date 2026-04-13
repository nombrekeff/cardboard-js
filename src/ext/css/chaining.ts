// src/ext/chaining.ts (or similar)
import { CTag } from "../../tag.js";
import * as styling from "./styling.js";

// 1. Tell TypeScript these methods exist on CTag
declare module "../../tag.js" {
  interface CTag {
    addClass: typeof styling.addClass;
    setClassName: typeof styling.setClassName;
    rmClass: typeof styling.rmClass;
    toggleClass: typeof styling.toggleClass;
    hasClass: typeof styling.hasClass;
    replaceClass: typeof styling.replaceClass;
    // 
    addStyle: typeof styling.addStyle;
    rmStyle: typeof styling.rmStyle;
    setStyle: typeof styling.setStyle;
    styled: typeof styling.styled;
    hasStyle: typeof styling.hasStyle;
  }
}

CTag.prototype.setStyle = styling.setStyle;
CTag.prototype.styled = styling.styled;
CTag.prototype.addStyle = styling.addStyle;
CTag.prototype.rmStyle = styling.rmStyle;
CTag.prototype.hasStyle = styling.hasStyle;

CTag.prototype.addClass = styling.addClass;
CTag.prototype.setClassName = styling.setClassName;
CTag.prototype.rmClass = styling.rmClass;
CTag.prototype.toggleClass = styling.toggleClass;
CTag.prototype.hasClass = styling.hasClass;
CTag.prototype.replaceClass = styling.replaceClass;