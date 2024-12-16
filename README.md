# DevRev SnapIn Creator

## Description

DevRev SnapIn Creator is an NPX package designed to enhance developer experience by simplifying the creation of DevRev SnapIns. It automates the installation of the DevRev SDK and other dependencies, providing a seamless setup process.

## Features

- Quickly create DevRev SnapIns with ease.
- Automatically installs the DevRev CLI if not already present.
- Checks and installs JQ, a lightweight and flexible command-line JSON processor.
- Provides a selection of templates for creating SnapIns.
- Downloads and extracts templates directly from GitHub.

## Usage

To use the DevRev SnapIn Creator, run the following command in your terminal:

```bash
npx devrev-snapin-setup
```

This command will check for the necessary dependencies and set up your environment for creating DevRev SnapIns.

To create a SnapIn with a specific template, use:

```bash
npx devrev-snapin-create --template <template-name> --rename <new-name>
```

Replace `<template-name>` with one of the available templates (e.g., `default`, `internal-action`, `external-action`, `external-trigger`) and `<new-name>` with the desired name for your SnapIn.

## Installation

You can install the package globally using npm:

```bash
npm install -g devrev-snapin
```

## License

This project is licensed under the MIT License.

## Author

- [**Nimit2801**](https://github.com/nimit2801)
