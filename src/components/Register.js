import React, {useContext, useEffect, useState} from 'react'
import { Container, Form, Button } from 'react-bootstrap'
import AppContext from '../context/appContext'


export const Register = ({setModal}) => {
  const appContext = useContext(AppContext)
  const {postUser, getPositions, positions} = appContext
  
  const [validated, setValidated] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [photo, setPhoto] = useState(null)
  const [pos, setPos] = useState(1)

  const initState = () => {
    setName('')
    setEmail('')
    setPhone('')
    setPhoto(null)
    setPos(1)

    setModal(true)
    setValidated(false)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    event.stopPropagation()
    
    const form = event.currentTarget

    if (form.checkValidity() === false) {
      setValidated(true);
    } else {
      const formData = new FormData()

      formData.append('name', name)
      formData.append('email', email)
      formData.append('phone', phone)
      formData.append('position_id', pos.toString())
      formData.append('photo', photo)

      postUser(formData, initState)
    }
  }
  
  useEffect(() => {
    getPositions() 
     // eslint-disable-next-line
  }, [])

  return (
    <div
      id='register'
      className='d-flex flex-column align-items-center justify-content-center py-5'
    >
    <Container className='d-flex flex-column align-items-center'>
      <h1 className='text-center'>Register to get a work</h1>
      <p className='text-center'>Attention! After successful registration and alert, update the list of users in the block from the top</p>
      <Form noValidate validated={validated} onSubmit={handleSubmit}  className='w-75'>
        <Form.Group>
          <Form.Label>Name</Form.Label>
          <Form.Control
            required
            minLength={2}
            maxLength={60}
            type="text"
            placeholder="Name"
            value={name}
            onChange={e => setName(e.target.value)}  
          />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            <Form.Control.Feedback type="invalid">
              Enter your name.
            </Form.Control.Feedback>
          </Form.Group>
    
        <Form.Group>
          <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Your email"
              value={email}
              minLength={2}
              maxLength={100}
              onChange={e => setEmail(e.target.value)}  
              required />
          <Form.Control.Feedback type="invalid">
            Please provide a valid email.
          </Form.Control.Feedback>
          </Form.Group>
          
        <Form.Group>
          <Form.Label>Phone</Form.Label>
            <Form.Control
              pattern='^[\+]{0,1}380([0-9]{9})$'
              type="text"
              placeholder="+380 XX XXX XX XX"
              value={phone}
              onChange={e => setPhone(e.target.value)}  
              required
            />
          <Form.Control.Feedback type="invalid">
          Enter a phone number in international format (should start with code of Ukraine +380).
          </Form.Control.Feedback>
          </Form.Group>
          
          {
            positions.length > 0
            && <div>
                <Form.Label>Select your position</Form.Label>

              {
                positions.map(p => (
                  <Form.Group className='d-flex flex-row mb-0' key={p.id}>
                    <Form.Check
                      required
                      value={p.id}
                      name='radio'
                      id={`radio-${p.id}`}
                      checked={+pos === +p.id}
                      onChange={() => setPos(p.id)}
                      type='radio'
                    />
                    <Form.Label htmlFor={`radio-${p.id}`}>{p.name}</Form.Label>
                    </Form.Group>
                ))
              }
              </div>  
          }

          <Form.Group>
            <Form.Label>Photo</Form.Label>
              
            <Form.File
              id="formcheck-api-custom"
              maxLength='5000'
              required
              custom>
              <Form.File.Input
                accept="image/jpeg, image/jpg"
                maxLength='5000'
                required
                onChange={e => setPhoto(e.target.files[0])}
              />
              <Form.File.Label data-browse="Browse">
                {
                  !photo
                    ? 'Upload your photo'
                    : photo.name
                }
              </Form.File.Label>
           </Form.File>

            <Form.Control.Feedback type="invalid">
              Photo must be image in format png, jpeg or jpg.
            </Form.Control.Feedback>
          </Form.Group>

      <div className="w-100 d-flex justify-content-center">
        <Button type="submit m-auto" className='px-5'>Sing up now</Button>    
      </div>
    </Form>

    </Container>
  </div>
  )
}
