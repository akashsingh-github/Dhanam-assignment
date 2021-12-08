import React from "react";

function Product(props){
    const {title, bunting, notes, date} = props;
    return(
        <>
            {/* <h1>Products</h1> */}
            <div className="item-card">
                <h2 className="card-title">{title}</h2>
                <i><h3>Notes: <q> {notes}</q></h3></i>
                <div className="flex-items">
                    {bunting ? <div className="bunting">Bunting</div> : <div></div>}
                    <div className="date">{date}</div>
                </div>
            </div>
        </>
    )
}
export default Product;