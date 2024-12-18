# SmartUpdater

SmartUpdater is a CLI (Command-Line Interface) tool that automates managing and updating outdated dependencies in Node.js projects. It checks for outdated packages, updates them, and ensures that the latest versions are reflected in `package.json` and `package-lock.json` files while providing backup and restore functionality to safeguard your project.

## Features

- **Automated Dependency Scanning**: Identifies outdated dependencies with a single command.
- **Automatic Updates**: Updates dependencies to the latest stable versions.
- **Backup and Restore**: Creates backups of critical files (`package.json`, `package-lock.json`) to prevent issues.
- **Compatibility Checks**: Ensures that updates do not introduce breaking changes.
- **User-Friendly CLI Tool**: Simple to use, with clear output for developers.

## Installation

To install SmartUpdater globally, use:

```bash
npm install -g smartupdater
```

Alternatively, you can use `npx` to run the tool without installation:

```bash
npx smartupdater
```

## Usage

SmartUpdater simplifies dependency management. Follow these steps:

1. Navigate to the root directory of your Node.js project.
2. Run the following command:

```bash
npx smartupdater
```

SmartUpdater will:

- Scan your `package.json` for outdated dependencies.
- Automatically update all outdated dependencies to their latest compatible versions.
- Provide a backup of `package.json` and `package-lock.json` before making changes.

### Example

#### Before running `npx smartupdater`:

```json
{
  "dependencies": {
    "express": "^4.17.1",
    "mongoose": "^5.11.0"
  }
}
```

#### After running `npx smartupdater`:

```json
{
  "dependencies": {
    "express": "^4.18.0",
    "mongoose": "^7.0.0"
  }
}
```

If an error occurs, the tool automatically restores the original files to prevent project breakages.

## Benefits

- **Saves Time**: Automates tedious manual updates.
- **Enhances Security**: Ensures dependencies are up-to-date with the latest security patches.
- **Prevents Breakages**: Backup and restore functionality safeguards against update issues.

## Prerequisites

Make sure you have:

- Node.js installed (version 14 or higher recommended).

## How It Works

SmartUpdater operates in these steps:

1. Reads `package.json` to identify installed dependencies.
2. Checks for outdated versions using the npm registry.
3. Updates dependencies to their latest stable and compatible versions.
4. Creates backups of `package.json` and `package-lock.json` files.
5. Restores backups automatically if any errors occur.

## Contributing

We welcome contributions! To contribute:

1. Fork the repository.
2. Create a new branch for your changes.
3. Implement your changes and test them thoroughly.
4. Submit a pull request with a detailed description of your updates.

## Issues

If you encounter bugs or have feature suggestions, please report them at the issue tracker.

## License

SmartUpdater is licensed under the MIT License. See the LICENSE file for details.

---

SmartUpdater simplifies dependency management, providing an efficient, reliable, and user-friendly solution for Node.js developers.
