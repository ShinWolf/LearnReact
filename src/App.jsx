import { Input, InputRange } from "./components/forms/input"
import { Checkbox } from "./components/forms/Checkbox"
import { ProductRow } from "./components/products/ProductRow"
import { ProductCategory } from "./components/products/ProductCategory"
import { useToggle } from "./hooks/useToggle"
import { useIncrement } from "./hooks/useIncrement"
import { useEffect, useState, memo } from "react"
import { useDocumentTitle } from "./hooks/useDocumentTitle"
import { useFetech } from "./hooks/useFetch"
import { createPortal } from "react-dom"
import { ErrorBoundary } from "react-error-boundary"

const PRODUCTS = [
  { category: 'Fruits', price: '$1', stocked: true, name: 'Apple' },
  { category: 'Fruits', price: '$1', stocked: true, name: 'Dragonfruit' },
  { category: 'Fruits', price: '$2', stocked: false, name: 'Passionfruit' },
  { category: 'Vegetables', price: '$2', stocked: true, name: 'Spinach' },
  { category: 'Vegetables', price: '$4', stocked: false, name: 'Pumpkin' },
  { category: 'Vegetables', price: '$1', stocked: true, name: 'Peas' },
]

function App() {

  const [showStockedOnly, setshowStockedOnly] = useState(false);
  const [search, setSearch] = useState('');
  const [range, setRange] = useState('');

  const visibleProducts = PRODUCTS.filter(product => {
    if (showStockedOnly && !product.stocked) {
      return false;
    }

    if (search && !product.name.includes(search)) {
      return false;
    }

    if (range !== '' && parseFloat(product.price.slice(1)) !== parseFloat(range)) {
      return false;
    }

    return true;
  })

  return <div className="container my-3">
    <SearchBar
      search={search}
      onSearchChange={setSearch}
      showStockedOnly={showStockedOnly}
      onStockedOnlyChange={setshowStockedOnly}
      range={range}
      onRangeChange={setRange}
    />
    <ErrorBoundary fallback={<p>Impossible d'afficher la liste de produits</p>}>
      <ProductTable products={visibleProducts} />
    </ErrorBoundary>
  </div>
  /*UseEffect
  const [duration, setDuration] = useState(5)
  const [secondsLeft, setSecondsLeft] = useState(5)

  const handleChange = (v) => {
    setDuration(v)
    setSecondsLeft(v)
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsLeft(v => {
        if (v <= 1) {
          clearInterval(timer)
          return 0
        }
        return v - 1
      })
    }, 1000)

    return () => {
      clearInterval(timer)
    }
  }, [duration])

  return <div className="vstack gap-2">
    <Input
      value={duration}
      onChange={handleChange}
      placeholder="Timer..."
    />
    <p>
      Décompte : {secondsLeft}
    </p>
  </div>*/

  /*const [firstname, setFirstname] = useState('');
  const [password, setPassword] = useState('');
  const security = useMemo(() => {
    return passwordSecurity(password);
  }, [password])
  return <div className="contaioner my-3 vstack gap-2">
    <Input
      label="Nom d'utilisateur"
      placeholder="John"
      valeur={firstname}
      onChange={setFirstname}
    />
    <div>
      <Input
        label="Password"
        type="password"
        placeholder="Mot de passe"
        valeur={password}
        onChange={setPassword}
      />
      Sécurité : {security}
    </div>
  </div>*/

  /*const { count, increment, decrement } = useIncrement({
    base: 0,
    max: 10,
    min: 0
  });

  const [name, setName] = useState('')

  useDocumentTitle(name ? `Editer ${name}` : null)

  return <div>
    <Input value={name} onChange={setName} />
    Compteur {count}
    <br />
    <button onClick={increment}>Incrémenter</button>
    <button onClick={decrement}>Décrémenter</button>
  </div>*/

  /*const { loading, data, errors } = useFetech('https://jsonplaceholder.typicode.com/posts?_limit=10&_delay=10000');

  return <div className="container my-2">
    {loading && <div className="spinner-border" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>}
    {errors && <div className="alert alert-danger">{errors.toString()}</div>}
    {data && <div>
      <ul>
        {data.map(post => (<li key={post.id}>{post.title}</li>))}
      </ul>
    </div>}
  </div>*/

  /* Memoissation : 
  const [name, setName] = useState('')

  return <div className="container my-2 vstack gap-2">
    <div>
      <Input placeholder="Name" onChange={setName} value={name} />
      <div>
        {name.toUpperCase()}
      </div>
    </div>
    <InfoMemo />
  </div>*/

  /* Portal
  return <div style={{
    height: 300,
    overflowY: 'scroll',
    background: '#EEE',
    margin: 20,
    position: 'relative'
  }}>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis, assumenda? Rerum temporibus tempora velit eveniet necessitatibus maiores alias? Pariatur neque facilis tempore aliquam sed, ullam officia aut inventore veniam numquam!</p>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis, assumenda? Rerum temporibus tempora velit eveniet necessitatibus maiores alias? Pariatur neque facilis tempore aliquam sed, ullam officia aut inventore veniam numquam!</p>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis, assumenda? Rerum temporibus tempora velit eveniet necessitatibus maiores alias? Pariatur neque facilis tempore aliquam sed, ullam officia aut inventore veniam numquam!</p>
    <Modal />
  </div>*/



}

function SearchBar({ showStockedOnly, onStockedOnlyChange, search, onSearchChange, range, onRangeChange }) {
  return <div>
    <div className="mb-3">
      <Input type="text" value={search} onChange={onSearchChange} placeholder="Rechercher..." />
      <InputRange id="rangePrix" label="Range" min={0} max={10} value={range} onChange={onRangeChange} />
      <Checkbox
        id="stocked"
        checked={showStockedOnly}
        onChange={onStockedOnlyChange}
        label={"N'afficher que les produits en stock"}
      />
    </div>
  </div>
}

function ProductTable({ products }) {

  const rows = [];
  let lastCategory = null;

  for (let product of products) {
    if (product.category !== lastCategory) {
      rows.push(<ProductCategory key={product.category} name={product.category} />);
    }
    lastCategory = product.category;
    rows.push(<ProductRow product={product} key={product.name} />);
  }

  return <table className="table">
    <thead>
      <tr>
        <th>Nom</th>
        <th>Prix</th>
      </tr>
    </thead>
    <tbody>
      {rows}
    </tbody>
  </table>
}

function passwordSecurity(password) {
  if (password.length < 3) {
    return 'Faible';
  } else if (password.length < 6) {
    return 'Moyen';
  }
  return 'Fort';
}

const InfoMemo = memo(function Info() {
  waitSync(5000)
  return <div className="alert alert-info">
    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque exercitationem odio deleniti cupiditate. Sequi facilis maxime eaque sit autem nisi, dolores cupiditate facere, assumenda aspernatur expedita, velit dolorum accusamus nulla.
  </div>
})

function waitSync(timer) {
  console.log('Info', 'render')
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      console.log("Waiting...")
    }, timer);

    return () => clearTimeout(timeoutId);
  }, []);
}

function Modal() {
  return createPortal(
    <div style={{
      position: 'absolute',
      top: 0,
      right: 0,
      padding: 10,
      border: 'solid 1px grey',
      background: '#FFF'
    }}>
      Je suis modale
    </div>, document.body
  )
}

export default App
