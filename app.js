const $=s=>document.querySelector(s);
const COL={karhutla_konsesi:'#4fc3a1',nepotisme_dinasti:'#9a8cff',mbg_apbn:'#f0a04b'};
const NAME={karhutla_konsesi:'Karhutla dan konsesi',nepotisme_dinasti:'Nepotisme dan dinasti politik',mbg_apbn:'MBG dan APBN'};
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const cut=(s,n=46)=>s.length>n?s.slice(0,n-1)+'…':s,nf=n=>n.toLocaleString('id-ID');
const base={responsive:true,maintainAspectRatio:false},ch={};
Chart.defaults.font.family='"DM Sans",system-ui,sans-serif';Chart.defaults.color='#d8c3c7';Chart.defaults.borderColor='rgba(255,255,255,.1)';
const draw=(id,c)=>{ch[id]&&ch[id].destroy();ch[id]=new Chart($('#'+id),c)};
const bar=(id,l,d,col,h,n)=>draw(id,{type:'bar',data:{labels:l,datasets:[{label:n,data:d,backgroundColor:col,borderColor:'#0a0507',borderWidth:2}]},options:{...base,indexAxis:h?'y':'x',plugins:{legend:{display:false}},scales:{[h?'x':'y']:{beginAtZero:true,ticks:{precision:0}}}}});
const top=o=>Object.entries(o).sort((a,b)=>b[1]-a[1])[0];
const STAT=[['202.000+','hektare karhutla sampai Agustus 2026 (Kemenhut)'],['335','pemilik konsesi dengan titik api (KLH)'],['20','perusahaan tersangka karhutla, 29 Okt (Bareskrim)'],['17','tuntutan ITS dan Unair, 10 Nov'],['9 Nov','pajak digital mulai dipungut'],['10 Nov','Istana benarkan Gibran ajukan niat mundur'],['60','platform diverifikasi di PP Tunas (6 Sep)'],['72','tersangka karhutla perorangan, s.d. 21 Agu (Bareskrim)']];
$('#st').innerHTML=STAT.slice(0,6).map(s=>'<div><b>'+s[0]+'</b>'+s[1]+'</div>').join('');
const Q=[['Sampai Agustus 2026, karhutla tercatat lebih dari 202.000 hektare.',1,'Benar. Kemenhut mencatat 202.000+ hektare di 340 kabupaten.'],
['Semua tersangka karhutla di Riau pada 2026 adalah perusahaan.',0,'Salah. Per 30 Agustus, 40 tersangka Polda Riau semuanya perorangan.'],
['Putusan MK 6 Oktober 2026 langsung memberhentikan Gibran.',0,'Salah. Putusan itu tidak memberhentikan Gibran dan tidak memerintahkan DPR memulai pemakzulan.'],
['Daftar 17 tuntutan ITS dan Unair memuat tuntutan agar Prabowo dan Gibran mundur.',0,'Salah. Daftar itu tidak memuat tuntutan mundur. Tuntutan mundur datang dari kelompok lain di Surabaya.'],
['Pada 29 Oktober 2026 Bareskrim mengumumkan 20 perusahaan tersangka karhutla.',1,'Benar. Empat di antaranya berstatus modal asing.'],
['Ada sumber di halaman ini yang menyebut pemilik akhir perusahaan yang untung dari karhutla.',0,'Salah. Tidak ada. Itu sebabnya halaman ini tidak menyebut nama.'],
['Pemungutan pajak digital mulai berlaku pada 9 November 2026.',1,'Benar, menurut laporan AFU tentang tuntutan ITS dan Unair.']];
let qi=0,sc=0;
function quiz(){const q=$('#q');
 if(qi>=Q.length){const r=sc<3?'NPC berita 🤖':sc<6?'Anak timeline 📱':'Detektif fakta 🕵️';q.innerHTML='<h3>Skor '+sc+'/'+Q.length+': '+r+'</h3><button id="rs">Main lagi</button>';$('#rs').onclick=()=>{qi=sc=0;quiz()};return}
 q.innerHTML='<small>Soal '+(qi+1)+'/'+Q.length+'</small><h3>'+Q[qi][0]+'</h3><div class="row"><button data-a="1">Fakta ✅</button><button data-a="0">Hoaks ❌</button></div><p id="ex"></p>';
 q.querySelectorAll('[data-a]').forEach(b=>b.onclick=()=>{const ok=+b.dataset.a===Q[qi][1];sc+=ok?1:0;q.querySelectorAll('[data-a]').forEach(x=>x.disabled=true);
  $('#ex').innerHTML=(ok?'Tepat! ':'Belum tepat. ')+Q[qi][2]+' <button id="nx">Lanjut</button>';$('#nx').onclick=()=>{qi++;quiz()}})}
