import React from 'react';
import '../src/styles/css/global.css';
import { Banner } from './components/Banners';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { Partners } from './components/Partners';
import { Products } from './components/Products';
import { RelatedProducts } from './components/RelatedProducts';
import { SeeAll } from './components/SeeAll';
import { Topics } from './components/Topics';
import { Collection } from './components/Collection';

function App() {
  return (
    <main>
      <Header />
      <Banner />
      <Topics />
      <RelatedProducts />
      <Partners />
      <SeeAll />
      <Products />
      <Collection />
      <SeeAll />
      <Footer />
    </main>
  );
}

export default App;