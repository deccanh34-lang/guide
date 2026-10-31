import { createContext, useContext, useEffect, useRef, useState } from 'react'
import { Head } from 'vite-react-ssg'
import { Link, Outlet, useLocation, useParams } from 'react-router-dom'
import { UI, LANGS } from './i18n.js'
import { SITE, TOPICS, PROGRAMS } from './site.js'
import { POSTS } from './content.js'

const Ctx = createContext(null)
const useL = () => useContext(Ctx)
const prefix = (l) => (l === 'en' ? '' : '/' + l)
const PAGES = ['about', 'contact', 'privacy', 'terms', 'disclaimer']

export function Layout({ lang }) {
  const t = UI[lang]
  const { pathname } = useLocation()
  const rest = pathname.replace(/^\/(es|vi)(?=\/|$)/, '')
  const to = (p) => prefix(lang) + p || '/'
  return (
    <Ctx.Provider value={{ lang, t, to }}>
      <Head>
        <html lang={lang} />
        {LANGS.map((l) => <link key={l} rel="alternate" hrefLang={l} href={SITE.url + prefix(l) + rest} />)}
      </Head>
      <a className="skip" href="#main">{t.skip}</a>
      <header className="top">
        <div className="wrap bar">
          <Link className="brand" to={to('')}>{SITE.name}</Link>
          <nav aria-label="Main">
            <Link to={to('')}>{t.home}</Link>
            <Link to={to('/blog')}>{t.blog}</Link>
          </nav>
          <div className="langs" role="group" aria-label={t.lang}>
            {LANGS.map((l) => (
              <Link key={l} to={prefix(l) + rest || '/'} hrefLang={l} lang={l} aria-current={l === lang ? 'true' : undefined}>{l.toUpperCase()}</Link>
            ))}
          </div>
        </div>
      </header>
      <main id="main"><Outlet /></main>
      <Footer />
      <AgeNotice />
    </Ctx.Provider>
  )
}

function Band({ children, big }) {
  return <section className={'band' + (big ? ' big' : '')}><div className="wrap">{children}</div></section>
}

function PostGrid({ list }) {
  const { lang, to } = useL()
  return (
    <div className="grid">
      {list.map((p) => (
        <article className="card" key={p.slug}>
          <span className="tag">{TOPICS[p.topic][lang]} · {p.date}</span>
          <h3><Link to={to('/blog/' + p.slug)}>{p[lang].title}</Link></h3>
          <p>{p[lang].summary}</p>
        </article>
      ))}
    </div>
  )
}

