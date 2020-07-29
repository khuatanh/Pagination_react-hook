import React, {useEffect, useState} from 'react';
import './App.css';
import PostList from './components/PostList/index.jsx';
import Pagination from './components/Pagination/index.jsx';
import SearchValue from './components/SearchValue/index';
import qureyString from 'query-string';



function App() {
  const [postList, setPostList]= useState([]);
  const [pagination, setPagination]= useState({
    _page: 1,
    _limit: 10,
    _totalRows: 1
  });
  const [filters, setfilters] = useState({
    _limit: 10,
    _page: 1,
    title_like: ''
  });
  const [loading, setLoading]= useState(false);
  const [curentPage]= useState(1);
  const [itemPerPage]= useState(10);

  useEffect(() =>{
    async function fetchAPI (){
      try{
        setLoading(true);
        const queryParam= qureyString.stringify(filters); //limt=10&page=1
        const requestUrl=`http://js-post-api.herokuapp.com/api/posts?${queryParam}`;
        const response = await fetch(requestUrl);
        const responseJSON= await response.json();
        const {data, pagination} = responseJSON;
        setPostList(data);
        setLoading(false);
        setPagination(pagination);
      }catch(error){
          console.log('Error:', error.message);
      }
    }
    fetchAPI();
  }, [filters]);

  //Get curentPage Post;
  const indexOfLastPage= curentPage * itemPerPage;
  const indexOfFirtpage= indexOfLastPage - itemPerPage;
  const curentPost= postList.slice(indexOfFirtpage, indexOfLastPage); 

  function handlePageChange (newPage){
    setfilters({
      ...filters,
      _page: newPage,
    });
  };

  function hadleFilterFromSubmit(newFilter){
    setfilters({
      ...filters,
      title_like: newFilter.SearchValue,
      _page: 1
    });
  }


  return (
    <div className="App">
      <h2> POST LIST</h2>
      <SearchValue onSubmit={hadleFilterFromSubmit} />
      <PostList posts={curentPost} loading={loading}/>
      <Pagination
        pagination= {pagination}
        onPageChange= {handlePageChange}
        _totalRows={postList.length}
      />
    </div>
  );
}

export default App;
