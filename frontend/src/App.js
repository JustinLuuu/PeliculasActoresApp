import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { CargarActores } from './actions/actores';
import { CargarPeliculas } from './actions/peliculas';
import { CargarRepartos } from './actions/repartos';
import { Actores } from './components/paginas/Actores';
import { Comienzo } from './components/paginas/Comienzo';
import { Peliculas } from './components/paginas/Peliculas';

function App() {

  const { actoresPeticionados } = useSelector(state => state.actores);
  const { peliculasPeticionadas } = useSelector(state => state.peliculas);
  const { repartosPeticionados } = useSelector(state => state.repartos);
  const dispatch = useDispatch();

  useEffect(() => {
    !actoresPeticionados && dispatch(CargarActores());
  }, [actoresPeticionados, dispatch]);

  useEffect(() => {
    !peliculasPeticionadas && dispatch(CargarPeliculas());
  }, [peliculasPeticionadas, dispatch])

  useEffect(() => {
    !repartosPeticionados && dispatch(CargarRepartos());
  }, [repartosPeticionados, dispatch])


  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Comienzo} />
        <Route path="/peliculas" component={Peliculas} />
        <Route path="/actores" component={Actores} />
        <Redirect to="/" />
      </Switch>
    </Router>
  );
}

export default App;