quiz();
const KAM=[['Karhutla','Singkatan dari kebakaran hutan dan lahan.'],['Konsesi','Izin pemerintah bagi perusahaan untuk mengelola kawasan tertentu, misalnya hutan atau perkebunan.'],['PBPH','Perizinan Berusaha Pemanfaatan Hutan: izin usaha untuk memanfaatkan kawasan hutan.'],['HGU','Hak Guna Usaha: hak mengusahakan tanah negara untuk usaha seperti perkebunan.'],['Titik panas (hotspot)','Titik di peta satelit dengan suhu permukaan tinggi. Itu indikasi, belum tentu semuanya kebakaran yang sudah terkonfirmasi.'],['Putusan MK 90','Putusan MK No. 90/PUU-XXI/2023 yang mengubah batas usia calon presiden dan wakil presiden.'],['Dinasti politik','Kekuasaan politik yang dipegang atau diwariskan dalam satu keluarga.'],['Nepotisme','Mengutamakan keluarga atau kerabat dalam jabatan atau keputusan.'],['Pemakzulan','Proses konstitusional memberhentikan presiden atau wakil presiden dalam masa jabatan. Prosesnya melibatkan DPR, MK, dan MPR.'],['MBG dan APBN','MBG adalah Makan Bergizi Gratis, program pemerintah. APBN adalah anggaran pendapatan dan belanja negara.'],['PP Tunas','PP No. 17 Tahun 2025 tentang tata kelola penyelenggaraan sistem elektronik dalam pelindungan anak.']];
$('#kam').innerHTML=KAM.map(k=>'<details><summary>'+k[0]+'</summary>'+k[1]+'</details>').join('');
$('#tips').innerHTML=['<b>Cek tanggal</b>Berita lama sering beredar lagi seolah baru.','<b>Cek siapa yang ngomong</b>Pernyataan LSM, polisi, dan perusahaan itu pihak yang berbeda.','<b>Buka linknya</b>Screenshot bisa dipotong. Sumber asli tidak.','<b>Tersangka ≠ bersalah</b>Terbukti bersalah baru setelah putusan pengadilan.'].map(t=>'<div>'+t+'</div>').join('');
Promise.all([fetch('data/data.json').then(r=>r.json()),fetch('data/facts.json').then(r=>r.json())]).then(([D,F])=>{
 const K=Object.keys(D.topics),T=D.topics,X=D.extra;lib(D);
 $('#scope').textContent='Data: '+K.map(k=>NAME[k]+' ('+T[k].n+' publikasi)').join(', ')+'; plus '+X.sumber.n+' sumber karhutla, '+X.jurnal.n+' jurnal ('+X.jurnal.oa+' akses terbuka), dan '+X.buku.n+' buku terbuka.';
 const yrs=[...new Set(K.flatMap(k=>Object.keys(T[k].year)))].sort();
 draw('c1',{type:'line',data:{labels:yrs,datasets:K.map(k=>({label:NAME[k],data:yrs.map(y=>T[k].year[y]||0),borderColor:COL[k],backgroundColor:COL[k],borderWidth:3,tension:.2}))},options:{...base,scales:{y:{beginAtZero:true,title:{display:true,text:'Jumlah publikasi'}}}}});
 $('#n1').textContent=K.map(k=>{const[y,n]=top(T[k].year);return NAME[k]+': terbanyak '+y+' ('+n+' publikasi), total sitasi '+nf(T[k].cit)+'.'}).join(' ')+' Tiap topik berisi 150 data.';
 const sy=X.sumber.year,ty=X.sumber.type;bar('c2',Object.keys(sy),Object.values(sy),COL.karhutla_konsesi,false,'Sumber');
 draw('c3',{type:'doughnut',data:{labels:Object.keys(ty),datasets:[{data:Object.values(ty),backgroundColor:['#12a05c','#3d5afe','#ff9f1c','#c2344d','#4db8ff','#c6f432','#7a738f'],borderColor:'#0a0507',borderWidth:2}]},options:{...base,plugins:{legend:{position:'bottom'}}}});
 const a=top(sy),b=top(ty);$('#n2').textContent='Dari '+X.sumber.n+' sumber, tahun terbanyak adalah '+a[0]+' ('+a[1]+' sumber). Jenis dokumen terbanyak adalah '+b[0]+' ('+b[1]+' sumber).';
 const o=K.map(k=>'<option value="'+k+'">'+NAME[k]+'</option>').join('');$('#s4').innerHTML=o;$('#s5').innerHTML=o;
 const r4=()=>{const k=$('#s4').value,t=T[k].top;bar('c4',t.map((x,i)=>(i+1)+'. '+cut(x.t)),t.map(x=>x.c),COL[k],true,'Sitasi');
  $('#l4').innerHTML=t.map(x=>'<li><a href="'+esc(x.u)+'" rel="noopener">'+esc(x.t)+'</a> ('+x.y+', '+x.c+' sitasi)</li>').join('')};
 const r5=()=>{const k=$('#s5').value,w=T[k].words;bar('c5',w.map(x=>x[0]),w.map(x=>x[1]),COL[k],true,'Judul')};
 $('#s4').onchange=r4;$('#s5').onchange=r5;r4();r5();
 bar('c6',F.enf.map(e=>e.l),F.enf.map(e=>e.v),'#c2344d',false,'Korporasi tersangka');
 const TAB=[['all','Semua'],['k','🔥 Karhutla'],['p','⚖️ MK dan politik'],['d','📣 Demo dan kebijakan'],['g','📱 Dunia digital']],EM={k:'🔥',p:'⚖️',d:'📣',g:'📱'};let cur='all',n=8,fq='';
 const show=()=>{const L=F.facts.filter(f=>(cur==='all'||f.t===cur)&&(!fq||(f.s+' '+f.w).toLowerCase().includes(fq))).sort((x,y)=>y.d.localeCompare(x.d));
  $('#tabs').innerHTML=TAB.map(([v,l])=>'<button aria-pressed="'+(v===cur)+'" data-v="'+v+'">'+l+'</button>').join('');
  $('#facts').innerHTML=L.slice(0,n).map(f=>'<article class="'+f.t+'"><small>'+EM[f.t]+' '+esc(f.d)+' | '+esc(f.w)+'</small>'+esc(f.s)+' <a href="'+esc(f.u)+'" rel="noopener">Sumber</a></article>').join('');
  $('#more').hidden=n>=L.length;
  document.querySelectorAll('#tabs button').forEach(x=>x.onclick=()=>{cur=x.dataset.v;n=8;show()})};
 $('#more').onclick=()=>{n+=8;show()};$('#fq').oninput=e=>{fq=e.target.value.toLowerCase();n=8;show()};show();
}).catch(()=>{$('#err').hidden=false});

