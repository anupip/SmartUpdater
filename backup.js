<<<<<<< HEAD
import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';
import { promisify } from 'util';

// Promisify exec to use async/await
const execPromise = promisify(exec);

// Path to your project directory
const projectDir = process.cwd();

// Function to run a shell command and capture the output
const runCommand = async (command) => {
  try {
    const { stdout, stderr } = await execPromise(command, { cwd: projectDir });
    if (stderr) {
      console.error(`Error executing command: ${command}\n`, stderr);
    }
    return { stdout, stderr };
  } catch (error) {
    console.error(`Error executing command: ${command}\n`, error.message);
    return { stdout: '', stderr: error.message };
  }
};

// Function to check for outdated dependencies
const checkOutdated = async () => {
  const { stdout, stderr } = await runCommand('npm outdated');
  if (stderr) {
    console.error('Error checking outdated dependencies:', stderr);
    return;
  }
  if (stdout) {
    console.log('Outdated dependencies:\n', stdout);
    return stdout;
  } else {
    console.log('No outdated dependencies found.');
  }
  return null;
};

// Function to update the dependencies
const updateDependencies = async () => {
  console.log('Running npm update...');
  const { stdout, stderr } = await runCommand('npm update');
  if (stderr) {
    console.error('Error updating dependencies:', stderr);
    return false;
  }
  console.log('Dependencies updated successfully.\n', stdout);
  return true;
};

// Function to restore the backup if update fails
const restoreBackup = async (backupDir) => {
  try {
    const backupFiles = ['package.json', 'package-lock.json'];

    // Check if the backup directory exists
    if (!fs.existsSync(backupDir)) {
      console.error('Backup directory does not exist.');
      return;
    }

    for (const file of backupFiles) {
      const sourcePath = path.join(backupDir, file);
      const destPath = path.join(projectDir, file);

      if (fs.existsSync(sourcePath)) {
        fs.copyFileSync(sourcePath, destPath);
        console.log(`Restored ${file} from backup.`);
      } else {
        console.error(`${file} not found in backup.`);
      }
    }
  } catch (error) {
    console.error('Error restoring backup:', error);
  }
};

// Function to perform the full update and backup restore process
const performUpdate = async () => {
  console.log('Checking for outdated dependencies...');
  const outdated = await checkOutdated();

  if (!outdated) {
    console.log('No outdated dependencies found. All packages are up to date!');
    return;
  }

  console.log('Updating dependencies...');
  const updateSuccess = await updateDependencies();

  if (updateSuccess) {
    console.log('Update successful!');
  } else {
    console.log('Update failed. Rolling back changes...');
    const backupDir = path.join(projectDir, 'backup');
    await restoreBackup(backupDir);
  }
};

// Start the update process
(async () => {
  await performUpdate();
})();
=======
import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';
import { promisify } from 'util';

// Promisify exec to use async/await
const execPromise = promisify(exec);

// Path to your project directory
const projectDir = process.cwd();

// Function to run a shell command and capture the output
const runCommand = async (command) => {
  try {
    const { stdout, stderr } = await execPromise(command, { cwd: projectDir });
    if (stderr) {
      console.error(`Error executing command: ${command}\n`, stderr);
    }
    return { stdout, stderr };
  } catch (error) {
    console.error(`Error executing command: ${command}\n`, error.message);
    return { stdout: '', stderr: error.message };
  }
};

// Function to check for outdated dependencies
const checkOutdated = async () => {
  const { stdout, stderr } = await runCommand('npm outdated');
  if (stderr) {
    console.error('Error checking outdated dependencies:', stderr);
    return;
  }
  if (stdout) {
    console.log('Outdated dependencies:\n', stdout);
    return stdout;
  } else {
    console.log('No outdated dependencies found.');
  }
  return null;
};

// Function to update the dependencies
const updateDependencies = async () => {
  console.log('Running npm update...');
  const { stdout, stderr } = await runCommand('npm update');
  if (stderr) {
    console.error('Error updating dependencies:', stderr);
    return false;
  }
  console.log('Dependencies updated successfully.\n', stdout);
  return true;
};

// Function to restore the backup if update fails
const restoreBackup = async (backupDir) => {
  try {
    const backupFiles = ['package.json', 'package-lock.json'];

    // Check if the backup directory exists
    if (!fs.existsSync(backupDir)) {
      console.error('Backup directory does not exist.');
      return;
    }

    for (const file of backupFiles) {
      const sourcePath = path.join(backupDir, file);
      const destPath = path.join(projectDir, file);

      if (fs.existsSync(sourcePath)) {
        fs.copyFileSync(sourcePath, destPath);
        console.log(`Restored ${file} from backup.`);
      } else {
        console.error(`${file} not found in backup.`);
      }
    }
  } catch (error) {
    console.error('Error restoring backup:', error);
  }
};

// Function to perform the full update and backup restore process
const performUpdate = async () => {
  console.log('Checking for outdated dependencies...');
  const outdated = await checkOutdated();

  if (!outdated) {
    console.log('No outdated dependencies found. All packages are up to date!');
    return;
  }

  console.log('Updating dependencies...');
  const updateSuccess = await updateDependencies();

  if (updateSuccess) {
    console.log('Update successful!');
  } else {
    console.log('Update failed. Rolling back changes...');
    const backupDir = path.join(projectDir, 'backup');
    await restoreBackup(backupDir);
  }
};

// Start the update process
(async () => {
  await performUpdate();
})();
>>>>>>> fb2a5ba6c7a6cb1483c4d31f2b604919c4eb40f3
