import React from 'react'
import "../newnav/newnav.css";


const Newnav = () => {
    return (
        <div className="container-fluid">
            <div className="row text-center newnav text-white pt-3 pb-3">
                <div className="col">All</div>
                <div className="col">Mobile</div>
                <div className="col">Bestseller</div>
                <div className="col">Fashion</div>
                <div className="col">Customer Service</div>
                <div className="col">Electronics</div>
                <div className="col">Prime</div>
                <div className="col">Today's Deal</div>
                <div className="col">Amazon Pay</div>
            </div>
        </div>
    );
}

export default Newnav