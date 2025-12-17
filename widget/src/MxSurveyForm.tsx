import { ReactElement, createElement } from "react";

import "./ui/HelloWorld.css";
import {EmployeeSurveyProps, EmployeeSurvey} from "./components/EmployeeSurvey";



export function MxSurveyForm({ surveyJson, surveyResults, onSurveyComplete, licenseKey }: EmployeeSurveyProps): ReactElement {
    return <EmployeeSurvey surveyJson={surveyJson} surveyResults={surveyResults} onSurveyComplete={onSurveyComplete} licenseKey={licenseKey} />;
}