(()=>{const c=$('#stars'),g=c.getContext('2d'),R=matchMedia('(prefers-reduced-motion:reduce)').matches;let S=[];
const rs=()=>{c.width=innerWidth;c.height=innerHeight;S=Array.from({length:Math.round(innerWidth/8)},()=>({x:Math.random()*c.width,y:Math.random()*c.height*.8,r:Math.random()*1.3+.3,p:Math.random()*6}))};
const tk=t=>{g.clearRect(0,0,c.width,c.height);S.forEach(s=>{g.globalAlpha=.2+.6*Math.abs(Math.sin(t/1600+s.p));g.fillStyle='#ffe9ec';g.beginPath();g.arc(s.x,s.y,s.r,0,7);g.fill()});if(!R)requestAnimationFrame(tk)};
addEventListener('resize',rs);rs();requestAnimationFrame(tk);
const nl=$('#nl');$('#mb').onclick=()=>nl.classList.toggle('open');nl.querySelectorAll('a').forEach(a=>a.onclick=()=>nl.classList.remove('open'));
const mp=$('#mp'),mt=$('#mt');mt.onclick=()=>mt.setAttribute('aria-expanded',mp.classList.toggle('open'));
const M=document.querySelectorAll('.mood-choice');M.forEach(b=>b.onclick=()=>{document.body.dataset.mood=b.dataset.m;M.forEach(x=>x.setAttribute('aria-pressed',x===b))})})();

