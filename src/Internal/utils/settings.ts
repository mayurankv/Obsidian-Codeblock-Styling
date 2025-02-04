// TODO: Update

import CodeStylerPlugin from "src/main";
import { PREFIX } from "../constants/general";
import { BUTTON_TRANSITION, FOLD_TRANSITION } from "../constants/interface";
import { DEFAULT_SETTINGS, THEME_DEFAULT_SETTINGS } from "../constants/settings";
import { getThemeModeStyles } from "../constants/themes";
import { Colour } from "../types/decoration";
import { CodeStylerSettings, CodeStylerTheme, CodeStylerThemeModeStyles, CodeStylerThemeStyles } from "../types/settings";
import { flattenObject } from "./objects";
import { camelCaseToKebabCase } from "./string";
import { LANGUAGE_NAMES } from "../constants/parsing";
import { LANGUAGES } from "../constants/decoration";
import { getThemeStyles } from "./themes";

export function convertStylesToVars(
	plugin: CodeStylerPlugin,
	mode: "light" | "dark",
): string {
	const styles = getThemeStyles(plugin, mode)

	const flattenedStyles = flattenObject(styles, "--" + PREFIX.slice(0,-1))

	let styleString = ""

	styleString += `body.cs-plugin.theme-${mode}{\n`;

	for (const key in flattenedStyles)
		styleString += `\t${camelCaseToKebabCase(key)}: ${flattenedStyles[key].startsWith("--") ? ("var(" + flattenedStyles[key] + ")")  : flattenedStyles[key]};\n`

	styleString += "}";

	return styleString
}

export function addLanguageColourVars(
	plugin: CodeStylerPlugin,
) {
	return Object.entries(LANGUAGE_NAMES).reduce(
		(
			result: string,
			[languageName, languageDisplayName]: [string,string],
		) => {
			const languageColour = LANGUAGES?.[languageDisplayName]?.colour ?? plugin.settings.detecting.languages.addedLanguages?.[languageName]?.colour
			if (languageColour)
				result += `.language-${languageName} {
					--cs-language-colour: ${languageColour};
				}`

			return result
		},
		``,
	)
}

export function addExtraVars(): string {
	let styleString = ""

	styleString += "body.cs-plugin{\n";
	styleString += `--cs-transition-length-button: ${BUTTON_TRANSITION}ms;\n`
	styleString += `--cs-transition-length-fold: ${FOLD_TRANSITION}ms;\n`
	styleString += "}";

	return styleString
}

export function convertSettings(
	settings: CodeStylerSettings
): CodeStylerSettings {
	if (typeof settings?.internal?.version === "undefined")
		return settingsClear();

	while (semverNewer(DEFAULT_SETTINGS.internal.version, settings.internal.version)) {
		if (settings.internal.version in settingsUpdaters)
			settings = settingsUpdaters[settings.internal.version](settings);
		else
			settings = settingsClear();
	}
	return settings;
}

function semverNewer(
	newVersion: string,
	oldVersion: string
): boolean {
	return newVersion.localeCompare(oldVersion, undefined, { numeric: true }) === 1;
}

function settingsVersionUpdate(
	settings: CodeStylerSettings,
	themeUpdater: (theme: CodeStylerTheme) => CodeStylerTheme = (theme) => theme,
	otherSettingsUpdater: (settings: CodeStylerSettings) => CodeStylerSettings = (settings) => settings,
	redirectLanguagesUpdater: (redirectLanguages: Record<string, { colour?: Colour, icon?: string }>) => Record<string, { colour?: Colour, icon?: string }> = (redirectLanguages) => redirectLanguages
): CodeStylerSettings {
	for (const [name, theme] of Object.entries(settings.decorating.themes))
		settings.decorating.themes[name] = themeUpdater(theme);

	for (const [name, theme] of Object.entries(settings.internal.themes))
		settings.decorating.themes[name] = themeUpdater(theme);

	settings.detecting.languages.addedLanguages = redirectLanguagesUpdater(settings.detecting.languages.addedLanguages);
	settings = otherSettingsUpdater(settings);
	settings.internal.version = Object.keys(settingsUpdaters).find((value,index,array)=>array?.[index-1]===settings.internal.version) ?? "1.0.0";
	return settings;
}

function settingsPreserve(
	settings: CodeStylerSettings
): CodeStylerSettings {
	settings.internal.version = Object.keys(settingsUpdaters).find(
		(value, index, array) => array?.[index - 1] === settings.internal.version
	) ?? "1.0.0";

	return settings;
}

function settingsClear(): CodeStylerSettings {
	return DEFAULT_SETTINGS;
}

const settingsUpdaters: Record<string,(settings: CodeStylerSettings)=>CodeStylerSettings> = {
	"1.0.0": settingsClear,
	"1.0.1": settingsClear,
	"1.0.2": settingsClear,
	"1.0.3": settingsClear,
	"1.0.4": settingsClear,
	"1.0.5": settingsClear,
	"1.0.6": settingsClear,
	"1.0.7": settingsPreserve,
	"1.0.8": settingsPreserve,
	"1.0.9": settingsPreserve,
	"1.0.10": (settings)=>settingsVersionUpdate(settings,(theme)=>{ // To 1.0.10
		//@ts-expect-error Older interface versions
		theme.settings.inline.style = true;
		return theme;
	},(settings)=>{//@ts-expect-error Older interface versions
		delete settings.specialLanguages;
		return settings;
	}),
	"1.0.11": settingsPreserve,
	"1.1.0": settingsPreserve,
	"1.1.1": settingsPreserve,
	"1.1.2": settingsPreserve,
	"1.1.3": settingsPreserve,
	"1.1.4": (settings) => settingsVersionUpdate(settings,(theme)=>{ // To 1.1.5
		//@ts-expect-error Older interface versions
		theme.settings.header.externalReference = structuredClone(THEME_DEFAULT_SETTINGS.header.externalReference);
		//@ts-expect-error Older interface versions
		theme.colours.light.header.externalReference = structuredClone(getThemeModeStyles("default", "light").header.externalReference);
		//@ts-expect-error Older interface versions
		theme.colours.dark.header.externalReference = structuredClone(getThemeModeStyles("default", "light").header.externalReference);
		return theme;
	}, (settings) => {
		//@ts-expect-error Older interface versions
		settings.externalReferenceUpdateOnLoad = false;
		return settings;
	}),
	"1.1.5": settingsPreserve,
	"1.1.6": settingsPreserve,
	"1.1.7": settingsClear,
};
