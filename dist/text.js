import { isObject } from './util.js';
export function text(textTemplate, values) {
    const node = document.createTextNode('');
    const interpolatePattern = /\B\$([0-9]+|[a-z][a-z0-9_$]*)/gi;
    const updateNode = () => {
        if (!values) {
            node.nodeValue = textTemplate;
        }
        else {
            node.nodeValue = textTemplate.replace(interpolatePattern, (match, g1) => {
                return values[g1] != null ? values[g1].toString() : match;
            });
        }
    };
    if (values && isObject(values)) {
        for (let key in values) {
            if (textTemplate.includes(`$${key}`)) {
                const item = values[key];
                item.changed(() => {
                    updateNode();
                });
            }
        }
    }
    updateNode();
    return node;
}
//# sourceMappingURL=text.js.map