import { Colour } from "../types/decoration";
import { CodeStylerThemeModeStyles } from "../types/settings";

// const BASE_THEME: CodeStylerThemeModeStyles = {
// 	fence: {
// 		curvature: "--code-radius",
// 		header: {},
// 		button: {},
// 		gutter: {},
// 		highlights: {},
// 	},
// 	inline: {
// 		curvature: "--code-radius",
// 		header: {},
// 		button: {},
// 		parameters: {

// 		},
// 	},
// }

const DEFAULT_THEME: Record<string, Colour> = {
	backgroundColour: "--code-background",
	textColour: "--code-normal",
	commentColour: "--code-comment",
	faintColour: "--text-faint",
	inactiveColour: "--text-muted",
	activeColour: "--text-normal",
	highlightColour: "--text-highlight-bg",
	contrastColourFirst: "#00FFFF",
	contrastColourSecond: "#FF00FF",
	contrastColourThird: "#808080",
	accentPrimary: "--color-base-30",
	accentSecondary: "--color-base-20",

	black: "--color-base-00",
	white: "--color-base-100",
	blue: "--color-blue",
	red: "--color-red",
	green: "--color-green",
	yellow: "--color-yellow",
	magenta: "--color-purple",
	cyan: "--color-cyan",
	lightBlack: "--color-base-30",
	lightWhite: "--color-base-70",
	lightBlue: "--color-blue",
	lightRed: "--color-red",
	lightGreen: "--color-green",
	lightYellow: "--color-yellow",
	lightMagenta: "--color-purple",
	lightCyan: "--color-cyan",
}

