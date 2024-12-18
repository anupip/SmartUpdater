#!/usr/bin/env node
<<<<<<< HEAD
import chalk from 'chalk';
import { execa } from 'execa';
import ora from 'ora';
import fs from 'fs';
import path from 'path';

// Path to your project
const projectDir = process.cwd();

// Function to scan for outdated packages
const scanPackages = async () => {
  const spinner = ora('Scanning for outdated packages...').start();

  try {
    const result = await execa('npm', ['outdated', '--json'], { cwd: projectDir });

    // Handle case where stdout is empty
    if (!result.stdout || result.stdout === '{}') {
      spinner.fail('No outdated packages found.');
      console.log(chalk.green('All packages are up to date! 🎉'));
      return;
    }

    const outdatedPackages = JSON.parse(result.stdout);

    spinner.succeed('Scan complete!\n');
    console.log(chalk.bold('Outdated Dependencies:\n'));

    if (Object.keys(outdatedPackages).length === 0) {
      console.log(chalk.green('All packages are up to date! 🎉'));
      return;
    }

    for (const pkg in outdatedPackages) {
      const { current, wanted, latest } = outdatedPackages[pkg];
      console.log(
        `${chalk.yellow(pkg)}: ${chalk.red(current)} → ${chalk.green(latest)}`
      );
      console.log(`  Compatible update: ${chalk.blue(wanted)}\n`);
    }

    // Proceed with updating outdated dependencies
    await updateDependencies(outdatedPackages);
  } catch (error) {
    if (error.exitCode === 1 && error.stdout) {
      // Handle the case where outdated packages are found (exit code 1 is normal here)
      const outdatedPackages = JSON.parse(error.stdout);

      spinner.succeed('Scan complete!\n');
      console.log(chalk.bold('Outdated Dependencies:\n'));

      for (const pkg in outdatedPackages) {
        const { current, wanted, latest } = outdatedPackages[pkg];
        console.log(
          `${chalk.yellow(pkg)}: ${chalk.red(current)} → ${chalk.green(latest)}`
        );
        console.log(`  Compatible update: ${chalk.blue(wanted)}\n`);
      }

      // Proceed with updating outdated dependencies
      await updateDependencies(outdatedPackages);
    } else {
      // Handle other unexpected errors
      spinner.fail('An error occurred while scanning for outdated packages.');
      console.error(chalk.red('Failed to execute npm outdated:', error.message));
    }
  }
};

// Function to update dependencies
const updateDependencies = async (outdatedPackages) => {
  const spinner = ora('Updating outdated dependencies...').start();

  try {
    // Check if outdated packages exist
    if (Object.keys(outdatedPackages).length === 0) {
      console.log(chalk.green('No outdated packages to update.'));
      return;
    }

    // Run npm install to update the dependencies
    await execa('npm', ['install', ...Object.keys(outdatedPackages)], {
      cwd: projectDir,
    });

    spinner.succeed('Dependencies updated successfully!');
    console.log(chalk.green('Updated Dependencies:\n'));

    // Update the package.json file with the latest versions
    const packageJsonPath = path.join(projectDir, 'package.json');
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

    // Ensure the dependencies object exists
    if (!packageJson.dependencies) {
      packageJson.dependencies = {}; // Create empty dependencies if not present
    }

    for (const pkg in outdatedPackages) {
      const { latest } = outdatedPackages[pkg];

      // Update dependencies
      if (packageJson.dependencies[pkg]) {
        packageJson.dependencies[pkg] = `^${latest}`; // Correctly use template literals
        console.log(`${chalk.yellow(pkg)}: Updated to ${chalk.green(latest)}`);
      } else if (packageJson.devDependencies && packageJson.devDependencies[pkg]) {
        packageJson.devDependencies[pkg] = `^${latest}`;
        console.log(`${chalk.yellow(pkg)}: Updated to ${chalk.green(latest)}`);
      }
    }

    // Write the updated package.json back to disk
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
    console.log(chalk.green('package.json updated successfully!'));

    console.log(chalk.green('All outdated packages have been updated! 🎉'));
  } catch (error) {
    console.error(chalk.red('Failed to update dependencies:', error.message));
    spinner.fail('An error occurred while updating dependencies.');
    await restoreBackup();
  }
};

