import { ViteReactSSG } from 'vite-react-ssg'
import { LANGS } from './i18n.js'
import { POSTS } from './content.js'
import { Layout, Home, Blog, Post, Page } from './pages.jsx'
import './styles.css'

const PAGES = ['about', 'contact', 'privacy', 'terms', 'disclaimer']

// One route tree per language: English at "/", others at "/es", "/vi".
const tree = (lang) => ({
  path: lang === 'en' ? '/' : '/' + lang,
  element: <Layout lang={lang} />,
  children: [
    { index: true, element: <Home /> },
    { path: 'blog', element: <Blog /> },
    { path: 'blog/:slug', element: <Post />, getStaticPaths: () => POSTS.map((p) => 'blog/' + p.slug) },
    { path: 'p/:page', element: <Page />, getStaticPaths: () => PAGES.map((p) => 'p/' + p) },
  ],
})

export const routes = LANGS.map(tree)
export const createRoot = ViteReactSSG({ routes })
