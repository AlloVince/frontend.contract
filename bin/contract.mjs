#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {spawnSync} from 'node:child_process';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const [cmd,...args]=process.argv.slice(2);
const strict=args.includes('--strict');
const arg=args.find(value=>value!=='--strict');
const target=arg&&path.resolve(arg);
const write=(p,s)=>{fs.mkdirSync(path.dirname(p),{recursive:true});fs.writeFileSync(p,s)};
const copy=(a,b)=>{for(const e of fs.readdirSync(a,{withFileTypes:true})){const src=path.join(a,e.name),dst=path.join(b,e.name);if(e.isDirectory())copy(src,dst);else{if(fs.existsSync(dst))throw Error('Will not overwrite '+dst);write(dst,fs.readFileSync(src));}}};
try{
 if(!target||!['create','adopt','check'].includes(cmd))throw Error('Usage: contract <create|adopt|check> [--strict] <path>');
 const manifest=path.join(target,'frontend-contract.json');
 if(cmd==='create'||cmd==='adopt'){
  if(cmd==='create'){if(fs.existsSync(target)&&fs.readdirSync(target).length)throw Error('Target not empty');fs.mkdirSync(target,{recursive:true});copy(path.join(root,'templates/react-spa'),target);}
  else if(!fs.existsSync(target))throw Error('Project not found');
  if(fs.existsSync(manifest))throw Error('Already adopted; upgrades must be explicit');
  const dir=path.join(target,'docs/frontend-contract');
  for(const f of ['FRONTEND.md','AGENT.md','DATA-DISPLAY.md','INTERACTION.md','ACCEPTANCE.md'])write(path.join(dir,f),fs.readFileSync(path.join(root,'contract',f)));
  write(manifest,JSON.stringify({version:'0.2.0',profile:'react-spa',mode:cmd==='create'?'strict':'incremental',ui:'project-selected'},null,2)+'\n');
  write(path.join(dir,'BASELINE.md'),'# Baseline\n\nRecord existing exceptions and missing checks here.\n');
  const agents=path.join(target,'AGENTS.md');
  const note='\n## Frontend contract\nRead docs/frontend-contract/AGENT.md and FRONTEND.md before frontend work.\n';
  if(!fs.existsSync(agents))write(agents,'# Agent instructions\n'+note);
  else if(!fs.readFileSync(agents,'utf8').includes('docs/frontend-contract/AGENT.md'))fs.appendFileSync(agents,note);
  console.log(cmd+' completed: '+target);
 }else{
  if(!fs.existsSync(manifest))throw Error('Not adopted');
  const m=JSON.parse(fs.readFileSync(manifest));
  const pkg=JSON.parse(fs.readFileSync(path.join(target,'package.json')));
  let failed=false;const gaps=[];
  for(const script of ['typecheck','lint','build','test:e2e']){
   if(!pkg.scripts?.[script]){gaps.push(script);console.log('GAP '+script);continue;}
   const r=spawnSync('pnpm',['run',script],{cwd:target,stdio:'inherit'});
   if(r.status!==0){failed=true;console.log('FAIL '+script);}
  }
  if(gaps.length)console.log('UNVERIFIED: '+gaps.join(', '));
  if(failed||((strict||m.mode==='strict')&&gaps.length))process.exitCode=1;
  else console.log('Available checks passed');
 }
}catch(e){console.error(e.message);process.exitCode=1}
