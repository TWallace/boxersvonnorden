import Layout from './components/Layout'
import { LightboxProvider } from './components/Lightbox'
import { Router, usePath, matchRoute } from './lib/router'
import Home from './pages/Home'
import DogList from './pages/DogList'
import Dog from './pages/Dog'
import Memory from './pages/Memory'
import Litters from './pages/Litters'
import RawFeeding from './pages/RawFeeding'
import Gallery from './pages/Gallery'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'

function Routes() {
  const path = usePath()
  if (path === '/') return <Home />
  if (path === '/male-dogs') return <DogList sex="male" />
  if (path === '/female-dogs') return <DogList sex="female" />
  const dog = matchRoute('/dogs/:slug', path)
  if (dog) return <Dog key={dog.slug} slug={dog.slug} />
  if (path === '/memory') return <Memory />
  if (path === '/litters') return <Litters />
  if (path === '/raw-feeding') return <RawFeeding />
  if (path === '/gallery') return <Gallery />
  if (path === '/contact') return <Contact />
  return <NotFound />
}

export default function App() {
  return (
    <Router>
      <LightboxProvider>
        <Layout>
          <Routes />
        </Layout>
      </LightboxProvider>
    </Router>
  )
}
