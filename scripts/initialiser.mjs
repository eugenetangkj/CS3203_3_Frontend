import { exec } from 'child_process'


const runPythonScript = () => {
    return new Promise((resolve, reject) => {
      exec('python ./scripts/script.py', (error, stdout, stderr) => {
        if (error) {
          reject(`Error executing Python script: ${stderr}`);
        } else {
          resolve(stdout);
        }
      });
    });
};

export default runPythonScript