import { useEffect } from 'react';
import PropTypes from 'prop-types';
import Header from '../../components/Header/Header';

const Home = ({ organizations }) => {
  useEffect(() => {
    document.title = 'Ремонт и обслуживание автомобилей | 4inilka';
  }, []);

  return (
    <>
      <Header />
      <main className='main'>
        <h1>Главная страница</h1>
        <div>
          <h2>Список организаций</h2>
          <ul>
            {organizations.map(org => (
              <li key={org.id}>{org.organization_full_name}</li>
            ))}
          </ul>
        </div>
      </main>
    </>
  );
};

Home.propTypes = {
  organizations: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      organization_full_name: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default Home;
