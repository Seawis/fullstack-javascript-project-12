import axios from 'axios'
import { useEffect, useRef } from 'react'
import { useFormik } from 'formik'
import { Button, Card, Col, Form, Row, Spinner } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify';

import useAuth from '../hooks/index.jsx'
import routes from '../fetch/routes.js'
import schema from '../validate/validateNewUser.js'

const SignupPage = () => {
  const { t } = useTranslation()
  const auth = useAuth()

  const navigate = useNavigate()
  const redirectPath = '/'
  const inputRef = useRef()

  useEffect(() => {
    inputRef.current.focus()
  }, [])

  const formik = useFormik({
    validationSchema: schema(t),
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    onSubmit: async (values) => {
      formik.setSubmitting(true)
      const {username, password} = values

      try {
        const res = await axios.post(routes.signupPath(), { username, password })
        // localStorage.setItem('userId', JSON.stringify(res.data))
        auth.logIn(res)
        navigate(redirectPath, { replace: true })
      }
      catch (err) {
        formik.setSubmitting(false)
        if (err.isAxiosError && err.response.status === 401) {
          formik.errors.username = t('error.load.axios')
          toast(`${t('error.load.axios')} ${err.response.statusText} ${err.response.status} `)
        }
        if (err.response.status === 409) {
          formik.errors.username = t('error.load.alreadyExists')
          toast(t('error.load.alreadyExists'))
          inputRef.current.select()
        }
        if (err.response.status >= 500) {
          formik.errors.username = `${t('error.load.server')} ${err}`
          toast(`${t('error.load.server')} ${err.response.statusText} ${err.response.status} `)
        }
        throw err
      }
    },
  })

  return (
    <div className="container">
      <h1 className="text-center mt-4 mb-4">{t('singup.welcome')}</h1>
      <Row className="justify-content-center pt-5">
        <Col sm={8} md={6} lg={4}>
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title className="mb-4">{t('singup.singup')}</Card.Title>
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
                      isValid={formik.touched.username && !formik.errors.username}
                      isInvalid={!!formik.errors.username}
                      required
                      ref={inputRef}
                    />
                    <Form.Control.Feedback type="invalid">{formik.errors.username}</Form.Control.Feedback>
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
                      isValid={formik.touched.password && !formik.errors.password}
                      isInvalid={!!formik.errors.password}
                      required
                    />
                    <Form.Control.Feedback type="invalid">{formik.errors.password}</Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className="mb-4">
                    <Form.Label htmlFor="confirmPassword">{t('singup.passConfirm')}</Form.Label>
                    <Form.Control
                      type="password"
                      onChange={formik.handleChange}
                      value={formik.values.confirmPassword}
                      placeholder={t('singup.passConfirm')}
                      name="confirmPassword"
                      id="confirmPassword"
                      autoComplete="current-password"
                      isValid={formik.touched.confirmPassword && !formik.errors.confirmPassword}
                      isInvalid={!!formik.errors.confirmPassword}
                      required
                    />
                    <Form.Control.Feedback type="invalid">{formik.errors.confirmPassword}</Form.Control.Feedback>
                  </Form.Group>
                  <Button
                    disabled={formik.isSubmitting || !formik.isValid}
                    type="submit"
                    variant="primary"
                    className="w-100"
                  >
                    {formik.isSubmitting
                      ? <Spinner
                          as="span"
                          animation="border"
                          size="sm"
                          role="status"
                          aria-hidden="true"
                        />
                      : t('singup.singup')}
                  </Button>
                </fieldset>
                {/*<p className="text-center text-danger my-2">{error}</p>*/}
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default SignupPage
