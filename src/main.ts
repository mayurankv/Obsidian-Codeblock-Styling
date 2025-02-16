import { Plugin} from "obsidian";
import { CodeStylerSettings } from "./internal/types/settings";
import { SettingsTab } from "./internal/Interface/settings/settingsTab";
import { renderedInlineCodeDetecting } from "./internal/detecting/Rendered/inline";
import { renderedFencedCodeDetecting } from "./internal/detecting/Rendered/fenced";
import { toPostProcess } from "./internal/utils/rendered";
import { mutationObservers, renderedFencedCodeDecorating, renderedFencedCodeUndecorating } from "./internal/decorating/Rendered/fenced";
import { renderedInlineCodeDecorating, renderedInlineCodeUndecorating } from "./internal/decorating/Rendered/inline";
import { DEFAULT_SETTINGS } from "./internal/constants/settings";
import { convertSettings } from "./internal/utils/settings";
import { EXTERNAL_REFERENCE_CACHE, EXTERNAL_REFERENCE_PATH, REFERENCE_CODEBLOCK } from "./internal/constants/reference";
import { registerCommands } from "./internal/Interface/actions/commands";
import { loadLanguageIcons, unloadLanguageIcons } from "./resources/icons";
import { registerRerenderingOnWorkspaceChange, rerenderRenderedView } from "./internal/Interface/view/rendered";
import { addModes, parseObsidianMarkdown } from "./internal/decorating/LivePreview/codemirror/modes";
import { applyStyling, removeStyling } from "./internal/decorating/styles";
import { manageExternalReferencedFiles } from "./internal/utils/reference";
import { getReferenceCodeMirrorExtensions as getReferenceCodemirrorExtensions } from "./internal/decorating/LivePreview/reference";
import { getFenceCodemirrorExtensions } from "./internal/decorating/LivePreview/fenced";
import { getInlineCodeMirrorExtensions as getInlineCodemirrorExtensions } from "./internal/decorating/LivePreview/inline";
import { referenceCodeblockProcessor } from "./internal/decorating/Rendered/reference";
import { createViewUpdater } from "./internal/decorating/LivePreview/codemirror/utils";

export default class CodeStylerPlugin extends Plugin {
	settings: CodeStylerSettings;
	mutationObservers: Record<string,MutationObserver>;
	resources: {
		languageIcons: Record<string, string>,
	};
	watchedValues: Record<string, string>;

	async onload(): Promise<void> {
		await this.loadSettings();
		await this.initialiseFileSystem();

		this.loadResources(true);
		this.addStyling(true)
		this.addObservers(true)
		this.addModes(true)
		this.addCodeblockProcessors(true)
		this.addMarkdownPostProcessors(true)
		this.addEditorExtensions(true)
		this.registerEvents(true)
		this.addCommands(true)
		this.registerReadyActions(true)
		this.notifyReady(true)
	}

	onunload(): void {
		this.loadResources(false)
		this.addStyling(false)
		this.addObservers(false)
		this.addModes(false)
		this.addCodeblockProcessors(false)
		this.addMarkdownPostProcessors(false)
		this.addEditorExtensions(false)
		this.registerEvents(false)
		this.addCommands(false)
		this.registerReadyActions(false)
		this.notifyReady(false)
	}

	async loadSettings(): Promise<void> {
		this.settings = { ...structuredClone(DEFAULT_SETTINGS), ...convertSettings(await this.loadData()) };
		this.addSettingTab(new SettingsTab(this.app, this));
	}

	async saveSettings(): Promise<void> {
		await this.saveData(this.settings);
		this.app.workspace.updateOptions();
		applyStyling(this);
	}

	async initialiseFileSystem(): Promise<void> {
		if (await this.app.vault.adapter.exists(this.app.vault.configDir + EXTERNAL_REFERENCE_PATH))
			return;

		await this.app.vault.adapter.mkdir(this.app.vault.configDir + EXTERNAL_REFERENCE_PATH);
		await this.app.vault.adapter.write(this.app.vault.configDir + EXTERNAL_REFERENCE_CACHE, JSON.stringify({}));
	}

	loadResources(
		load: boolean = true,
	): void {
		if (load)
			this.resources = {
				languageIcons: loadLanguageIcons(),
			}
		else
			unloadLanguageIcons(this.resources.languageIcons)
	}

	addStyling(
		load: boolean = true,
	): void {
		if (load) {
			this.app.workspace.trigger("parse-style-settings");
			applyStyling(this);
		} else
			removeStyling()
	}

	addObservers(
		load: boolean = true,
	): void {
		if (load)
			this.mutationObservers = mutationObservers;
		else
			Object.values(this.mutationObservers).forEach(
				(mutationObserver: MutationObserver) => mutationObserver.disconnect()
			);
	}

	addModes(
		load: boolean = true,
	): void {
		addModes(load)
	}

	addCodeblockProcessors(
		load: boolean = true,
	): void {
		if (load)
			this.registerMarkdownCodeBlockProcessor(
				REFERENCE_CODEBLOCK,
				async (source, element, context) => await referenceCodeblockProcessor(
					source,
					element,
					context,
					this,
				),
			);
	}

	addMarkdownPostProcessors(
		load: boolean = true,
	): void {
		if (load)
			this.registerMarkdownPostProcessor(async (element, context) => {
				if (!toPostProcess(element, context, this))
					return;

				await renderedInlineCodeDetecting(element, context, this);
				await renderedInlineCodeDecorating(element, context, this);
				await renderedFencedCodeDetecting(element, context, this);
				await renderedFencedCodeDecorating(element, context, this);
			})
		else {
			renderedInlineCodeUndecorating();
			renderedFencedCodeUndecorating();
		}
	}

	addEditorExtensions(
		load: boolean = true,
	): void {
		if (load)
			this.registerEditorExtension([
				createViewUpdater(),
				...getFenceCodemirrorExtensions(this),
				...getInlineCodemirrorExtensions(this),
				...getReferenceCodemirrorExtensions(this),
			]);
	}

	registerEvents(
		load: boolean = true,
	): void {
		if (load) {
			this.watchedValues = {}
			this.registerEvent(
				this.app.workspace.on(
					"css-change",
					() => applyStyling(this),
					this,
				),
			);
			registerRerenderingOnWorkspaceChange(
				"font",
				() => document.body.getCssPropertyValue("--font-text-size"),
				"css-change",
				this,
			)
			registerRerenderingOnWorkspaceChange(
				"zoom",
				() => document.body.getCssPropertyValue("--zoom-factor"),
				"resize",
				this,
			)
		}
	}

	addCommands(
		load: boolean = true,
	): void {
		if (load)
			registerCommands(this)
	}

	registerReadyActions(
		load: boolean = true,
	): void {
		if (load)
			this.app.workspace.onLayoutReady(
				async () => await manageExternalReferencedFiles(this, null, this.settings.reference.updateExternalOnLoad),
			);
	}

	notifyReady(
		load: boolean = true,
	): void {
		console.log((load ? "Loaded" : "Unloaded")+" plugin: Code Styler")
	}
}
