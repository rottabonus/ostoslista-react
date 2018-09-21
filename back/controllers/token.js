

const verifyToken = (req, res) => {
  const bearer = req.headers['authorization']
  if(bearer !== 'undefined'){
    const b = bearer.split(' ')
    const bToken = b[1]
    return bToken
  } else {
    res.status(401).send({ error: 'no authorization' })
  }
}

module.exports = { verifyToken }