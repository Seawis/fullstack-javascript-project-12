import axios from 'axios'
import { useEffect, useRef, useState } from 'react'
import { useFormik } from 'formik'
import { Button, Card, Col, Form, Row } from 'react-bootstrap'
import { useLocation, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify';

import useAuth from '../hooks/index.jsx'
import routes from '../fetch/routes.js'

const LoginPage = () => {
  const { t } = useTranslation()
  const auth = useAuth()
  const [authFailed, setAuthFailed] = useState(false)
  const inputRef = useRef()
  const location = useLocation()
  const navigate = useNavigate()

  const redirectPath = location.state?.from?.pathname ?? '/'

  useEffect(() => {
    inputRef.current.focus()
  }, [])

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: async (values) => {
      setAuthFailed(false)

      try {
        const res = await axios.post(routes.loginPath(), values)
        auth.logIn(res.data)
        navigate(redirectPath, { replace: true })
      }
      catch (err) {
        formik.setSubmitting(false)
        if (err.isAxiosError && err.response.status === 401) {
          setAuthFailed(true)
          inputRef.current.select()
          toast(`${t('error.load.err')} ${err.response.statusText} ${err.response.status} `)
          return
        }
        if (err.response.status >= 500) {
            setAuthFailed(true)
            inputRef.current.select()
            toast(`${t('error.load.server')} ${err.response.statusText} ${err.response.status} `)
            return
          }
        auth.logOut()
        throw err
      }
    },
  })

  return (
    <div className="container">
      <h1 className="text-center mt-4 mb-4">{t('login.welcome')}</h1>
      <Row className="justify-content-center pt-5">
        <Col sm={8} md={6} lg={4}>
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title className="mb-4">{t('login.singIn')}</Card.Title>
              <Form onSubmit={formik.handleSubmit}>
                <fieldset>
                  <Form.Group className="mb-3">
                    <Form.Label htmlFor="username">{t('login.username')}</Form.Label>
                    <Form.Control
                      onChange={formik.handleChange}
                      value={formik.values.username}
                      placeholder={t('login.username')}
                      name="username"
                      id="username"
                      autoComplete="username"
                      isInvalid={authFailed}
                      required
                      ref={inputRef}
                    />
                  </Form.Group>
                  <Form.Group className="mb-4">
                    <Form.Label htmlFor="password">{t('login.password')}</Form.Label>
                    <Form.Control
                      type="password"
                      onChange={formik.handleChange}
                      value={formik.values.password}
                      placeholder={t('login.password')}
                      name="password"
                      id="password"
                      autoComplete="current-password"
                      isInvalid={authFailed}
                      required
                    />
                    <Form.Control.Feedback type="invalid">{t('login.invalidLogin')}</Form.Control.Feedback>
                  </Form.Group>
                  <Button type="submit" variant="primary" className="w-100">{t('login.submit')}</Button>
                </fieldset>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default LoginPage
