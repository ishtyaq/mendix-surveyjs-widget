# Mendix SurveyJS Runtime Widget

A lightweight Mendix custom widget to render surveys using **SurveyJS runtime**.  
Survey definitions are provided as JSON, and responses are returned to Mendix for storage or processing.

This widget focuses purely on **runtime rendering**. Survey design is expected to be done externally.


## Features

- Render SurveyJS forms inside Mendix web apps
- Supports **SurveyJS Core (free / MIT licensed)**
- Works with **multi-page surveys**
- **RTL & Arabic** support
- Dynamic survey JSON (from entity or constant)
- Returns survey results as JSON
- Mendix microflow callback on completion
- Safe React lifecycle handling (no duplicate events)


## What This Widget Does NOT Include

- ❌ SurveyJS Creator
- ❌ Visual survey designer inside Mendix

> **Important**  
> SurveyJS Creator is a **paid product**.  
> You can use the <a href="https://surveyjs.io/create-free-survey" target="_new"> **SurveyJS Creator demo**</a> to design surveys and export the JSON for use with this widget.


## Free vs Paid Clarification

| Component | License | Included |
|---------|--------|----------|
| SurveyJS Runtime | MIT | ✅ Yes |
| SurveyJS Creator | Commercial | ❌ No |
| Mendix Widget Code | MIT | ✅ Yes |


## Installation

### Option 1: Mendix Marketplace
- Download and install the widget from the Mendix Marketplace
- Use Studio Pro 9+ / 10+

### Option 2: GitHub
- Clone the repository
- Build the widget using Mendix Widget tools
- Import the `.mpk` into your project


## How to Use

### 1️⃣ Prepare Survey JSON
Design your survey using:
- SurveyJS Creator (paid), or
- SurveyJS Creator <a href="https://surveyjs.io/create-free-survey" target="_new">**demo** </a> (free for testing)

Export the survey as JSON.

### 2️⃣ Mendix Domain Model
Create an entity with:
- `SurveyJson` (String / Unlimited)
- `SurveyResult` (String / Unlimited)

### 3️⃣ Place the Widget
Add the widget to a page and configure:
- **Survey JSON** → your JSON attribute
- **Survey Result** → result attribute
- **On Survey Complete** → microflow (optional)
- **Language / Locale** (optional)

### 4️⃣ Handle Results
Survey results are returned as JSON:

```json
{
  "question1": "Yes",
  "rating": 5,
  "comments": "Great experience"
}
```
## Known Limitations

- Web only (not for native mobile)
- SurveyJS Creator not embedded
- Large surveys may impact page load (JSON size dependent)

## Sample Project

A sample Mendix app is provided showing:
- Survey JSON storage
- Result persistence
- Language switching
- Completion microflow

See /sample-app in the GitHub repository.

## Credits

- <a href="https://github.com/surveyjs/survey-creator?tab=readme-ov-file">SurveyJS</a>
- Mendix Community