export const THEME_COLOURS: Record<string, Record<string, Record<string, Colour>>> = {
	default: {
		light: DEFAULT_THEME,
		dark: DEFAULT_THEME,
	},
	solarized: {
		light: {
			textColour: "#bababa",
			accentSecondary: "#60460633",

			base0: "#839496",
			base1: "#93a1a1",
			base2: "#B8B5AA",
			base3: "#D5CCB4",
			base4: "#E9DFBA",
			base5: "#eee8d5",
			base6: "#fdf6e3",

			alt0: "#808080",
			alt1: "#6c6c6c",
			alt2: "#8c8c8c",

			active0: "#866704",
			active1: "#EDD489",
			active2: "#ff9300",
			active3: "#C25F30",
			active4: "#941100",

			yellow: "#b58900",
			orange: "#cb4b16",
			red: "#dc322f",
			magenta: "#d33682",
			violet: "#6c71c4",
			blue: "#268bd2",
			cyan: "#2aa198",
			green: "#859900",
		},
		dark: {
			textColour: "#bababa",
			accentSecondary: "#468eeb33",

			base0: "#657b83",
			base1: "#586e75",
			base2: "#008080",
			base3: "#0a4554",
			base4: "#054b5c",
			base5: "#073642",
			base6: "#002b36",

			alt0: "#808080",
			alt1: "#6c6c6c",
			alt2: "#4c4c4c",

			active0: "#dadada",
			active1: "#46cced",
			active2: "#9437ff",
			active3: "#000000",
			active4: "#00FFFF",

			yellow: "#b58900",
			orange: "#cb4b16",
			red: "#dc322f",
			magenta: "#d33682",
			violet: "#6c71c4",
			blue: "#268bd2",
			cyan: "#2aa198",
			green: "#859900",
		},
	},
	nord: {
		light: {

		},
		dark: {

		},
	},
	gruvbox: {
		light: {
			base0_hard: "#f9f5d7",
			base0: "#fbf1c7",
			base0_soft: "#f2e5bc",
			base1: "#ebdbb2",
			base2: "#d5c4a1",
			base3: "#bdae93",
			base4: "#a89984",

			alt: "#928374",

			bright_red: "#fb4934",
			bright_green: "#b8bb26",
			bright_yellow: "#fabd2f",
			bright_blue: "#83a598",
			bright_purple: "#d3869b",
			bright_aqua: "#8ec07c",
			bright_orange: "#fe8019",

			neutral_red: "#cc241d",
			neutral_green: "#98971a",
			neutral_yellow: "#d79921",
			neutral_blue: "#458588",
			neutral_purple: "#b16286",
			neutral_aqua: "#689d6a",
			neutral_orange: "#d65d0e",

			faded_red: "#9d0006",
			faded_green: "#79740e",
			faded_yellow: "#b57614",
			faded_blue: "#076678",
			faded_purple: "#8f3f71",
			faded_aqua: "#427b58",
			faded_orange: "#af3a03",
		},
		dark: {
			base0_hard: "#1d2021",
			base0: "#282828",
			base0_soft: "#32302f",
			base1: "#3c3836",
			base2: "#504945",
			base3: "#665c54",
			base4: "#7c6f64",

			alt: "#928374",

			bright_red: "#fb4934",
			bright_green: "#b8bb26",
			bright_yellow: "#fabd2f",
			bright_blue: "#83a598",
			bright_purple: "#d3869b",
			bright_aqua: "#8ec07c",
			bright_orange: "#fe8019",

			neutral_red: "#cc241d",
			neutral_green: "#98971a",
			neutral_yellow: "#d79921",
			neutral_blue: "#458588",
			neutral_purple: "#b16286",
			neutral_aqua: "#689d6a",
			neutral_orange: "#d65d0e",

			faded_red: "#9d0006",
			faded_green: "#79740e",
			faded_yellow: "#b57614",
			faded_blue: "#076678",
			faded_purple: "#8f3f71",
			faded_aqua: "#427b58",
			faded_orange: "#af3a03",
		},
	},
	catpuccin_frappe: {
		light: {
			backgroundColour: "#eff1f5",
			foregroundColour: "#4c4f69",
			selectionColour: "#acb0be",
			cursorColour: "#dc8a78",
			cursorAccentColour: "#eff1f5",

			black: "#5c5f77",
			blue: "#1e66f5",
			red: "#d20f39",
			green: "#40a02b",
			yellow: "#df8e1d",
			magenta: "#ea76cb",
			cyan: "#179299",
			white: "#acb0be",
			lightBlack: "#6c6f85",
			lightWhite: "#bcc0cc",
			lightBlue: "#1e66f5",
			lightRed: "#d20f39",
			lightGreen: "#40a02b",
			lightYellow: "#df8e1d",
			lightMagenta: "#ea76cb",
			lightCyan: "#179299",
		},
		dark: {
			backgroundColour: "#303446",
			foregroundColour: "#c6d0f5",
			selectionColour: "#626880",
			cursorColour: "#f2d5cf",
			cursorAccentColour: "#232634",

			black: "#51576d",
			blue: "#8caaee",
			red: "#e78284",
			green: "#a6d189",
			yellow: "#e5c890",
			magenta: "#f4b8e4",
			cyan: "#81c8be",
			white: "#b5bfe2",
			lightBlack: "#626880",
			lightWhite: "#a5adce",
			lightBlue: "#8caaee",
			lightRed: "#e78284",
			lightGreen: "#a6d189",
			lightYellow: "#e5c890",
			lightMagenta: "#f4b8e4",
			lightCyan: "#81c8be",
		},
	},
	catpuccin_macchiato: {
		light: {
			backgroundColour: "#eff1f5",
			foregroundColour: "#4c4f69",
			selectionColour: "#acb0be",
			cursorColour: "#dc8a78",
			cursorAccentColour: "#eff1f5",

			black: "#5c5f77",
			blue: "#1e66f5",
			red: "#d20f39",
			green: "#40a02b",
			yellow: "#df8e1d",
			magenta: "#ea76cb",
			cyan: "#179299",
			white: "#acb0be",
			lightBlack: "#6c6f85",
			lightWhite: "#bcc0cc",
			lightBlue: "#1e66f5",
			lightRed: "#d20f39",
			lightGreen: "#40a02b",
			lightYellow: "#df8e1d",
			lightMagenta: "#ea76cb",
			lightCyan: "#179299",
		},
		dark: {
			backgroundColour: "#24273a",
			foregroundColour: "#cad3f5",
			selectionColour: "#5b6078",
			cursorColour: "#f4dbd6",
			cursorAccentColour: "#181926",

			black: "#494d64",
			blue: "#8aadf4",
			red: "#ed8796",
			green: "#a6da95",
			yellow: "#eed49f",
			magenta: "#f5bde6",
			cyan: "#8bd5ca8bd5ca",
			white: "#b8c0e0",
			lightBlack: "#5b6078",
			lightWhite: "#a5adcb",
			lightBlue: "#8aadf4",
			lightRed: "#ed8796",
			lightGreen: "#a6da95",
			lightYellow: "#eed49f",
			lightMagenta: "#f5bde6",
			lightCyan: "#8bd5ca",
		},
	},
	catpuccin_mocha: {
		light: {
			backgroundColour: "#eff1f5",
			foregroundColour: "#4c4f69",
			selectionColour: "#acb0be",
			cursorColour: "#dc8a78",
			cursorAccentColour: "#eff1f5",

			black: "#5c5f77",
			blue: "#1e66f5",
			red: "#d20f39",
			green: "#40a02b",
			yellow: "#df8e1d",
			magenta: "#ea76cb",
			cyan: "#179299",
			white: "#acb0be",
			lightBlack: "#6c6f85",
			lightWhite: "#bcc0cc",
			lightBlue: "#1e66f5",
			lightRed: "#d20f39",
			lightGreen: "#40a02b",
			lightYellow: "#df8e1d",
			lightMagenta: "#ea76cb",
			lightCyan: "#179299",
		},
		dark: {
			backgroundColour: "#1e1e2e",
			foregroundColour: "#cdd6f4",
			selectionColour: "#585b70",
			cursorColour: "#f5e0dc",
			cursorAccentColour: "#11111b",

			black: "#45475A",
			blue: "#89b4fa",
			red: "#f38ba8",
			green: "#a6e3a1",
			yellow: "#f9e2af",
			magenta: "#f5c2e7",
			cyan: "#94e2d5",
			white: "#bac2de",
			lightBlack: "#585b70",
			lightWhite: "#a6adc8",
			lightBlue: "#89b4fa",
			lightRed: "#f38ba8",
			lightGreen: "#a6e3a1",
			lightYellow: "#f9e2af",
			lightMagenta: "#f5c2e7",
			lightCyan: "#94e2d5",
		},
	},
}