// Function to create a backup of important files (package.json, package-lock.json)
const backupFiles = async () => {
  const backupDir = path.join(projectDir, 'backup');
  if (!fs.existsSync(backupDir)) {
    fs.mkdirSync(backupDir); // Create the 'backup' folder if it doesn't exist
  }

  const filesToBackup = ['package.json', 'package-lock.json'];
  try {
    for (const file of filesToBackup) {
      const srcPath = path.join(projectDir, file);
      const destPath = path.join(backupDir, file);
      if (fs.existsSync(srcPath)) {
        fs.copyFileSync(srcPath, destPath);
        console.log(`${chalk.green(file)} backed up successfully!`);
      } else {
        console.log(chalk.red(`${file} not found in the project.`));
      }
    }
  } catch (error) {
    console.error(chalk.red('Failed to backup files:', error.message));
  }
};

// Function to restore the backup if the update fails
const restoreBackup = async () => {
  const backupDir = path.join(projectDir, 'backup');
  const filesToRestore = ['package.json', 'package-lock.json'];
  try {
    for (const file of filesToRestore) {
      const srcPath = path.join(backupDir, file);
      const destPath = path.join(projectDir, file);
      if (fs.existsSync(srcPath)) {
        fs.copyFileSync(srcPath, destPath);
        console.log(`${chalk.green(file)} restored successfully!`);
      } else {
        console.log(chalk.red(`${file} not found in the backup.`));
      }
    }
  } catch (error) {
    console.error(chalk.red('Failed to restore backup:', error.message));
  }
};

// Entry point for the CLI
(async () => {
  console.log(chalk.cyan('Welcome to SmartUpdater! 🚀'));

  // Backup current files before attempting updates
  await backupFiles();

  console.log(chalk.cyan('\nStarting the update process...\n'));

  // Scan for outdated dependencies and update them if necessary
  await scanPackages();
})();
=======
import chalk from 'chalk';
import { execa } from 'execa';
import ora from 'ora';
import fs from 'fs';
import path from 'path';

// Path to your project
const projectDir = process.cwd();

// Function to scan for outdated packages
const scanPackages = async () => {
  const spinner = ora('Scanning for outdated packages...').start();

  try {
    const result = await execa('npm', ['outdated', '--json'], { cwd: projectDir });

    // Handle case where stdout is empty
    if (!result.stdout || result.stdout === '{}') {
      spinner.fail('No outdated packages found.');
      console.log(chalk.green('All packages are up to date! 🎉'));
      return;
    }

    const outdatedPackages = JSON.parse(result.stdout);

    spinner.succeed('Scan complete!\n');
    console.log(chalk.bold('Outdated Dependencies:\n'));

    if (Object.keys(outdatedPackages).length === 0) {
      console.log(chalk.green('All packages are up to date! 🎉'));
      return;
    }

    for (const pkg in outdatedPackages) {
      const { current, wanted, latest } = outdatedPackages[pkg];
      console.log(
        `${chalk.yellow(pkg)}: ${chalk.red(current)} → ${chalk.green(latest)}`
      );
      console.log(`  Compatible update: ${chalk.blue(wanted)}\n`);
    }

    // Proceed with updating outdated dependencies
    await updateDependencies(outdatedPackages);
  } catch (error) {
    if (error.exitCode === 1 && error.stdout) {
      // Handle the case where outdated packages are found (exit code 1 is normal here)
      const outdatedPackages = JSON.parse(error.stdout);

      spinner.succeed('Scan complete!\n');
      console.log(chalk.bold('Outdated Dependencies:\n'));

      for (const pkg in outdatedPackages) {
        const { current, wanted, latest } = outdatedPackages[pkg];
        console.log(
          `${chalk.yellow(pkg)}: ${chalk.red(current)} → ${chalk.green(latest)}`
        );
        console.log(`  Compatible update: ${chalk.blue(wanted)}\n`);
      }

      // Proceed with updating outdated dependencies
      await updateDependencies(outdatedPackages);
    } else {
      // Handle other unexpected errors
      spinner.fail('An error occurred while scanning for outdated packages.');
      console.error(chalk.red('Failed to execute npm outdated:', error.message));
    }
  }
};

