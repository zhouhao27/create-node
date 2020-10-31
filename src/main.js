import chalk from 'chalk';
import fs from 'fs';
import ncp from 'ncp';
import path from 'path';
import {
  promisify
} from 'util';
import Listr from 'listr';
import {
  projectInstall
} from 'pkg-install';

const access = promisify(fs.access);
const copy = promisify(ncp);

async function copyTemplateFiles(options) {
  return copy(options.templateDirectory, options.targetDirectory, {        
    filter: (source) => {
      console.log(source)      
      const last = source.substring(source.lastIndexOf('/') + 1)
      console.log(last)
      if (fs.lstatSync(source).isDirectory()) {
        // TODO: ignore whatever in .gitignore?
        if (last === '.git' || last === 'node_modules' || last === 'package-lock.json' || last === 'yarn.lock') {
          console.log('ignore')  
          return false  
        }     
      }
      return true
    },
    clobber: false,
    stopOnErr: false
  });
}

export async function createProject(options) {
  const projectPath = path.resolve(
    process.cwd(),
    options.name
  )  

  if (!fs.existsSync(projectPath)){
    fs.mkdirSync(projectPath);
    console.log(`Project folder created in ${projectPath}`)  
  } else {
    console.error(`${chalk.red.bold('ERROR:')} Project folder ${projectPath} already exists`);
    process.exit(1);
  }
  
  options = {
    ...options,
    targetDirectory: projectPath
  };

  const currentFileUrl = import.meta.url;
  const templateDir = path.resolve(
    new URL(currentFileUrl).pathname,
      '../../templates',
      options.template.toLowerCase()
  );
  options.templateDirectory = templateDir;

  console.log(`Template directory ${templateDir}`)  

  try {
    await access(templateDir, fs.constants.R_OK);
  } catch (err) {
    console.error('%s Invalid template name', chalk.red.bold('ERROR:'));
    process.exit(1);
  }

  const tasks = new Listr([{
      title: 'Copy project files',
      task: () => copyTemplateFiles(options),
    },
    {
      title: 'Install dependencies',
      task: () =>
        projectInstall({
          cwd: options.targetDirectory,
        })
    },
  ]);

  await tasks.run();

  console.log('%s Project ready', chalk.green.bold('DONE'));  
  return true;
}