function mapThemeColours(
	theme: string,
	mode: string,
): Record<string, Colour> {
	const themeColours = THEME_COLOURS?.[theme]?.[mode]
	if (!themeColours)
		return {}

	if (theme === "default")
		return {
			foregroundPrimary: themeColours.textColour,
			foregroundSecondary: themeColours.faintColour,
			foregroundFocus: themeColours.inactiveColour,
			backgroundPrimary: themeColours.backgroundColour,
			backgroundSecondary: themeColours.backgroundColour,
			backgroundTertiary: themeColours.backgroundColour,
			backgroundQuartary: themeColours.backgroundColour,
			titlePrimary: themeColours.commentColour,
			titleSecondary: themeColours.commentColour,
			standoutPrimary: themeColours.contrastColourFirst,
			standoutSecondary: themeColours.contrastColourSecond,
			subtlePrimary: themeColours.contrastColourThird,
			activeElement: themeColours.activeColour,
			inactiveElement: themeColours.inactiveColour,
			highlightPrimary: themeColours.highlightColour,
			highlightSecondary: themeColours.accentPrimary,
			highlightTertiary: themeColours.accentSecondary,
			separator: themeColours.accentPrimary,
		}
	else if (theme === "solarized")
		return {
			foregroundPrimary: themeColours.textColour,
			foregroundSecondary: themeColours.alt1,
			foregroundFocus: themeColours.alt2,
			backgroundPrimary: themeColours.base6,
			backgroundSecondary: themeColours.base5,
			backgroundTertiary: themeColours.base3,
			backgroundQuartary: themeColours.base2,
			titlePrimary: themeColours.active0,
			titleSecondary: themeColours.active3,
			standoutPrimary: themeColours.active4,
			standoutSecondary: themeColours.active2,
			subtlePrimary: themeColours.alt0,
			// activeElement: themeColours.activeColour,
			// inactiveElement: themeColours.inactiveColour,
			highlightPrimary: themeColours.base4,
			highlightSecondary: themeColours.base5,
			highlightTertiary: themeColours.accentSecondary,
			separator: themeColours.active1,
		}
	else if (theme === "gruvbox")
		return {
			backgroundPrimary: themeColours.base0,
			backgroundSecondary: themeColours.base0_hard,
			backgroundTertiary: themeColours.base0_soft,
			backgroundQuartary: themeColours.base1,
			standoutPrimary: themeColours.neutral_yellow,
			standoutSecondary: themeColours.neutral_red,
		}
	else if (theme.startsWith("catpuccin"))
		return {
			foregroundPrimary: themeColours.foregroundColour,
			foregroundSecondary: themeColours.selectionColour,
			foregroundFocus: themeColours.selectionColour,
			backgroundPrimary: themeColours.backgroundColour,
			backgroundSecondary: themeColours.backgroundColour,
			backgroundTertiary: themeColours.backgroundColour,
			backgroundQuartary: themeColours.backgroundColour,
			titlePrimary: themeColours.cursorColour,
			titleSecondary: themeColours.cursorColour,
			standoutPrimary: themeColours.cyan,
			standoutSecondary: themeColours.magenta,
			subtlePrimary: themeColours.selectionColour,
			highlightPrimary: themeColours.lightYellow,
			highlightSecondary: themeColours.white,
			highlightTertiary: themeColours.lightWhite,
			separator: themeColours.cursorColour,
		}
	else
		return {}
};

