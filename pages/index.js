import Head from 'next/head'
import Menu from '../components/menu';
import Base from '../components/base';

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Math Fun Day</title>
        <link rel="icon" href="/fsu-seal-black.png" />
      </Head>
      <main>
        <Menu />
        <Base />
      </main>
    </div>
  )
}
