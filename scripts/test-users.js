const { spawn } = require('child_process');

const PORT = process.env.PORT || 1234;
const SERVER_READY = 'Servidor iniciado na porta';
const { exec } = require('child_process');

function killPortIfOccupied(port) {
  return new Promise((resolve) => {
    // Works on Windows (netstat + taskkill). If not Windows, ignore.
    exec('netstat -ano', (err, stdout) => {
      if (err || !stdout) return resolve();
      const lines = stdout.split(/\r?\n/);
      const pids = new Set();
      for (const line of lines) {
        if (line.includes(`:${port}`) && line.match(/LISTENING|LISTEN/)) {
          const parts = line.trim().split(/\s+/);
          const pid = parts[parts.length - 1];
          if (pid && !isNaN(Number(pid))) pids.add(pid);
        }
      }
      if (!pids.size) return resolve();
      let killed = 0;
      for (const pid of pids) {
        exec(`taskkill /PID ${pid} /F`, () => {
          killed += 1;
          if (killed === pids.size) resolve();
        });
      }
    });
  });
}

let serverProcess;

killPortIfOccupied(PORT).then(() => {
  serverProcess = spawn(process.execPath, ['server.js'], { cwd: process.cwd(), stdio: ['ignore', 'pipe', 'pipe'] });
  // attach listeners
  serverProcess.stdout.on('data', (chunk) => {
    const s = String(chunk);
    stdout += s;
    process.stdout.write(s);
  });
  serverProcess.stderr.on('data', (chunk) => {
    const s = String(chunk);
    stderr += s;
    process.stderr.write(s);
  });
  runTests();
}).catch((e) => {
  console.error('Erro ao liberar porta (continuando):', e);
  serverProcess = spawn(process.execPath, ['server.js'], { cwd: process.cwd(), stdio: ['ignore', 'pipe', 'pipe'] });
  serverProcess.stdout.on('data', (chunk) => {
    const s = String(chunk);
    stdout += s;
    process.stdout.write(s);
  });
  serverProcess.stderr.on('data', (chunk) => {
    const s = String(chunk);
    stderr += s;
    process.stderr.write(s);
  });
  runTests();
});

let stdout = '';
let stderr = '';

function waitForServerReady(timeout = 5000) {
  return new Promise((resolve, reject) => {
    const start = Date.now();
    const iv = setInterval(() => {
      if (stdout.includes(SERVER_READY) || stdout.includes(`Servidor iniciado na porta`)) {
        clearInterval(iv);
        return resolve();
      }
      if (Date.now() - start > timeout) {
        clearInterval(iv);
        return reject(new Error('Timeout esperando servidor iniciar'));
      }
    }, 100);
  });
}

async function runTests() {
  try {
    await waitForServerReady(8000);
    const base = `http://localhost:${PORT}`;

    const putRes = await fetch(`${base}/users/1`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'Teste Automatizado', email: 'auto@mail.com' })
    });
    const putJson = await putRes.json();
    console.log('PUT response:', JSON.stringify(putJson));

    const getRes = await fetch(`${base}/users`);
    const getJson = await getRes.json();
    console.log('GET response:', JSON.stringify(getJson));

    serverProcess.kill();
    process.exit(0);
  } catch (err) {
    console.error('Erro no teste:', err);
    if (!serverProcess.killed) serverProcess.kill();
    process.exit(1);
  }
}

// runTests is invoked after server spawn above
