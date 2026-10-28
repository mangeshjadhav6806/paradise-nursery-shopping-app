import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Check, Plus } from 'lucide-react';
import { addItem, selectCartItems } from './CartSlice.jsx';

const categories = [
  {
    name: 'Easy does it',
    description: 'Low-fuss favorites for the first-time plant parent.',
    plants: [
      { id: 'snake-plant', name: 'Snake Plant', subtitle: 'Sansevieria · indirect light', price: 24, image: 'photo-1497250681960-ef046c08a56e' },
      { id: 'zz-plant', name: 'ZZ Plant', subtitle: 'Zamioculcas · low light', price: 32, image: 'photo-1494438639946-1ebd1d20bf85' },
      { id: 'pothos', name: 'Golden Pothos', subtitle: 'Epipremnum · trailing', price: 18, image: 'photo-1614594975525-e45190c55d0b' },
      { id: 'rubber-plant', name: 'Rubber Plant', subtitle: 'Ficus elastica · bright light', price: 38, image: 'photo-1485955900006-10f4d324d411' },
      { id: 'spider-plant', name: 'Spider Plant', subtitle: 'Chlorophytum · pet-friendly', price: 21, image: 'photo-1572688484438-313a6e50c333' },
      { id: 'jade-plant', name: 'Jade Plant', subtitle: 'Crassula · succulent', price: 19, image: 'photo-1509423350716-97f9360b4e09' },
    ],
  },
  {
    name: 'Leafy characters',
    description: 'Statement foliage with plenty of personality.',
    plants: [
      { id: 'monstera', name: 'Monstera Deliciosa', subtitle: 'Monstera · bright, indirect light', price: 42, image: 'photo-1614594975525-e45190c55d0b' },
      { id: 'bird-paradise', name: 'Bird of Paradise', subtitle: 'Strelitzia · sun lover', price: 58, image: 'photo-1501004318641-b39e6451bec6' },
      { id: 'calathea', name: 'Calathea Orbifolia', subtitle: 'Goeppertia · gentle light', price: 36, image: 'photo-1497250681960-ef046c08a56e' },
      { id: 'fiddle-leaf', name: 'Fiddle Leaf Fig', subtitle: 'Ficus lyrata · bright light', price: 54, image: 'photo-1501004318641-b39e6451bec6' },
      { id: 'alocasia', name: 'Alocasia Polly', subtitle: 'Alocasia · filtered light', price: 34, image: 'photo-1485955900006-10f4d324d411' },
      { id: 'philodendron', name: 'Philodendron Hope', subtitle: 'Thaumatophyllum · easygoing', price: 39, image: 'photo-1497250681960-ef046c08a56e' },
    ],
  },
  {
    name: 'Small-space greens',
    description: 'Compact plants that make a corner feel complete.',
    plants: [
      { id: 'peperomia', name: 'Peperomia Obtusifolia', subtitle: 'Peperomia · tabletop size', price: 22, image: 'photo-1494438639946-1ebd1d20bf85' },
      { id: 'pilea', name: 'Chinese Money Plant', subtitle: 'Pilea · bright, indirect light', price: 26, image: 'photo-1518531933037-91b2f5f229cc' },
      { id: 'parlor-palm', name: 'Parlor Palm', subtitle: 'Chamaedorea · shade tolerant', price: 29, image: 'photo-1509423350716-97f9360b4e09' },
      { id: 'string-hearts', name: 'String of Hearts', subtitle: 'Ceropegia · trailing', price: 25, image: 'photo-1501004318641-b39e6451bec6' },
      { id: 'bird-nest', name: 'Bird’s Nest Fern', subtitle: 'Asplenium · loves humidity', price: 31, image: 'photo-1518531933037-91b2f5f229cc' },
      { id: 'haworthia', name: 'Haworthia Zebra', subtitle: 'Haworthia · compact succulent', price: 16, image: 'photo-1509423350716-97f9360b4e09' },
    ],
  },
];

function PlantCard({ plant, added, onAdd }) {
  return (
    <article className="plant-card">
      <div className="plant-image-wrap">
        <img
          className="plant-image"
          src={`https://images.unsplash.com/${plant.image}?auto=format&fit=crop&w=720&q=82`}
          alt={plant.name}
          loading="lazy"
        />
        <span className="plant-tag">Nursery pick</span>
      </div>
      <div className="plant-info">
        <div>
          <h3>{plant.name}</h3>
          <p>{plant.subtitle}</p>
        </div>
        <div className="plant-buy-row">
          <span className="plant-price">${plant.price.toFixed(2)}</span>
          <button className={`add-button${added ? ' is-added' : ''}`} onClick={onAdd} disabled={added} aria-label={added ? `${plant.name} added to cart` : `Add ${plant.name} to cart`}>
            {added ? <><Check size={16} /> Added</> : <><Plus size={16} /> Add to cart</>}
          </button>
        </div>
      </div>
    </article>
  );
}

export default function ProductList() {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);

  return (
    <main className="catalog page-shell">
      <header className="catalog-heading">
        <div>
          <p className="eyebrow">The houseplant edit</p>
          <h1>Find your<br className="mobile-break" /> <em>green.</em></h1>
        </div>
        <p className="catalog-intro">A little leafy company for every room, every routine, and every level of plant confidence.</p>
      </header>
      {categories.map((category, index) => (
        <section className="category-section" key={category.name}>
          <div className="category-heading">
            <div className="category-index">0{index + 1}</div>
            <div><h2>{category.name}</h2><p>{category.description}</p></div>
          </div>
          <div className="plant-grid">
            {category.plants.map((plant) => (
              <PlantCard
                key={plant.id}
                plant={plant}
                added={cartItems.some((item) => item.id === plant.id)}
                onAdd={() => dispatch(addItem(plant))}
              />
            ))}
          </div>
        </section>
      ))}
    </main>
  );
}