export function convertColoursToTheme(
	theme: string,
	mode: string,
): CodeStylerThemeModeStyles {
	const mappedThemeColours = {...mapThemeColours("default", "light"), ...mapThemeColours(theme, mode)}

	//@ts-ignore TODO: Temporary
	return {
		// codeblock: {
		// 	backgroundColour: mappedThemeColours.backgroundPrimary,
		// 	textColour: mappedThemeColours.foregroundPrimary,
		// },
		// gutter: {
		// 	backgroundColour: mappedThemeColours.backgroundSecondary,
		// 	textColour: mappedThemeColours.foregroundSecondary,
		// 	activeTextColour: mappedThemeColours.foregroundFocus,
		// },
		// header: {
		// 	backgroundColour: mappedThemeColours.backgroundTertiary,
		// 	title: {
		// 		textColour: mappedThemeColours.titlePrimary,
		// 	},
		// 	languageTag: {
		// 		backgroundColour: mappedThemeColours.backgroundQuartary,
		// 		textColour: mappedThemeColours.titleSecondary,
		// 	},
		// 	externalReference: {
		// 		displayRepositoryColour: mappedThemeColours.standoutPrimary,
		// 		displayVersionColour: mappedThemeColours.standoutSecondary,
		// 		displayTimestampColour: mappedThemeColours.subtlePrimary,
		// 	},
		// 	lineColour: mappedThemeColours.separator,
		// },
		// highlights: {
		// 	activeCodeblockLineColour: mappedThemeColours.highlightSecondary,
		// 	activeEditorLineColour: mappedThemeColours.highlightTertiary,
		// 	defaultColour: mappedThemeColours.highlightPrimary,
		// 	alternativeHighlights: {},
		// },
		// inline_old: {
		// 	backgroundColour: mappedThemeColours.backgroundPrimary,
		// 	textColour: mappedThemeColours.foregroundPrimary,
		// 	activeTextColour: mappedThemeColours.foregroundFocus,
		// 	titleTextColour: mappedThemeColours.titlePrimary,
		// },
		// advanced: {
		// 	buttonColour: mappedThemeColours.inactiveElement,
		// 	buttonActiveColour: mappedThemeColours.activeElement,
		// },
	}
}
