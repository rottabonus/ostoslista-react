import React from 'react'

const ArchiveItem = ({ item, getOld }) => {
  return (
    <tr onClick={(e) => getOld(e, item.shop_id)}>
      <td>{item.shop_id}</td>
      {item.date === null ? <td>No date specified</td> : <td>{item.date}</td> }
    </tr>
  )
}

const ListArchive = ({ history, getOld, old }) => {

  return (
    <div>
      <h2>here render old lists</h2>
      <div className="archiveDivs">
        <div>
          <table>
            <tbody>
              {history.filter(list => list.resolved !== 'N').map(item => <ArchiveItem item={item} getOld={getOld} key={item.shop_id}></ArchiveItem>)}
            </tbody>
          </table>
        </div>
        <div className="oldList">
          {
            old.length === 0 ? null : old.map(item => <div key={item.or_id}>{item.name}</div>)
          }
        </div>
      </div>
    </div>
  )
}

export default ListArchive