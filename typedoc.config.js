/** @type {Partial<import("typedoc").TypeDocOptions>} */
const config = {
    entryPoints: ["./src/"],
    externalSymbolLinkMappings: {
        typescript: {
            HTMLElementEventMap: "https://www.w3schools.com/tags/ref_eventattributes.asp"
        }
    },
    groupReferencesByType: true,
    excludePrivate: true,
    // plugin: ["typedoc-unhoax-theme"]
};

export default config;