
import { useRef } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useForm } from '../../hook/useForm'
import { FormTask } from './Form'

export const TaskManager = () => {
  const formRef = useRef(null);
  const [inputValues,setInputValues,handleChangeInputsValue,reset]= useForm({},formRef)
  
  const handleSubmit = (e)=>{
    e.preventDefault();
    reset()

  }

  return (
    <Container className='mt-5'>
      <Row>
        <Col sm={12} lg={3}>
          <FormTask onChange={handleChangeInputsValue} 
          inputValues={inputValues} 
          submit={handleSubmit} 
          formRef={formRef}/>
        </Col>

        <Col sm={12} lg={9}>
        
        </Col>
      
      </Row>
    </Container>
  )
}
