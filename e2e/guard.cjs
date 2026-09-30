// The same probe runs in the app, backend and persistence service when the fixture enables it.
const fs = require('node:fs');
const assert = require('node:assert/strict');
const { spawnSync } = require('node:child_process');
if (fs.existsSync(`${__dirname}/guard-enabled`)) {
  assert.match(fs.readFileSync('/work/repository/docs/features.md','utf8'), /Features/);
  assert.throws(() => fs.appendFileSync('/work/repository/docs/features.md','changed'));
  assert.notEqual(spawnSync('sh',['-c','echo changed >> /work/repository/docs/features.md']).status, 0);
  assert.throws(() => fs.mkdirSync('/work/repository/notes/plans/new',{recursive:true}));
  fs.mkdirSync('/work/repository/notes',{recursive:true});
  fs.writeFileSync(`/work/repository/notes/service-${process.env.PORT}.txt`,'allowed');
  fs.writeFileSync(`${__dirname}/guard-${process.env.PORT}.txt`,'refused');
}
