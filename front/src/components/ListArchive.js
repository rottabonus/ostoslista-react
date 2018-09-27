import React from 'react'
import kokki from '../images/kokkeli.png'

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
              {history.filter(list => list.resolved !== 'N').map((item, i) => <ArchiveItem key={i} item={item} getOld={getOld}></ArchiveItem>)}
            </tbody>
          </table>
        </div>
        <div className="oldList">
          {
            old.length === 0 ? null : old.map(item => <div key={item.or_id}>{item.name}</div>)
          }
        </div>
        <div><img src={kokki} /></div>
      </div>
    </div>
  )
}

export default ListArchive