# Jalankan: python build_data.py <folder-berisi-file-upload>   (default: folder ini)
import json, re, sys, shutil, collections as C, pathlib, pandas as pd
src = pathlib.Path(sys.argv[1] if len(sys.argv) > 1 else '.')
out = pathlib.Path('data'); out.mkdir(exist_ok=True)
STOP = set("dan di yang dalam untuk pada dengan terhadap indonesia dari atau oleh ke sebagai antara studi kasus analisis tentang ini itu serta perspektif the of in and for".split())
raw = json.load(open(src/'data.json', encoding='utf-8'))
T = {}
for k, v in raw.items():
    words = C.Counter(w for r in v for w in set(re.findall(r'[a-zï]{3,}', r['title'].lower())) if w not in STOP)
    top = sorted(v, key=lambda r: -r['citations'])[:10]
    T[k] = dict(n=len(v), cit=sum(r['citations'] for r in v),
        year=dict(sorted(C.Counter(str(r['year']) for r in v if r.get('year')).items())),
        type=dict(C.Counter(r['type'] for r in v)), words=words.most_common(15),
        top=[dict(t=r['title'], y=r['year'], c=r['citations'], u=r['doi'] or r['url']) for r in top])
def pick(n):
    p = src/n.replace('.csv', '_1.csv')
    return p if p.exists() else src/n
s = pd.read_csv(pick('sumber_banyak_karhutla.csv')); j = pd.read_csv(pick('jurnal_karhutla.csv')); b = pd.read_csv(pick('buku_free_karhutla.csv'))
X = dict(sumber=dict(n=len(s), year={str(k): int(v) for k, v in s.tahun.value_counts().sort_index().items()},
                     type={k: int(v) for k, v in s.tipe.value_counts().items()}),
         jurnal=dict(n=len(j), oa=int(j.open_access.sum())), buku=dict(n=len(b), cit=int(b.sitasi.sum())))
def u(v, p=''):
    return v if isinstance(v, str) and v.startswith('http') else (p+v if isinstance(v, str) and v else '')
rows = lambda d: [[r.judul, int(r.tahun), r.tipe, u(r.doi, 'https://doi.org/'), u(r.url_baca), int(r.sitasi)] for r in d.itertuples()]
c = s.sitasi; cuts = [0, 1, 2, 6, 11, 26, 51, 10**9]
EX = STOP | set('kebakaran hutan lahan forest fire fires land'.split())
w2 = C.Counter(w for t in s.judul for w in set(re.findall(r'[a-zï]{3,}', str(t).lower())) if w not in EX)
DS = dict(hist=dict(l=['0','1','2-5','6-10','11-25','26-50','51+'], v=[int(((c>=cuts[i])&(c<cuts[i+1])).sum()) for i in range(7)]),
  cum={str(k): int(v) for k, v in s.groupby('tahun').size().cumsum().items()},
  stats=dict(n=len(s), mean=round(float(c.mean()),1), median=float(c.median()), max=int(c.max()), zero=int((c==0).sum()), top10share=round(float(c.nlargest(len(s)//10).sum()/c.sum()*100),1)),
  words=w2.most_common(15))
LIB = dict(sumber=rows(s), buku=rows(b))
json.dump(dict(topics=T, extra=X, lib=LIB, ds=DS), open(out/'data.json', 'w', encoding='utf-8'), ensure_ascii=False)
for f in ['data.json', 'sumber_banyak_karhutla.csv', 'jurnal_karhutla.csv', 'buku_free_karhutla.csv']:
    shutil.copy(pick(f), out/('raw_'+f))
print('selesai:', {k: v['n'] for k, v in T.items()})
