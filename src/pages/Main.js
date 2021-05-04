import React, { useContext, useEffect, useState } from 'react'
import { Container, Button, Alert } from 'react-bootstrap'
import { MyCard } from '../components/MyCard'
import { MyModal } from '../components/MyModal'
import { MyNavbar } from '../components/MyNavbar'
import { MySpinner } from '../components/MySpinner'
import { Register } from '../components/Register'
import AppContext from '../context/appContext'
import manLaptopImg from '../resources/img/man-laptop.svg'

export const Main = () => {
  const appContext = useContext(AppContext)
  const {
    errorMsg,
    loading,
    changePage,
    allUsers,
    getAllUsers,
    totalPage,
    page
  } = appContext

  const [successMsg, setSuccessMsg] = useState(null)
  const [modal, setModal] = useState(false)

  const handleGetUsers = (newPage) => {
    changePage(newPage)
    getAllUsers(newPage, 6)
  }

  useEffect(() => {
    !allUsers && getAllUsers(page)

    // eslint-disable-next-line
  }, [allUsers])

  return (
    <>
      {loading && <MySpinner />}
      {errorMsg && <Alert variant='danger'>{errorMsg}</Alert>}
      {
        successMsg && <Alert variant="success" >{successMsg}</Alert >
      }
      {
        modal && <MyModal show={modal} onHide={() => setModal(false)} />
      }
      <MyNavbar />
      <div id='about' className='d-flex align-items-center'>
        <Container className='text-white'>
          <h1>Test assignment</h1>
          <h1>for Frontend</h1>
          <h1>Developer position</h1>
          <p className='w-50'>
            <span>
              We kindly remind you that your test assignment should be submitted
              as a link to github/bitbucket repository.
            </span>
            <span className='mob-none'>
              Please be patient, we consider and respond to every application
              that meets minimum requirements. We look forward to your
              submission. Good luck! The photo has to scale in the banner area
              on the different screens.
            </span>
          </p>
          <div>
            <Button className='px-5'>
            <a href='#register'>Sing up now</a>
          </Button>
          </div>   
        </Container>
      </div>
      <Container
        id='relations'
        className='d-flex flex-column align-items-center justify-content-center py-5'
      >
        <h1 className='mt-5 mb-2'>Let's get acquainted</h1>
        <div className='d-flex my-5 w-100'>
          <img src={manLaptopImg} className='w-50' alt='Man with laptop' />
          <div className='ml-5 w-50'>
            <h2>I am cool frontend developer</h2>
            <p>
              We will evaluate how clean your approach to writing CSS and
              Javascript code is. You can use any CSS and Javascript 3rd party
              libraries without any restriction.
            </p>
            <p>
              If 3rd party css/javascript libraries are added to the project via
              bower/npm/yarn you will get bonus points. If you use any task
              runner (gulp/webpack) you will get bonus points as well. Slice
              service directory page P​SD mockup​ into HTML5/CSS3.{' '}
            </p>
            <a href='#register'>Sing up now </a>
          </div>
        </div>
      </Container>
      <div
        id='users'
        className='d-flex flex-column align-items-center justify-content-center text-center py-5'
      >
        <Container>
          <h1 className='mt-5 mb-2'>Our cheerful users</h1>
          <p>Attention! Sorting users by registration date</p>
          <div className='d-flex flex-row flex-wrap justify-content-center mt-5 mb-4 w-100'>
            {allUsers
              && allUsers.length > 0
              && (
                allUsers.map(user => <MyCard key={user.id} user={user} setSuccessMsg={setSuccessMsg} />)
              )}
            {
              allUsers && allUsers.length === 0
              && <h1>Don't have any users</h1>
            }
          </div>

          <div>
            {
              +page > 1
              && (<Button className='px-5 mr-3' onClick={() => handleGetUsers(+page - 1)}>
                Previous
              </Button>)
            }
            {
              +page < +totalPage
              && (<Button className='px-5' onClick={() => handleGetUsers(+page + 1)}>
                Show more
              </Button>)
            }
          </div>
        </Container>
      </div>
      <Register setModal={setModal} />
      <div className='footer py-2 d-flex justify-content-center'>
        <a href='https://abz.agency/' target='_blank' rel="noreferrer">© abz.agency specially for the test task</a> 
      </div>
    </>
  )
}
