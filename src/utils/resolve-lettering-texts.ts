import type { ILetteringTexts } from "@/src/types/language-types";
import { handleAge } from "@/src/utils/handle-age";

const AGE_TOKEN = "{{age}}";

// Resolves the age at render time instead of freezing it during module initialization.
export function resolveLetteringTexts(texts: ILetteringTexts): ILetteringTexts {
    const age = handleAge();
    const resolvedPhrases = texts.phrases.map((phrase) =>
        phrase.replace(AGE_TOKEN, String(age)),
    );

    return {
        ...texts,
        phrases: resolvedPhrases,
    };
}