export function Home() {
  const { t, to } = useL()
  return (
    <>
      <Head>
        <title>{SITE.name} | {t.tag}</title>
        <meta name="description" content={t.heroP} />
        <meta name="robots" content="index,follow" />
      </Head>
      <Band big>
        <h1>{t.heroT}</h1>
        <p>{t.heroP}</p>
        <p className="disc">{t.disc} <Link to={to('/p/disclaimer')}>{t.more}</Link></p>
      </Band>
      <section className="wrap sec" id="latest">
        <h2>{t.latest}</h2>
        <PostGrid list={POSTS.slice(0, 3)} />
      </section>
      <section className="wrap sec" id="programs">
        <h2>{t.progH}</h2>
        <p>{t.progP}</p>
        <div className="scroll" tabIndex={0} role="region" aria-label={t.progH}>
          <table>
            <thead><tr>{t.cols.map((c) => <th key={c} scope="col">{c}</th>)}</tr></thead>
            <tbody>
              {PROGRAMS.map((p) => (
                <tr key={p.name}>
                  <th scope="row">{p.name}</th>
                  <td>{t.types[p.type]}</td>
                  <td>{t.pays[p.pays]}</td>
                  <td><a href={p.url} target="_blank" rel="noopener">{t.official}<span className="vh"> {t.newtab}</span></a></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="small">{t.progNote}</p>
      </section>
    </>
  )
}

export function Blog() {
  const { lang, t } = useL()
  const [f, setF] = useState('all')
  const ids = Object.keys(TOPICS)
  return (
    <>
      <Head><title>{t.blog} | {SITE.name}</title><meta name="description" content={t.blogP} /></Head>
      <Band><h1>{t.blog}</h1><p>{t.blogP}</p></Band>
      <section className="wrap sec">
        {ids.length > 1 && (
          <div className="chips" role="group" aria-label={t.topics}>
            {['all', ...ids].map((i) => (
              <button type="button" key={i} aria-pressed={f === i} onClick={() => setF(i)}>{i === 'all' ? t.all : TOPICS[i][lang]}</button>
            ))}
          </div>
        )}
        <PostGrid list={POSTS.filter((p) => f === 'all' || p.topic === f)} />
      </section>
    </>
  )
}

export function Post() {
  const { lang, t, to } = useL()
  const { slug } = useParams()
  const p = POSTS.find((x) => x.slug === slug)
  if (!p) return <section className="wrap sec"><p>404</p></section>
  const c = p[lang]
  return (
    <>
      <Head><title>{c.title} | {SITE.name}</title><meta name="description" content={c.summary} /></Head>
      <Band><span className="tag">{TOPICS[p.topic][lang]} · {p.date}</span><h1>{c.title}</h1></Band>
      <article className="wrap sec prose">
        <p className="disc">{t.disc}</p>
        {c.body.map((b, i) =>
          typeof b === 'string' ? <p key={i}>{b}</p>
            : b.h ? <h2 key={i}>{b.h}</h2>
            : <ul key={i}>{b.ul.map((x) => <li key={x}>{x}</li>)}</ul>)}
        {p.cta && (
          <p className="cta">
            <a className="btn" href={p.cta} target="_blank" rel="sponsored noopener">{t.ctaLabel}<span className="vh"> {t.newtab}</span></a>
            <span className="small"> {t.sponsored}</span>
          </p>
        )}
        <p><Link to={to('/blog')}>← {t.blog}</Link></p>
      </article>
    </>
  )
}

export function Page() {
  const { t } = useL()
  const { page } = useParams()
  const c = t.pages[page]
  if (!c) return null
  const fill = (s) => s.replaceAll('{name}', SITE.name).replaceAll('{publisher}', SITE.publisher).replaceAll('{email}', SITE.email)
  return (
    <>
      <Head><title>{c.t} | {SITE.name}</title><meta name="robots" content="index,follow" /></Head>
      <Band><h1>{c.t}</h1></Band>
      <article className="wrap sec prose">{c.b.map((x, i) => <p key={i}>{fill(x)}</p>)}</article>
    </>
  )
}

function Footer() {
  const { t, to } = useL()
  return (
    <footer className="foot">
      <div className="wrap fgrid">
        <div><strong className="fb">{SITE.name}</strong><p>{t.footAbout}</p></div>
        <nav aria-label={t.footExplore}>
          <p className="fh">{t.footExplore}</p>
          <ul><li><Link to={to('')}>{t.home}</Link></li><li><Link to={to('/blog')}>{t.blog}</Link></li></ul>
        </nav>
        <nav aria-label={t.footLegal}>
          <p className="fh">{t.footLegal}</p>
          <ul>
            {PAGES.map((k) => <li key={k}><Link to={to('/p/' + k)}>{t.pages[k].t}</Link></li>)}
            <li><button type="button" className="link" onClick={() => window.dispatchEvent(new Event('age-reopen'))}>{t.ageReopen}</button></li>
          </ul>
        </nav>
      </div>
      <div className="wrap fbase"><p>{t.age18}</p><p>© {new Date().getFullYear()} {SITE.name}. {t.rights}</p></div>
    </footer>
  )
}

function AgeNotice() {
  const { t } = useL()
  const [open, setOpen] = useState(false)
  const box = useRef(null)
  useEffect(() => {
    let ok = false
    try { ok = localStorage.getItem('age18_v1') === '1' } catch (e) { /* storage blocked */ }
    setOpen(!ok)
    const r = () => setOpen(true)
    window.addEventListener('age-reopen', r)
    return () => window.removeEventListener('age-reopen', r)
  }, [])
  useEffect(() => {
    if (!open) return
    document.body.classList.add('lock')
    box.current?.querySelector('button')?.focus()
    const trap = (e) => {
      if (e.key !== 'Tab' || !box.current) return
      const f = box.current.querySelectorAll('button,a')
      const a = f[0], z = f[f.length - 1]
      if (e.shiftKey && document.activeElement === a) { e.preventDefault(); z.focus() }
      else if (!e.shiftKey && document.activeElement === z) { e.preventDefault(); a.focus() }
    }
    document.addEventListener('keydown', trap)
    return () => { document.body.classList.remove('lock'); document.removeEventListener('keydown', trap) }
  }, [open])
  if (!open) return null
  const yes = () => { try { localStorage.setItem('age18_v1', '1') } catch (e) { /* ignore */ } setOpen(false) }
  return (
    <div className="age">
      <div className="agebox" ref={box} role="dialog" aria-modal="true" aria-labelledby="age-t" aria-describedby="age-p">
        <p className="agebadge" aria-hidden="true">18+</p>
        <h2 id="age-t">{t.ageT}</h2>
        <p id="age-p">{t.ageP}</p>
        <div className="ageact">
          <button type="button" onClick={yes}>{t.ageYes}</button>
          <a className="btn ghost" href="https://www.google.com" rel="noopener">{t.ageNo}</a>
        </div>
      </div>
    </div>
  )
}
