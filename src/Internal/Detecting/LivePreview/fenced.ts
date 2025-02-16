import { EditorState } from "@codemirror/state";
import { SyntaxNodeRef } from "@lezer/common";
import { parseFenceCodeParameters, toDecorateFenceCode } from "src/internal/parsing/fenced";
import { FenceInfo } from "src/internal/types/decoration";
import { cleanFenceCodeParametersLine } from "src/internal/utils/detecting";
import CodeStylerPlugin from "src/main";

export function updateFenceInfo(
	state: EditorState,
	syntaxNode: SyntaxNodeRef,
	fenceInfo: FenceInfo,
	plugin: CodeStylerPlugin,
): FenceInfo {
	if (isFenceLine(syntaxNode)) {
		const line = state.doc.lineAt(syntaxNode.from)
		fenceInfo.lineText = line.text.toString()
		fenceInfo.lineStart = line.from
		fenceInfo.lineEnd = line.to
		fenceInfo.lineNumber += 1
		// fenceInfo.inCode
	}

	if (isFenceStart(syntaxNode)) {
		fenceInfo = {
			...fenceInfo,
			lineNumber: 0,
			headerStart: syntaxNode.from,
			parameters: parseFenceCodeParameters(
				cleanFenceCodeParametersLine(fenceInfo.lineText),
				plugin,
			),
			decorations: [],
		}

		fenceInfo.toDecorate = toDecorateFenceCode(fenceInfo.parameters, plugin);
	}

	if (isFenceEnd(syntaxNode)) {
		fenceInfo.lineNumber = 0
		fenceInfo.bodyEnd = syntaxNode.from - 1
		fenceInfo.footerEnd = syntaxNode.to
	}

	if (isFenceLine(syntaxNode) && fenceInfo.lineNumber === 1)
		fenceInfo.bodyStart = syntaxNode.from

	return fenceInfo
}

export function isFenceStart(
	syntaxNode: SyntaxNodeRef,
): boolean {
	return  syntaxNode.type.name.includes("HyperMD-codeblock-begin")
}

export function isFenceLine(
	syntaxNode: SyntaxNodeRef,
): boolean {
	return  syntaxNode.type.name.includes("HyperMD-codeblock")
}

export function isFenceEnd(
	syntaxNode: SyntaxNodeRef,
): boolean {
	return  syntaxNode.type.name.includes("HyperMD-codeblock-end")
}

export function isFenceComment(
	syntaxNode: SyntaxNodeRef,
	fenceInfo: FenceInfo,
): boolean {
	return (fenceInfo.lineNumber !== 0) && (syntaxNode.type.name.includes("comment_hmd-codeblock") && (syntaxNode.from >= fenceInfo.lineStart)  && (syntaxNode.to <= fenceInfo.lineEnd))
}
