import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, Button, Spinner } from 'react-bootstrap';
import { collection, query, onSnapshot, orderBy } from "firebase/firestore";
import { db } from '../firebase';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/ListingPage.css';

const ListingPage = () => {
  const [menuList, setMenuList] = useState([]);
  const [filteredMenuList, setFilteredMenuList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchItem, setSearchItem] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6); 

  useEffect(() => {
    const menuCollection = collection(db, 'menu');
    const q = query(menuCollection, orderBy('createdTime', 'desc'));

    onSnapshot(q, (querySnapshot) => {
      const menus = querySnapshot.docs.map(doc => ({
        id: doc.id,
        data: doc.data()
      }));

      setMenuList(menus);
      updateFilteredMenus(menus);
      setLoading(false);
      console.log(menus);
    });
    const storedPage = localStorage.getItem('currentPage');
    if (storedPage) {
      setCurrentPage(parseInt(storedPage));
      localStorage.removeItem('currentPage'); 
    }
  }, []); 

  // Update filtered list when menuList or searchItem changes
  useEffect(() => {
    updateFilteredMenus(menuList);
  }, [menuList, searchItem]); 
 

  const updateFilteredMenus = (list) => {
    const filteredMenus = list.filter(menu =>
      menu.data.title.toLowerCase().includes(searchItem.toLowerCase()) ||
      menu.data.name.toLowerCase().includes(searchItem.toLowerCase())
    );
    setFilteredMenuList(filteredMenus);
  };

  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredMenuList.slice(indexOfFirstItem, indexOfLastItem);

  // Store current page in localStorage
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    localStorage.setItem('currentPage', pageNumber); 
  };

  // Resetting to first page while searching
  const handleSearchChange = (e) => {
    setSearchItem(e.target.value);
    setCurrentPage(1); 
  };

  const nextPage = () => {
    if (currentPage < Math.ceil(filteredMenuList.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
      localStorage.setItem('currentPage', currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      localStorage.setItem('currentPage', currentPage - 1);
    }
  };

  return (
    <>
      <header className="header-content">
        <h1 className='text-content'>Delicious meals, created <span className="text-highlight">by you</span></h1>
        <p>Choose your favorite recipes and cook it yourself. It is easy and fun!</p>
        <p>
          <Link to={'/create'}><button className='share-button'>Share Your Favorite Recipe</button></Link>
        </p>
      </header>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search"
          value={searchItem}
          onChange={handleSearchChange}
          className="search-input"
        />
      </div>
      {loading ? (
        <div className="spinner-container">
          <Spinner animation="border" role="status" variant="light">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : (
        <>
          <div className="card-row">
            <div>
              {currentItems.length === 0 && (
                <div className="no-recipe-found">
                  No Recipe Found
                </div>
              )}
            </div>
            {currentItems.map(({ id, data }) => (
              <div key={id} className="card-wrapper">
                <Card className='cardcontainer'>
                  <Card.Img variant="top" src={data.file} alt="Main" className='imageContainer' />
                  <Card.Body className='card-body-custom'>
                    <Card.Title className='card_title'>{data.title}</Card.Title>
                    <Card.Subtitle className='card_subtitle'>by {data.name}</Card.Subtitle>
                    {/* <Card.Subtitle className='card_subtitle'>by {data.createdTime}</Card.Subtitle> */}
                    <Card.Text className='summary'>
                      {data.summary}
                    </Card.Text>
                    <Link to={{ pathname: `/details/${id}`, state: { currentPage } }}><Button className="btn">View Details</Button></Link>
                  </Card.Body>
                </Card>
              </div>
            ))}
          </div>
          <div className="pagination">
            <p onClick={prevPage} className={`page-link ${currentPage === 1 ? 'disabled' : ''}`} disabled={currentPage === 1}><i class="bi bi-arrow-left-short"></i></p>
            {[...Array(Math.ceil(filteredMenuList.length / itemsPerPage)).keys()].map(number => (
              <button key={number + 1} onClick={() => paginate(number + 1)} className={`page-link ${currentPage === number + 1 ? 'active' : ''}`}>
                {number + 1}
              </button>
            ))}
            <p onClick={nextPage} className={`page-link ${currentPage === Math.ceil(filteredMenuList.length / itemsPerPage) ? 'disabled' : ''}`} 
            disabled={currentPage === Math.ceil(filteredMenuList.length / itemsPerPage)}><i class="bi bi-arrow-right-short"></i></p>
          </div>
        </>
      )}
    </>
  );
};

export default ListingPage;
