const fs = require('fs');
const path = require('path');
const tmthemeToJSON = require('tmtheme-to-json');

const DIRECTORY = {
  BASE: path.join(__dirname, 'build'),

  SOURCE: {
    ESTER: path.join(__dirname, 'Ester.original.tmTheme'),
    LICENSE: path.join(__dirname, 'LICENSE'),
  },

  TMTHEME: {
    BASE: path.join(__dirname, 'build', 'tmTheme'),
    ESTER: path.join(__dirname, 'build', 'tmTheme', 'Ester.tmTheme'),
  },

  VSCODE: {
    BASE: path.join(__dirname, 'build', 'ester_vscode'),
    PACKAGE_JSON: path.join(__dirname, 'build', 'ester_vscode', 'package.json'),
    THEMES: {
      BASE: path.join(__dirname, 'build', 'ester_vscode', 'themes'),
      JSON: path.join(__dirname, 'build', 'ester_vscode', 'themes', 'ester.json'),
    },
  },
};

// --------------------------- Create Directories --------------------------- //

if (!fs.existsSync(DIRECTORY.BASE)) fs.mkdirSync(DIRECTORY.BASE);
if (!fs.existsSync(DIRECTORY.TMTHEME.BASE)) fs.mkdirSync(DIRECTORY.TMTHEME.BASE);
if (!fs.existsSync(DIRECTORY.VSCODE.BASE)) fs.mkdirSync(DIRECTORY.VSCODE.BASE);
if (!fs.existsSync(DIRECTORY.VSCODE.THEMES.BASE)) fs.mkdirSync(DIRECTORY.VSCODE.THEMES.BASE);

// ------------------------------ tmTheme Copy ------------------------------ //

fs.copyFileSync(DIRECTORY.SOURCE.ESTER, DIRECTORY.TMTHEME.ESTER);

// ----------------------------- VSCode Compile ----------------------------- //

const esterTmTheme = fs.readFileSync(DIRECTORY.SOURCE.ESTER, 'utf-8');
const esterJSON = tmthemeToJSON.convertTheme(esterTmTheme);
const vsCodePackageJSON = {
  "name": "ester",
  "displayName": "Ester - Candy Theme",
  "description": "Candy Theme by Darkenvy",
  "version": "1.0.0",
  "publisher": "Darkenvy",
  "engines": {
      "vscode": "^1.12.0"
  },
  "categories": [
      "Themes"
  ],
  "contributes": {
      "themes": [
          {
              "label": "Ester",
              "uiTheme": "vs-dark",
              "path": "./themes/Ester-color-theme.json"
          }
      ]
  }
};

fs.writeFileSync(DIRECTORY.VSCODE.THEMES.JSON, JSON.stringify(esterJSON, null, 2));
fs.writeFileSync(DIRECTORY.VSCODE.PACKAGE_JSON, JSON.stringify(vsCodePackageJSON, null, 2));
fs.copyFileSync(DIRECTORY.SOURCE.LICENSE, DIRECTORY.VSCODE.BASE);