// Function to update dependencies
const updateDependencies = async (outdatedPackages) => {
  const spinner = ora('Updating outdated dependencies...').start();

  try {
    // Check if outdated packages exist
    if (Object.keys(outdatedPackages).length === 0) {
      console.log(chalk.green('No outdated packages to update.'));
      return;
    }

    // Run npm install to update the dependencies
    await execa('npm', ['install', ...Object.keys(outdatedPackages)], {
      cwd: projectDir,
    });

    spinner.succeed('Dependencies updated successfully!');
    console.log(chalk.green('Updated Dependencies:\n'));

    // Update the package.json file with the latest versions
    const packageJsonPath = path.join(projectDir, 'package.json');
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

    // Ensure the dependencies object exists
    if (!packageJson.dependencies) {
      packageJson.dependencies = {}; // Create empty dependencies if not present
    }

    for (const pkg in outdatedPackages) {
      const { latest } = outdatedPackages[pkg];

      // Update dependencies
      if (packageJson.dependencies[pkg]) {
        packageJson.dependencies[pkg] = `^${latest}`; // Correctly use template literals
        console.log(`${chalk.yellow(pkg)}: Updated to ${chalk.green(latest)}`);
      } else if (packageJson.devDependencies && packageJson.devDependencies[pkg]) {
        packageJson.devDependencies[pkg] = `^${latest}`;
        console.log(`${chalk.yellow(pkg)}: Updated to ${chalk.green(latest)}`);
      }
    }

    // Write the updated package.json back to disk
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
    console.log(chalk.green('package.json updated successfully!'));

    console.log(chalk.green('All outdated packages have been updated! 🎉'));
  } catch (error) {
    console.error(chalk.red('Failed to update dependencies:', error.message));
    spinner.fail('An error occurred while updating dependencies.');
    await restoreBackup();
  }
};

// Function to create a backup of important files (package.json, package-lock.json)
const backupFiles = async () => {
  const backupDir = path.join(projectDir, 'backup');
  if (!fs.existsSync(backupDir)) {
    fs.mkdirSync(backupDir); // Create the 'backup' folder if it doesn't exist
  }

  const filesToBackup = ['package.json', 'package-lock.json'];
  try {
    for (const file of filesToBackup) {
      const srcPath = path.join(projectDir, file);
      const destPath = path.join(backupDir, file);
      if (fs.existsSync(srcPath)) {
        fs.copyFileSync(srcPath, destPath);
        console.log(`${chalk.green(file)} backed up successfully!`);
      } else {
        console.log(chalk.red(`${file} not found in the project.`));
      }
    }
  } catch (error) {
    console.error(chalk.red('Failed to backup files:', error.message));
  }
};

// Function to restore the backup if the update fails
const restoreBackup = async () => {
  const backupDir = path.join(projectDir, 'backup');
  const filesToRestore = ['package.json', 'package-lock.json'];
  try {
    for (const file of filesToRestore) {
      const srcPath = path.join(backupDir, file);
      const destPath = path.join(projectDir, file);
      if (fs.existsSync(srcPath)) {
        fs.copyFileSync(srcPath, destPath);
        console.log(`${chalk.green(file)} restored successfully!`);
      } else {
        console.log(chalk.red(`${file} not found in the backup.`));
      }
    }
  } catch (error) {
    console.error(chalk.red('Failed to restore backup:', error.message));
  }
};

// Entry point for the CLI
(async () => {
  console.log(chalk.cyan('Welcome to SmartUpdater! 🚀'));

  // Backup current files before attempting updates
  await backupFiles();

  console.log(chalk.cyan('\nStarting the update process...\n'));

  // Scan for outdated dependencies and update them if necessary
  await scanPackages();
})();
>>>>>>> fb2a5ba6c7a6cb1483c4d31f2b604919c4eb40f3
