import React from 'react'

const SubHeader = ({search, setSearch, onResetSearch}) => {
  return <>
    <div className="row g-3">
        <div className="col-auto" style={{marginRight: "10px"}}>
            <input type="text" className="form-control" placeholder="" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <div className="col-auto">
            <button type="submit" className="btn btn-warning mb-3" onClick={() => onResetSearch(true)}>Reset</button>
        </div>
    </div>
  </>
}

export default SubHeader