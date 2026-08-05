// Test script: login, wait 61s, then call protected API to check expiry
const portsToTry = [3001, 3000, 3002];
let base = null;

async function resolveBase(){
  for(const p of portsToTry){
    try{
      const res = await fetch(`http://localhost:${p}`);
      if(res.ok) { base = `http://localhost:${p}`; return base; }
    }catch(e){}
  }
  // default
  base = `http://localhost:${portsToTry[0]}`;
  return base;
}

function sleep(ms){return new Promise(r=>setTimeout(r,ms));}

async function waitForServer(){
  const deadline = Date.now()+60000;
  while(Date.now()<deadline){
    for(const p of portsToTry){
      try{
        const url = `http://localhost:${p}`;
        const r = await fetch(url);
        if(r.ok){ base = url; return true; }
      }catch(e){}
    }
    await sleep(1000);
  }
  throw new Error('Server did not start in 60s');
}

(async()=>{
  try{
    console.log('Resolving server base URL...');
    await resolveBase();
    console.log('Using base URL:', base);
    console.log('Waiting for server...');
    await waitForServer();
    console.log('Server up, logging in...');

    const loginRes = await fetch(base + '/api/auth/login',{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify({username:'admin', password:'Admin@123'})
    });

    console.log('Login status:', loginRes.status);
    const sc = loginRes.headers.get('set-cookie') || loginRes.headers.get('Set-Cookie');
    console.log('Set-Cookie header:', sc);
    let cookie='';
    if(sc){
      cookie = sc.split(';')[0];
    } else {
      // try to read raw headers (Node fetch may not expose set-cookie)
      try{
        // no-op
      }catch(e){}
    }

    console.log('Using cookie:', cookie || '(none)');
      if(cookie){
        try{
          const token = cookie.split('=')[1];
          const parts = token.split('.');
          const payload = JSON.parse(Buffer.from(parts[1],'base64').toString());
          console.log('Token payload exp:', payload.exp, 'iat:', payload.iat);
          console.log('Current epoch seconds:', Math.floor(Date.now()/1000));
        }catch(e){console.log('Failed to decode token payload',e)}
      }
    console.log('Waiting 61 seconds for token to expire...');
    await sleep(61000);

    console.log('Now epoch seconds:', Math.floor(Date.now()/1000));
    console.log('Requesting protected API /api/dashboard/stat');
    const statRes = await fetch(base + '/api/dashboard/stat',{
      headers: cookie ? { 'Cookie': cookie } : {}
    });
    console.log('Protected API status:', statRes.status);
    const body = await statRes.text();
    console.log('Protected API body:', body);

    if(statRes.status===401){
      console.log('Token expired -> API returned 401 as expected.');
    } else if(statRes.status===200){
      console.log('API still returned 200 — token may not have expired or cookie not sent.');
    } else {
      console.log('Unexpected status:', statRes.status);
    }
  }catch(err){
    console.error(err);
    process.exit(1);
  }
})();
