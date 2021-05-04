import axios from 'axios'
import React, {useEffect, useState} from 'react'
import { Card, Image, OverlayTrigger, Tooltip } from 'react-bootstrap'
import userImg from '../resources/img/photo-cover.svg'
 
export const MyCard = ({ user, setSuccessMsg }) => {
  const [avatar, setAvatar] = useState(userImg)
  const { photo, name, position, email, phone } = user

  const copyLynk = e => {
    e.stopPropagation()

    const text = e.target
    text.select()

    document.execCommand('copy')
    setSuccessMsg('Link copied')

    setTimeout(() => {
      setSuccessMsg(null)
    }, 2000)
  }

  useEffect(() => {
    axios.get(photo)
      .then(() => setAvatar(photo))
      .catch(() => {
        setAvatar(userImg)
      })
    // eslint-disable-next-line
  }, [])

  return (
    <Card className='d-flex align-items-center pt-3 ml-2 mb-2'>
    <Image src={avatar} roundedCircle />
    <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text>{position}</Card.Text>
        <OverlayTrigger
          placement='bottom'
          overlay={
            <Tooltip id='tooltip'>
              {email}
            </Tooltip>
          }
        >
          <div className='card-email cursor-pointer'>
            <input onClick={copyLynk}
                   type="text"
                  value={email}
                    id={user.id}
                   readOnly />
            <label htmlFor={user.id}>{email}</label>
          </div>
              
        </OverlayTrigger>
        <p>{phone}</p>
    </Card.Body>
  </Card>
  )
}