function lib(D){const L=D.lib,S=D.ds.stats;let set='sumber',vis=24,fav=[];
 try{fav=JSON.parse(localStorage.getItem('fav')||'[]')}catch(e){}
 $('#lt').innerHTML='<option value="">Semua jenis</option>'+[...new Set([...L.sumber,...L.buku].map(r=>r[2]))].map(t=>'<option>'+t+'</option>').join('');
 const go=()=>{const q=$('#lq').value.toLowerCase(),t=$('#lt').value,o=$('#lo').value,u=$('#lu').checked,f=$('#lf').checked;
  const R=L[set].filter(r=>(!q||r[0].toLowerCase().includes(q))&&(!t||r[2]===t)&&(!u||r[4])&&(!f||fav.includes(r[0])));
  R.sort(o==='c'?(a,b)=>b[5]-a[5]:o==='n'?(a,b)=>b[1]-a[1]:(a,b)=>a[1]-b[1]);
  $('#lc').textContent=R.length+' dari '+L[set].length+' '+(set==='sumber'?'tulisan':'buku')+' ditemukan.';
  $('#ll').innerHTML=R.slice(0,vis).map(r=>'<article class="k"><small>'+r[1]+' | '+esc(r[2])+' | '+r[5]+' sitasi</small>'+esc(r[0])+'<div class="row">'+(r[4]?'<a class="btn" target="_blank" rel="noopener" href="'+esc(r[4])+'">Baca</a>':'')+(r[3]?'<a class="btn" target="_blank" rel="noopener" href="'+esc(r[3])+'">DOI</a>':'')+'<button data-f="'+esc(r[0])+'" aria-pressed="'+fav.includes(r[0])+'">'+(fav.includes(r[0])?'★ Disimpan':'☆ Simpan')+'</button></div></article>').join('')||'<p class="small">Tidak ada hasil. Coba kata kunci lain.</p>';
  $('#lm').hidden=vis>=R.length;
  document.querySelectorAll('#ll [data-f]').forEach(b=>b.onclick=()=>{const k=b.dataset.f;fav=fav.includes(k)?fav.filter(x=>x!==k):[...fav,k];try{localStorage.setItem('fav',JSON.stringify(fav))}catch(e){}go()})};
 ['lq','lt','lo','lu','lf'].forEach(i=>$('#'+i).oninput=()=>{vis=24;go()});$('#lm').onclick=()=>{vis+=24;go()};
 [['ts','sumber'],['tb','buku']].forEach(([i,k])=>$('#'+i).onclick=()=>{set=k;vis=24;$('#ts').setAttribute('aria-pressed',k==='sumber');$('#tb').setAttribute('aria-pressed',k==='buku');go()});go();
 $('#dsn').innerHTML=[[S.n,'tulisan dianalisis'],[S.median,'median sitasi per tulisan'],[S.mean,'rata-rata sitasi'],[S.max,'sitasi tertinggi'],[S.zero+' ('+Math.round(S.zero/S.n*100)+'%)','tulisan dengan 0 sitasi'],[S.top10share+'%','sitasi total dipegang 10% tulisan teratas']].map(s=>'<div><b>'+s[0]+'</b>'+s[1]+'</div>').join('');
 bar('d1',D.ds.hist.l,D.ds.hist.v,'#e0707f',false,'Jumlah tulisan');
 $('#d1n').textContent='Rata-rata sitasi ('+S.mean+') lebih tinggi dari median ('+S.median+'). Artinya sebagian kecil tulisan dikutip sangat banyak, sedangkan banyak tulisan lain dikutip sedikit.';
 draw('d2',{type:'scatter',data:{datasets:[{data:L.sumber.map(r=>({x:r[1],y:r[5]+1,t:r[0]})),backgroundColor:'#e0707f99',pointRadius:3}]},options:{...base,plugins:{legend:{display:false},tooltip:{callbacks:{label:c=>cut(c.raw.t,60)+' ('+c.raw.x+', '+(c.raw.y-1)+' sitasi)'}}},scales:{x:{ticks:{callback:v=>String(v)},title:{display:true,text:'Tahun terbit'}},y:{type:'logarithmic',title:{display:true,text:'Sitasi + 1 (skala log)'}}}}});
 const cy=Object.keys(D.ds.cum);draw('d3',{type:'line',data:{labels:cy,datasets:[{label:'Kumulatif',data:cy.map(y=>D.ds.cum[y]),borderColor:'#4fc3a1',backgroundColor:'#4fc3a133',fill:true,tension:.25}]},options:{...base,plugins:{legend:{display:false}},scales:{y:{beginAtZero:true,title:{display:true,text:'Jumlah tulisan'}}}}});
 bar('d4',D.ds.words.map(w=>w[0]),D.ds.words.map(w=>w[1]),'#9a8cff',true,'Judul')}
