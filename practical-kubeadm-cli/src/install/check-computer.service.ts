import * as fse from 'fs-extra';
import { Injectable } from '@nestjs/common';
import * as os from 'os';
import {
  compareStringsAndReturnIcon,
  GREEN_IS_VALID_ICON,
  RED_IS_INVALID_ICON,
} from 'src/core.constants';
import { logHeadline, logParagraph, unorderedList } from 'src/log.functions';

@Injectable()
export class CheckComputerService {
  main() {
    logHeadline('Checking computer operating system and resources...');
    this.checkOperatingSystem();
    this.checkMemory();
    this.checkCPU();
  }

  checkOperatingSystem() {
    const platform = os.platform();
    const isLinuxIcon = compareStringsAndReturnIcon(platform, 'linux');
    if (platform === 'linux') {
      const linuxOsInfoFilePath = '/etc/os-release';
      try {
        const osInfo = fse.readFileSync(linuxOsInfoFilePath, 'utf8');
        const osInfoLines = osInfo
          .split('\n')
          .filter((line) => line.trim() !== '')
          .reduce((acc, line) => {
            const [key, value] = line.split('=');
            if (key && value) {
              acc[key.trim()] = value.replace(/"/g, '').trim();
            }
            return acc;
          }, {});
        const isUbuntuIcon = compareStringsAndReturnIcon(
          osInfoLines['ID'],
          'ubuntu',
        );
        let versionNumber = osInfoLines['VERSION_ID'] || 'unknown';
        const [majorVersion, minorVersion] = versionNumber.split('.');
        const isMajorVersion24 = compareStringsAndReturnIcon(
          majorVersion,
          '24',
        );
        const isMinorVersion04 = compareStringsAndReturnIcon(
          minorVersion,
          '04',
        );
        unorderedList([
          `Operating System: ${platform}`,
          `isLinux : ${isLinuxIcon}`,
          `isUbuntu : ${isUbuntuIcon}`,
          `Version: ${versionNumber}`,
          `isMajorVersion24: ${isMajorVersion24}`,
          `isMinorVersion04: ${isMinorVersion04}`,
        ]);
      } catch (error) {
        logParagraph(
          `Could not read OS information from ${linuxOsInfoFilePath}. Error: ${error.message}`,
        );
      }
    } else {
      unorderedList([`Operating System: ${platform}`, `: ${isLinuxIcon}`]);
    }
  }

  checkMemory() {
    const RAM = os.totalmem() / (1024 * 1024 * 1024); // Convert bytes to GB
    const hasAtLeast2GBRAM = RAM >= 2;
    if (!hasAtLeast2GBRAM) {
      logParagraph(
        'Warning: Your system has less than 2 GB of RAM, which is below the recommended minimum for running a Kubernetes control plane node.',
      );
    }
    unorderedList([
      `Total RAM: ${RAM.toFixed(2)} GB`,
      `Has at least 2 GB RAM: ${hasAtLeast2GBRAM ? GREEN_IS_VALID_ICON : RED_IS_INVALID_ICON}`,
    ]);
  }
  cpu: string;
  checkCPU() {
    const cpus = os.cpus();
    const hasAtLeast2CPUs = cpus.length >= 2;
    if (!hasAtLeast2CPUs) {
      logParagraph(
        'Warning: Your system has less than 2 CPUs, which is below the recommended minimum for running a Kubernetes control plane node.',
      );
    }
    unorderedList([
      `Number of logical CPUs: ${os.cpus().length}`,
      `CPU Model: ${cpus[0].model}`,
      `Has at least 2 CPUs: ${hasAtLeast2CPUs ? GREEN_IS_VALID_ICON : RED_IS_INVALID_ICON}`,
    ]);
  }
}
