import { LANGUAGE_NAMES, CodeblockStylerThemeSettings } from "./Settings";
import { CodeblockParameters, Highlights } from "./CodeblockParsing";

export function createHeader(codeblockParameters: CodeblockParameters, themeSettings: CodeblockStylerThemeSettings, languageIcons: Record<string,string>): HTMLElement {
	const headerContainer = createDiv({cls: `codeblock-styler-header-container${(codeblockParameters.fold.enabled || codeblockParameters.title !== '')?'-specific':''}`});
	if (codeblockParameters.language !== ''){
		const IconURL = getLanguageIcon(codeblockParameters.language,languageIcons)
		if (IconURL !== null) {
			const imageWrapper = createDiv();
			const img = document.createElement("img");
			img.classList.add("codeblock-styler-icon");
			img.src = IconURL;
			imageWrapper.appendChild(img);
			headerContainer.appendChild(imageWrapper);
		}
		headerContainer.appendChild(createDiv({cls: `codeblock-styler-header-language-tag-${codeblockParameters.language}`, text: getLanguageTag(codeblockParameters.language)}));
	}
	
	let headerText = '';
	if (codeblockParameters.title !== '')
		headerText = codeblockParameters.title;
	else if (codeblockParameters.fold.enabled)
		if (codeblockParameters.fold.placeholder!=='')
			headerText = codeblockParameters.fold.placeholder;
		else
			headerText = themeSettings.header.collapsePlaceholder!==''?themeSettings.header.collapsePlaceholder:'Collapsed Code';
	headerContainer.appendChild(createDiv({cls: "codeblock-styler-header-text", text: headerText}));   

	return headerContainer;
}

function getLanguageTag(language: string) {
	if (language in LANGUAGE_NAMES)
		return LANGUAGE_NAMES[language];
	else if (language !== '')
		return language.charAt(0).toUpperCase() + language.slice(1);
	return "";
}
function getLanguageIcon(language: string, languageIcons: Record<string,string>) {
	language = getLanguageTag(language);
	if (language in languageIcons)
		return languageIcons[language];
	return null;
}

export function getLineClass(codeblockParameters: CodeblockParameters, lineNumber: number, line: string): Array<string> {
	let classList: Array<string> = [];
	if (codeblockParameters.highlights.default.lineNumbers.includes(lineNumber) || codeblockParameters.highlights.default.plainText.some(text => line.indexOf(text) > -1) || codeblockParameters.highlights.default.regularExpressions.some(regExp => regExp.test(line)))
		classList.push('codeblock-styler-line-highlighted');
	Object.entries(codeblockParameters.highlights.alternative).forEach(([alternativeHighlight,highlightedLines]: [string,Highlights]) => {
		if (highlightedLines.lineNumbers.includes(lineNumber) || highlightedLines.plainText.some(text => line.indexOf(text) > -1) || highlightedLines.regularExpressions.some(regExp => regExp.test(line)))
			classList.push(`codeblock-styler-line-highlighted-${alternativeHighlight.replace(/\s+/g, '-').toLowerCase()}`);
	})
	if (classList.length === 0)
		classList = ['codeblock-styler-line']
	return classList;
}
