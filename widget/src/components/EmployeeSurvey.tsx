import { ReactElement, createElement, useEffect, useMemo } from "react";

import "survey-core/survey-core.min.css";
import "survey-core/survey.i18n";

import { Survey } from "survey-react-ui";
import { Model, setLicenseKey, surveyLocalization } from "survey-core";
import { ActionValue, EditableValue } from "mendix";

export interface EmployeeSurveyProps {
    sampleText?: string;
    surveyJson?: EditableValue<string>;
    /** Optional (you currently detect RTL from the DOM, but kept for future use) */
    language?: EditableValue<string>;
    licenseKey?: string;
    surveyResults: { setValue: (value: string) => void } | null;
    onSurveyComplete?: ActionValue;
}

const THEME = {
    themeName: "default",
    colorPalette: "light",
    isPanelless: false,
    backgroundImage: "",
    backgroundOpacity: 1,
    backgroundImageAttachment: "scroll",
    backgroundImageFit: "cover",
    cssVariables: {
        "--sjs-font-family": "Cairo",
        "--sjs-corner-radius": "4px",
        "--sjs-base-unit": "8px",
        "--sjs-shadow-small": "0px 1px 2px rgba(0, 0, 0, 0.15)",
        "--sjs-shadow-inner": "0px 1px 2px rgba(0, 0, 0, 0.15)",
        "--sjs-border-default": "rgba(0, 0, 0, 0.15)",
        "--sjs-border-light": "rgba(0, 0, 0, 0.1)",
        "--sjs-general-backcolor": "rgba(255, 255, 255, 1)",
        "--sjs-general-backcolor-dark": "rgba(248, 248, 248, 1)",
        "--sjs-general-backcolor-dim-light": "rgba(249, 249, 249, 1)",
        "--sjs-general-backcolor-dim-dark": "rgba(243, 243, 243, 1)",
        "--sjs-general-forecolor": "rgba(0, 0, 0, 0.91)",
        "--sjs-general-forecolor-light": "rgba(0, 0, 0, 0.45)",
        "--sjs-general-dim-forecolor": "rgba(0, 0, 0, 0.91)",
        "--sjs-general-dim-forecolor-light": "rgba(0, 0, 0, 0.45)",
        "--sjs-secondary-backcolor": "rgba(255, 152, 20, 1)",
        "--sjs-secondary-backcolor-light": "rgba(255, 152, 20, 0.1)",
        "--sjs-secondary-backcolor-semi-light": "rgba(255, 152, 20, 0.25)",
        "--sjs-secondary-forecolor": "rgba(255, 255, 255, 1)",
        "--sjs-secondary-forecolor-light": "rgba(255, 255, 255, 0.25)",
        "--sjs-shadow-medium": "0px 2px 6px rgba(0, 0, 0, 0.1)",
        "--sjs-shadow-large": "0px 8px 16px rgba(0, 0, 0, 0.1)",
        "--sjs-header-backcolor": "rgba(255, 152, 20, 1)",
        "--sjs-header-forecolor": "rgba(255, 255, 255, 1)",
        "--sjs-article-font-xx-large-fontSize": "48px",
        "--sjs-article-font-x-large-fontSize": "32px",
        "--sjs-article-font-large-fontSize": "24px",
        "--sjs-article-font-medium-fontSize": "20px",
        "--sjs-article-font-default-fontSize": "16px",
        "--sjs-article-font-default-lineHeight": "28px",
        "--sjs-article-font-default-fontWeight": "400",
        "--sjs-article-font-small-fontSize": "14px",
        "--sjs-article-font-small-lineHeight": "24px",
        "--sjs-article-font-small-fontWeight": "400",
        "--sjs-special-blue": "rgba(67, 127, 217, 1)",
        "--sjs-special-blue-light": "rgba(67, 127, 217, 0.1)",
        "--sjs-special-blue-forecolor": "rgba(255, 255, 255, 1)",
        "--sjs-special-yellow": "rgba(255, 152, 20, 1)",
        "--sjs-special-yellow-light": "rgba(255, 152, 20, 0.1)",
        "--sjs-special-yellow-forecolor": "rgba(255, 255, 255, 1)",
        "--sjs-primary-backcolor": "rgba(19, 65, 130, 1)",
        "--sjs-primary-backcolor-dark": "rgba(22, 57, 102, 1)",
        "--sjs-primary-backcolor-light": "rgba(19, 65, 130, 0.1)",
        "--sjs-primary-forecolor": "rgba(255, 255, 255, 1)",
        "--sjs-primary-forecolor-light": "rgba(255, 255, 255, 0.25)",
        "--sjs-special-red": "rgba(229, 10, 62, 1)",
        "--sjs-special-red-light": "rgba(229, 10, 62, 0.1)"
    },
    headerView: "basic"
} as const;

function getSchemaString(surveyJson?: EditableValue<string>): string {
    if (!surveyJson || surveyJson.status !== "available") return "";
    const v = surveyJson.value;
    return typeof v === "string" ? v : "";
}

function safeParseJson(schema: string): Record<string, unknown> {
    if (!schema || !schema.trim()) return {};
    try {
        const parsed = JSON.parse(schema);
        return parsed && typeof parsed === "object" ? parsed : {};
    } catch {
        return {};
    }
}

export function EmployeeSurvey(props: EmployeeSurveyProps): ReactElement {
    const schemaString = getSchemaString(props.surveyJson);

    const parsedSurveyJson = useMemo(() => safeParseJson(schemaString), [schemaString]);

    // Create the SurveyJS model only when schema changes
    const survey = useMemo(() => {
        const m = new Model(parsedSurveyJson);
        m.showLanguagePicker = true;
        return m;
    }, [parsedSurveyJson]);

    // Apply license key safely (only when provided)
    useEffect(() => {
        const key = props.licenseKey?.trim();
        if (key) setLicenseKey(key);
    }, [props.licenseKey]);

    // Apply theme, locale, and wire events (with cleanup)
    useEffect(() => {
        // Theme
        survey.applyTheme(THEME);

        // Locale based on page direction (RTL => Arabic)
        const dir =
            typeof document !== "undefined" ? (document.body?.getAttribute("dir") || "").toLowerCase() : "";
        const isRtl = dir === "rtl";

        survey.locale = isRtl ? "ar" : "en";
        surveyLocalization.showNamesInEnglish = !isRtl;

        // Completion handler (avoid duplicate registrations)
        const onCompleteHandler = (sender: { data: unknown }) => {
            const results = JSON.stringify(sender.data ?? {});

            if (props.surveyResults?.setValue) {
                props.surveyResults.setValue(results);
            }

            if (props.onSurveyComplete?.canExecute && !props.onSurveyComplete.isExecuting) {
                props.onSurveyComplete.execute();
            }
        };

        survey.onComplete.add(onCompleteHandler);

        return () => {
            survey.onComplete.remove(onCompleteHandler);
        };
    }, [survey, props.surveyResults, props.onSurveyComplete]);

    return <Survey model={survey} />;
}
