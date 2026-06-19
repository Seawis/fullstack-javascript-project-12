import { Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Error404 = () => {
  const navigate = useNavigate();
  const { t } = useTranslation()

  return (
    <Container 
      className="d-flex align-items-center justify-content-center" 
      style={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}
    >
      <Row className="text-center">
        <Col>
          <div className="error-code-wrapper mb-4">
            <h1 
              style={{ 
                fontSize: '10rem', 
                fontWeight: '900', 
                color: '#343a40',
                lineHeight: '1'
              }}
            >
              404
            </h1>
            <div 
              className="px-2"
              style={{ 
                backgroundColor: '#0d6efd', 
                color: 'white', 
                display: 'inline-block',
                borderRadius: '4px',
                transform: 'rotate(-5deg) translateY(-50px)'
              }}
            >
              {t('error.404.pageNotFound')}
            </div>
          </div>
          
          <h2 className="mb-3">{t('error.404.err')}</h2>
          <p className="text-muted mb-5">
            {t('error.404.noPage')}
          </p>
          
          <div className="d-flex justify-content-center gap-3">
            <Button 
              variant="primary" 
              size="lg" 
              onClick={() => navigate('/')}
              className="px-4 shadow-sm"
            >
              {t('error.404.goMainpage')}
            </Button>
            <Button 
              variant="outline-secondary" 
              size="lg" 
              onClick={() => navigate(-1)}
              className="px-4"
            >
              {t('error.404.back')}
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Error404;