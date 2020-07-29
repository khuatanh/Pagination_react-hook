import React from 'react';
import PropTypes from 'prop-types';
// import { Button } from 'reactstrap';
import './style.css'

Pagination.propTypes = {
    onPageChange: PropTypes.func,
    pagination: PropTypes.object.isRequired,
};
Pagination.default={
    onPageChange: null,
    
}

function Pagination(props) {
    const {onPageChange, pagination}= props;
    const { _page, _limit, _totalRows }= pagination;
    const pageNumbers= [];
    for(let i=1; i <= Math.ceil(_totalRows/ _limit); i++){
        pageNumbers.push(i);
    };
    const totalPages = Math.ceil(_totalRows /_limit);

    function handlePageChange (newPage){
    if (!onPageChange) return;
    if (onPageChange) {
        onPageChange(newPage);
    }
}
    return (
        
            <nav className="d-inline-flex">
                <ul className="pagination justify-content-center mr-3 ml-3">
                    <button
                    className="btn btn-primary "
                    onClick={()=> handlePageChange(_page - 1)}
                    disabled={_page <= 1}
                    >
                        previous
                    </button>
                   {pageNumbers.map(number =>(
                        <li onClick={() =>handlePageChange(number)} className="page-item m-0" key={number}><a className='page-link' href='/#'>{number}</a></li>
                    ))}
                    <button
                    className='btn btn-primary'
                    onClick={()=> handlePageChange(_page + 1)}
                    disabled={_page >= totalPages}
                    >
                        next
                    </button>
                 </ul>
             </nav>
           
        
    );
}

export default Pagination;